<?php

/**
 * Plugin Name: SF Blocks
 * Plugin URI: http://wordpress.org/plugins/sf-blocks/
 * Description: Gutenberg block plugin.
 * Author: Saief Al Emon
 * Version: 1.0.0
 * Author URI: https://iamsaief.com
 * Text Domain: sf-blocks
 */


// Make sure we don't expose any info if called directly
if (!function_exists('add_action')) {
    echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
    exit;
}


// Setup
define('PLUGIN_DIR', plugin_dir_path(__FILE__));

// Includes
include(PLUGIN_DIR . 'inc/register-blocks.php');

// Hooks
add_action('init', 'sf_blocks_init');
