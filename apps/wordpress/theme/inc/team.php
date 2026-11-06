<?php
defined('ABSPATH') || exit;

function resource_center_team(): void
{
    ?>
    <ul class="team-grid">
        <?php foreach (array('team-lead' => 'Руководитель Ресурсного центра', 'team-expert' => 'Эксперт по доступности', 'team-coordinator' => 'Координатор программ') as $asset_id => $role) : ?>
            <li><article class="person-card">
                <?php resource_center_missing_photo($asset_id, $role); ?>
                <div class="person-text"><h3><?php echo esc_html($role); ?></h3></div>
            </article></li>
        <?php endforeach; ?>
    </ul>
    <?php
}
