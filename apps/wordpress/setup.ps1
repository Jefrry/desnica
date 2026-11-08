param(
    [switch] $EnvOnly,
    [string] $CoreLanguageZip
)

$ErrorActionPreference = 'Stop'
if (!$EnvOnly) {
    node (Join-Path $PSScriptRoot 'build-publication-assets.mjs')
    if ($LASTEXITCODE -ne 0) {
        throw 'Could not build publication assets. Run pnpm install from the repository root first.'
    }
}

$destination = Join-Path $PSScriptRoot '.env'
if (Test-Path -LiteralPath $destination) {
    Write-Host '.env already exists; passwords were preserved.'
} else {
    function New-LocalSecret {
        $bytes = New-Object byte[] 32
        $generator = [System.Security.Cryptography.RandomNumberGenerator]::Create()
        try { $generator.GetBytes($bytes) } finally { $generator.Dispose() }
        return ([BitConverter]::ToString($bytes)).Replace('-', '').ToLowerInvariant()
    }

    $contents = "MYSQL_PASSWORD=$(New-LocalSecret)`nMYSQL_ROOT_PASSWORD=$(New-LocalSecret)`n"
    # CreateNew also protects an existing .env from concurrent setup runs.
    $stream = [System.IO.File]::Open($destination, [System.IO.FileMode]::CreateNew)
    try {
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($contents)
        $stream.Write($bytes, 0, $bytes.Length)
    } finally { $stream.Dispose() }
    Write-Host 'Created apps/wordpress/.env with private local database passwords.'
}

if ($EnvOnly) { return }

& (Join-Path $PSScriptRoot 'prepare-russian-language.ps1') -CoreLanguageZip $CoreLanguageZip

$markupMarkdownVersion = '4.0.2'
$dependencies = Join-Path $PSScriptRoot '.dependencies'
$package = Join-Path $dependencies "markup-markdown-$markupMarkdownVersion"
if (Test-Path -LiteralPath (Join-Path $package 'markup-markdown/readme.txt')) {
    exit 0
}

New-Item -ItemType Directory -Path $dependencies -Force | Out-Null
$staging = New-Item -ItemType Directory -Path (Join-Path $dependencies ([guid]::NewGuid().ToString()))
$archive = Join-Path $staging.FullName 'markup-markdown.zip'
$extracted = Join-Path $staging.FullName 'extracted'
$dependenciesPath = (Resolve-Path -LiteralPath $dependencies).Path
$stagingPath = (Resolve-Path -LiteralPath $staging.FullName).Path
if ([System.IO.Path]::GetDirectoryName($stagingPath) -ne $dependenciesPath) {
    throw 'Unexpected Markup Markdown staging path.'
}
try {
    Invoke-WebRequest -UseBasicParsing -Uri "https://downloads.wordpress.org/plugin/markup-markdown.$markupMarkdownVersion.zip" -OutFile $archive
    Expand-Archive -LiteralPath $archive -DestinationPath $extracted
    if (!(Test-Path -LiteralPath (Join-Path $extracted 'markup-markdown/readme.txt'))) {
        throw 'Unexpected Markup Markdown archive layout.'
    }
    if (!(Test-Path -LiteralPath $package)) {
        try {
            [System.IO.Directory]::Move($extracted, $package)
        } catch {
            if (!(Test-Path -LiteralPath (Join-Path $package 'markup-markdown/readme.txt'))) {
                throw
            }
        }
    }
    if (!(Test-Path -LiteralPath (Join-Path $package 'markup-markdown/readme.txt'))) {
        throw "Incomplete Markup Markdown package at $package. Remove that directory and run setup again."
    }
    Write-Host "Prepared Markup Markdown $markupMarkdownVersion."
} finally {
    Remove-Item -LiteralPath $stagingPath -Recurse -Force
}
