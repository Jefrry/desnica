<?php
defined('ABSPATH') || exit;

// Built-in public pages: no WordPress records, rewrite flushes or settings changes.
function resource_center_information_page(): ?array
{
    $path = wp_parse_url(wp_unslash($_SERVER['REQUEST_URI'] ?? '/'), PHP_URL_PATH);
    $home_path = untrailingslashit((string) wp_parse_url(home_url('/'), PHP_URL_PATH));
    $pages = array(
        '/about' => array('template' => 'about', 'title' => 'О нас', 'description' => 'О Ресурсном центре, направлениях работы, команде и подходе к сотрудничеству.'),
        '/about/mission' => array('template' => 'mission', 'title' => 'Наша миссия', 'description' => 'Миссия и принципы Ресурсного центра.'),
        '/about/documents' => array('template' => 'documents', 'title' => 'Уставные документы', 'description' => 'Документы Ресурсного центра и доступные текстовые версии.'),
        '/about/reports' => array('template' => 'reports', 'title' => 'Годовая отчётность', 'description' => 'Годовые отчёты Ресурсного центра и доступные текстовые версии.'),
        '/services' => array('template' => 'services', 'title' => 'Услуги', 'description' => 'Услуги Ресурсного центра по созданию доступной среды.'),
        '/services/local-documents' => array('template' => 'local-documents', 'stylesheet' => 'services', 'title' => 'Разработка локальных документов', 'description' => 'Подготовка локальных документов для инклюзивного оказания услуг.'),
        '/ngo' => array('template' => 'ngo', 'title' => 'Работа НКО', 'description' => 'Поддержка некоммерческих организаций, обмен опытом и совместные инициативы.'),
        '/contacts' => array('template' => 'contacts', 'title' => 'Контакты', 'description' => 'Контакты Ресурсного центра.'),
        '/legal' => array('template' => 'legal', 'title' => 'Правовая информация', 'description' => 'Правовая информация Ресурсного центра.'),
    );
    foreach ($pages as $route => $page) {
        if (untrailingslashit((string) $path) === $home_path . $route) {
            return $page + array('path' => $route);
        }
    }
    return null;
}

add_action('template_redirect', static function () {
    if (!resource_center_information_page()) {
        return;
    }
    global $wp_query, $post;
    $wp_query->init();
    $post = null;
    $wp_query->is_page = true;
    $wp_query->is_singular = true;
    $wp_query->posts = array();
    $wp_query->post = null;
    $wp_query->post_count = 0;
    $wp_query->queried_object = null;
    $wp_query->queried_object_id = 0;
    status_header(200);
    remove_action('template_redirect', 'redirect_canonical');
    remove_action('wp_head', 'rel_canonical');
}, -1);

add_filter('template_include', static function (string $template): string {
    $page = resource_center_information_page();
    return $page ? get_theme_file_path('/pages/' . $page['template'] . '.php') : $template;
});

add_action('wp_head', static function () {
    $page = resource_center_information_page();
    if ($page) {
        echo '<meta name="description" content="' . esc_attr($page['description']) . '">' . "\n";
        echo '<link rel="canonical" href="' . esc_url(home_url($page['path'])) . '">' . "\n";
    }
});

function resource_center_breadcrumbs(string $title, array $parents = array()): void
{
    ?>
    <nav class="breadcrumbs" aria-label="Хлебные крошки"><ol>
        <li><a href="<?php echo esc_url(home_url('/')); ?>">Главная</a><span aria-hidden="true">›</span></li>
        <?php foreach ($parents as [$label, $path]) : ?>
            <li><a href="<?php echo esc_url(home_url($path)); ?>"><?php echo esc_html($label); ?></a><span aria-hidden="true">›</span></li>
        <?php endforeach; ?>
        <li><span aria-current="page"><?php echo esc_html($title); ?></span></li>
    </ol></nav>
    <?php
}

function resource_center_about_link(string $path, string $title, string $description): void
{
    ?>
    <li><a class="info-link-card" href="<?php echo esc_url(home_url($path)); ?>" aria-label="<?php echo esc_attr($title); ?>"><span><strong><?php echo esc_html($title); ?></strong><span><?php echo esc_html($description); ?></span></span><span aria-hidden="true">→</span></a></li>
    <?php
}

function resource_center_contact_band(string $title, string $text, string $label): void
{
    ?>
    <section id="contact-band" class="accent information-contact" aria-labelledby="contact-band-title"><div class="shell information-contact-grid">
        <div><h2 id="contact-band-title"><?php echo esc_html($title); ?></h2><p><?php echo esc_html($text); ?></p></div>
        <a class="action" href="<?php echo esc_url(home_url('/contacts')); ?>"><?php echo esc_html($label); ?></a>
    </div></section>
    <?php
}
