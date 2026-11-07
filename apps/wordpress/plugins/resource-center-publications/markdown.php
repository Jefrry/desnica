<?php
defined('ABSPATH') || exit;

require_once __DIR__ . '/markdown-parser.php';

function resource_center_publication_heading_text(DOMNode $node): string
{
    if ($node instanceof DOMText) {
        return $node->data;
    }
    if ($node instanceof DOMElement) {
        if ($node->tagName === 'br') {
            return ' ';
        }
        if ($node->tagName === 'img') {
            return $node->getAttribute('alt');
        }
    }
    $text = '';
    foreach ($node->childNodes as $child) {
        $text .= resource_center_publication_heading_text($child);
    }
    return $text;
}

function resource_center_render_publication_markdown(string $markdown): ?array
{
    if (!class_exists('DOMDocument')) {
        return null;
    }

    $parser = new ResourceCenter\Publications\MarkdownParser();
    $html = $parser->text(str_replace('\n', "\n", $markdown));
    $document = new DOMDocument('1.0', 'UTF-8');
    if (!$document->loadHTML('<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>'
        . $html . '</body></html>', LIBXML_NONET | LIBXML_NOERROR | LIBXML_NOWARNING)) {
        return null;
    }
    $body = $document->getElementsByTagName('body')->item(0);
    if ($body === null) {
        return null;
    }
    $xpath = new DOMXPath($document);
    foreach ($xpath->query('.//script | .//style | .//iframe | .//video | .//audio | .//source | .//track'
        . ' | .//object | .//embed | .//template | .//svg | .//math | .//noscript | .//textarea', $body) as $blocked) {
        $blocked->parentNode?->removeChild($blocked);
    }

    // Only generated headings can define anchors, including when raw HTML supplied an id.
    foreach ($xpath->query('.//*[@id]', $body) as $element) {
        $element->removeAttribute('id');
    }
    $headings = $xpath->query('.//h1 | .//h2 | .//h3 | .//h4 | .//h5 | .//h6', $body);
    $shift = $body->getElementsByTagName('h1')->length > 0 ? 1 : 0;
    $ids = array('main-content' => true, 'mobile-navigation-dialog' => true, 'mobile-navigation-title' => true);
    $next_suffix = array();
    $toc = array();
    foreach ($headings as $heading) {
        $label = trim(preg_replace('/\s+/u', ' ', resource_center_publication_heading_text($heading)));
        $normalized = class_exists('Normalizer') ? Normalizer::normalize($label) : $label;
        $slug = trim(preg_replace('/[^\p{L}\p{N}]+/u', '-', mb_strtolower($normalized, 'UTF-8')), '-');
        $base = $slug === '' ? 'section' : $slug;
        $id = $base;
        if (isset($ids[$id])) {
            $suffix = $next_suffix[$base] ?? 2;
            do {
                $id = $base . '-' . $suffix++;
            } while (isset($ids[$id]));
            $next_suffix[$base] = $suffix;
        }
        $ids[$id] = true;

        $level = min(6, (int) $heading->tagName[1] + $shift);
        if ($heading->tagName !== 'h' . $level) {
            $replacement = $document->createElement('h' . $level);
            foreach ($heading->attributes as $attribute) {
                $replacement->setAttribute($attribute->name, $attribute->value);
            }
            while ($heading->firstChild) {
                $replacement->appendChild($heading->firstChild);
            }
            $heading->parentNode->replaceChild($replacement, $heading);
            $heading = $replacement;
        }
        $heading->setAttribute('id', $id);
        $heading->setAttribute('tabindex', '-1');
        if ($level === 2) {
            $toc[] = array('id' => $id, 'label' => $label === '' ? 'Раздел' : $label);
        }
    }

    foreach ($xpath->query('.//table', $body) as $table) {
        $scroll = $document->createElement('div');
        $scroll->setAttribute('class', 'publication-table-scroll');
        $scroll->setAttribute('tabindex', '0');
        $scroll->setAttribute('role', 'region');
        $scroll->setAttribute('aria-label', 'Таблица');
        $table->parentNode->insertBefore($scroll, $table);
        $scroll->appendChild($table);
    }
    foreach ($xpath->query('.//pre', $body) as $pre) {
        $pre->setAttribute('tabindex', '0');
    }
    foreach ($xpath->query('.//img[@src]', $body) as $image) {
        $source = trim($image->getAttribute('src'));
        if (preg_match('~^(?![/#?])[^:/?#\s]+(?:[/?#]|$)~u', $source)) {
            $image->setAttribute('src', home_url('/' . $source));
        }
    }

    $allowed = array_intersect_key(wp_kses_allowed_html('post'), array_flip(array(
        'a', 'abbr', 'b', 'blockquote', 'br', 'caption', 'code', 'dd', 'del', 'div', 'dl', 'dt',
        'em', 'figcaption', 'figure', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img',
        'ins', 'kbd', 'li', 'mark', 'ol', 'p', 'pre', 's', 'span', 'strong', 'sub', 'sup',
        'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul',
    )));
    foreach ($allowed as &$attributes) {
        unset($attributes['style'], $attributes['name'], $attributes['data-*'], $attributes['hidden'], $attributes['aria-hidden']);
    }
    unset($attributes, $allowed['img']['srcset']);
    $allowed['mark'] ??= array();
    $allowed['div']['tabindex'] = true;
    $allowed['pre']['tabindex'] = true;
    foreach (array('h2', 'h3', 'h4', 'h5', 'h6') as $tag) {
        $allowed[$tag]['tabindex'] = true;
    }

    // DOMDocument serializes text in a pre/code block as text; KSES is the final HTML boundary.
    $html = '';
    foreach ($body->childNodes as $child) {
        $html .= $document->saveHTML($child);
    }
    return array('html' => wp_kses($html, $allowed, array('http', 'https', 'mailto', 'tel')), 'toc' => $toc);
}
