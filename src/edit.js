import { useEffect } from "react"
import { __ } from "@wordpress/i18n"
import { useBlockProps, InnerBlocks, BlockControls, InspectorControls } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { useState, useRef } from "@wordpress/element"
import { ToolbarGroup, ToolbarButton, PanelBody, ToggleControl } from "@wordpress/components"
import metadata from "../block.json"

import "./editor.scss"


export default function Edit({ attributes, setAttributes, clientId }) {

    // Attributes
    const { columns, enableBorderRadius, enableGap } = attributes

    // States
    const [preview, setPreview] = useState(false)
    const [previewActiveImg, setPreviewActiveImg] = useState(0)

    // Elements reference
    const wrapperEl = useRef(null)

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

    // Handle active image according to the state
    useEffect(() => {
        handleActiveImg()
    }, [preview, previewActiveImg])

    const handleActiveImg = () => {
        if(wrapperEl.current) {
            Array.from(wrapperEl.current?.children).map(item => item.classList.remove("isActive"))
            wrapperEl.current?.children[previewActiveImg].classList.add("isActive")
        }
    }

    
    // Render
    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={ __("Images Border Radius", metadata.textdomain) }
                    initialOpen={ true }
                >
                    <div style={{ display: "flex" }}>
                        <ToggleControl 
                            checked={ enableBorderRadius }
                            onChange={ () => setAttributes({ enableBorderRadius: !enableBorderRadius }) }
                        />
                        <span>{ __("Enable border radius", metadata.textdomain) }</span>
                    </div>
                </PanelBody>

                <PanelBody
                    title={ __("Images Gap", metadata.textdomain) }
                    initialOpen={ true }
                >
                    <div style={{ display: "flex" }}>
                        <ToggleControl 
                            checked={ enableGap }
                            onChange={ () => setAttributes({ enableGap: !enableGap }) }
                        />
                        <span>{ __("Enable gap between images", metadata.textdomain) }</span>
                    </div>
                </PanelBody>
            </InspectorControls>

            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        label={ __("Preview", metadata.textdomain) }
                        icon={ !preview ? "admin-customizer" : "welcome-view-site" }
                        onClick={ () => setPreview(!preview) }
                    />
                </ToolbarGroup>
            </BlockControls>

            <div { ...useBlockProps({
                className: [enableBorderRadius ? "hasBorderRadius" : "", enableGap ? "hasEnableGap" : ""]
            }) } style={{ "--columns": columns }}>
                { !preview && (
                    <InnerBlocks 
                        allowedBlocks={ ["core/image"] }
                        orientation="horizontal"
                        template={[
                            ["core/image"],
                            ["core/image"]
                        ]}
                    />
                ) }

                { preview && (
                    <div 
                        className="preview-mode"
                        ref={ wrapperEl }
                    >
                        
                        { selectInnerBlocks.map((innerBlock, idx) => (
                            <figure 
                                key={ innerBlock.clientId }
                                className="wp-block-image"
                                onClick={ () => setPreviewActiveImg(idx) }
                            >
                                <img 
                                    src={ innerBlock.attributes.url }
                                    alt={ innerBlock.attributes.alt }
                                />
                            </figure>
                        )) }
                    </div>
                ) }
            </div>
        </>
    )
}