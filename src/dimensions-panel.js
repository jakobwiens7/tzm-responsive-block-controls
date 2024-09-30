/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
    __experimentalBoxControl as BoxControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { HeightControl } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import { addFallbackUnit, splitStyleValue } from './_utils';


// Validates and ensures that box-related values have the appropriate fallback units.
function validateBoxValue( value ) {       
	// Handle object with top, right, bottom, left or a single value
	if ( typeof value === 'object' && value !== null ) {
		const paddedVal = {};

		// Ensure that each side has a fallback unit
		for (let side in value) {
			paddedVal[side] = addFallbackUnit(value[side]);
		}

		// Check if any of the box sides have values, otherwise set to undefined
		return Object.values(paddedVal).some(val => val !== undefined) ? paddedVal : undefined;

	} else {
		// Ensure that the single padding/margin value has a fallback unit
		return addFallbackUnit(value);
	}
}


export default function DimensionsPanel({
    isBlockType,
    units,
    device,
    responsiveControls,
    updateAttribute
}) {

    const paddingValues = splitStyleValue( responsiveControls?.[device]?.padding );
    const marginValues = splitStyleValue( responsiveControls?.[device]?.margin );

    const isPadding = !! responsiveControls?.[device]?.padding;
    const setPadding = (newValue) => 
        updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
            padding: validateBoxValue(newValue),
        }});

    const isMargin = !! responsiveControls?.[device]?.margin;
    const setMargin = (newValue) => 
        updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
            margin: validateBoxValue(newValue),
        }});

    const isHeight = !! responsiveControls?.[device]?.height;
    const setHeight = (newValue) => 
        updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
            height: addFallbackUnit(newValue),
        }});

    const isBlockGap = !! responsiveControls?.[device]?.blockGap;
    const setBlockGap = (newValue) => 
        updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
            blockGap: validateBoxValue(newValue),
        }});

    const resetAll = () => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        padding: undefined,
        margin: undefined,
        height: undefined,
        blockGap: undefined
    }});
    

    return (
        <ToolsPanel label={ __("Dimensions") } resetAll={ resetAll } >
            
            <ToolsPanelItem isShownByDefault
                label={ __("Padding") }
                hasValue={ () => isPadding }
                onDeselect={ () => setPadding() }
            >
                <BoxControl __next40pxDefaultSize
                    allowReset={ false }
                    label={ __("Padding") }
                    values={ paddingValues }
                    units={ units }
                    onChange={ setPadding }
                />
            </ToolsPanelItem>

            <ToolsPanelItem isShownByDefault
                label={ __("Margin") }
                hasValue={ () => isMargin }
                onDeselect={ () => setMargin() }
            >
                <BoxControl __next40pxDefaultSize
                    allowReset={ false }
                    label={ __("Margin") }
                    inputProps={{ min: -999 }}
                    values={ marginValues }
                    units={ units }
                    onChange={ setMargin }
                    sides={ isBlockType.container ? ['top', 'bottom']: null }
                />
            </ToolsPanelItem>

            <ToolsPanelItem isShownByDefault
                label={ __("Block spacing") }
                hasValue={ () => isBlockGap }
                onDeselect={ () => setBlockGap() }
            >
                <BoxControl __next40pxDefaultSize
                    id="responsive-block-gap-control"
                    allowReset={ false }
                    label={ __("Block spacing") }
                    values={ responsiveControls?.[device]?.blockGap }
                    units={ units }
                    onChange={ setBlockGap }
                    sides={ ['top'] }
                />
            </ToolsPanelItem>

            <ToolsPanelItem isShownByDefault
                label={ __("Minimum height") }
                hasValue={ () => isHeight }
                onDeselect={ () => setHeight() }
            >
                <HeightControl
                    label={ __("Minimum height") }
                    onChange={ setHeight }
                    value={ responsiveControls?.[device]?.height }
                />
            </ToolsPanelItem>

        </ToolsPanel>
    );
}