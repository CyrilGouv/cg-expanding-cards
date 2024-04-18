import { useBlockProps, InnerBlocks, useInnerBlocksProps } from "@wordpress/block-editor"

import "./style.scss"


export default function save({ attributes }) {

    const { columns, enableBorderRadius, enableGap } = attributes
    const blockProps = useBlockProps.save()
    const { children } =  useInnerBlocksProps.save(blockProps)

    return children
}