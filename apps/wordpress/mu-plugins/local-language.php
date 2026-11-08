<?php

defined('ABSPATH') || exit;

// Existing Podman databases predate the Russian installer default.
add_action('muplugins_loaded', static function (): void {
    if (wp_installing() || get_option('resource_center_locale_initialized')) {
        return;
    }

    if (get_option('WPLANG') === 'ru_RU' || update_option('WPLANG', 'ru_RU')) {
        add_option('resource_center_locale_initialized', '1', '', false);
    }
});
