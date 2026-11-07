<?php
defined('ABSPATH') || exit;
if (!function_exists('resource_center_render_publication_markdown') || !have_posts()) {
    require __DIR__ . '/index.php';
    return;
}
the_post();
$publication = get_post();
$title = get_the_title($publication);
$date = resource_center_publication_date($publication);
$cover = (int) get_post_thumbnail_id($publication);
$is_protected = post_password_required($publication);
$body = $is_protected
    ? array('html' => get_the_password_form($publication), 'toc' => array())
    : resource_center_render_publication_markdown($publication->post_content);
if ($body === null) {
    status_header(503);
    nocache_headers();
}
$code_script = '/assets/dist/publication-code.js';
if (!$is_protected && str_contains($body['html'] ?? '', 'class="language-') && is_file(get_theme_file_path($code_script))) {
    wp_enqueue_script(
        'resource-center-publication-code',
        get_theme_file_uri($code_script),
        array(),
        (string) filemtime(get_theme_file_path($code_script)),
        true
    );
}
get_header();
?>
<div class="shell publication-page">
    <?php resource_center_breadcrumbs($title); ?>
    <article class="publication">
        <header>
            <h1><?php echo esc_html($title); ?></h1>
            <p class="publication-date"><time datetime="<?php echo esc_attr($date); ?>"><?php
                $local_date = DateTimeImmutable::createFromFormat('!Y-m-d', $date, wp_timezone());
                echo esc_html($local_date ? $local_date->format('d.m.Y') : $date);
            ?></time></p>
            <?php if (!$is_protected && $publication->post_excerpt !== '') : ?>
                <p class="publication-lead"><?php echo esc_html($publication->post_excerpt); ?></p>
            <?php endif; ?>
            <?php if (!$is_protected && $cover && resource_center_publication_cover_has_alt($cover)) : ?>
                <figure class="publication-cover"><?php echo wp_get_attachment_image($cover, 'large'); ?></figure>
            <?php endif; ?>
        </header>
        <div class="publication-content">
            <?php if (!empty($body['toc'])) : ?>
                <nav class="publication-toc" aria-label="В этой статье">
                    <p><strong>В этой статье</strong></p>
                    <ul>
                        <?php foreach ($body['toc'] as $entry) : ?>
                            <li><a href="#<?php echo esc_attr(rawurlencode($entry['id'])); ?>"><?php
                                echo esc_html($entry['label']);
                            ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </nav>
            <?php endif; ?>
            <div class="publication-body">
                <?php echo $body['html'] ?? '<p>Содержимое публикации временно недоступно.</p>'; ?>
            </div>
        </div>
    </article>
</div>
<?php get_footer(); ?>
