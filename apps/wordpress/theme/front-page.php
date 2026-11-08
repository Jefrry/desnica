<?php
defined('ABSPATH') || exit;
$latest_publications = function_exists('resource_center_publications') ? resource_center_publications(3) : null;
if ($latest_publications === null) {
    status_header(500);
    nocache_headers();
}
get_header();
?>
<div class="shell hero-space">
    <section class="hero" aria-labelledby="home-title">
        <div>
            <h1 class="heading-display" id="home-title">Возможности начинаются с доступности</h1>
            <p class="text-intro">Помогаем людям с инвалидностью, поддерживаем организации и создаём среду, удобную для каждого.</p>
            <div class="actions"><a class="action" href="<?php echo esc_url(home_url('/services')); ?>">Наши услуги</a><a class="action secondary" href="<?php echo esc_url(home_url('/about')); ?>">О Ресурсном центре</a></div>
        </div>
        <figure class="hero-logo" aria-label="Ресурсный центр">
            <img src="<?php echo esc_url(get_theme_file_uri('/assets/images/resource-center-logo-color.jpg')); ?>" alt="Ресурсный центр по вопросам инвалидности, как способ занятости молодых людей с инвалидностью" width="1885" height="791" fetchpriority="high" decoding="async">
            <figcaption class="sr-only">Ресурсный центр</figcaption>
        </figure>
    </section>
</div>
<section id="about-centre" class="accent" aria-labelledby="about-centre-title">
    <div class="shell section-space">
        <h2 id="about-centre-title">Ресурсный центр — рядом с вами</h2>
        <div class="about-grid">
            <p>Мы развиваем возможности людей с инвалидностью, поддерживаем некоммерческие организации и помогаем создавать инклюзивную среду в обществе. Верим, что доступность открывает путь к полноценной жизни, образованию, работе и самореализации.</p>
            <?php resource_center_missing_photo('team-meeting', 'Команда Ресурсного центра обсуждает совместную работу', 'Фотография команды будет добавлена', 'meeting-photo'); ?>
            <nav class="about-links" aria-label="Подробнее о Ресурсном центре">
                <a href="<?php echo esc_url(home_url('/about/mission')); ?>">Наша миссия <span aria-hidden="true">→</span></a>
                <a href="<?php echo esc_url(home_url('/about/documents')); ?>">Документы <span aria-hidden="true">→</span></a>
                <a href="<?php echo esc_url(home_url('/about/reports')); ?>">Отчётность <span aria-hidden="true">→</span></a>
            </nav>
        </div>
    </div>
</section>
<section id="team" aria-labelledby="team-title"><div class="shell section-space">
    <h2 id="team-title">Люди, которые помогают</h2>
    <?php resource_center_team(); ?>
</div></section>
<section id="latest-publications" aria-labelledby="latest-publications-title"><div class="shell section-space">
    <h2 id="latest-publications-title">Последние новости</h2>
    <div class="news-link"><a href="<?php echo esc_url(home_url('/news')); ?>">Все новости <span aria-hidden="true">→</span></a></div>
    <?php if ($latest_publications === null) : ?>
        <?php resource_center_publication_state('Не удалось загрузить новости. Попробуйте ещё раз.', home_url('/'), 'Попробовать снова'); ?>
    <?php elseif (!$latest_publications) : ?>
        <?php resource_center_publication_state('Публикаций пока нет.'); ?>
    <?php else : ?>
        <?php resource_center_publication_cards($latest_publications); ?>
    <?php endif; ?>
</div></section>
<section id="home-contact" class="accent" aria-labelledby="home-contact-title"><div class="shell contact-grid">
    <div><h2 id="home-contact-title">Давайте обсудим вашу задачу</h2><p>Ответим на вопросы, подскажем решения и поможем найти подходящий формат поддержки.</p></div>
    <a class="action" href="<?php echo esc_url(home_url('/contacts')); ?>">Связаться с нами</a>
    <address>
        <p><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6.7 2.5H4.2c-.9 0-1.7.8-1.6 1.7.5 7 6.2 12.7 13.2 13.2.9.1 1.7-.7 1.7-1.6v-2.5l-3.4-1.1-1.1 2a12.5 12.5 0 0 1-7.2-7.2l2-1.1-1.1-3.4Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span><strong>Телефон — </strong>уточняется</span></p>
        <p><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2.5" y="4" width="15" height="12" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="m3.5 5 6.5 5 6.5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span><strong>Эл. почта — </strong>уточняется</span></p>
    </address>
</div></section>
<?php get_footer(); ?>
