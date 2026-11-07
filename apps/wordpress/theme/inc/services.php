<?php
defined('ABSPATH') || exit;

function resource_center_services(): array
{
    return array(
        'local-documents' => array(
            'title' => 'Разработка локальных документов',
            'description' => 'Помогаем организовать инклюзивное оказание услуг с учётом потребностей посетителей.',
            'path' => '/services/local-documents',
            'asset_id' => 'local-papers',
            'alt' => 'Специалист работает с документами',
        ),
        'odi' => array(
            'title' => 'Проектирование 10 раздела ОДИ',
            'description' => 'Разрабатываем проектные решения по обеспечению доступности зданий и помещений.',
            'path' => '/services/odi',
            'asset_id' => 'odi-plan',
            'alt' => 'Специалисты обсуждают план помещения',
        ),
        'project-review' => array(
            'title' => 'Согласование проектов',
            'description' => 'Обсуждаем доступность проектных решений и готовим рекомендации.',
            'path' => '/services/project-review',
            'asset_id' => 'approval-meeting',
            'alt' => 'Команда обсуждает проектные решения',
        ),
        'accessibility-passport' => array(
            'title' => 'Паспорт доступности',
            'description' => 'Помогаем обследовать объект и подготовить материалы о его доступности.',
            'path' => '/services/accessibility-passport',
            'asset_id' => 'passport-document',
            'alt' => 'Материалы обследования доступности',
        ),
    );
}

function resource_center_service_arrow(): void
{
    ?>
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true" focusable="false">
        <path d="M4 10h12m-4-4 4 4-4 4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <?php
}

function resource_center_service_icon(string $icon): void
{
    $paths = array(
        'check' => 'm5 12 4 4L19 6',
        'document' => 'M7 3h7l4 4v14H7z M14 3v5h5M10 12h5M10 16h5',
        'building' => 'M4 21h16M6 21V7l6-4 6 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-3h4v3',
        'settings' => 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7 M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-2.83 2.83-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21h-4v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06-2.83-2.83.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3v-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06L7.04 4.3l.06.06A1.65 1.65 0 0 0 8.92 4a1.65 1.65 0 0 0 1-1.51V2h4v.49A1.65 1.65 0 0 0 14.92 4a1.65 1.65 0 0 0 1.82.33l.06-.06 2.83 2.83-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21v4h-.09a1.65 1.65 0 0 0-1.51 1Z',
        'layers' => 'M4 8l8-4 8 4-8 4z M4 12l8 4 8-4M4 16l8 4 8-4',
        'people' => 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
        'search' => 'M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16 m10 2-4.35-4.35',
    );
    ?>
    <svg class="service-icon" viewBox="0 0 24 24" width="32" height="32" fill="none" aria-hidden="true" focusable="false">
        <path d="<?php echo esc_attr($paths[$icon]); ?>" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <?php
}

function resource_center_service_intro(string $title, string $lead, string $action, string $asset_id, string $alt): void
{
    ?>
    <section class="page-intro" aria-labelledby="page-title">
        <div>
            <h1 id="page-title"><?php echo esc_html($title); ?></h1>
            <p class="text-intro"><?php echo esc_html($lead); ?></p>
            <div class="actions">
                <a class="action" href="<?php echo esc_url(home_url('/contacts')); ?>"><?php echo esc_html($action); ?></a>
            </div>
        </div>
        <?php resource_center_missing_photo($asset_id, $alt, 'Фотография будет добавлена', 'intro-photo'); ?>
    </section>
    <?php
}

function resource_center_service_features(array $features): void
{
    ?>
    <ul class="service-grid service-features">
        <?php foreach ($features as [$icon, $title, $description]) : ?>
            <li>
                <span class="service-feature-icon"><?php resource_center_service_icon($icon); ?></span>
                <div><strong><?php echo esc_html($title); ?></strong><p><?php echo esc_html($description); ?></p></div>
            </li>
        <?php endforeach; ?>
    </ul>
    <?php
}

function resource_center_service_faq(string $group, array $items, ?int $initial_open_index = null): void
{
    ?>
    <div class="service-faq">
        <?php foreach ($items as $index => [$question, $answer]) : ?>
            <details name="<?php echo esc_attr($group); ?>"<?php echo $index === $initial_open_index ? ' open' : ''; ?>>
                <summary>
                    <span><?php echo esc_html($question); ?></span>
                    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true" focusable="false">
                        <path d="m5 8 5 5 5-5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </summary>
                <p><?php echo esc_html($answer); ?></p>
            </details>
        <?php endforeach; ?>
    </div>
    <?php
}

function resource_center_related_services(array $ids): void
{
    $services = resource_center_services();
    ?>
    <ul class="service-grid service-related-grid">
        <?php foreach ($ids as $id) : $service = $services[$id]; ?>
            <li>
                <a class="info-link-card service-related-card" href="<?php echo esc_url(home_url($service['path'])); ?>" aria-label="<?php echo esc_attr($service['title']); ?>">
                    <span>
                        <strong><?php echo esc_html($service['title']); ?></strong>
                        <span><?php echo esc_html($service['description']); ?></span>
                    </span>
                    <div class="service-related-media" aria-hidden="true">
                        <?php resource_center_missing_photo($service['asset_id'], $service['alt'], 'Иллюстрация будет добавлена'); ?>
                    </div>
                    <?php resource_center_service_arrow(); ?>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
    <?php
}
