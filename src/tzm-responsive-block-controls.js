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

import {
	InspectorControls,	
	useSettings
} from '@wordpress/block-editor';

import {
	TabPanel,
	PanelBody,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { cleanEmptyObject } from './_utils';

import GeneralLayoutPanel from './general-layout-panel';
import ImageTypographyPanel from './image-typography-panel';
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
	if ( typeof settings.attributes !== 'undefined' ) {
		
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
			name,
			attributes,
			setAttributes
		} = props;
		
		const {
			responsiveControls
		} = attributes;


		function ResponsiveBlockControls( {	device } ) {

			// Get registered units
			const [ availableUnits ] = useSettings( 'spacing.units' );
			const units = useCustomUnits( {
				availableUnits: availableUnits || [ 'px', 'em', 'rem', 'vw', 'vh', '%' ]
			} );

			// Define block types
			const isBlockType = {
				container: (
					name === 'core/group' ||
					name === 'core/columns' ||
					name === 'core/cover' ||
					name === 'core/media-text' ||
					name === 'tzm/section'
				),
				flex: (
					attributes.layout?.type === 'flex' ||
					name === 'core/navigation'
				),
				reversable: (
					attributes.layout?.type === 'flex' ||
					name === 'core/navigation' ||
					name === 'core/columns' ||
					name === 'core/media-text'
				),
				image: (
					name === 'core/site-logo' ||
					name === 'core/image'
				)
			};

			// Clean and update 'responsiveControls' attribute
			function updateResponsiveAttribute( updatedResponsiveControls = {} ) {
				const cleanResponsiveControls = cleanEmptyObject(updatedResponsiveControls);

				//console.log(cleanResponsiveControls);

				setAttributes({ responsiveControls: cleanResponsiveControls });
			}


			return (
				<>					
					<GeneralLayoutPanel 
						isBlockType={isBlockType} 
						device={device} 
						updateAttribute={updateResponsiveAttribute}
						responsiveControls={responsiveControls}
					/>
					<ImageTypographyPanel 
						isBlockType={isBlockType} 
						units={units}
						device={device} 
						updateAttribute={updateResponsiveAttribute}
						responsiveControls={responsiveControls}
					/>
					<DimensionsPanel
						isBlockType={isBlockType}
						units={units}
						device={device}
						updateAttribute={updateResponsiveAttribute}
						responsiveControls={responsiveControls}
					/>
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
							case 'fullWidth':
								classes.push(`tzm-responsive__${kebabCase(option)}__${device}`);
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

							default:
								if (value) styles[`--tzm-responsive--${kebabCase(option)}--${device}`] = value;
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