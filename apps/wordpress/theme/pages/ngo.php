<?php defined('ABSPATH') || exit; get_header(); ?>
<div class="shell information-page ngo-page">
    <?php resource_center_breadcrumbs('Работа НКО'); ?>
    <section class="page-intro" aria-labelledby="page-title">
        <div><h1 id="page-title">Работа НКО</h1><p class="text-intro">Объединяем усилия для устойчивых социальных изменений.</p></div>
        <?php resource_center_missing_photo('team-meeting', 'Коллеги обсуждают материалы за общим столом', 'Фотография будет добавлена', 'intro-photo'); ?>
    </section>
    <section class="content-section" aria-labelledby="ngo-support-heading">
        <div class="ngo-support-lead"><h2 id="ngo-support-heading">Поддержка организаций</h2>
            <p>Мы помогаем некоммерческим организациям, работающим с людьми с инвалидностью, развивать инициативы, выстраивать партнёрства и находить возможности для совместной работы.</p>
            <p>Ресурсный центр предоставляет консультационную и методическую поддержку, организует обмен опытом и обсуждение идей. Формат сотрудничества определяется вместе с участниками, исходя из их задач и ресурсов.</p>
        </div>
        <ul class="info-card-grid ngo-support-grid">
            <?php foreach (array(
                array('ngo-consultation', 'Консультант обсуждает вопрос с участником', 'Консультации', 'Обсуждение вопросов доступности и организации работы.'),
                array('ngo-exchange', 'Группа обменивается опытом за общим столом', 'Обмен опытом', 'Встречи и практические обсуждения для команд.'),
                array('ngo-initiatives', 'Команда планирует совместную инициативу', 'Совместные инициативы', 'Развитие идей и партнёрских проектов.'),
            ) as [$asset_id, $alt, $title, $description]) : ?>
                <li><article class="ngo-support-card">
                    <?php resource_center_missing_photo($asset_id, $alt); ?>
                    <div><h3><?php echo esc_html($title); ?></h3><p><?php echo esc_html($description); ?></p></div>
                </article></li>
            <?php endforeach; ?>
        </ul>
    </section>
    <section class="content-section" aria-labelledby="ngo-materials-heading">
        <h2 id="ngo-materials-heading">Полезные материалы</h2>
        <div class="ngo-materials">
            <?php // The Nuxt preview references files absent from the repository. Do not fabricate them or expose broken download links. ?>
            <?php foreach (array(
                array('Руководство по созданию инклюзивной среды', 'Практические рекомендации для некоммерческих организаций.'),
                array('Чек-лист доступности мероприятий', 'Вопросы для подготовки и проверки доступности мероприятия.'),
                array('Примеры практик НКО', 'Подходы к совместной работе и развитию социальных инициатив.'),
            ) as [$title, $description]) : ?>
                <article class="ngo-material">
                    <span class="document-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="32" height="32" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z M14 2v6h6 M8 13h8 M8 17h6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                    <div><h3><?php echo esc_html($title); ?></h3><p><?php echo esc_html($description); ?></p></div>
                    <span class="unavailable-file" aria-disabled="true">Файл пока недоступен</span>
                </article>
            <?php endforeach; ?>
        </div>
    </section>
</div>
<?php get_footer(); ?>
