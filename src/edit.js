import { __ } from "@wordpress/i18n"
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import metadata from "../block.json"

import "./editor.scss"
import { useEffect } from "react"


export default function Edit({ attributes, setAttributes, clientId }) {

    const { columns } = attributes

    const selectInnerBlocks = useSelect(select => {
        const { getBlocksByClientId } = select("core/block-editor")
        const block = getBlocksByClientId(clientId)?.[0]
        
        return block?.innerBlocks
    }, [clientId])

    useEffect(() => {
        setAttributes({ columns: selectInnerBlocks.length })
        console.log(columns)
    }, [selectInnerBlocks])

    return (
        <div { ...useBlockProps() } style={{ "--columns": columns }}>
            <InnerBlocks 
                allowedBlocks={ ["core/image"] }
                orientation="horizontal"
                template={[
                    ["core/image"],
                    ["core/image"],
                    ["core/image"]
                ]}
            />
        </div>
    )
}