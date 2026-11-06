<?php
defined('ABSPATH') || exit;

function resource_center_navigation_items(): array
{
    return array(
        array('about', 'О нас', '/about', array(
            array('Наша миссия', '/about/mission'),
            array('Уставные документы', '/about/documents'),
            array('Годовая отчётность', '/about/reports'),
        )),
        array('services', 'Услуги', '/services', array(
            array('Разработка локальных документов', '/services/local-documents'),
            array('Проектирование 10 раздела ОДИ', '/services/odi'),
            array('Согласование проектов', '/services/project-review'),
            array('Паспорт доступности', '/services/accessibility-passport'),
        )),
        array('training', 'Обучение', '/training', array()),
        array('news', 'Новости', '/news', array()),
        array('ngo', 'Работа НКО', '/ngo', array()),
        array('contacts', 'Контакты', '/contacts', array()),
    );
}

function resource_center_brand(): void
{
    ?>
    <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Ресурсный центр — на главную">
        <span class="brand-mark" aria-hidden="true"><img src="<?php echo esc_url(get_theme_file_uri('/assets/images/resource-center-logo-color.jpg')); ?>" alt="" width="1885" height="791" fetchpriority="high"></span>
        <span>Ресурсный<br>центр</span>
    </a>
    <?php
}

function resource_center_navigation(bool $mobile = false): void
{
    $prefix = $mobile ? 'mobile' : 'desktop';
    ?>
    <nav class="<?php echo esc_attr($prefix); ?>-navigation" aria-label="<?php echo $mobile ? 'Мобильная навигация' : 'Основная навигация'; ?>">
        <ul>
            <?php foreach (resource_center_navigation_items() as [$key, $label, $path, $children]) : ?>
                <li class="nav-item">
                    <?php if ($mobile && $children) : ?>
                        <button class="group-toggle" type="button" aria-expanded="false" aria-controls="<?php echo esc_attr($prefix . '-subnav-' . $key); ?>"><?php echo esc_html($label); ?><svg aria-hidden="true" viewBox="0 0 16 16" width="20" height="20"><path d="m3.5 6 4.5 4 4.5-4" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                    <?php else : ?>
                        <div class="nav-row">
                            <a href="<?php echo esc_url(home_url($path)); ?>"><?php echo esc_html($label); ?><?php if ($mobile) : ?><svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20"><path d="m7.5 5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg><?php endif; ?></a>
                            <?php if ($children) : ?>
                                <button class="group-toggle" type="button" aria-label="<?php echo esc_attr('Открыть подразделы: ' . $label); ?>" aria-expanded="false" aria-controls="<?php echo esc_attr($prefix . '-subnav-' . $key); ?>"><svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16"><path d="m3.5 6 4.5 4 4.5-4" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                    <?php if ($children) : ?>
                        <ul class="subnav" id="<?php echo esc_attr($prefix . '-subnav-' . $key); ?>" hidden>
                            <?php if ($mobile) : ?><li><a href="<?php echo esc_url(home_url($path)); ?>">Обзор раздела</a></li><?php endif; ?>
                            <?php foreach ($children as [$child_label, $child_path]) : ?>
                                <li><a href="<?php echo esc_url(home_url($child_path)); ?>"><?php echo esc_html($child_label); ?></a></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </li>
            <?php endforeach; ?>
        </ul>
    </nav>
    <?php
}
