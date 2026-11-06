<?php defined('ABSPATH') || exit; get_header(); ?>
<section class="shell error-page" aria-labelledby="error-title">
    <h1 id="error-title">Страница не найдена</h1>
    <p>Возможно, адрес указан неверно или страница была перемещена.</p>
    <a class="action" href="<?php echo esc_url(home_url('/')); ?>">Вернуться на главную</a>
</section>
<?php get_footer(); ?>
