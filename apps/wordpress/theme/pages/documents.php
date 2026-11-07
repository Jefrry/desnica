<?php
defined('ABSPATH') || exit;
$documents = resource_center_documents();
$selected_id = resource_center_selected_document();
get_header();
?>
<div class="shell information-page documents-page" data-document-page>
    <?php resource_center_breadcrumbs('Уставные документы', array(array('О нас', '/about'))); ?>
    <section id="documents-intro" class="page-intro" aria-labelledby="page-title">
        <div><h1 id="page-title">Уставные документы</h1><p class="text-intro">Мы действуем открыто и прозрачно. Здесь собраны документы Ресурсного центра для свободного ознакомления.</p></div>
        <?php resource_center_missing_photo('document-folder', 'Папка с документами Ресурсного центра', 'Фотография будет добавлена', 'intro-photo'); ?>
    </section>
    <section id="documents-list" class="content-section" aria-labelledby="documents-list-heading">
        <h2 id="documents-list-heading">Документы Ресурсного центра</h2>
        <div class="document-list">
            <?php foreach ($documents as $id => $document) : $file = resource_center_document_file($document); ?>
                <article class="document-row">
                    <span class="document-row-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="32" height="32" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z M14 2v6h6 M8 13h8 M8 17h6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                    <div><h3><?php echo esc_html($document['title']); ?></h3><p><?php echo esc_html($document['description']); ?></p>
                        <?php if ($file) : ?><p class="document-metadata"><?php echo esc_html($file['format'] . ' · ' . size_format($file['bytes'], 1)); ?></p><?php endif; ?>
                    </div>
                    <div class="document-actions">
                        <a class="action secondary" data-document-link href="<?php echo esc_url(add_query_arg('document', $id, home_url('/about/documents')) . '#document-reader'); ?>">Читать на сайте</a>
                        <?php if ($file) : ?>
                            <a class="action secondary" href="<?php echo esc_url($file['href']); ?>" download>Скачать <?php echo esc_html($file['format']); ?></a>
                        <?php else : ?><span class="document-unavailable" aria-disabled="true">Файл пока недоступен</span><?php endif; ?>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </section>
    <div class="content-section document-reading-layout">
        <nav class="document-toc" aria-labelledby="documents-toc-title">
            <p id="documents-toc-title">Содержание</p>
            <ul>
                <?php foreach (array('documents-intro' => 'Назначение документов', 'documents-list' => 'Документы Ресурсного центра', 'document-reader' => 'Текст документа', 'documents-help' => 'Вопросы и поддержка') as $anchor => $label) : ?>
                    <li><a href="#<?php echo esc_attr($anchor); ?>"><span aria-hidden="true">›</span> <?php echo esc_html($label); ?></a></li>
                <?php endforeach; ?>
            </ul>
        </nav>
        <section id="document-reader" aria-labelledby="document-reader-heading">
            <h2 id="document-reader-heading" tabindex="-1">Текст документа</h2>
            <?php foreach ($documents as $id => $document) : ?>
                <div data-document-content="<?php echo esc_attr($id); ?>"<?php echo $id !== $selected_id ? ' hidden' : ''; ?>>
                    <h3 data-document-heading tabindex="-1"<?php if ($id === $selected_id) : ?> id="document-reader-document-heading"<?php endif; ?>><?php echo esc_html($document['title']); ?></h3>
                    <div class="document-text">
                        <?php foreach ($document['sections'] as $section) : ?>
                            <section id="<?php echo esc_attr($section['id']); ?>"<?php if (isset($section['title'])) : ?> aria-labelledby="<?php echo esc_attr($section['id'] . '-heading'); ?>"<?php endif; ?>>
                                <?php if (isset($section['title'])) : ?><h3 id="<?php echo esc_attr($section['id'] . '-heading'); ?>"><?php echo esc_html($section['title']); ?></h3><?php endif; ?>
                                <?php foreach ($section['paragraphs'] as $paragraph) : ?><p><?php echo esc_html($paragraph); ?></p><?php endforeach; ?>
                            </section>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
            <p class="document-error" data-document-error<?php echo isset($documents[$selected_id]) ? ' hidden' : ''; ?>><?php echo esc_html('Документ с идентификатором «' . $selected_id . '» не найден. Выберите документ из списка выше.'); ?></p>
        </section>
    </div>
</div>
<div id="documents-help">
    <?php resource_center_contact_band('Не нашли нужный документ?', 'Напишите нам — подскажем, где найти нужную информацию.', 'Связаться с нами'); ?>
</div>
<?php get_footer(); ?>
