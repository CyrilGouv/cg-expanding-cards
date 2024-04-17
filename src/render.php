<?php
    $block_wrapper_attributes = get_block_wrapper_attributes();
?>

<div <?= $block_wrapper_attributes ?> style="--columns: <?= esc_attr( $attributes['columns'] ) ?>">
    <?= $content ?>
</div>