<?php
defined('ABSPATH') || exit;

$query_parts = resource_center_publication_query_parts();
$raw_page = resource_center_query_value('page', '');
$page = resource_center_publication_page_number($raw_page);
if ($raw_page !== '' && $page === null) {
    wp_safe_redirect(home_url(resource_center_archive_path(1, $query_parts)), 302);
    exit;
}
$page ??= 1;
$page_size = 6;
$archive_posts = function_exists('resource_center_publications')
    ? resource_center_publications($page_size + 1, ($page - 1) * $page_size)
    : null;
$missing_page = $archive_posts === array() && $page > 1;
$page_title = $missing_page ? 'Страница архива не найдена' : ($page > 1 ? 'Новости — страница ' . $page : 'Новости');
add_filter('pre_get_document_title', static fn(): string => $page_title . ' — Ресурсный центр', 20);
if ($archive_posts === null) {
    status_header(500);
    nocache_headers();
} elseif (!$missing_page) {
    add_action('wp_head', static function () use ($page): void {
        echo '<link rel="canonical" href="' . esc_url(home_url(resource_center_archive_path($page))) . '">' . "\n";
    });
}

get_header();
?>
<div class="shell news-page">
    <?php resource_center_breadcrumbs('Новости'); ?>
    <h1>Новости</h1>
    <p class="text-intro">События Ресурсного центра, полезные материалы и истории изменений.</p>
    <section aria-labelledby="publication-list-heading">
        <h2 id="publication-list-heading" class="sr-only" tabindex="-1">Список публикаций, страница <?php echo esc_html((string) $page); ?></h2>
        <?php if ($archive_posts === null) : ?>
            <?php resource_center_publication_state('Не удалось загрузить новости. Попробуйте ещё раз.', home_url(resource_center_archive_path($page, $query_parts)), 'Попробовать снова'); ?>
        <?php elseif ($missing_page) : ?>
            <?php resource_center_publication_state('Такой страницы архива нет. Выберите существующую страницу публикаций.', home_url(resource_center_archive_path(1, $query_parts)), 'Первая страница'); ?>
        <?php elseif (!$archive_posts) : ?>
            <?php resource_center_publication_state('Публикаций пока нет.'); ?>
        <?php else : ?>
            <?php resource_center_publication_cards(array_slice($archive_posts, 0, $page_size), $page); ?>
            <?php $has_next = count($archive_posts) > $page_size; ?>
            <?php if ($page > 1 || $has_next) : ?>
                <nav class="publication-pagination" aria-label="Страницы публикаций">
                    <?php if ($page > 1) : ?>
                        <a class="action secondary" rel="prev" href="<?php echo esc_url(home_url(resource_center_archive_path($page - 1, $query_parts)) . '#publication-list-heading'); ?>"><span aria-hidden="true">←</span> Назад</a>
                    <?php else : ?>
                        <span class="action secondary" aria-disabled="true"><span aria-hidden="true">←</span> Назад</span>
                    <?php endif; ?>
                    <span aria-current="page">Страница <?php echo esc_html((string) $page); ?></span>
                    <?php if ($has_next) : ?>
                        <a class="action secondary" rel="next" href="<?php echo esc_url(home_url(resource_center_archive_path($page + 1, $query_parts)) . '#publication-list-heading'); ?>">Далее <span aria-hidden="true">→</span></a>
                    <?php else : ?>
                        <span class="action secondary" aria-disabled="true">Далее <span aria-hidden="true">→</span></span>
                    <?php endif; ?>
                </nav>
            <?php endif; ?>
        <?php endif; ?>
    </section>
</div>
<?php get_footer(); ?>
