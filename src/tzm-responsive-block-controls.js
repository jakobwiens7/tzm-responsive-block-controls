/**
 * External Dependencies
 */
import clsx from 'clsx';
const { assign, kebabCase, merge } = lodash;

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { registerPlugin } from '@wordpress/plugins';
import { PluginMoreMenuItem } from '@wordpress/editor';
import { check } from '@wordpress/icons';

import {
	InspectorControls,	
	useSettings,
	//useBlockEditContext 
} from '@wordpress/block-editor';

import {
	TabPanel,
	PanelBody,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { 
	cleanEmptyObject,
	hasNestedValue,
} from './_utils';

import { 
	hasBlockReverse, 
	hasBlockJustify, 
	hasBlockWidth, 
	hasBlockMediaWidth, 
	hasBlockMediaAlign, 
	hasBlockFocalPoint,
	hasBlockTextAlign,
	hasBlockFontSize,
	hasBlockPadding,
	hasBlockMargin,
	hasBlockGap,
	hasBlockMinHeight,
	hasBlockBorder
} from './_supports';

import GeneralPanel from './general-panel';
import MediaPanel from './media-panel';
import TypographyPanel from './typography-panel';
import DimensionsPanel from './dimensions-panel';
import BorderPanel from './border-panel';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import './style.scss';


/**
 * Add custom attributes for responsive settings.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function addResponsiveAttributes( settings ) {
	// check if object exists for old Gutenberg version compatibility
	if (typeof settings.attributes !== 'undefined') {
		return assign( {}, settings, {
			attributes: merge(settings.attributes, {
				responsiveControls: {
					type: 'object',
					default: null
				}
			})
		});
	}
	return settings;
}


/**
 * Add responsive controls on Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
const withResponsiveControls = createHigherOrderComponent( (BlockEdit) => {
	return (props) => {

		const {
			attributes,
			setAttributes,
			clientId,
			isSelected,
			context: { postId, postType },
		} = props;
		
		const {
			responsiveControls
		} = attributes;		


		// Disable responsive controls panel in unsupported blocks
		if (
			props.name === "core/more" ||
			props.name === "core/nextpage"
		) {
			return <BlockEdit {...props} />
		}

		// Get additional block details
		const { parentProps, hasInnerBlocks } = useSelect((select) => {
			const { getBlockRootClientId, getBlock, getBlockListSettings } = select('core/block-editor');
			const parentClientId = getBlockRootClientId(clientId);

			const parentProps = getBlock(parentClientId) || false;
			const hasInnerBlocks = !! getBlockListSettings(clientId) || false;

			return { parentProps, hasInnerBlocks };
		}, [clientId]);

		// Get featured image
		const [ featuredImage ] = useEntityProp(
			'postType',
			postType,
			'featured_media',
			postId
		);

		// Get registered units
		const [ availableUnits ] = useSettings( 'spacing.units' );
		const units = useCustomUnits( {
			availableUnits: availableUnits || [ 'px', 'em', 'rem', 'vw', 'vh', '%' ]
		} );

		// Get displayHiddenBlocks setting
		const displayHiddenBlocks = useSelect(
			(select) => select('core/preferences').get('tzm', 'displayHiddenBlocks', true),
			[]
		);


		// ResponsiveBlockControls component
		function ResponsiveBlockControls( {	device } ) {

			// Define block feature support
			const hasBlock = {
				reverse: hasBlockReverse(props),
				justify: hasBlockJustify(props),
				width: hasBlockWidth(props, parentProps),
				mediaWidth: hasBlockMediaWidth(props, parentProps),
				mediaAlign: hasBlockMediaAlign(props, parentProps),
				focalPoint: hasBlockFocalPoint(props),
				textAlign: hasBlockTextAlign(props),
				fontSize: hasBlockFontSize(props),
				padding: hasBlockPadding(props),
				margin: hasBlockMargin(props),
				blockGap: hasBlockGap(props, parentProps, hasInnerBlocks),
				minHeight: hasBlockMinHeight(props, parentProps),
				border: hasBlockBorder(props),
			};

			// Clean and update 'responsiveControls' attribute
			function updateResponsiveAttribute( updatedResponsiveControls = {} ) {
				const cleanResponsiveControls = cleanEmptyObject(updatedResponsiveControls);
				setAttributes({ responsiveControls: cleanResponsiveControls });
			}

			// Initial tasks
			useEffect(() => {
				// Add 'tzm--hidden-blocks' class if preference is set
				const editorWrapper = document.querySelector('.editor-styles-wrapper');
				if (editorWrapper) editorWrapper.classList.toggle('tzm--hidden-blocks', !displayHiddenBlocks);

				// Convert deprecated 'height' to 'minHeight'
				if (!! responsiveControls?.[device]?.height) {
					console.log( 'TZM Responsive Block Controls: "height" attribute is now "minHeight. Converting attribute...' );

					updateResponsiveAttribute({ ...responsiveControls, [device]: { ...responsiveControls[device], 
						minHeight: responsiveControls[device].height,
						height: undefined,
					}});
				}

				// Convert deprecated 'fullWidth' to 'width'
				if (!! responsiveControls?.[device]?.fullWidth) {
					console.log( 'TZM Responsive Block Controls: "Full Width" control is deprecated. Converting attribute...' );

					updateResponsiveAttribute({ ...responsiveControls, [device]: { ...responsiveControls[device], 
						fullWidth: undefined,
						width: 100
					}});
				}

				// Reset responsive attributes if they're not supported
				const resetAttributes = {};
				Object.keys(hasBlock).forEach(key => {
					const controlForKey = responsiveControls?.[device]?.[key];
					
					if (!! controlForKey && ! hasNestedValue(controlForKey) && ! hasBlock[key]) {
						resetAttributes[key] = undefined;
						//console.log(`Resetting "${key}" in ${props.name}...`);
					}
				});
				if (Object.keys(resetAttributes).length > 0) {
					updateResponsiveAttribute({ ...responsiveControls, [device]: { ...responsiveControls[device], ...resetAttributes }});
				}
			});

			// Toggle 'tzm--hidden-blocks' class on preference change
			useEffect(() => {
				const editorWrapper = document.querySelector('.editor-styles-wrapper');
				if (editorWrapper) editorWrapper.classList.toggle('tzm--hidden-blocks', !displayHiddenBlocks);
				
			}, [displayHiddenBlocks]); // Re-run effect when preference changes


			// Prepare responsive props for sub-components
			const responsiveProps = { 
				device,
				attributes,
				updateAttribute: (attr) => updateResponsiveAttribute(attr),
				hasBlock,
				hasInnerBlocks,
				featuredImage,
				units
			};

			return (
			<>	
				<GeneralPanel props={responsiveProps}/>

				{ (hasBlock.mediaWidth || hasBlock.mediaAlign || hasBlock.focalPoint) && (
					<MediaPanel props={responsiveProps}/>
				) }

				{ (hasBlock.textAlign || hasBlock.fontSize) && (
					<TypographyPanel props={responsiveProps}/>
				) }
				{ (hasBlock.padding || hasBlock.margin || hasBlock.blockGap || hasBlock.minHeight) && (
					<DimensionsPanel props={responsiveProps}/>
				) }
				{ hasBlock.border && (
					<BorderPanel props={responsiveProps}/>
				) }
			</>
			);
		}
		

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						className={ clsx('block-editor-panel-responsive', {
							'has-active-phone-options': responsiveControls?.phone,
							'has-active-tablet-options': responsiveControls?.tablet,
							'has-active-laptop-options': responsiveControls?.laptop,
							'has-active-desktop-options': responsiveControls?.desktop
						}) }
						title={ __('Responsive controls', "tzm-responsive-block-controls") }
						initialOpen={ false }
					>
						<TabPanel
							className='responsive-controls-tab-panel'
							initialTabName={responsiveControls?.lastDevice ?? null}
							onSelect={ (tabName) => setAttributes({
								responsiveControls: { ...responsiveControls, lastDevice: tabName }
							}) }
							tabs={ [
								{
									name: 'phone',
									title: __("Phone", "tzm-responsive-block-controls"),
									icon: 'smartphone',
									className: 'tab-phone',
									content: ResponsiveBlockControls({ device:'phone' })
								},
								{
									name: 'tablet',
									title: __("Tablet", "tzm-responsive-block-controls"),
									icon: "tablet",
									className: 'tab-tablet',
									content: ResponsiveBlockControls({ device:'tablet' })
								},
								{
									name: 'laptop',
									title: __("Laptop", "tzm-responsive-block-controls"),
									icon: "laptop",
									className: 'tab-laptop',
									content: ResponsiveBlockControls({ device:'laptop' })
								},
								{
									name: 'desktop',
									title: __("Desktop", "tzm-responsive-block-controls"),
									icon: "desktop",
									className: 'tab-desktop',
									content: ResponsiveBlockControls({ device:'desktop' })
								}
							] }
						>
							{ ({ content }) => <div className='responsive-controls-tab-content'>{ content }</div> }
						</TabPanel>
						
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withResponsiveControls');


/**
 * Add responsive styling to the block in the editor
 */
const addResponsiveStylingEditor = createHigherOrderComponent( (BlockListBlock) => {
	return (props) => {
		
		const {
			attributes,
			className
		} = props;
		
		const {
			responsiveControls
		} = attributes;


		const keys = Object.keys(responsiveControls || {});
		if ( keys.length === 0 || (keys.length === 1 && keys[0] === "lastDevice") ) {
			return (
				<BlockListBlock	{ ...props } />
			);
		}

		const responsiveClasses = Object.entries(responsiveControls).reduce((classes, [device, options]) => {
			if (typeof options === 'object') {
				Object.entries(options).forEach(([option, value]) => {

					switch (option) {
						case 'hidden':
						case 'reverse':
							classes.push(`tzm-responsive__${kebabCase(option)}__${device}`);
							break;
						
						case 'imageAlign':
							classes.push(`tzm-responsive__${kebabCase(option)}-${value}__${device}`);
							break;

						case 'width':
							if (value == 100) classes.push(`tzm-responsive__full-width__${device}`);
							break;
	
					}
				});
			}
			return classes;
		}, []);

		const responsiveStyles = Object.entries(responsiveControls).reduce((styles, [device, options]) => {
			if (typeof options === 'object') {
				Object.entries(options).forEach(([option, value]) => {

					switch (option) {
						case 'padding':
						case 'margin':
						case 'borderRadius':
							if (typeof value === 'object') {
								const fullSet = option == 'borderRadius' 
									? ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'] 
									: ['top', 'right', 'bottom', 'left'];
								const hasAllSides = fullSet.every((side) => value[side] !== undefined);
	
								if (hasAllSides) {
									if (option == 'borderRadius') {
										const isUniform = fullSet.every((side) => value[side] === value['topLeft']);
										styles[`--tzm-responsive--${kebabCase(option)}--${device}`] = isUniform
											? value['topLeft']
											: `${value['topLeft']} ${value['topRight']} ${value['bottomRight']} ${value['bottomLeft']}`;
									} else {
										const isUniform = fullSet.every((side) => value[side] === value['top']);
										styles[`--tzm-responsive--${option}--${device}`] = isUniform
											? value['top']
											: `${value['top']} ${value['right']} ${value['bottom']} ${value['left']}`;
									}
								} else {
									Object.entries(value).forEach(([direction, dirValue]) => {
										styles[`--tzm-responsive--${kebabCase(option)}-${kebabCase(direction)}--${device}`] = dirValue;
									});
								}
							}
							break;

						case 'blockGap':
							if (typeof value === 'object' && 'top' in value) {
								styles[`--tzm-responsive--${kebabCase(option)}--${device}`] = value.top;
							}
							break;
						case 'focalPoint':
							if (typeof value === 'object' && ('x' in value || 'y' in value)) {
								styles[`--tzm-responsive--${kebabCase(option)}--${device}`] = (value.x ?? 0)*100 + "% " + (value.y ?? 0)*100 + "%";
							}
							break;
						case 'justify':
						case 'textAlign':
						case 'fontSize':
						case 'mediaWidth':
						case 'minHeight':
							if (value) styles[`--tzm-responsive--${kebabCase(option)}--${device}`] = value;
							break;

						case 'width':
							if (value !== 100) styles[`--tzm-responsive--width--${device}`] = value;
							break;
					}
				});
			}
			return styles;
		}, {});

		return (
			<BlockListBlock	{ ...props } 
				className={ clsx(className, responsiveClasses) }
				wrapperProps={ { ...props.wrapperProps, style: responsiveStyles } }
			/>
		);
	
	};
}, 'addResponsiveStylingEditor' );


/**
 * Add an option to visually hide hidden blocks.
 * 
 * @return {Object} Component to toggle 'displayHiddenBlocks' preference
 */
const DisplayHiddenBlocksButton = () => {
    const { set } = useDispatch('core/preferences');

    const displayHiddenBlocks = useSelect(
        (select) => select('core/preferences').get('tzm', 'displayHiddenBlocks', true),
        []
    );

    const togglePreference = () => {
        set('tzm', 'displayHiddenBlocks', !displayHiddenBlocks);
    };

	return (
		<PluginMoreMenuItem
			icon={ displayHiddenBlocks ? check : 'none' }
			onClick={ togglePreference }
		>
		{  __("Display hidden blocks", 'tzm-responsive-block-controls') }
		</PluginMoreMenuItem>
	)
};


// Add responsive attribute
addFilter(
	'blocks.registerBlockType',
	'tzm/responsive-attributes',
	addResponsiveAttributes
);

// Add responsive controls
addFilter(
	'editor.BlockEdit',
	'tzm/responsive-controls',
	withResponsiveControls
);

// Add responsive styles (backend)
addFilter(
   'editor.BlockListBlock',
   'tzm/responsive-styling-editor',
   addResponsiveStylingEditor
);

// Add option to toggle displaying hidden blocks
registerPlugin(
	'tzm-responsive-display-hidden', 
	{ render: DisplayHiddenBlocksButton } 
);
