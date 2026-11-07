<?php
/**
 * Plugin Name: Публикации Ресурсного центра
 * Description: Поля, постоянные адреса и безопасное отображение Markdown-публикаций.
 * Requires at least: 6.7
 * Requires PHP: 8.0
 * Requires Plugins: markup-markdown
 * Version: 0.1.0
 */
defined('ABSPATH') || exit;

require_once __DIR__ . '/editor.php';
require_once __DIR__ . '/routes.php';

function resource_center_publication_html(WP_Post $post): ?string
{
    if (!function_exists('markup_markdown')) {
        return null;
    }

    $html = markup_markdown()->markdown2html($post->post_content);
    $allowed = array_intersect_key(wp_kses_allowed_html('post'), array_flip(array(
        'a', 'abbr', 'b', 'blockquote', 'br', 'caption', 'code', 'dd', 'del', 'div', 'dl', 'dt',
        'em', 'figcaption', 'figure', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img',
        'ins', 'kbd', 'li', 'mark', 'ol', 'p', 'pre', 's', 'span', 'strong', 'sub', 'sup',
        'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul',
    )));
    foreach ($allowed as &$attributes) {
        unset($attributes['style']);
    }
    unset($attributes, $allowed['img']['srcset']);

    $html = wp_kses($html, $allowed, array('http', 'https', 'mailto', 'tel'));
    if (preg_match('/<h1(?=[\s>])/i', $html)) {
        $html = preg_replace_callback(
            '/<(\/?h)([1-6])(?=[\s>])/i',
            static fn (array $heading): string => '<' . $heading[1] . min(6, (int) $heading[2] + 1),
            $html
        );
    }
    return $html;
}
