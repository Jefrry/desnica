<?php
/**
 * Plugin Name: Запрет индексации Ресурсного центра
 * Description: Скрывает сайт от индексации поисковыми системами.
 */

defined('ABSPATH') || exit;

add_filter('pre_option_blog_public', '__return_zero');
add_filter('wp_robots', 'wp_robots_no_robots');
add_filter('robots_txt', static function () {
    return "User-agent: *\nDisallow: /\n";
});
add_action('send_headers', static function () {
    header('X-Robots-Tag: noindex, nofollow', true);
});
