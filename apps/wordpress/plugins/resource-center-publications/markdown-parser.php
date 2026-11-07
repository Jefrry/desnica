<?php
namespace ResourceCenter\Publications;

use ResourceCenter\Publications\Vendor\ParsedownExtra;

defined('ABSPATH') || exit;

require_once __DIR__ . '/vendor/Parsedown.php';
require_once __DIR__ . '/vendor/ParsedownExtra.php';

final class MarkdownParser extends ParsedownExtra
{
    private const INLINE_TAGS = array('++' => 'ins', '==' => 'mark', '~' => 'sub', '^' => 'sup');
    private const EMOJI_MARKERS = ':><]oO0xX8B,;';
    private int $inline_note_count = 0;

    public function __construct()
    {
        parent::__construct();
        $this->setBreaksEnabled(true);
        array_unshift($this->BlockTypes[':'], 'PublicationContainer');
        foreach (array('+', '=', '~', '^') as $marker) {
            $this->InlineTypes[$marker][] = 'PublicationInline';
        }
        foreach (str_split(self::EMOJI_MARKERS) as $marker) {
            $this->InlineTypes[$marker][] = 'PublicationEmoji';
        }
        foreach (array('@', '.') as $marker) {
            $this->InlineTypes[$marker][] = 'PublicationAutolink';
        }
        $this->inlineMarkerList .= '+=^@.' . self::EMOJI_MARKERS;
        array_push($this->specialCharacters, '=', '^', ':');
    }

    protected function inlinePublicationInline($excerpt): ?array
    {
        $text = $excerpt['text'];
        if (str_starts_with($text, '^[') && preg_match('/^\^(\[((?:[^][]++|(?1))*+)\])/', $text, $match)) {
            $name = "\0inline-" . ++$this->inline_note_count;
            $this->DefinitionData['Footnote'][$name] = array('text' => $match[2], 'count' => 0, 'number' => null);
            $reference = $this->inlineFootnoteMarker(array('text' => '[^' . $name . ']'));
            $reference['extent'] = strlen($match[0]);
            return $reference;
        }

        $delimiter = str_contains('+=', $text[0]) ? str_repeat($text[0], 2) : $text[0];
        $quoted = preg_quote($delimiter, '/');
        $content = strlen($delimiter) === 1 ? '(?:\\\\ |[^\s])+?' : '\S(?:[\s\S]*?\S)?';
        if (!preg_match('/^' . $quoted . '(' . $content . ')(?<!\\\\)' . $quoted . '/', $text, $match)) {
            return null;
        }

        $element = array('name' => self::INLINE_TAGS[$delimiter]);
        if (strlen($delimiter) === 1) {
            $element['text'] = str_replace('\\ ', ' ', $match[1]);
        } else {
            $element['handler'] = array('function' => 'lineElements', 'argument' => $match[1], 'destination' => 'elements');
        }
        return array('extent' => strlen($match[0]), 'element' => $element);
    }

    protected function inlinePublicationEmoji($excerpt): ?array
    {
        static $emoji = null;
        static $shortcuts = null;
        static $pattern = null;
        $text = $excerpt['text'];
        if (preg_match('/^:([a-zA-Z0-9_+-]+):/', $text, $match)) {
            $emoji ??= json_decode(file_get_contents(__DIR__ . '/vendor/emoji.json'), true, 512, JSON_THROW_ON_ERROR);
            if (isset($emoji[$match[1]])) {
                return array('extent' => strlen($match[0]), 'element' => array('text' => $emoji[$match[1]]));
            }
        }

        if ($shortcuts === null) {
            $shortcuts = json_decode(file_get_contents(__DIR__ . '/vendor/emoji-shortcuts.json'), true, 512, JSON_THROW_ON_ERROR);
            $pattern = '/^(?:' . implode('|', array_map(static fn ($value) => preg_quote($value, '/'), array_keys($shortcuts)))
                . ')(?=$|[\p{Z}\p{P}\p{Cc}])/u';
        }
        $prefix_length = strlen($excerpt['context']) - strlen($text);
        if (preg_match($pattern, $text, $match) && ($prefix_length === 0
            || preg_match('/[\p{Z}\p{P}\p{Cc}]$/u', substr($excerpt['context'], 0, $prefix_length)))) {
            return array('extent' => strlen($match[0]), 'element' => array('text' => $shortcuts[$match[0]]));
        }
        return null;
    }

    protected function inlinePublicationAutolink($excerpt): ?array
    {
        $tld = '[a-z]{2}|biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф|xn--[a-z0-9-]+';
        $host = '(?:[\p{L}\p{N}][\p{L}\p{N}-]*\.)+(?:' . $tld . ')';
        if (!preg_match('~(?<![\w@./-])(?:(?<email>[\w.+-]+@' . $host . ')|'
            . $host . '(?::[0-9]{1,5})?(?:[/?#][^\s<>]*)?)(?![\w@-])~iu',
            $excerpt['context'], $match, PREG_OFFSET_CAPTURE)) {
            return null;
        }
        [$value, $position] = $match[0];
        if ($position + strlen($value) <= strlen($excerpt['context']) - strlen($excerpt['text'])) {
            return null;
        }
        $label = rtrim($value, '.,;:!?)');
        $prefix = empty($match['email'][0]) ? 'http://' : 'mailto:';
        return array(
            'extent' => strlen($label),
            'position' => $position,
            'element' => array('name' => 'a', 'text' => $label, 'attributes' => array('href' => $prefix . $label)),
        );
    }

