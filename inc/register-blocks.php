<?php

function sf_blocks_register_blocks()
{
    $blocks = [
        ['name' => 'fancy-header']
    ];

    foreach ($blocks as $block) {
        register_block_type(
            SF_BLOCKS_PLUGIN_DIR . 'build/blocks/' . $block['name']
        );
    };
}
