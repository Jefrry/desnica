<?php defined('ABSPATH') || exit; get_header(); ?>
<div class="shell information-page">
    <?php resource_center_breadcrumbs('О нас'); ?>
    <section class="page-intro" aria-labelledby="page-title">
        <div>
            <h1 id="page-title">О нас</h1>
            <p class="text-intro">Мы помогаем людям и организациям находить практические решения для доступной и открытой среды.</p>
            <div class="intro-body"><p>Ресурсный центр объединяет знания об инклюзии и доступности с опытом тех, кто ежедневно сталкивается с барьерами. Мы внимательно изучаем задачу и предлагаем понятный путь к изменениям.</p><p>Работа строится на диалоге: вместе определяем приоритеты, подбираем подходящий формат поддержки и помогаем применять решения на практике.</p></div>
        </div>
        <?php resource_center_missing_photo('team-meeting', 'Команда Ресурсного центра обсуждает совместную работу', 'Фотография будет добавлена', 'intro-photo'); ?>
    </section>
    <section class="content-section" aria-labelledby="about-directions-heading">
        <h2 id="about-directions-heading">Чем мы занимаемся</h2>
        <ul class="info-card-grid">
            <?php resource_center_about_link('/services', 'Помогаем создавать доступную среду', 'Консультируем по документам, проектам и оценке доступности.'); ?>
            <?php resource_center_about_link('/training', 'Делимся знаниями', 'Проводим обучение для команд и помогаем применять принципы инклюзии.'); ?>
            <?php resource_center_about_link('/ngo', 'Поддерживаем НКО', 'Помогаем организациям развивать практики и обмениваться опытом.'); ?>
        </ul>
    </section>
    <section class="content-section" aria-labelledby="about-team-heading">
        <h2 id="about-team-heading">Наша команда</h2>
        <p class="about-team-lead">Над задачами работают специалисты с разными компетенциями. Вместе они помогают увидеть ситуацию с разных сторон и перейти от обсуждения к практическим решениям.</p>
        <?php resource_center_team(); ?>
    </section>
    <section class="content-section" aria-labelledby="about-related-heading">
        <h2 id="about-related-heading">Узнайте больше</h2>
        <ul class="info-card-grid">
            <?php resource_center_about_link('/about/mission', 'Наша миссия', 'Принципы, которые определяют нашу работу.'); ?>
            <?php resource_center_about_link('/about/documents', 'Уставные документы', 'Документы Ресурсного центра и их текстовые версии.'); ?>
            <?php resource_center_about_link('/about/reports', 'Годовая отчётность', 'Материалы о работе центра по годам.'); ?>
        </ul>
    </section>
</div>
<?php resource_center_contact_band('Давайте работать вместе', 'Расскажите о своей задаче — обсудим, какой формат поддержки подойдёт лучше всего.', 'Связаться с нами'); ?>
<?php get_footer(); ?>