    protected function inlineLink($excerpt)
    {
        $link = parent::inlineLink($excerpt);
        if (isset($link['element']['handler'])) {
            $link['element']['nonNestables'][] = 'PublicationAutolink';
        }
        return $link;
    }

    protected function lineElements($text, $nonNestables = array())
    {
        $tokens = array();
        foreach (parent::lineElements($text, $nonNestables) as $element) {
            // Parsedown groups plain text, breaks and abbreviations under an unnamed element.
            if (!isset($element['name']) && isset($element['elements'])) {
                array_push($tokens, ...$element['elements']);
            } else {
                $tokens[] = $element;
            }
        }
        $elements = array();
        $plain = '';
        foreach ($tokens as $token) {
            if (!isset($token['name']) && isset($token['text'])) {
                $plain .= $token['text'];
                continue;
            }
            if ($plain !== '') {
                $elements[] = array('text' => $this->typography($plain), 'autobreak' => false);
                $plain = '';
            }
            $token['autobreak'] = false;
            $elements[] = $token;
        }
        if ($plain !== '') {
            $elements[] = array('text' => $this->typography($plain), 'autobreak' => false);
        }
        return $elements;
    }

    private function typography(string $text): string
    {
        $text = str_ireplace(array('(c)', '(r)', '(tm)', '+-'), array('©', '®', '™', '±'), $text);
        return preg_replace(
            array('/\.{2,}/', '/([?!])…/u', '/([?!])\1{3,}/', '/,{2,}/', '/(?<!-)---(?!-)/', '/(?<!-)--(?!-)/', '/(?<!\w)"([^"\n]+)"(?!\w)/u'),
            array('…', '$1..', '$1$1$1', ',', '—', '–', '“$1”'),
            $text
        );
    }

    protected function blockPublicationContainer($line): ?array
    {
        if (!preg_match('/^(:{3,})\s*(warning|tip)(?:\s|$)/', $line['text'], $match)) {
            return null;
        }
        return array(
            'markers' => array(strlen($match[1])),
            'element' => array(
                'name' => 'div',
                'attributes' => array('class' => $match[2]),
                'handler' => array('function' => 'linesElements', 'argument' => array(), 'destination' => 'elements'),
            ),
        );
    }

    protected function blockPublicationContainerContinue($line, array $block): ?array
    {
        if (!$block['markers']) {
            return null;
        }
        if ($line['indent'] < 4 && preg_match('/^(:{3,})\s*$/', $line['text'], $match)
            && strlen($match[1]) >= end($block['markers'])) {
            array_pop($block['markers']);
            if (!$block['markers']) {
                return $block;
            }
        } elseif ($line['indent'] < 4 && preg_match('/^(:{3,})\s*(?:warning|tip)(?:\s|$)/', $line['text'], $match)) {
            $block['markers'][] = strlen($match[1]);
        }
        $lines = &$block['element']['handler']['argument'];
        if (isset($block['interrupted'])) {
            array_push($lines, ...array_fill(0, $block['interrupted'], ''));
            unset($block['interrupted']);
        }
        $lines[] = $line['body'];
        return $block;
    }

    protected function blockMarkupComplete($block)
    {
        // Raw HTML stays literal. Parse it only when sanitizing the rendered article.
        return $block;
    }

    protected function blockMarkupContinue($line, array $block)
    {
        // An HTML block must not swallow subsequent Markdown after a blank line.
        return isset($block['interrupted']) ? null : parent::blockMarkupContinue($line, $block);
    }

    protected function blockDefinitionList($line, $block)
    {
        return preg_match('/^:\s/', $line['text']) ? parent::blockDefinitionList($line, $block) : null;
    }

    protected function inlineFootnoteMarker($excerpt)
    {
        $reference = parent::inlineFootnoteMarker($excerpt);
        if ($reference !== null) {
            $number = $reference['element']['element']['text'];
            $reference['element'] = array(
                'name' => 'sup',
                'attributes' => array('class' => 'footnote-ref'),
                'element' => array('name' => 'span', 'text' => '[' . $number . ']'),
            );
        }
        return $reference;
    }

    protected function element(array $element)
    {
        if (($element['attributes']['class'] ?? '') === 'footnote-backref') {
            $element = array('name' => 'span', 'attributes' => array('class' => 'footnote-backref'), 'text' => '↩︎');
        }
        if (in_array($element['name'] ?? '', array('th', 'td'), true)
            && preg_match('/^text-align: (left|right|center);?$/', $element['attributes']['style'] ?? '', $match)) {
            $element['attributes'] = array('align' => $match[1]);
        }
        return parent::element($element);
    }
}
