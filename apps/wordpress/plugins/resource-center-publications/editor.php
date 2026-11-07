<?php
defined('ABSPATH') || exit;

const RESOURCE_CENTER_PUBLICATION_DATE = '_resource_center_publication_date';

function resource_center_publication_date(WP_Post $post): string
{
    $saved = get_post_meta($post->ID, RESOURCE_CENTER_PUBLICATION_DATE, true);
    return $saved ?: ($post->post_status === 'auto-draft' ? current_time('Y-m-d') : substr($post->post_date, 0, 10));
}

function resource_center_publication_date_is_valid(string $date): bool
{
    return preg_match('/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/D', $date, $parts)
        && checkdate((int) $parts[2], (int) $parts[3], (int) $parts[1]);
}

function resource_center_publication_slug(string $title): string
{
    $title = html_entity_decode($title, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $title = strtr(mb_strtolower($title, 'UTF-8'), array(
        'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd', 'е' => 'e', 'ё' => 'e',
        'ж' => 'zh', 'з' => 'z', 'и' => 'i', 'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm',
        'н' => 'n', 'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't', 'у' => 'u',
        'ф' => 'f', 'х' => 'h', 'ц' => 'ts', 'ч' => 'ch', 'ш' => 'sh', 'щ' => 'sch', 'ъ' => '',
        'ы' => 'y', 'ь' => '', 'э' => 'e', 'ю' => 'yu', 'я' => 'ya',
    ));
    if (class_exists('Normalizer')) {
        $title = Normalizer::normalize($title, Normalizer::FORM_KD);
    } else {
        $title = remove_accents($title);
    }
    $title = preg_replace('/[\x{0300}-\x{036f}]/u', '', $title);
    return trim(preg_replace('/[^a-z0-9]+/', '-', $title), '-');
}

add_filter('wp_insert_post_data', static function (array $data, array $input): array {
    if ($data['post_type'] !== 'post' || in_array($data['post_status'], array('auto-draft', 'trash'), true)) {
        return $data;
    }
    $post_id = (int) ($input['ID'] ?? 0);
    $previous = $post_id ? get_post($post_id) : null;
    if ($previous && $previous->post_name !== '' && $previous->post_status !== 'trash') {
        $data['post_name'] = $previous->post_name;
        if ($previous->post_status !== 'publish' && $data['post_status'] === 'publish') {
            $data['post_name'] = wp_unique_post_slug($data['post_name'], $post_id, 'publish', 'post', 0);
        }
    } else {
        $slug = resource_center_publication_slug(wp_unslash($data['post_title']));
        // WordPress normally skips collision checks for drafts.
        $data['post_name'] = $slug === '' ? '' : wp_unique_post_slug(rtrim(substr($slug, 0, 200), '-'), $post_id, 'publish', 'post', 0);
    }
    return $data;
}, 10, 2);

add_action('add_meta_boxes_post', static function (): void {
    add_meta_box('resource-center-date', 'Календарная дата публикации', static function (WP_Post $post): void {
        wp_nonce_field('resource-center-date-' . $post->ID, 'resource_center_date_nonce', false);
        ?>
        <label for="resource-center-date-field">Дата, которую увидят читатели</label>
        <input type="date" id="resource-center-date-field" name="resource_center_date"
            value="<?php echo esc_attr(resource_center_publication_date($post)); ?>" required>
        <p class="description">Эта дата задаётся отдельно от времени публикации в WordPress.</p>
        <?php
    }, 'post', 'side');
});

add_filter('admin_post_thumbnail_html', static function (string $html, int $post_id): string {
    return get_post_type($post_id) === 'post'
        ? $html . '<p class="description">Укажите альтернативный текст обложки в медиатеке.</p>'
        : $html;
}, 10, 2);

function resource_center_publication_submitted_date(int $post_id): ?string
{
    $nonce = $_POST['resource_center_date_nonce'] ?? null;
    if (!is_string($nonce) || !wp_verify_nonce(wp_unslash($nonce), 'resource-center-date-' . $post_id)
        || !current_user_can('edit_post', $post_id)) {
        return null;
    }
    $date = $_POST['resource_center_date'] ?? '';
    return is_string($date) ? wp_unslash($date) : '';
}

add_action('wp_after_insert_post', static function (int $post_id, WP_Post $post, bool $update, ?WP_Post $previous): void {
    if ($post->post_type !== 'post' || in_array($post->post_status, array('auto-draft', 'trash'), true)) {
        return;
    }
    $default_date = !$update || ($previous && $previous->post_status === 'auto-draft')
        ? current_time('Y-m-d')
        : resource_center_publication_date($post);
    $date = resource_center_publication_submitted_date($post_id) ?? $default_date;
    if (resource_center_publication_date_is_valid($date)) {
        update_post_meta($post_id, RESOURCE_CENTER_PUBLICATION_DATE, $date);
    }
}, 10, 4);

function resource_center_publication_cover_has_alt(int $image_id): bool
{
    return wp_attachment_is_image($image_id) && trim((string) get_post_meta($image_id, '_wp_attachment_image_alt', true)) !== '';
}

// The classic featured-image dialog can update this metadata without saving the post.
function resource_center_validate_publication_cover($check, int $post_id, string $key, $value)
{
    if ($key === '_thumbnail_id' && (int) $value > 0
        && get_post_type($post_id) === 'post' && get_post_status($post_id) === 'publish'
        && !resource_center_publication_cover_has_alt((int) $value)) {
        return false;
    }
    return $check;
}
add_filter('add_post_metadata', 'resource_center_validate_publication_cover', 10, 4);
add_filter('update_post_metadata', 'resource_center_validate_publication_cover', 10, 4);

// wp_unique_post_slug() checks the database before WordPress writes the post.
function resource_center_lock_publication_slug(int $post_id): bool
{
    global $wpdb;
    $lock = 'resource-center-slugs-' . md5(DB_NAME . ':' . $wpdb->posts);
    if ((string) $wpdb->get_var($wpdb->prepare('SELECT GET_LOCK(%s, 10)', $lock)) !== '1') {
        return false;
    }

    $locked = true;
    $release = static function () use ($wpdb, $lock, &$locked): void {
        if ($locked) {
            $locked = false;
            $wpdb->get_var($wpdb->prepare('SELECT RELEASE_LOCK(%s)', $lock));
        }
    };
    add_action('transition_post_status', static function (string $new_status, string $old_status, WP_Post $post) use ($post_id, $release): void {
        if ($post->post_type === 'post' && ($post_id === 0 || (int) $post->ID === $post_id)) {
            $release();
        }
    }, PHP_INT_MIN, 3);
    add_action('shutdown', $release);
    return true;
}

function resource_center_publication_error(string $title, string $markdown, string $excerpt, string $status, ?string $date, int $image_id, int $post_id): ?string
{
    if (mb_strlen(html_entity_decode($title, ENT_QUOTES | ENT_HTML5, 'UTF-8'), 'UTF-8') > 200
        || mb_strlen(html_entity_decode($excerpt, ENT_QUOTES | ENT_HTML5, 'UTF-8'), 'UTF-8') > 500) {
        return 'Заголовок может содержать до 200 символов, а анонс — до 500.';
    }
    if ($date !== null && !resource_center_publication_date_is_valid($date)) {
        return 'Укажите корректную календарную дату.';
    }
    if (in_array($status, array('publish', 'future', 'private'), true)) {
        if (trim($title) === '' || trim($markdown) === '') {
            return 'Заполните заголовок и Markdown.';
        }
        if ((!$post_id || get_post_field('post_name', $post_id, 'raw') === '') && resource_center_publication_slug($title) === '') {
            return 'Добавьте в заголовок букву или цифру, чтобы сформировать адрес.';
        }
        if ($image_id > 0 && !resource_center_publication_cover_has_alt($image_id)) {
            return 'Добавьте альтернативный текст для изображения обложки в медиатеке.';
        }
    }
    return null;
}

add_filter('wp_insert_post_empty_content', static function (bool $empty, array $input): bool {
    $status = $input['post_status'] ?? 'draft';
    if (($input['post_type'] ?? 'post') !== 'post' || in_array($status, array('auto-draft', 'trash'), true)) {
        return $empty;
    }
    $post_id = (int) ($input['ID'] ?? 0);
    $date = resource_center_publication_submitted_date($post_id);
    $image_id = (int) ($input['_thumbnail_id'] ?? ($post_id ? get_post_thumbnail_id($post_id) : 0));
    // REST validates the requested cover before core updates its attachment metadata.
    $error = resource_center_publication_error(
        wp_unslash($input['post_title'] ?? ''),
        wp_unslash($input['post_content'] ?? ''),
        wp_unslash($input['post_excerpt'] ?? ''),
        $status,
        $date,
        defined('REST_REQUEST') && REST_REQUEST ? 0 : $image_id,
        $post_id
    );
    if (!$empty && $error === null) {
        $previous = $post_id ? get_post($post_id) : null;
        $needs_slug_check = !$previous || $previous->post_name === '' || $previous->post_status === 'trash'
            || ($previous->post_status !== 'publish' && $status === 'publish');
        if ($needs_slug_check && !resource_center_lock_publication_slug($post_id)) {
            $error = 'Не удалось зарезервировать адрес публикации. Повторите сохранение.';
        }
    }
    if ($error !== null && $date !== null) {
        wp_die(esc_html($error), 'Проверьте публикацию', array('response' => 400, 'back_link' => true));
    }
    return $empty || $error !== null;
}, 10, 2);

add_filter('rest_pre_insert_post', static function ($prepared, WP_REST_Request $request) {
    $post_id = (int) $request['id'];
    $post = $post_id ? get_post($post_id) : null;
    $error = resource_center_publication_error(
        $prepared->post_title ?? $post->post_title ?? '',
        $prepared->post_content ?? $post->post_content ?? '',
        $prepared->post_excerpt ?? $post->post_excerpt ?? '',
        $prepared->post_status ?? $post->post_status ?? 'draft',
        null,
        (int) ($request['featured_media'] ?? ($post_id ? get_post_thumbnail_id($post_id) : 0)),
        $post_id
    );
    return $error === null ? $prepared : new WP_Error('invalid_publication', $error, array('status' => 400));
}, 10, 2);
