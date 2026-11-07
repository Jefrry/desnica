<?php defined('ABSPATH') || exit; get_header(); ?>
<div class="shell information-page">
    <?php
    $title = resource_center_services()['project-review']['title'];
    resource_center_breadcrumbs($title, array(array('Услуги', '/services')));
    resource_center_service_intro(
        $title,
        'Экспертный диалог и проверка проектных решений с точки зрения доступности.',
        'Обсудить проект',
        'approval-meeting',
        'Команда обсуждает проектные решения'
    );
    ?>
    <section class="content-section" aria-labelledby="project-review-use-heading">
        <h2 id="project-review-use-heading">Когда полезна консультация</h2>
        <?php resource_center_service_features(array(
            array('document', 'На этапе подготовки проекта', 'Помогаем заранее обсудить доступность решений.'),
            array('people', 'Перед согласованием', 'Рассматриваем материалы и готовим вопросы для уточнения.'),
        )); ?>
    </section>
    <section class="content-section" aria-labelledby="project-review-result-heading">
        <h2 id="project-review-result-heading">Результат</h2>
        <div class="service-grid service-media-grid">
            <?php resource_center_missing_photo('local-papers', 'Комплект материалов с рекомендациями'); ?>
            <div class="service-result-copy">
                <p>Вы получаете рекомендации по рассмотренным решениям и перечень вопросов, которые требуют дополнительного обсуждения.</p>
                <p>Формат и объём зависят от конкретного объекта и согласованной задачи.</p>
            </div>
        </div>
    </section>
    <div class="service-notice">
        <span class="service-notice-marker" aria-hidden="true">i</span>
        <p><strong>Информация.</strong> Формат работы и состав материалов определяются после знакомства с задачей.</p>
    </div>
    <section class="content-section" aria-labelledby="project-review-faq-heading">
        <h2 id="project-review-faq-heading">Частые вопросы</h2>
        <?php resource_center_service_faq('project-review-faq', array(
            array('Какие материалы необходимо предоставить?', 'Для начала нужны описание задачи и имеющиеся планы. После знакомства с объектом уточним перечень дополнительных материалов.'),
            array('В каком формате выдаются рекомендации?', 'Формат согласуется заранее: важно, чтобы команда могла использовать рекомендации в дальнейшей работе.'),
        )); ?>
    </section>
    <section class="content-section" aria-labelledby="project-review-related-heading">
        <h2 id="project-review-related-heading">Связанные услуги</h2>
        <?php resource_center_related_services(array('odi', 'local-documents', 'accessibility-passport')); ?>
    </section>
</div>
<?php
resource_center_contact_band('Обсудим ваш проект', 'Расскажите о задаче — ответим на вопросы и уточним подходящий формат работы.', 'Обсудить проект');
get_footer();
