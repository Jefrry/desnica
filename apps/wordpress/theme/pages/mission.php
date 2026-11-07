<?php defined('ABSPATH') || exit; get_header(); ?>
<div class="shell information-page">
    <?php resource_center_breadcrumbs('Наша миссия', array(array('О нас', '/about'))); ?>
    <section class="page-intro" aria-labelledby="page-title">
        <div>
            <h1 id="page-title">Наша миссия</h1>
            <p class="text-intro">Помогать людям и организациям создавать среду, в которой доступность становится естественной частью повседневной жизни.</p>
            <div class="intro-body"><p>Мы соединяем опыт людей, профессиональные знания и готовность команд меняться, чтобы полезные решения становились устойчивой практикой.</p></div>
        </div>
        <?php resource_center_missing_photo('mission-together', 'Люди вместе обсуждают доступность пространства', 'Фотография будет добавлена', 'intro-photo'); ?>
    </section>
    <section class="content-section" aria-labelledby="mission-principles-heading">
        <h2 id="mission-principles-heading">Наши принципы</h2>
        <ol class="principles">
            <?php foreach (array(
                array('Уважение к человеку', 'Слушаем опыт людей, признаём разные потребности и ищем решения без готовых предположений.'),
                array('Доступность на практике', 'Переводим общие принципы в понятные действия, которые можно применять в ежедневной работе.'),
                array('Сотрудничество', 'Объединяем знания участников и поддерживаем изменения, за которые команда готова отвечать вместе.'),
            ) as $index => [$title, $body]) : ?>
                <li><span class="principle-number" aria-hidden="true"><?php echo esc_html((string) ($index + 1)); ?></span><h3><?php echo esc_html($title); ?></h3><p><?php echo esc_html($body); ?></p></li>
            <?php endforeach; ?>
        </ol>
    </section>
    <blockquote class="mission-quote content-section"><span aria-hidden="true">“</span><p>«Доступность начинается с внимания к человеку и становится реальностью, когда мы действуем вместе.»</p></blockquote>
</div>
<?php resource_center_contact_band('Начнём с вашей задачи', 'Свяжитесь с нами, чтобы обсудить ситуацию и определить следующий шаг.', 'Обсудить сотрудничество'); ?>
<?php get_footer(); ?>
