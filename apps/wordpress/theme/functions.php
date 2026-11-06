<?php
defined('ABSPATH') || exit;
require_once __DIR__ . '/inc/navigation.php';
require_once __DIR__ . '/inc/team.php';
require_once __DIR__ . '/inc/information-pages.php';
require_once __DIR__ . '/inc/documents.php';
require_once __DIR__ . '/inc/reports.php';

function resource_center_missing_photo(string $asset_id, string $alt, string $label = 'Фотография будет добавлена', string $class = ''): void
{
    ?>
    <figure class="missing-photo <?php echo esc_attr($class); ?>" data-asset-id="<?php echo esc_attr($asset_id); ?>">
        <div role="img" aria-label="<?php echo esc_attr($label . ': ' . $alt); ?>">
            <svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><rect x="3" y="5" width="34" height="30" rx="3" stroke="currentColor" stroke-width="2"/><circle cx="13" cy="15" r="3" stroke="currentColor" stroke-width="2"/><path d="m7 30 8-8 5 5 4-4 9 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <strong aria-hidden="true"><?php echo esc_html($label); ?></strong>
            <span aria-hidden="true"><?php echo esc_html($alt); ?></span>
        </div>
    </figure>
    <?php
}

add_action('after_setup_theme', static function () {
    add_theme_support('title-tag');
    add_theme_support('html5', array('style', 'script'));
});

add_action('wp_enqueue_scripts', static function () {
    wp_enqueue_style(
        'resource-center-common',
        get_theme_file_uri('/assets/css/common.css'),
        array(),
        (string) filemtime(get_theme_file_path('/assets/css/common.css'))
    );
    if (is_front_page()) {
        wp_enqueue_style(
            'resource-center-home',
            get_theme_file_uri('/assets/css/pages/home.css'),
            array('resource-center-common'),
            (string) filemtime(get_theme_file_path('/assets/css/pages/home.css'))
        );
    }
    $page = resource_center_information_page();
    if ($page) {
        foreach (array('information', $page['template']) as $stylesheet) {
            $file = '/assets/css/pages/' . $stylesheet . '.css';
            wp_enqueue_style('resource-center-' . $stylesheet, get_theme_file_uri($file), array('resource-center-common'), (string) filemtime(get_theme_file_path($file)));
        }
    }
    wp_enqueue_script('resource-center-navigation', get_theme_file_uri('/assets/navigation.js'), array(), (string) filemtime(get_theme_file_path('/assets/navigation.js')), true);
    if ($page && $page['template'] === 'documents') {
        wp_enqueue_script('resource-center-documents', get_theme_file_uri('/assets/documents.js'), array(), (string) filemtime(get_theme_file_path('/assets/documents.js')), true);
    }
    if ($page && $page['template'] === 'reports') {
        wp_enqueue_script('resource-center-reports', get_theme_file_uri('/assets/reports.js'), array(), (string) filemtime(get_theme_file_path('/assets/reports.js')), true);
    }
});

add_filter('pre_get_document_title', static function (string $title): string {
    $page = resource_center_information_page();
    if ($page) {
        return $page['title'] . ' — Ресурсный центр';
    }
    if (is_front_page()) {
        return 'Главная | Ресурсный центр';
    }
    return is_404() ? 'Страница не найдена | Ресурсный центр' : $title;
});

// A fresh WordPress with plain permalinks can classify an unknown path as home.
// Keep that path a 404 without changing the installation's permalink settings.
add_action('template_redirect', static function () {
    if (!is_front_page()) {
        return;
    }
    $request_path = wp_parse_url(wp_unslash($_SERVER['REQUEST_URI'] ?? '/'), PHP_URL_PATH);
    $home_path = wp_parse_url(home_url('/'), PHP_URL_PATH);
    if (untrailingslashit((string) $request_path) === untrailingslashit((string) $home_path)) {
        return;
    }
    global $wp_query;
    $wp_query->set_404();
    status_header(404);
    nocache_headers();
    remove_action('template_redirect', 'redirect_canonical');
}, 0);
