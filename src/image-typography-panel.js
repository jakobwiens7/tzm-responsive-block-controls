/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
    BaseControl,
	Button, 
	ButtonGroup,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
    __experimentalUnitControl as UnitControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { addFallbackUnit } from './_utils';

export default function ImageTypographyPanel({
    isBlockType,
    units,
    device,
    responsiveControls,
    updateAttribute
}) {

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
        <ToolsPanel label={ __( "Image & Typography", "tzm-responsive-block-controls" ) } resetAll={ resetAll } >

            { isBlockType.image ? (
                <ToolsPanelItem isShownByDefault
                    label={ __("Image alignment", "tzm-responsive-block-controls") }
                    hasValue={ () => isTextAlign }
                    onDeselect={ () => setTextAlign() }
                >
                    <BaseControl __nextHasNoMarginBottom label={ __("Image alignment", "tzm-responsive-block-controls") }>
                        <ButtonGroup>
                            <Button __next40pxDefaultSize icon="align-left" 
                                label={ __("Align image left", "tzm-responsive-block-controls") }
                                isPressed={ responsiveControls?.[device]?.textAlign == 'left' }
                                onClick={ () => setTextAlign(responsiveControls?.[device]?.textAlign == 'left' ? undefined : 'left') }
                            />
                            <Button __next40pxDefaultSize icon="align-center" 
                                label={ __("Align image centered", "tzm-responsive-block-controls") }
                                isPressed={ responsiveControls?.[device]?.textAlign == 'center' }
                                onClick={ () => setTextAlign(responsiveControls?.[device]?.textAlign == 'center' ? undefined : 'center') }
                            />
                            <Button __next40pxDefaultSize icon="align-right" 
                                label={ __("Align image right", "tzm-responsive-block-controls") }
                                isPressed={ responsiveControls?.[device]?.textAlign == 'right' }
                                onClick={ () => setTextAlign(responsiveControls?.[device]?.textAlign == 'right' ? undefined : 'right') }
                            />
                        </ButtonGroup>
                    </BaseControl>
                </ToolsPanelItem>
            ) : (
                <ToolsPanelItem isShownByDefault
                    label={ __('Text alignment', "tzm-responsive-block-controls") }
                    hasValue={ () => isTextAlign }
                    onDeselect={ () => setTextAlign() }
                >
                    <BaseControl __nextHasNoMarginBottom label={ __("Text alignment", "tzm-responsive-block-controls") }>
                        <ButtonGroup>
                            <Button __next40pxDefaultSize icon="editor-alignleft" 
                                label={ __("Align text left") }
                                isPressed={ responsiveControls?.[device]?.textAlign == 'left' }
                                onClick={ () => setTextAlign(responsiveControls?.[device]?.textAlign == 'left' ? undefined : 'left') }
                            />
                            <Button __next40pxDefaultSize icon="editor-aligncenter" 
                                label={ __("Align text center") }
                                isPressed={ responsiveControls?.[device]?.textAlign == 'center' }
                                onClick={ () => setTextAlign(responsiveControls?.[device]?.textAlign == 'center' ? undefined : 'center') }
                            />
                            <Button __next40pxDefaultSize icon="editor-alignright" 
                                label={ __("Align text right") }
                                isPressed={ responsiveControls?.[device]?.textAlign == 'right' }
                                onClick={ () => setTextAlign(responsiveControls?.[device]?.textAlign == 'right' ? undefined : 'right') }
                            />
                            <Button __next40pxDefaultSize icon="editor-justify" 
                                label={ __("Align text justify", "tzm-responsive-block-controls") }
                                isPressed={ responsiveControls?.[device]?.textAlign == 'justify' }
                                onClick={ () => setTextAlign(responsiveControls?.[device]?.textAlign == 'justify' ? undefined : 'justify') }
                            />
                        </ButtonGroup>
                    </BaseControl>
                </ToolsPanelItem>
            ) }

        <ToolsPanelItem isShownByDefault
                label={ __("Font size") }
                hasValue={ () => isFontSize }
                onDeselect={ () => setFontSize() }
            >
                <UnitControl
                    __next40pxDefaultSize
                    label={ __("Font size") }
                    onChange={ setFontSize }
                    value={ responsiveControls?.[device]?.fontSize }
                    units={ units }
                />
            </ToolsPanelItem>

        </ToolsPanel>
    );
}