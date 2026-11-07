<?php
defined('ABSPATH') || exit;
$reports = resource_center_reports();
$selected_year = resource_center_selected_report_year();
$selected_report = $reports[$selected_year] ?? null;
get_header();
?>
<div class="shell information-page reports-page" data-report-page>
    <?php resource_center_breadcrumbs('Годовая отчётность', array(array('О нас', '/about'))); ?>
    <section class="page-intro" aria-labelledby="page-title">
        <div><h1 id="page-title">Годовая отчётность</h1><p class="text-intro">Рассказываем о работе Ресурсного центра открыто и понятно.</p></div>
        <?php resource_center_missing_photo('team-meeting', 'Команда Ресурсного центра обсуждает работу', 'Фотография будет добавлена', 'intro-photo'); ?>
    </section>
    <form class="report-years" action="<?php echo esc_url(home_url('/about/reports')); ?>" method="get" data-report-form>
        <label for="report-year">Год отчёта</label>
        <?php foreach (explode('&', $_SERVER['QUERY_STRING'] ?? '') as $parameter) :
            $pair = explode('=', $parameter, 2);
            $name = urldecode($pair[0]);
            if ($name === '' || $name === 'year') { continue; } ?>
            <input type="hidden" name="<?php echo esc_attr($name); ?>" value="<?php echo esc_attr(urldecode($pair[1] ?? '')); ?>">
        <?php endforeach; ?>
        <select id="report-year" name="year">
            <?php if (!$selected_report) : ?><option data-report-unknown value="<?php echo esc_attr($selected_year); ?>" selected>Недоступный год: <?php echo esc_html($selected_year); ?></option><?php endif; ?>
            <?php foreach ($reports as $report) : $year = $report['year']; ?>
                <option value="<?php echo esc_attr($year); ?>"<?php echo $year === $selected_year ? ' selected' : ''; ?>><?php echo esc_html($year); ?></option>
            <?php endforeach; ?>
        </select>
        <button class="action secondary" type="submit">Показать отчёт</button>
        <span class="sr-only" role="status" aria-live="polite" aria-atomic="true" data-report-status></span>
    </form>
    <section id="report-panel" class="content-section" aria-labelledby="report-panel-heading">
        <h2 id="report-panel-heading" tabindex="-1"><?php echo esc_html($selected_report ? 'Отчёт за ' . $selected_year . ' год' : 'Отчёт не найден'); ?></h2>
        <?php foreach ($reports as $report) : $year = $report['year']; $file = resource_center_document_file($report); ?>
            <div data-report-content="<?php echo esc_attr($year); ?>"<?php echo $year !== $selected_year ? ' hidden' : ''; ?>>
                <p class="text-intro">Материалы годового отчёта</p>
                <div class="report-panel-grid">
                    <ul class="report-features">
                        <?php foreach (array(
                            array('Программы', 'Описание основных направлений работы за выбранный год.', 'm4 8 8-4 8 4-8 4z m4 12 8 4 8-4M4 16l8 4 8-4'),
                            array('Команда и партнёры', 'Участники совместной работы и их вклад.', 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'),
                            array('Использование средств', 'Информация о привлечённых ресурсах и их использовании.', 'M7 3h7l4 4v14H7z M14 3v5h5M10 12h5M10 16h5'),
                        ) as [$title, $body, $icon]) : ?>
                            <li><span class="report-feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="<?php echo esc_attr($icon); ?>" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><h3><?php echo esc_html($title); ?></h3><p><?php echo esc_html($body); ?></p></div></li>
                        <?php endforeach; ?>
                    </ul>
                    <div class="report-card">
                        <div class="report-cover" role="img" aria-label="<?php echo esc_attr('Обложка годового отчёта за ' . $year . ' год'); ?>" data-asset-id="report-cover-2025">
                            <span>Ресурсный центр</span><strong>Годовой<br>отчёт<br><?php echo esc_html($year); ?></strong><span>Годовой отчёт</span>
                        </div>
                        <div class="report-actions">
                            <?php if ($report['sections']) : ?><a class="action" data-report-link href="<?php echo esc_url(add_query_arg('year', $year) . '#report-reader'); ?>">Читать отчёт</a><?php else : ?><span class="report-unavailable" aria-disabled="true">Текст пока недоступен</span><?php endif; ?>
                            <?php if ($file) : ?><a class="action secondary" href="<?php echo esc_url($file['href']); ?>" download>Скачать <?php echo esc_html($file['format']); ?></a><?php else : ?><span class="report-unavailable" aria-disabled="true">Файл пока недоступен</span><?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
        <p class="report-error" data-report-error<?php echo $selected_report ? ' hidden' : ''; ?>><?php echo esc_html('Отчёт за ' . $selected_year . ' год не найден. Выберите доступный год.'); ?></p>
    </section>
    <?php // Keep server-rendered text available without JS; JS reveals only the requested reader/section. ?>
    <section id="report-reader" class="content-section" aria-labelledby="report-reader-heading"<?php echo $selected_report ? '' : ' hidden'; ?>>
        <h2 id="report-reader-heading" tabindex="-1">Текст документа</h2>
        <?php foreach ($reports as $report) : $year = $report['year']; ?>
            <div data-report-text="<?php echo esc_attr($year); ?>"<?php echo $year !== $selected_year ? ' hidden' : ''; ?>>
                <h3 data-report-text-heading tabindex="-1"<?php echo $year === $selected_year ? ' id="report-reader-document-heading"' : ''; ?>>Отчёт за <?php echo esc_html($year); ?> год</h3>
                <div class="report-text">
                    <?php foreach ($report['sections'] as $section) : ?>
                        <section id="<?php echo esc_attr($section['id']); ?>" tabindex="-1"<?php if (isset($section['title'])) : ?> aria-labelledby="<?php echo esc_attr($section['id'] . '-heading'); ?>"<?php endif; ?>>
                            <?php if (isset($section['title'])) : ?><h3 id="<?php echo esc_attr($section['id'] . '-heading'); ?>"><?php echo esc_html($section['title']); ?></h3><?php endif; ?>
                            <?php foreach ($section['paragraphs'] as $paragraph) : ?><p><?php echo esc_html($paragraph); ?></p><?php endforeach; ?>
                        </section>
                    <?php endforeach; ?>
                    <?php if (!$report['sections']) : ?><p>Текст пока недоступен</p><?php endif; ?>
                </div>
            </div>
        <?php endforeach; ?>
    </section>
    <section class="report-archive" aria-labelledby="report-archive-heading">
        <h2 id="report-archive-heading">Архив отчётов</h2>
        <ul>
            <?php foreach ($reports as $report) : $year = $report['year']; ?>
                <li data-report-archive="<?php echo esc_attr($year); ?>"<?php echo $year === $selected_year ? ' hidden' : ''; ?>>
                    <span class="report-archive-label"><span class="report-feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7z M14 3v5h5M10 12h5M10 16h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><strong><?php echo esc_html($year); ?> год</strong></span>
                    <a data-report-link href="<?php echo esc_url(add_query_arg('year', $year) . '#report-panel'); ?>">Показать отчёт</a>
                </li>
            <?php endforeach; ?>
        </ul>
    </section>
    <section id="about-annual-reports" class="content-section page-intro" aria-labelledby="about-annual-reports-heading">
        <?php resource_center_missing_photo('annual-review', 'Обсуждение годового отчёта', 'Фотография будет добавлена', 'intro-photo'); ?>
        <div><h2 id="about-annual-reports-heading">О годовой отчётности</h2><p>Годовой отчёт помогает понять, как организация работает над своими задачами. В нём можно рассказать о программах, участниках, сотрудничестве и использовании ресурсов.</p><p>До публикации реальные сведения проходят проверку, а текстовая версия согласуется с файлом отчёта.</p></div>
    </section>
</div>
<?php resource_center_contact_band('Остались вопросы по отчётности?', 'Напишите нам — обсудим детали и подскажем, где найти нужную информацию.', 'Связаться с нами'); ?>
<?php get_footer(); ?>
