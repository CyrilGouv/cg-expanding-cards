import { __ } from "@wordpress/i18n"
import { useBlockProps } from "@wordpress/block-editor"
import metadata from "../block.json"

import "./editor.scss"


export default function Edit() {
    return (
        <p { ...useBlockProps() }>
            { __("Welcome to expanding cards!", metadata.textdomain) }
        </p>
    )
}