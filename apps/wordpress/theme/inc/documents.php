<?php
defined('ABSPATH') || exit;

function resource_center_documents(): array
{
    // Texts preserved from the Nuxt preview; official texts and files are not supplied.
    return array(
        'charter' => array(
            'title' => 'Устав Ресурсного центра',
            'description' => 'Основные положения о целях и организации работы.',
            'file' => null,
            'sections' => array(
                array('id' => 'charter-purpose', 'paragraphs' => array('Этот блок показывает, как посетитель сможет прочитать документ прямо на сайте. Разделы, заголовки и абзацы представлены обычным текстом, который можно увеличить, выделить и прочитать с помощью программы экранного доступа.')),
                array('id' => 'charter-publication', 'title' => 'Публикация документа', 'paragraphs' => array('В опубликованной версии здесь размещается утверждённый текст устава с указанием даты и редакции. Содержание должно совпадать с официальным документом. Если текст обновляется, посетителю должна быть понятна актуальная версия.')),
                array('id' => 'charter-structure', 'title' => 'Структура и приложения', 'paragraphs' => array('Для удобства длинный документ делится на разделы с оглавлением. При наличии приложения рядом размещаются понятная ссылка, формат и действительный размер файла.')),
            ),
        ),
        'registration' => array(
            'title' => 'Свидетельство о регистрации',
            'description' => 'Сведения о государственной регистрации организации.',
            'file' => null,
            'sections' => array(array('id' => 'registration-status', 'paragraphs' => array('Документ о регистрации будет добавлен после подтверждения данных.'))),
        ),
        'requisites' => array(
            'title' => 'Реквизиты организации',
            'description' => 'Информация для официальных обращений и взаимодействия.',
            'file' => null,
            'sections' => array(array('id' => 'requisites-status', 'paragraphs' => array('Реквизиты уточняются.'))),
        ),
    );
}

function resource_center_selected_document(): string
{
    // Like readQueryValue in Nuxt, use the first value of a repeated parameter.
    foreach (explode('&', $_SERVER['QUERY_STRING'] ?? '') as $parameter) {
        $pair = explode('=', $parameter, 2);
        if (urldecode($pair[0]) === 'document') {
            $value = urldecode($pair[1] ?? '');
            return $value !== '' ? $value : 'charter';
        }
    }
    return 'charter';
}

function resource_center_document_file(array $document): ?array
{
    // Only a deliberately supplied theme-relative file may become a download.
    if (empty($document['file'])) {
        return null;
    }
    $path = get_theme_file_path($document['file']);
    if (!is_file($path) || !is_readable($path)) {
        return null;
    }
    $bytes = filesize($path);
    if ($bytes === false) {
        return null;
    }
    return array('href' => get_theme_file_uri($document['file']), 'format' => strtoupper(pathinfo($path, PATHINFO_EXTENSION)), 'bytes' => $bytes);
}
