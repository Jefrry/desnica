<?php
defined('ABSPATH') || exit;

function resource_center_reports(): array
{
    // Preserve the existing preview years and text; these are not approved annual reports.
    $reports = array();
    foreach (array('2025', '2024', '2023') as $year) {
        $reports[$year] = array(
            'year' => $year,
            'file' => null,
            'sections' => array(array(
                'id' => 'report-' . $year . '-summary',
                'paragraphs' => array('Структура отчёта за ' . $year . ' год. Здесь будут сведения о программах, команде и использовании средств. Подтверждённые данные и файл пока не добавлены.'),
            )),
        );
    }
    return $reports;
}

function resource_center_selected_report_year(): string
{
    return resource_center_query_value('year', '2025');
}
