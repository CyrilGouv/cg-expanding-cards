<?php
    $attributes_array = array();

    if( isset( $attributes['enableBorderRadius'] ) && $attributes['enableBorderRadius'] ) {
        array_push( $attributes_array, "hasBorderRadius" );
    }
    if( isset( $attributes['enableGap'] ) && $attributes['enableGap'] ) {
        array_push( $attributes_array,"hasEnableGap" );
    }
    
    $block_wrapper_attributes = get_block_wrapper_attributes( array(
        "class" => implode( ' ', $attributes_array )
    ) );
?>

<div 
    <?= $block_wrapper_attributes ?>
    style="--columns: <?= esc_attr( $attributes['columns'] ) ?>"
>
    <?= $content ?>
</div>