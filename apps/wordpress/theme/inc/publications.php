<?php
defined('ABSPATH') || exit;

function resource_center_publication_query_parts(): array
{
    $query = wp_parse_url(wp_unslash($_SERVER['REQUEST_URI'] ?? '/'), PHP_URL_QUERY);
    return array_filter(explode('&', (string) $query), 'strlen');
}

function resource_center_publication_page_number(string $value): ?int
{
    if (!preg_match('/^[1-9][0-9]{0,15}$/D', $value) || (float) $value > 9007199254740991) {
        return null;
    }
    return (int) $value;
}

function resource_center_archive_path(int $page, array $parts = array()): string
{
    $parts = array_filter($parts, static fn(string $part): bool => urldecode(explode('=', $part, 2)[0]) !== 'page');
    if ($page > 1) {
        $parts[] = 'page=' . $page;
    }
    return '/news' . ($parts ? '?' . implode('&', $parts) : '');
}

function resource_center_publication_return_path(int $post_id): string
{
    $page = resource_center_publication_page_number(resource_center_query_value('fromPage', '')) ?? 1;
    $from = resource_center_query_value('from', '');
    return resource_center_archive_path($page) . ($from === (string) $post_id ? '#publication-' . $post_id : '');
}

function resource_center_publication_time(string $date): void
{
    $local_date = DateTimeImmutable::createFromFormat('!Y-m-d', $date, wp_timezone());
    ?>
    <time datetime="<?php echo esc_attr($date); ?>"><?php echo esc_html($local_date ? $local_date->format('d.m.Y') : $date); ?></time>
    <?php
}

function resource_center_publication_cards(array $posts, ?int $archive_page = null): void
{
    ?>
    <ul class="publication-cards">
        <?php foreach ($posts as $publication) :
            $title = get_the_title($publication);
            $url = get_permalink($publication);
            if ($archive_page !== null) {
                $url = add_query_arg(array('fromPage' => $archive_page, 'from' => $publication->ID), $url);
            }
            $protected = post_password_required($publication);
            $cover = $protected ? 0 : (int) get_post_thumbnail_id($publication);
            $image = $cover && resource_center_publication_cover_has_alt($cover) ? wp_get_attachment_image($cover, 'large') : '';
            ?>
            <li id="publication-<?php echo esc_attr((string) $publication->ID); ?>" tabindex="-1">
                <article class="publication-card">
                    <?php if ($image) : ?>
                        <figure class="publication-card-image"><?php echo $image; ?></figure>
                    <?php else : ?>
                        <?php resource_center_missing_photo('publication-' . $publication->ID, 'Иллюстрация к публикации «' . $title . '»', 'Фотография будет добавлена', 'publication-card-image'); ?>
                    <?php endif; ?>
                    <div class="publication-card-body">
                        <?php resource_center_publication_time(resource_center_publication_date($publication)); ?>
                        <h3><?php echo esc_html($title); ?></h3>
                        <?php if (!$protected && $publication->post_excerpt !== '') : ?>
                            <p><?php echo esc_html($publication->post_excerpt); ?></p>
                        <?php endif; ?>
                        <a href="<?php echo esc_url($url); ?>" aria-label="<?php echo esc_attr('Читать далее: ' . $title); ?>">Читать далее <span aria-hidden="true">→</span></a>
                    </div>
                </article>
            </li>
        <?php endforeach; ?>
    </ul>
    <?php
}

function resource_center_publication_state(string $message, ?string $action_url = null, string $action_label = ''): void
{
    ?>
    <div class="publication-state">
        <p><?php echo esc_html($message); ?></p>
        <?php if ($action_url !== null) : ?>
            <a class="action secondary" href="<?php echo esc_url($action_url); ?>"><?php echo esc_html($action_label); ?></a>
        <?php endif; ?>
    </div>
    <?php
}
