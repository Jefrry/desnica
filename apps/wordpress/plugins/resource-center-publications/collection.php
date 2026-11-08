<?php
defined('ABSPATH') || exit;

/** @return WP_Post[]|null Published posts, or null when the query fails. */
function resource_center_publications(int $limit, int $offset = 0): ?array
{
    global $wpdb;

    // Match the date shown in the article, including posts saved before the date field existed.
    $query = $wpdb->prepare(
        "SELECT p.* FROM {$wpdb->posts} AS p
         WHERE p.post_type = 'post' AND p.post_status = 'publish'
         ORDER BY COALESCE(NULLIF((
             SELECT m.meta_value FROM {$wpdb->postmeta} AS m
             WHERE m.post_id = p.ID AND m.meta_key = %s
             ORDER BY m.meta_id ASC LIMIT 1
         ), ''), LEFT(p.post_date, 10)) DESC, p.ID ASC
         LIMIT %d OFFSET %d",
        RESOURCE_CENTER_PUBLICATION_DATE,
        $limit,
        $offset
    );
    $suppress_errors = $wpdb->suppress_errors(true);
    try {
        $rows = $wpdb->get_results($query);
        return $wpdb->last_error === '' ? array_map(static fn(object $row): WP_Post => new WP_Post($row), $rows) : null;
    } finally {
        $wpdb->suppress_errors($suppress_errors);
    }
}
