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
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';

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
	hasBlockMinHeight
} from './_utils';

import GeneralPanel from './general-panel';
import MediaPanel from './media-panel';
import TypographyPanel from './typography-panel';
import DimensionsPanel from './dimensions-panel';


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
				minHeight: hasBlockMinHeight(props, parentProps)
			};

			// Clean and update 'responsiveControls' attribute
			function updateResponsiveAttribute( updatedResponsiveControls = {} ) {
				const cleanResponsiveControls = cleanEmptyObject(updatedResponsiveControls);
				setAttributes({ responsiveControls: cleanResponsiveControls });
			}


			/**
			 * Handle deprecated controls / responsive attributes
			 */
			useEffect(() => {
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

					// Convert 'height' to 'minHeight'
					if (!! responsiveControls?.[device]?.height) {
						console.log( 'TZM Responsive Block Controls: "height" attribute is now "minHeight. Converting attribute...' );

						updateResponsiveAttribute({ ...responsiveControls, [device]: { ...responsiveControls[device], 
							minHeight: responsiveControls[device].height,
							height: undefined,
						}});
					}

					// Convert 'fullWidth' to 'width'
					if (!! responsiveControls?.[device]?.fullWidth) {
						console.log( 'TZM Responsive Block Controls: "Full Width" control is deprecated. Converting attribute...' );

						updateResponsiveAttribute({ ...responsiveControls, [device]: { ...responsiveControls[device], 
							fullWidth: undefined,
							width: 100
						}});
					}
			});

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

		// Helper function to get responsive classes
		function getResponsiveClasses() {
			if (!responsiveControls || typeof responsiveControls !== 'object') return [];

			return Object.entries(responsiveControls).reduce((classes, [device, options]) => {
				if (typeof options === 'object') {
					Object.entries(options).forEach(([option, value]) => {

						switch (option) {
							case 'hidden':
							case 'reverse':
							//case 'fullWidth':
								classes.push(`tzm-responsive__${kebabCase(option)}__${device}`);
								break;
							
							case 'imageAlign':
								classes.push(`tzm-responsive__${kebabCase(option)}-${value}__${device}`);
								break;
						}
					});
				}
				return classes;
			}, []);
		}

		// Helper function to get responsive styles
		function getResponsiveStyles() {
			if (!responsiveControls || typeof responsiveControls !== 'object') return {};
			
			return Object.entries(responsiveControls).reduce((styles, [device, options]) => {
				if (typeof options === 'object') {
					Object.entries(options).forEach(([option, value]) => {

						switch (option) {
							case 'padding':
							case 'margin':
								if (typeof value === 'object') {
									const fullSet = ['top', 'right', 'bottom', 'left'];
									const hasAllSides = fullSet.every((side) => value[side] !== undefined);
		
									if (hasAllSides) {
										const isUniform = fullSet.every((side) => value[side] === value['top']);
										styles[`--tzm-responsive--${option}--${device}`] = isUniform
											? value['top']
											: `${value['top']} ${value['right']} ${value['bottom']} ${value['left']}`;
									} else {
										Object.entries(value).forEach(([direction, dirValue]) => {
											styles[`--tzm-responsive--${option}-${direction}--${device}`] = dirValue;
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
							case 'width':
							case 'mediaWidth':
							case 'minHeight':
								if (value) styles[`--tzm-responsive--${kebabCase(option)}--${device}`] = value;
								break;
						}
					});
				}
				return styles;
			}, {});
		}

		// Assign wrapper props and styles
		let wrapperProps = { ...props.wrapperProps, style: getResponsiveStyles() };

		return (
			<BlockListBlock	{ ...props } 
				className={ clsx(className, getResponsiveClasses()) }
				wrapperProps={ wrapperProps }
			/>
		);

	};
}, 'addResponsiveStylingEditor' );


/**
 * Add custom element class in save element.
 *
 * @param {Object} props     	Block element.
 * @param {Object} block      	Blocks object.
 * @param {Object} attributes	Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */
/*function addResponsiveClasses( props, block, attributes ) {

	const { 
		className,
 	} = props;
	
	const {
		responsiveControls
	} = attributes;
	
	return assign( {}, props, {
		className: clsx( 
			className, 'tzm-responsive-test', {
				[`tzm-responsive-${responsiveControls?.id}`]: responsiveControls && responsiveControls.id
			}
		)
	} );
}*/

addFilter(
	'blocks.registerBlockType',
	'tzm/responsive-attributes',
	addResponsiveAttributes
);

addFilter(
	'editor.BlockEdit',
	'tzm/responsive-controls',
	withResponsiveControls
);

addFilter(
   'editor.BlockListBlock',
   'tzm/responsive-styling-editor',
   addResponsiveStylingEditor
);

/*addFilter(
	'blocks.getSaveContent.extraProps',
	'tzm/responsive-styling-frontend',
	addResponsiveStyling
);*/