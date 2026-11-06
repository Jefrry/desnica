<?php defined('ABSPATH') || exit; ?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php if (is_front_page()) : ?><meta name="description" content="Ресурсный центр помогает людям с инвалидностью, поддерживает организации и создаёт доступную среду."><?php endif; ?>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main-content">Перейти к содержимому</a>
<header class="site-header">
    <div class="shell header-row">
        <?php resource_center_brand(); ?>
        <?php resource_center_navigation(); ?>
        <button class="mobile-open control" type="button" aria-haspopup="dialog" aria-controls="mobile-navigation-dialog" aria-expanded="false">Меню <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    </div>
</header>
<dialog id="mobile-navigation-dialog" aria-labelledby="mobile-navigation-title" aria-modal="true">
    <div class="shell header-row">
        <?php resource_center_brand(); ?>
        <button class="mobile-close control" type="button" autofocus>Закрыть <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    </div>
    <div class="mobile-scroll"><div class="shell">
        <h2 id="mobile-navigation-title">Навигация</h2>
        <?php resource_center_navigation(true); ?>
    </div></div>
</dialog>
<main id="main-content" tabindex="-1">
