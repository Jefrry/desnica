<?php defined('ABSPATH') || exit; get_header(); ?>
<div class="shell information-page">
    <?php
    $title = resource_center_services()['odi']['title'];
    resource_center_breadcrumbs($title, array(array('Услуги', '/services')));
    resource_center_service_intro(
        $title,
        'Решения по обеспечению доступа людей с инвалидностью.',
        'Обсудить проект',
        'accessible-entrance',
        'Вход в здание с пандусом и поручнями'
    );
    ?>
    <section class="content-section service-purpose" aria-labelledby="odi-purpose-heading">
        <h2 id="odi-purpose-heading">Задачи раздела</h2>
        <div class="service-grid service-purpose-copy">
            <p>Проектирование начинается с понимания того, как люди будут пользоваться объектом. Важно рассмотреть путь посетителя, вход, перемещение внутри и получение услуг.</p>
            <p>Согласованные решения описываются в материалах проекта. Состав работ зависит от объекта и исходных данных; конкретные требования и ограничения уточняются до начала подготовки.</p>
        </div>
    </section>
    <section class="content-section" aria-labelledby="odi-included-heading">
        <h2 id="odi-included-heading">Что входит</h2>
        <?php resource_center_service_features(array(
            array('document', 'Анализ исходных данных', 'Изучаем планы и особенности объекта.'),
            array('building', 'Планировочные решения', 'Предлагаем варианты организации пространства.'),
            array('settings', 'Описание мероприятий', 'Готовим текстовое описание выбранных решений.'),
            array('layers', 'Комплект материалов', 'Собираем согласованный состав пояснений и графики.'),
        )); ?>
    </section>
    <section class="content-section" aria-labelledby="odi-materials-heading">
        <h2 id="odi-materials-heading">Что нужно для начала</h2>
        <div class="service-grid service-media-grid">
            <?php resource_center_missing_photo('tactile-plan', 'План помещения и образец тактильного указателя'); ?>
            <ul class="service-checklist" role="list">
                <?php foreach (array(
                    'Планы объекта в имеющемся формате',
                    'Описание задачи и особенностей объекта',
                    'Исходные материалы при наличии',
                ) as $item) : ?>
                    <li><?php resource_center_service_icon('check'); ?><span><?php echo esc_html($item); ?></span></li>
                <?php endforeach; ?>
            </ul>
        </div>
    </section>
    <section class="content-section" aria-labelledby="odi-related-heading">
        <h2 id="odi-related-heading">Связанные услуги</h2>
        <?php resource_center_related_services(array('project-review', 'accessibility-passport', 'local-documents')); ?>
    </section>
</div>
<?php
resource_center_contact_band('Обсудим ваш проект', 'Расскажите о задаче — ответим на вопросы и уточним подходящий формат работы.', 'Обсудить проект');
get_footer();
