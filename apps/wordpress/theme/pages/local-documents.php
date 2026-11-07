<?php defined('ABSPATH') || exit; get_header(); ?>
<div class="shell information-page">
    <?php resource_center_breadcrumbs('Локальные документы', array(array('Услуги', '/services'))); ?>
    <?php resource_center_service_intro(
        'Разработка локальных документов',
        'Помогаем организовать инклюзивное оказание услуг с учётом потребностей людей с инвалидностью. Подготовим понятные документы для работы команды.',
        'Обсудить задачу',
        'planning-session',
        'Специалисты обсуждают структуру документов'
    ); ?>
    <section class="content-section" aria-labelledby="local-documents-audience-heading">
        <h2 id="local-documents-audience-heading">Кому подойдёт</h2>
        <div class="service-note service-audience">
            <?php resource_center_service_icon('people'); ?>
            <p>Государственным и муниципальным учреждениям, НКО, образовательным, культурным и социальным организациям, которые хотят сделать услуги доступнее и выстроить понятные внутренние процессы.</p>
        </div>
    </section>
    <section class="content-section" aria-labelledby="local-documents-included-heading">
        <h2 id="local-documents-included-heading">Что входит в работу</h2>
        <?php resource_center_service_features(array(
            array('search', 'Анализ задачи', 'Изучаем текущие документы и потребности целевых групп.'),
            array('document', 'Подготовка документов', 'Формируем предложения под конкретную организацию.'),
            array('people', 'Обсуждение с командой', 'Собираем вопросы и уточнения сотрудников.'),
            array('check', 'Рекомендации по применению', 'Объясняем, как использовать материалы в повседневной работе.'),
        )); ?>
    </section>
    <section class="content-section" aria-labelledby="local-documents-result-heading">
        <h2 id="local-documents-result-heading">Что вы получите</h2>
        <div class="service-grid">
            <div class="service-note service-result">
                <?php resource_center_service_icon('document'); ?>
                <p>Комплект материалов, адаптированный под согласованную задачу, и рекомендации по внедрению.</p>
            </div>
            <div class="service-note service-result">
                <?php resource_center_service_icon('check'); ?>
                <p>Состав комплекта определяется после знакомства с процессами организации; универсальный документ не подменяет анализ конкретной ситуации.</p>
            </div>
        </div>
    </section>
    <section class="content-section" aria-labelledby="local-documents-faq-heading">
        <h2 id="local-documents-faq-heading">Частые вопросы</h2>
        <?php resource_center_service_faq('local-documents-faq', array(
            array('Учитываете ли вы специфику нашей организации?', 'Да, работа начинается с обсуждения задач, посетителей и действующих процессов. Состав материалов согласуется отдельно.'),
            array('Нужно ли привлекать сотрудников к разработке?', 'Участие команды помогает описать реальный порядок работы и проверить, насколько удобны предложенные решения.'),
        ), 0); ?>
    </section>
    <section class="content-section" aria-labelledby="local-documents-related-heading">
        <h2 id="local-documents-related-heading">Другие услуги</h2>
        <?php resource_center_related_services(array('odi', 'project-review')); ?>
    </section>
</div>
<?php
resource_center_contact_band('Остались вопросы?', 'Расскажите о своей ситуации — подскажем, как можем помочь.', 'Обсудить задачу');
get_footer();
?>
