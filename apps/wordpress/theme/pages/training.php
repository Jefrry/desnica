<?php
defined('ABSPATH') || exit;

$programs = array(
    array('Основы доступной среды', 'Для специалистов', 'Базовые знания о потребностях посетителей и принципах доступности в повседневной работе.', 'training-workshop', 'Ведущий проводит занятие для группы'),
    array('Общение без барьеров', 'Для специалистов и сотрудников фронт-офиса', 'Практические навыки уважительного и понятного взаимодействия в разных ситуациях.', 'service-conversation', 'Специалисты обсуждают рабочую ситуацию'),
    array('Инклюзивный сервис', 'Для сотрудников сферы услуг', 'Как учитывать потребности разных посетителей и делать сервис удобнее.', 'inclusive-service', 'Сотрудник встречает посетителя'),
);
$formats = array(
    array('Очно', 'Обсуждаем задачи и практические ситуации вместе с командой на площадке.', 'training-workshop', 'Команда участвует в очном занятии', 'people'),
    array('Онлайн', 'Встречаемся дистанционно и работаем с примерами в доступном формате.', 'online-training', 'Участник подключается к онлайн-занятию', 'education'),
);

get_header();
?>
<div class="shell information-page">
    <?php resource_center_breadcrumbs('Обучение'); ?>
    <section class="page-intro" aria-labelledby="page-title">
        <div>
            <h1 id="page-title">Обучение</h1>
            <p class="text-intro">Знания, которые помогают создавать равные возможности.</p>
        </div>
        <?php resource_center_missing_photo('training-workshop', 'Ведущий проводит занятие для группы', 'Фотография будет добавлена', 'intro-photo'); ?>
    </section>
    <section class="content-section" aria-labelledby="training-programs-heading">
        <h2 id="training-programs-heading">Программы обучения</h2>
        <div class="training-grid training-programs">
            <?php foreach ($programs as [$title, $audience, $description, $asset_id, $alt]) : ?>
                <article class="training-card">
                    <div class="training-program-media">
                        <?php resource_center_missing_photo($asset_id, $alt); ?>
                        <p class="training-audience"><?php echo esc_html($audience); ?></p>
                    </div>
                    <div class="training-program-copy">
                        <h3><?php echo esc_html($title); ?></h3>
                        <p><?php echo esc_html($description); ?></p>
                        <a class="action secondary" href="<?php echo esc_url(home_url('/contacts')); ?>">
                            Узнать о программе<span class="sr-only">: <?php echo esc_html($title); ?></span>
                        </a>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </section>
    <section class="content-section" aria-labelledby="training-formats-heading">
        <h2 id="training-formats-heading">Форматы обучения</h2>
        <div class="training-grid">
            <?php foreach ($formats as [$title, $description, $asset_id, $alt, $icon]) : ?>
                <article class="training-card training-format">
                    <?php resource_center_missing_photo($asset_id, $alt); ?>
                    <div class="training-format-copy">
                        <?php resource_center_service_icon($icon); ?>
                        <h3><?php echo esc_html($title); ?></h3>
                        <p><?php echo esc_html($description); ?></p>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </section>
</div>
<?php
resource_center_contact_band(
    'Подберём программу для вашей команды',
    'Обсудим ваши задачи, подскажем подходящий формат и ответим на вопросы.',
    'Обсудить обучение'
);
get_footer();
