<?php
/**
 * Plugin Name:       Custom Blocks Toolkit
 * Description:       Gutenberg Custom Blocks Toolkit
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Saief Al Emon
 * Author URI:        https://iamsaief.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       custom-blocks-toolkit
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function custom_blocks_toolkit_init() {
	$blocks = array(
        'team-members',
    );

    foreach ($blocks as $block) {
        register_block_type(
            __DIR__ . '/build/blocks/' . $block
        );
    };


	//  Adding custom block category. 
    add_filter('block_categories_all', function ($categories) {
        return array_merge(
            array(
                array(
                    'slug'  => 'custom-blocks-toolkit',
                    'title' => 'CUSTOM BLOCKS TOOLKIT'
                ),
            ),
            $categories
        );
    }, 10, 2);
}
add_action( 'init', 'custom_blocks_toolkit_init' );

