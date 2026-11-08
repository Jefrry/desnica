#Requires -Version 7.0
param(
    [string] $MarkupMarkdownZip,
    [string] $CoreLanguageZip
)

$ErrorActionPreference = 'Stop'
# Keep in sync with setup.ps1 and the editor bind mount in compose.yaml.
$version = '4.0.2'
$output = New-Item -ItemType Directory -Path (Join-Path $PSScriptRoot 'dist') -Force
$staging = New-Item -ItemType Directory -Path (Join-Path $output.FullName ([guid]::NewGuid().ToString()))
$stagingPath = (Resolve-Path -LiteralPath $staging.FullName).Path
if ([IO.Path]::GetDirectoryName($stagingPath) -ne $output.FullName) {
    throw 'Unexpected FTP package staging path.'
}

try {
    & (Join-Path $PSScriptRoot 'prepare-russian-language.ps1') -CoreLanguageZip $CoreLanguageZip

    $editor = Join-Path $PSScriptRoot ".dependencies/markup-markdown-$version/markup-markdown"
    if ($MarkupMarkdownZip -or !(Test-Path -LiteralPath (Join-Path $editor 'markup-markdown.php'))) {
        if (!$MarkupMarkdownZip) {
            $MarkupMarkdownZip = Join-Path $stagingPath 'markup-markdown.zip'
            Invoke-WebRequest -UseBasicParsing -Uri "https://downloads.wordpress.org/plugin/markup-markdown.$version.zip" -OutFile $MarkupMarkdownZip
        }
        $extracted = Join-Path $stagingPath 'editor'
        Expand-Archive -LiteralPath $MarkupMarkdownZip -DestinationPath $extracted
        $editor = Join-Path $extracted 'markup-markdown'
    }
    $entry = (Get-Content -LiteralPath (Join-Path $editor 'markup-markdown.php') -TotalCount 35) -join "`n"
    if ($entry -notmatch "(?m)^[ \t]*\*?[ \t]*Version:[ \t]*$([regex]::Escape($version))[ \t]*$") {
        throw "Expected Markup Markdown $version."
    }

    node (Join-Path $PSScriptRoot 'build-publication-assets.mjs')
    if ($LASTEXITCODE -ne 0) {
        throw 'Could not build publication assets. Run pnpm install from the repository root first.'
    }

    $package = Join-Path $stagingPath 'package'
    $content = Join-Path $package 'wp-content'
    $themes = New-Item -ItemType Directory -Path (Join-Path $content 'themes') -Force
    $plugins = New-Item -ItemType Directory -Path (Join-Path $content 'plugins') -Force
    $muPlugins = New-Item -ItemType Directory -Path (Join-Path $content 'mu-plugins') -Force
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'theme') -Destination (Join-Path $themes.FullName 'resource-center') -Recurse
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'plugins/resource-center-publications'), $editor -Destination $plugins.FullName -Recurse
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'mu-plugins/local-noindex.php') -Destination (Join-Path $muPlugins.FullName 'resource-center-noindex.php')
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'mu-plugins/resource-center-languages.php'), (Join-Path $PSScriptRoot 'mu-plugins/resource-center-languages') -Destination $muPlugins.FullName -Recurse
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot '.dependencies/wordpress-6.7.1-ru_RU') -Destination (Join-Path $content 'languages') -Recurse
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'FTP.md') -Destination (Join-Path $package 'FTP.md')

    $archive = Join-Path $stagingPath 'resource-center-ftp.zip'
    $destination = Join-Path $output.FullName 'resource-center-ftp.zip'
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [IO.Compression.ZipFile]::CreateFromDirectory($package, $archive)
    if (Test-Path -LiteralPath $destination) {
        [IO.File]::Replace($archive, $destination, (Join-Path $stagingPath 'previous.zip'))
    } else {
        [IO.File]::Move($archive, $destination)
    }
    Get-Item -LiteralPath $destination
} finally {
    Remove-Item -LiteralPath $stagingPath -Recurse -Force
}
