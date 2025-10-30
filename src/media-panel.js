/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect, /*useDispatch*/ } from '@wordpress/data';

import {
    BaseControl,
    FocalPointPicker,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
    __experimentalUnitControl as UnitControl,
    __experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';


/**
 * Internal Dependencies
 */
import { addFallbackUnit } from './_utils';


export default function MediaPanel({props}) {

    const { device, attributes, updateAttribute, featuredImage, hasBlock } = props;
    const { responsiveControls } = attributes;

    const isImageAlign = !! responsiveControls?.[device]?.imageAlign;
    const setImageAlign = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        imageAlign: newValue
    }});

    const isMediaWidth = !! responsiveControls?.[device]?.mediaWidth;
    const setMediaWidth = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        mediaWidth: addFallbackUnit(newValue)
    }});

    const isFocalPoint = !! responsiveControls?.[device]?.focalPoint;
    const setFocalPoint = (newValue) => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        focalPoint: newValue
    }});

    const resetAll = () => updateAttribute({ ...responsiveControls, [device]: { ...responsiveControls?.[device], 
        imageAlign: undefined,
        mediaWidth: undefined,
        focalPoint: undefined
    }});


    // WIP
    //const { __unstableMarkNextChangeAsNotPersistent } = useDispatch( blockEditorStore );
    let mediaUrl = attributes.style?.background?.backgroundImage?.url ?? attributes.url ?? attributes.mediaUrl;

    if (attributes.useFeaturedImage) {
        const media = useSelect(
            ( select ) => featuredImage && select( coreStore ).getMedia( featuredImage, { context: 'view' } ),
            [ featuredImage ]
        );
        mediaUrl = media?.source_url;
    }


    return (
        <ToolsPanel label={ __( 'Media', "tzm-responsive-block-controls" ) } resetAll={ resetAll }>

            { hasBlock.mediaAlign && (
                <ToolsPanelItem isShownByDefault
                    label={ __("Alignment", "tzm-responsive-block-controls") }
                    hasValue={ () => isImageAlign }
                    onDeselect={ () => setImageAlign() }
                >
                    <BaseControl __nextHasNoMarginBottom 
                        label={ __("Alignment", "tzm-responsive-block-controls") }
                        className="responsive-controls__image-align"
                    >
                        <ToggleGroupControl __next40pxDefaultSize __nextHasNoMarginBottom
                            isDeselectable
                            isBlock
                            onChange={ (newValue) => setImageAlign(newValue) }
                            value={ responsiveControls?.[device]?.imageAlign }
                        >
                            <ToggleGroupControlOptionIcon 
                                icon="align-left" 
                                label={ __("Align left", "tzm-responsive-block-controls") }
                                value={ "left" }
                            />
                            <ToggleGroupControlOptionIcon
                                icon="align-center" 
                                label={ __("Align centered", "tzm-responsive-block-controls") }
                                value={ "center" }
                            />
                            <ToggleGroupControlOptionIcon
                                icon="align-right" 
                                label={ __("Align right", "tzm-responsive-block-controls") }
                                value={ "right" }
                            />
                        </ToggleGroupControl>
                    </BaseControl>
                </ToolsPanelItem>
            ) }

            { hasBlock.mediaWidth && (
                <ToolsPanelItem isShownByDefault
                    label={ __("Width", "tzm-responsive-block-controls") }
                    hasValue={ () => isMediaWidth }
                    onDeselect={ () => setMediaWidth() }
                >
                    <UnitControl __next40pxDefaultSize
                        label={ __("Width", "tzm-responsive-block-controls") }
                        min={0}
                        onChange={ (newValue) => setMediaWidth(newValue) }
                        value={ responsiveControls?.[device]?.mediaWidth }
                    />
                </ToolsPanelItem>
            ) }

            { hasBlock.focalPoint && (
                <ToolsPanelItem 
                    isShownByDefault={ ! hasBlock.mediaAlign && ! hasBlock.mediaWidth }
                    label={ __("Focal point", "tzm-responsive-block-controls") }
                    hasValue={ () => isFocalPoint }
                    onDeselect={ () => setFocalPoint() }
                >
                    <FocalPointPicker __nextHasNoMarginBottom
                        label={ __("Focal point", "tzm-responsive-block-controls") }
                        url={ mediaUrl }
                        value={ responsiveControls?.[device]?.focalPoint }
                        onChange={ (newValue) => setFocalPoint(newValue) }
                    />
                </ToolsPanelItem>
            ) }

        </ToolsPanel>
    );
}