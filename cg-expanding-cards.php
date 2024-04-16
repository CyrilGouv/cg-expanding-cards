<?php
/**
 * Plugin Name: CG Expanding Cards
 * Plugin URI: https://cyrilgouv.com
 * Description: An expading cards grid
 * Author: Cyril Gouv
 * Author URI: https://cyrilgouv.com
 */

 
function cg_expanding_cards_init() {
    register_block_type_from_metadata( __DIR__ );
}

add_action( "init", "register_block_type_from_metadata" );
