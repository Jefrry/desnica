<?php defined('ABSPATH') || exit; get_header(); ?>
<div class="shell information-page contacts-page">
    <?php resource_center_breadcrumbs('Контакты'); ?>
    <header class="contacts-intro">
        <h1>Контакты</h1>
        <p class="text-intro">Выберите удобный способ связи.</p>
    </header>
    <section class="contact-details" aria-labelledby="contact-details-title">
        <h2 id="contact-details-title">Наши контакты</h2>
        <address>
            <dl>
                <?php
                // Source: Nuxt UNCONFIRMED_CONTACT_CHANNELS. No confirmed contacts
                // are available; demonstration values must never become links.
                foreach (array(
                    array('Телефон', 'Телефон — уточняется'),
                    array('Эл. почта', 'Эл. почта — уточняется'),
                    array('Адрес', 'Адрес — уточняется'),
                    array('Часы работы', 'Часы работы — уточняются'),
                ) as [$label, $value]) : ?>
                    <div class="contact-channel">
                        <dt><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.75"/><path d="M8.5 12h7M12 8.5v7" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg><span><?php echo esc_html($label); ?></span></dt>
                        <dd><span><?php echo esc_html($value); ?></span></dd>
                    </div>
                <?php endforeach; ?>
            </dl>
        </address>
    </section>
</div>
<?php get_footer(); ?>
