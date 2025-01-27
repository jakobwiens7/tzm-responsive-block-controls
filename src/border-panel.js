/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { 
    __experimentalBorderRadiusControl as BorderRadiusControl
} from '@wordpress/block-editor';



/**
 * Internal Dependencies
 */
import { validateBoxValue, splitStyleValue } from './_utils';


export default function BorderPanel({props}) {

    const { device, attributes, updateAttribute } = props;
    const { responsiveControls } = attributes;

    const borderRadiusValues = splitStyleValue( responsiveControls?.[device]?.borderRadius, true );

    const hasBorderRadius = !! responsiveControls?.[device]?.borderRadius;
    const setBorderRadius = (newValue) => 
        updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
            //borderRadius: validateBoxValue(newValue)
            borderRadius: splitStyleValue(newValue, true)
        }});

    const resetAll = () => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        borderRadius: undefined
    }});
    
    return (
    <>
        <ToolsPanel label={ __( 'Border' ) } resetAll={ resetAll }>
				<ToolsPanelItem
                    label={ __( 'Radius' ) }
					hasValue={ () => hasBorderRadius }
					onDeselect={ () => setBorderRadius() }
					isShownByDefault
				>
					{ <BorderRadiusControl
						values={ borderRadiusValues }
						onChange={ setBorderRadius }
					/> }
				</ToolsPanelItem>

        </ToolsPanel>
    </>
    );
}