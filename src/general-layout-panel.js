/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
    BaseControl,
	Button, 
	ButtonGroup,
	ToggleControl,
	Dashicon,
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
//import { cleanEmptyObject } from './_utils';


export default function GeneralLayoutPanel({
    isBlockType,
    device,
    responsiveControls,
    updateAttribute
}) {
        
    const isHidden = !! responsiveControls?.[device]?.hidden;
    const setHidden = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        hidden: newValue 
    }});
    
    const isFullWidth = !! responsiveControls?.[device]?.fullWidth;
    const setFullWidth = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        fullWidth: newValue 
    }});

    const isReverse = !! responsiveControls?.[device]?.reverse;
    const setReverse = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        reverse: newValue 
    }});

    const isJustify = !! responsiveControls?.[device]?.justify;
    const setJustify = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
            justify: newValue
    }});

    const resetAll = () => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        hidden: undefined, 
        fullwidth: undefined, 
        reverse: undefined,
        justify: undefined
    }});
    

    return (
        <ToolsPanel label={ __( 'General & Layout', "tzm-responsive-block-controls" ) } resetAll={ resetAll } >
        
            <ToolsPanelItem isShownByDefault
                label={ __('Hide block', "tzm-responsive-block-controls") }
                hasValue={ () => isHidden }
                onDeselect={ () => setHidden() }
            >
                <ToggleControl
                    label={ __('Hide block', "tzm-responsive-block-controls") }
                    checked={ isHidden }
                    onChange={ setHidden }
                />
                <Dashicon icon="visibility"/>
            </ToolsPanelItem>

            <ToolsPanelItem isShownByDefault
                label={ __("Full width", "tzm-responsive-block-controls") }
                hasValue={ () => isFullWidth }
                onDeselect={ () => setFullWidth() }
            >
                <ToggleControl
                    label={ __("Full width", "tzm-responsive-block-controls") }
                    checked={ isFullWidth }
                    onChange={ setFullWidth }
                />
                <Dashicon icon="align-full-width" />
            </ToolsPanelItem>

        { !! isBlockType.reversable && (
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
                <Dashicon icon="randomize" />
            </ToolsPanelItem>
        ) }

        { !! isBlockType.flex && (
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

    </ToolsPanel>
    );
}