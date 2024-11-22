/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
    BaseControl,
	Button, 
	ButtonGroup,
	ToggleControl,
    PanelRow,
	//__experimentalToolsPanel as ToolsPanel,
	//__experimentalToolsPanelItem as ToolsPanelItem,
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
//import { addFallbackUnit } from './_utils';


export default function GeneralPanel({props}) {

    const { device, attributes, updateAttribute, hasBlock } = props;
    const { responsiveControls } = attributes;

    const isHidden = !! responsiveControls?.[device]?.hidden;
    const setHidden = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        hidden: newValue 
    }});

    const isReverse = !! responsiveControls?.[device]?.reverse;
    const setReverse = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        reverse: newValue 
    }});

    const isWidth = !! responsiveControls?.[device]?.width;
    const setWidth = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        width: newValue,
        customWidth: undefined
    }});

    const isJustify = !! responsiveControls?.[device]?.justify;
    const setJustify = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
            justify: newValue
    }});


    return (
    <>
        <PanelRow className="responsive-hide-control">
            <ToggleControl __nextHasNoMarginBottom
                label={ __('Hide block', "tzm-responsive-block-controls") }
                checked={ isHidden }
                onChange={ setHidden }
            />
        </PanelRow>

        { hasBlock.reverse && (
            <PanelRow className="responsive-reverse-control">
                <ToggleControl
                    label={ __("Reverse order", "tzm-responsive-block-controls") }
                    checked={ isReverse }
                    onChange={ setReverse }
                />
            </PanelRow>
        ) }

        { hasBlock.width && (
            <PanelRow className="responsive-width-control">
                <BaseControl __nextHasNoMarginBottom 
                    label={ __("Block width", "tzm-responsive-block-controls") }
                    className="responsive-controls__width"
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
                </BaseControl>
            </PanelRow>
        ) }

        { hasBlock.justify && (
            <PanelRow className="responsive-justify-control">
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
            </PanelRow>
        ) }

    </>
    );
}