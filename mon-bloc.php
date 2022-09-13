<?php

/**

 * Plugin Name: Mon bloc

 */

function create_block_mon_bloc_init()
{

    $asset_file = include(plugin_dir_path(__FILE__) . 'build/index.asset.php');

    wp_register_script(
        'mon-bloc',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    register_block_type('nouveau-bloc/mon-bloc', [
        'editor_script' => 'mon-bloc',
    ]);
}

add_action('init', 'create_block_mon_bloc_init');

add_action('wp_enqueue_scripts', 'block_scripts');
function block_scripts()
{
    wp_enqueue_script(
        'block-js',
        plugin_dir_url(__FILE__) . 'src/block.js',
        array('wp-blocks', 'wp-element', 'wp-editor'),
        filemtime(dirname(__FILE__) . '/src/block.js')
    );
    wp_enqueue_style(
        'block-css',
        plugin_dir_url(__FILE__) . 'src/block.css',
        array('wp-edit-blocks'),
        filemtime(dirname(__FILE__) . '/src/block.css')
    );
}

add_action('enqueue_block_editor_assets', 'block_assets');
function block_assets()
{
    wp_enqueue_script(
        'block-js',
        plugin_dir_url(__FILE__) . 'src/block.js',
        array('wp-blocks', 'wp-element', 'wp-editor'),
        filemtime(dirname(__FILE__) . '/src/block.js')
    );
    wp_enqueue_style(
        'block-css',
        plugin_dir_url(__FILE__) . 'src/block.css',
        array('wp-edit-blocks'),
        filemtime(dirname(__FILE__) . '/src/block.css')
    );
}
