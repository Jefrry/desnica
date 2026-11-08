<?php
/**
 * Plugin Name: Русский интерфейс Ресурсного центра
 * Description: Русский перевод интерфейса редактора Markdown.
 */

defined('ABSPATH') || exit;

// Keep this catalog separate from the language pack managed by WordPress.org.
add_filter('lang_dir_for_domain', static function ($path, string $domain, string $locale) {
    if ($domain === 'markup-markdown' && $locale === 'ru_RU') {
        return __DIR__ . '/resource-center-languages/';
    }

    return $path;
}, 10, 3);

add_filter('markup_markdown_localized_strings', static function (array $strings): array {
    if (determine_locale() === 'ru_RU') {
        $strings['wpsimage'] = esc_html__('Insert or Upload Media', 'markup-markdown');
    }

    return $strings;
});

add_action('markup_markdown_load_engine_scripts', static function (): void {
    if (!is_admin() || determine_locale() !== 'ru_RU') {
        return;
    }

    wp_enqueue_script(
        'resource-center-markdown-ru',
        plugins_url('resource-center-languages/editor-ru.js', __FILE__),
        ['markup_markdown__wordpress_richedit'],
        '1.0.0',
        true
    );
});

add_action('markup_markdown_load_engine_stylesheets', static function (): void {
    if (is_admin() && determine_locale() === 'ru_RU') {
        wp_add_inline_style('markup_markdown__cssengine_editor', '
            .editor-statusbar .lines::before { content: "строк: "; }
            .editor-statusbar .words::before { content: "слов: "; }
            .editor-statusbar .characters::before { content: "символов: "; }
        ');
    }
});
