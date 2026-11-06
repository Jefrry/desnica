<?php defined('ABSPATH') || exit; ?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main">Перейти к содержимому</a>
<header class="site-header">
    <div class="shell">
        <a class="brand" href="<?php echo esc_url(home_url('/')); ?>">Ресурсный центр</a>
    </div>
</header>
<main id="main" class="intro" tabindex="-1">
    <div class="shell">
        <h1>Ресурсный центр</h1>
        <p>Поддержка организаций и развитие доступной среды.</p>
    </div>
</main>
<footer class="site-footer">
    <div class="shell"><p>Ресурсный центр</p></div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
