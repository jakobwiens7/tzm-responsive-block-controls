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
import { addFallbackUnit, splitStyleValue, validateBoxValue } from './_utils';


export default function DimensionsPanel({props}) {

    const { device, attributes, updateAttribute, hasBlock, hasInnerBlocks, units } = props;
    const { responsiveControls } = attributes;

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

    const isMinHeight = !! responsiveControls?.[device]?.minHeight;
    const setMinHeight = (newValue) => 
        updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
            minHeight: addFallbackUnit(newValue),
        }});

    const isBlockGap = !! responsiveControls?.[device]?.blockGap;
    const setBlockGap = (newValue) => 
        updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
            blockGap: validateBoxValue(newValue),
        }});

    const resetAll = () => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        padding: undefined,
        margin: undefined,
        customWidth: undefined,
        height: undefined,
        blockGap: undefined
    }});
    

    return (
        <ToolsPanel label={ __("Dimensions") } resetAll={ resetAll } >

            { hasBlock.padding && (
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
            ) }

            { hasBlock.margin && (
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
                        sides={ hasInnerBlocks ? ['top', 'bottom']: null }
                    />
                </ToolsPanelItem>
            ) }

            { hasBlock.blockGap && (
                <ToolsPanelItem
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
            ) }

            { hasBlock.minHeight && (
                <ToolsPanelItem
                    label={ __("Minimum height") }
                    hasValue={ () => isMinHeight }
                    onDeselect={ () => setMinHeight() }
                >
                    <HeightControl
                        label={ __("Minimum height") }
                        onChange={ setMinHeight }
                        value={ responsiveControls?.[device]?.minHeight }
                    />
                </ToolsPanelItem>
            ) }

        </ToolsPanel>
    );
}