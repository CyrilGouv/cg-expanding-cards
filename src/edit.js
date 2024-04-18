import { useEffect } from "react"
import { __ } from "@wordpress/i18n"
import { useBlockProps, InnerBlocks, BlockControls } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { useState } from "@wordpress/element"
import { ToolbarGroup, ToolbarButton } from "@wordpress/components"
import metadata from "../block.json"

import "./editor.scss"


export default function Edit({ attributes, setAttributes, clientId }) {

    // Attributes
    const { columns } = attributes

    // States
    const [preview, setPreview] = useState(false)

    // Get all inner blocks
    const selectInnerBlocks = useSelect(select => {
        const { getBlocksByClientId } = select("core/block-editor")
        const block = getBlocksByClientId(clientId)?.[0]
        
        return block?.innerBlocks
    }, [clientId])

    // Handle columns attributes according to the num of inner blocks
    useEffect(() => {
        setAttributes({ columns: selectInnerBlocks.length })
    }, [selectInnerBlocks])

    // Render
    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        label={ __("Preview", metadata.textdomain) }
                        icon={ !preview ? "admin-customizer" : "welcome-view-site" }
                        onClick={ () => setPreview(!preview) }
                    />
                </ToolbarGroup>
            </BlockControls>

            <div { ...useBlockProps() } style={{ "--columns": columns }}>
                { !preview && (
                    <InnerBlocks 
                        allowedBlocks={ ["core/image"] }
                        orientation="horizontal"
                        template={[
                            ["core/image"],
                            ["core/image"],
                            ["core/image"]
                        ]}
                    />
                ) }

                { preview && (
                    <div className="isPreviewed">
                        
                    </div>
                ) }
            </div>
        </>
    )
}