/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
    BaseControl,
	Button, 
	ButtonGroup,
    PanelRow,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { 
	justifyCenter as iconJustifyCenter,
	justifyLeft as iconJustifyLeft,
	justifyRight as iconJustifyRight,
	justifySpaceBetween as iconJustifySpaceBetween,
	//justifyStretch as iconJustifyStretch 
} from '@wordpress/icons';

/**
 * Internal Dependencies
 */
import { addFallbackUnit } from './_utils';


export default function LayoutPanel({
    isBlockType,
    isParentBlock,
    device,
    responsiveControls,
    updateAttribute
}) {

    const isHidden = !! responsiveControls?.[device]?.hidden;
    const setHidden = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        hidden: newValue 
    }});

    // WIP: 'Full Width' is now deprecated
    /*const isFullWidth = !! responsiveControls?.[device]?.fullWidth;
    const setFullWidth = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        fullWidth: newValue 
    }});*/

    const isWidth = !! responsiveControls?.[device]?.width;
    const setWidth = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        width: newValue,
        customWidth: undefined
    }});

    const isReverse = !! responsiveControls?.[device]?.reverse;
    const setReverse = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        reverse: newValue 
    }});

    const isJustify = !! responsiveControls?.[device]?.justify;
    const setJustify = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
            justify: newValue
    }});

    const isImageAlign = !! responsiveControls?.[device]?.imageAlign;
    const setImageAlign = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        imageAlign: newValue
    }});

    const resetAll = () => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        width: undefined,
        //fullwidth: undefined, 
        reverse: undefined,
        justify: undefined
    }});

    // WIP
    //console.log(responsiveControls?.[device]);
    // WIP

    return (
    <>
        <PanelRow className="responsive-hide-control">
            <ToggleControl __nextHasNoMarginBottom
                label={ __('Hide block', "tzm-responsive-block-controls") }
                checked={ isHidden }
                onChange={ setHidden }
            />
        </PanelRow>

        { (!! isBlockType.flexWidth || !! isBlockType.reverse || !! isBlockType.justify || !! isBlockType.image) && (
        <ToolsPanel label={ __( 'Layout settings', "tzm-responsive-block-controls" ) } resetAll={ resetAll } >

            { !! isBlockType.flexWidth && (
            <ToolsPanelItem isShownByDefault
                label={ __("Width", "tzm-responsive-block-controls") } 
                hasValue={ () => isWidth }
                onDeselect={ () => setWidth() }
            >
                <ButtonGroup>
                    <Button __next40pxDefaultSize
                        size="small"
                        label={ __("50%", "tzm-responsive-block-controls") }
                        isPressed={ responsiveControls?.[device]?.width == 50 }
                        onClick={ () => setWidth(responsiveControls?.[device]?.width == 50 ? undefined : 50) }
                    >{ __("50%", "tzm-responsive-block-controls") }</Button>
                    <Button __next40pxDefaultSize
                        size="small"
                        label={ __("66%", "tzm-responsive-block-controls") }
                        isPressed={ responsiveControls?.[device]?.width == 66 }
                        onClick={ () => setWidth(responsiveControls?.[device]?.width == 66 ? undefined : 66) }
                    >{ __("66%", "tzm-responsive-block-controls") }</Button>
                    <Button __next40pxDefaultSize
                        size="small"
                        label={ __("75%", "tzm-responsive-block-controls") }
                        isPressed={ responsiveControls?.[device]?.width == 75 }
                        onClick={ () => setWidth(responsiveControls?.[device]?.width == 75 ? undefined : 75) }
                    >{ __("75%", "tzm-responsive-block-controls") }</Button>
                    <Button __next40pxDefaultSize
                        size="small"
                        label={ __("100%", "tzm-responsive-block-controls") }
                        isPressed={ responsiveControls?.[device]?.width == 100 }
                        onClick={ () => setWidth(responsiveControls?.[device]?.width == 100 ? undefined : 100) }
                    >{ __("100%", "tzm-responsive-block-controls") }</Button>
                </ButtonGroup>
            </ToolsPanelItem>
        ) }

        { !! isBlockType.reverse && (
            <ToolsPanelItem isShownByDefault
                label={ __("Reverse order", "tzm-responsive-block-controls") } 
                hasValue={ () => isReverse }
                onDeselect={ () => setReverse() }
            >
                <ToggleControl
                    label={ __("Reverse order", "tzm-responsive-block-controls") }
                    checked={ isReverse }
                    onChange={ setReverse }
                />
            </ToolsPanelItem>
        ) }

        { !! isBlockType.justify && (
            <ToolsPanelItem isShownByDefault
                label={ __("Block justification", "tzm-responsive-block-controls") } 
                hasValue={ () => isJustify }
                onDeselect={ () => setJustify() }
            >
                <BaseControl __nextHasNoMarginBottom 
                    label={ __("Block justification", "tzm-responsive-block-controls") }
                    className="responsive-controls__justify"
                >
                    <ButtonGroup>
                        <Button __next40pxDefaultSize icon={ iconJustifyLeft }
                            label={ __("Justify left", "tzm-responsive-block-controls") }
                            isPressed={ responsiveControls?.[device]?.justify == 'start' }
                            onClick={ () => setJustify(responsiveControls?.[device]?.justify == 'start' ? undefined : 'start') }
                        />
                        <Button __next40pxDefaultSize icon={ iconJustifyCenter }
                            label={ __("Justify center", "tzm-responsive-block-controls") }
                            isPressed={ responsiveControls?.[device]?.justify == 'center' }
                            onClick={ () => setJustify(responsiveControls?.[device]?.justify == 'center' ? undefined : 'center') }
                        />
                        <Button __next40pxDefaultSize icon={ iconJustifyRight }
                            label={ __("Justify right", "tzm-responsive-block-controls") }
                            isPressed={ responsiveControls?.[device]?.justify == 'end' }
                            onClick={ () => setJustify(responsiveControls?.[device]?.justify == 'end' ? undefined : 'end') }
                        />
                        <Button __next40pxDefaultSize icon={ iconJustifySpaceBetween }
                            label={ __("Space between blocks", "tzm-responsive-block-controls") }
                            isPressed={ responsiveControls?.[device]?.justify == 'space-between' }
                            onClick={ () => setJustify(responsiveControls?.[device]?.justify == 'space-between' ? undefined : 'space-between') }
                        />
                    </ButtonGroup>
                </BaseControl>
            </ToolsPanelItem>
        ) }
        { !! isBlockType.image && isParentBlock?.name !== 'core/gallery' && (
            <ToolsPanelItem isShownByDefault
                label={ __("Image alignment", "tzm-responsive-block-controls") }
                hasValue={ () => isImageAlign }
                onDeselect={ () => setImageAlign() }
            >
                <BaseControl __nextHasNoMarginBottom 
                    label={ __("Image alignment", "tzm-responsive-block-controls") }
                >
                    <ButtonGroup>
                        <Button __next40pxDefaultSize icon="align-left" 
                            label={ __("Align image left", "tzm-responsive-block-controls") }
                            isPressed={ responsiveControls?.[device]?.imageAlign == 'left' }
                            onClick={ () => setImageAlign(responsiveControls?.[device]?.imageAlign == 'left' ? undefined : 'left') }
                        />
                        <Button __next40pxDefaultSize icon="align-center" 
                            label={ __("Align image centered", "tzm-responsive-block-controls") }
                            isPressed={ responsiveControls?.[device]?.imageAlign == 'center' }
                            onClick={ () => setImageAlign(responsiveControls?.[device]?.imageAlign == 'center' ? undefined : 'center') }
                        />
                        <Button __next40pxDefaultSize icon="align-right" 
                            label={ __("Align image right", "tzm-responsive-block-controls") }
                            isPressed={ responsiveControls?.[device]?.imageAlign == 'right' }
                            onClick={ () => setImageAlign(responsiveControls?.[device]?.imageAlign == 'right' ? undefined : 'right') }
                        />
                    </ButtonGroup>
                </BaseControl>
            </ToolsPanelItem>
        ) }
    </ToolsPanel>
    ) }
    </>
    );
}