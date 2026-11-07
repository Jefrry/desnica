<?php defined('ABSPATH') || exit; get_header(); ?>
<div class="shell information-page">
    <?php resource_center_breadcrumbs('Услуги'); ?>
    <section class="page-intro" aria-labelledby="page-title">
        <div>
            <h1 id="page-title">Помогаем создавать доступную среду</h1>
            <p class="text-intro">Консультируем, разрабатываем документы, сопровождаем проекты. Помогаем организациям делать услуги, пространство и информацию доступными для всех.</p>
            <div class="actions">
                <a class="action" href="<?php echo esc_url(home_url('/contacts')); ?>">Получить консультацию</a>
                <a class="action secondary" href="#services-list">Узнать больше об услугах</a>
            </div>
        </div>
        <?php resource_center_missing_photo('planning-session', 'Специалисты рассматривают планы и документы', 'Фотография будет добавлена', 'intro-photo'); ?>
    </section>
    <section id="services-list" class="content-section" aria-labelledby="services-list-heading">
        <h2 id="services-list-heading">Наши услуги</h2>
        <ul class="service-grid service-catalog">
            <?php foreach (resource_center_services() as $service) : ?>
                <li>
                    <article class="service-card">
                        <?php resource_center_missing_photo($service['asset_id'], $service['alt']); ?>
                        <div class="service-card-copy">
                            <h3><?php echo esc_html($service['title']); ?></h3>
                            <p><?php echo esc_html($service['description']); ?></p>
                            <a href="<?php echo esc_url(home_url($service['path'])); ?>" aria-label="<?php echo esc_attr('Подробнее об услуге: ' . $service['title']); ?>">
                                Подробнее <?php resource_center_service_arrow(); ?>
                            </a>
                        </div>
                    </article>
                </li>
            <?php endforeach; ?>
        </ul>
    </section>
</div>
<?php
resource_center_contact_band('Не знаете, с чего начать?', 'Расскажите о своей задаче — подскажем, какой формат поддержки подойдёт вам.', 'Получить консультацию');
get_footer();
?>
