<?php
defined('ABSPATH') || exit;
// Unimplemented routes must not render the home page or seed WordPress content.
global $wp_query;
$wp_query->set_404();
status_header(404);
nocache_headers();
get_template_part('404');
