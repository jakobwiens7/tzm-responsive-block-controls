/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
    BaseControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	ToggleControl,
    PanelRow,
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
    const { responsiveControls, isStackedOnMobile } = attributes;

    const isHidden = !! responsiveControls?.[device]?.hidden;
    const setHidden = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        hidden: newValue 
    }});

    const isReverse = !! responsiveControls?.[device]?.reverse;
    const setReverse = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        reverse: newValue 
    }});

    //const isWidth = !! responsiveControls?.[device]?.width;
    const setWidth = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        width: newValue,
        customWidth: undefined
    }});

    //const isJustify = !! responsiveControls?.[device]?.justify;
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
                    help={ !! isStackedOnMobile ? __('Warning: "Stack on mobile" is currently enabled and may conflict with this setting.', "tzm-responsive-block-controls") : undefined }
                />
            </PanelRow>
        ) }

        { hasBlock.width && (
            <PanelRow className="responsive-width-control">
                <BaseControl __nextHasNoMarginBottom 
                    label={ __("Block width", "tzm-responsive-block-controls") }
                    className="responsive-controls__width"
                >
                    <ToggleGroupControl __next40pxDefaultSize __nextHasNoMarginBottom 
                        isDeselectable 
                        isBlock
                        value={ responsiveControls?.[device]?.width }
                        onChange={ (newValue) => setWidth(newValue) }
                    >
                        <ToggleGroupControlOption value={ 50 } label={ __("50%", "tzm-responsive-block-controls") }/>
                        <ToggleGroupControlOption value={ 66 } label={ __("66%", "tzm-responsive-block-controls") }/>
                        <ToggleGroupControlOption value={ 75 } label={ __("75%", "tzm-responsive-block-controls") }/>
                        <ToggleGroupControlOption value={ 100 } label={ __("100%", "tzm-responsive-block-controls") }/>
                    </ToggleGroupControl>
                </BaseControl>
            </PanelRow>
        ) }

        { hasBlock.justify && (
            <PanelRow className="responsive-justify-control">
                <BaseControl __nextHasNoMarginBottom 
                    label={ __("Block justification", "tzm-responsive-block-controls") }
                    className="responsive-controls__justify"
                >
                    <ToggleGroupControl __next40pxDefaultSize __nextHasNoMarginBottom 
                        isDeselectable 
                        isBlock
                        value={ responsiveControls?.[device]?.justify }
                        onChange={ (newValue) => setJustify(newValue) }
                    >
                        <ToggleGroupControlOptionIcon
                            icon={ iconJustifyLeft }
                            value={ "start" }
                            label={ __("Justify left", "tzm-responsive-block-controls") }
                        />
                        <ToggleGroupControlOptionIcon 
                            icon={ iconJustifyCenter }
                            value={ "center" }
                            label={ __("Justify center", "tzm-responsive-block-controls") }
                        />
                        <ToggleGroupControlOptionIcon
                            icon={ iconJustifyRight }
                            value={ "end" }
                            label={ __("Justify right", "tzm-responsive-block-controls") }
                        />
                        <ToggleGroupControlOptionIcon
                            icon={ iconJustifySpaceBetween }
                            value={ "space-between" }
                            label={ __("Space between blocks", "tzm-responsive-block-controls") }
                        />
                    </ToggleGroupControl>
                </BaseControl>
            </PanelRow>
        ) }

    </>
    );
}