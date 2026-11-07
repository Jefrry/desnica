<?php defined('ABSPATH') || exit; get_header(); ?>
<div class="shell information-page">
    <?php
    $title = resource_center_services()['accessibility-passport']['title'];
    resource_center_breadcrumbs($title, array(array('Услуги', '/services')));
    resource_center_service_intro(
        $title,
        'Помогаем разобраться, насколько объект удобен для посетителей.',
        'Обсудить обследование',
        'entrance-assessment',
        'Специалисты обследуют вход в здание'
    );
    ?>
    <section class="content-section" aria-labelledby="passport-purpose-heading">
        <h2 id="passport-purpose-heading">Для чего нужен паспорт</h2>
        <div class="service-grid service-purpose-copy passport-purpose-copy">
            <p>Обследование помогает увидеть барьеры, определить приоритеты и обсудить дальнейшие действия. Мы рассматриваем не только здание, но и то, как посетитель получает услугу.</p>
            <p>Материалы обследования позволяют команде системно работать с вопросами доступности. Состав материалов и формат взаимодействия определяются с учётом объекта и задачи.</p>
        </div>
    </section>
    <div class="content-section service-grid passport-materials">
        <section aria-labelledby="passport-preparation-heading">
            <h2 id="passport-preparation-heading">Что подготовить</h2>
            <ul class="service-checklist" role="list">
                <?php foreach (array(
                    'Общая информация об объекте',
                    'Планы помещений при наличии',
                    'Сведения о действующих ограничениях',
                    'Контакт для рабочего взаимодействия',
                ) as $item) : ?>
                    <li><?php resource_center_service_icon('check'); ?><span><?php echo esc_html($item); ?></span></li>
                <?php endforeach; ?>
            </ul>
        </section>
        <section aria-labelledby="passport-result-heading">
            <h2 id="passport-result-heading">Что вы получите</h2>
            <p class="service-result-copy">Описание наблюдений, перечень выявленных барьеров и рекомендации в согласованном формате. Фото и схемы включаются при наличии и необходимости.</p>
            <?php resource_center_missing_photo(
                'passport-document',
                'Пример комплекта материалов обследования',
                'Иллюстрация материалов',
                caption: 'Иллюстрация комплекта материалов, не файл для скачивания.'
            ); ?>
        </section>
    </div>
    <section class="content-section" aria-labelledby="passport-faq-heading">
        <h2 id="passport-faq-heading">Частые вопросы</h2>
        <?php resource_center_service_faq('passport-faq', array(
            array('Сколько времени занимает обследование?', 'Срок зависит от размера и сложности объекта, исходных материалов и согласованного объёма работ.'),
            array('Что входит в отчёт?', 'Содержание обсуждается до начала работы и связано с задачей обследования.'),
            array('Нужно ли присутствие сотрудников?', 'Участие сотрудника, знакомого с объектом, помогает уточнить порядок работы и маршруты посетителей.'),
            array('Можно ли обследовать часть здания?', 'Объём можно обсудить, учитывая задачу и связь выбранной части с остальным маршрутом посетителя.'),
        ), 0); ?>
    </section>
</div>
<?php
resource_center_contact_band(
    'Остались вопросы или хотите обсудить обследование?',
    'Расскажем подробнее о формате работы и поможем подобрать подходящий вариант.',
    'Обсудить обследование'
);
get_footer();
