import { __ } from "@wordpress/i18n"
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor"
import metadata from "../block.json"

import "./editor.scss"


export default function Edit({ attributes, setAttributes }) {

    const { columns } = attributes

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