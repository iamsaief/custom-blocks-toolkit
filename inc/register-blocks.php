<?php

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function sf_blocks_init() {

    $blocks = array(
        'fancy-header', 'accordion',
    );

    foreach ($blocks as $block) {
        register_block_type(
            PLUGIN_DIR . 'build/blocks/' . $block
        );
    };

    /*
	* Adding a new category.
	*/
    add_filter('block_categories_all', function ($categories) {
        return array_merge(
            array(
                array(
                    'slug'  => 'sf',
                    'title' => 'SF Blocks'
                ),
            ),
            $categories
        );
    }, 10, 2);

    // wp_enqueue_script('accordion-js', plugin_dir_url(__DIR__) . 'build/blocks/accordion/view.js', array(), '1.0', true);
}
