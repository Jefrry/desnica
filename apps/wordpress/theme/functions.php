<?php
defined('ABSPATH') || exit;

add_action('after_setup_theme', static function () {
    add_theme_support('title-tag');
    add_theme_support('html5', array('style', 'script'));
});

add_action('wp_enqueue_scripts', static function () {
    wp_enqueue_style(
        'resource-center',
        get_stylesheet_uri(),
        array(),
        (string) filemtime(get_stylesheet_directory() . '/style.css')
    );
});
