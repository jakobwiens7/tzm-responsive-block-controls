/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
    BaseControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
    __experimentalUnitControl as UnitControl,
} from '@wordpress/components';


/**
 * Internal Dependencies
 */
import { addFallbackUnit } from './_utils';


export default function TypographyPanel({props}) {

    const { device, attributes, updateAttribute, hasBlock, units } = props;
    const { responsiveControls } = attributes;

    const isTextAlign = !! responsiveControls?.[device]?.textAlign;
    const setTextAlign = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        textAlign: newValue
    }});

    const isFontSize = !! responsiveControls?.[device]?.fontSize;
    const setFontSize = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        fontSize: addFallbackUnit(newValue) 
    }});
    
    const resetAll = () => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        textAlign: undefined,
        fontSize: undefined
    }});


    return (
        <ToolsPanel label={ __( "Typography" ) } resetAll={ resetAll } >

            { hasBlock.textAlign && (
                <ToolsPanelItem isShownByDefault
                    label={ __('Text alignment', "tzm-responsive-block-controls") }
                    hasValue={ () => isTextAlign }
                    onDeselect={ () => setTextAlign() }
                >
                    <BaseControl __nextHasNoMarginBottom 
                        className="responsive-controls__text-align"
                        label={ __("Text alignment", "tzm-responsive-block-controls") }
                    >
                        <ToggleGroupControl __next40pxDefaultSize __nextHasNoMarginBottom 
                            isDeselectable 
                            isBlock
                            value={ responsiveControls?.[device]?.textAlign }
                            onChange={ (newValue) => setTextAlign(newValue) }
                        >
                            <ToggleGroupControlOptionIcon 
                                icon="editor-alignleft" 
                                value={ "left" }
                                label={ __("Align text left") }
                            />
                            <ToggleGroupControlOptionIcon 
                                icon="editor-aligncenter" 
                                value={ "center" }
                                label={ __("Align text center") }
                            />
                            <ToggleGroupControlOptionIcon 
                                icon="editor-alignright" 
                                value={ "right" }
                                label={ __("Align text right") }
                            />
                            <ToggleGroupControlOptionIcon 
                                icon="editor-justify" 
                                value={ "justify" }
                                label={ __("Align text justify", "tzm-responsive-block-controls") }
                            />
                        </ToggleGroupControl>
                    </BaseControl>
                </ToolsPanelItem>
            ) }

        { hasBlock.fontSize && (
            <ToolsPanelItem
                label={ __("Font size") }
                hasValue={ () => isFontSize }
                onDeselect={ () => setFontSize() }
            >
                <UnitControl __next40pxDefaultSize
                    label={ __("Font size") }
                    onChange={ setFontSize }
                    value={ responsiveControls?.[device]?.fontSize }
                    units={ units }
                />
            </ToolsPanelItem>
        ) }

        </ToolsPanel>
    );
}