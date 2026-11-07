<?php
defined('ABSPATH') || exit;

function resource_center_publication_route(): ?string
{
    $path = wp_parse_url(wp_unslash($_SERVER['REQUEST_URI'] ?? '/'), PHP_URL_PATH);
    $home_path = untrailingslashit((string) wp_parse_url(home_url('/'), PHP_URL_PATH));
    $prefix = $home_path . '/news/';
    return is_string($path) && str_starts_with($path, $prefix)
        ? strtolower(untrailingslashit(substr($path, strlen($prefix))))
        : null;
}

// Use the standard single-post query, including on a fresh install with plain permalinks.
add_filter('request', static function (array $query): array {
    $slug = resource_center_publication_route();
    if ($slug === null || $slug === '') {
        return $query;
    }
    if (!preg_match('/^(?:[a-z0-9_-]|%[a-f0-9]{2})+$/D', $slug)) {
        return array('error' => '404');
    }
    return array('name' => $slug, 'post_type' => 'post', 'post_status' => 'publish');
});

add_filter('posts_results', static function (array $posts, WP_Query $query): array {
    global $wpdb;
    $slug = resource_center_publication_route();
    if (!$posts && $query->is_main_query() && $slug !== null && $slug !== '' && $wpdb->last_error !== '') {
        $query->set('resource_center_publication_query_failed', true);
    }
    return $posts;
}, 10, 2);

add_filter('post_link', static function (string $url, WP_Post $post, bool $leave_name): string {
    if ($leave_name || $post->post_name === '' || !in_array($post->post_status, array('publish', 'draft', 'pending', 'future'), true)) {
        return $url;
    }
    return home_url('/news/' . $post->post_name);
}, 10, 3);

add_filter('preview_post_link', static function (string $url, WP_Post $post): string {
    if ($post->post_type !== 'post') {
        return $url;
    }
    parse_str((string) wp_parse_url($url, PHP_URL_QUERY), $args);
    return add_query_arg(array('p' => $post->ID, 'preview' => 'true') + $args, home_url('/'));
}, 10, 2);

add_action('template_redirect', static function (): void {
    $slug = resource_center_publication_route();
    if ($slug !== null && $slug !== '') {
        remove_action('template_redirect', 'redirect_canonical');
        remove_action('template_redirect', 'wp_old_slug_redirect');
        if (get_query_var('resource_center_publication_query_failed')) {
            nocache_headers();
            wp_die('Не удалось загрузить публикацию. Попробуйте позже.', 'Ошибка загрузки', array('response' => 500));
        }
    }

    if (!is_singular('post')) {
        return;
    }
    $post = get_queried_object();
    if (is_preview() && current_user_can('edit_post', $post->ID)) {
        nocache_headers();
        return;
    }
    if ($post->post_status !== 'publish' || ($slug !== null && $slug !== $post->post_name)) {
        global $wp_query;
        $wp_query->set_404();
        status_header(404);
        nocache_headers();
        remove_action('template_redirect', 'redirect_canonical');
        return;
    }
    if ($slug === null && $post->post_name !== '' && in_array($_SERVER['REQUEST_METHOD'] ?? 'GET', array('GET', 'HEAD'), true)) {
        wp_safe_redirect(get_permalink($post), 301);
        exit;
    }
}, 0);
