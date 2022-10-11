/**
 * External Dependencies
 */
import classnames from 'classnames';
const { assign, merge } = lodash;

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

import {
	InspectorControls,	
	//__experimentalSpacingSizesControl as SpacingSizesControl,
	useSetting
} from '@wordpress/block-editor';

import {
	TabPanel,
	PanelRow,
	PanelBody,
	ToggleControl,
	Dashicon,
	__experimentalDivider as Divider,
	__experimentalBoxControl as BoxControl,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';


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

		function isResponsiveControlsEmpty(newResponsiveControls = responsiveControls) {
			if (newResponsiveControls && typeof newResponsiveControls === 'object') {

				// Check every device in attribute
				for (let device in newResponsiveControls) {
					if (newResponsiveControls[device]) {
						return false;
					};
				}
			}	
			return true;
		}

		function isResponsiveControlsDeviceEmpty(newDevice) {
			if ( newDevice ) {

				// Check every option in device
				for (let option in newDevice) {
					if (newDevice[option] === true || newDevice.padding || newDevice.margin) {
						return false;
					}
				}
			}
			return true;
		}

		function ResponsiveBlockControls( {	device } ) {

			const isContainerBlock = (
				name === 'core/group' ||
				name === 'core/columns' ||
				name === 'core/cover' ||
				name === 'core/media-text' ||
				name === 'tzm/section'
			);

			const isReverseBlock = (
				(name === 'core/group' && attributes.layout?.type === 'flex') ||
				name === 'core/columns' ||
				name === 'core/media-text'
			);

			const units = useCustomUnits( {
				availableUnits: useSetting( 'spacing.units' ) || [
					'%',
					'px',
					'em',
					'rem',
					'vw',
				],
			} );

			const paddingValues = splitStyleValue( responsiveControls?.[device]?.padding );
			const marginValues = splitStyleValue( responsiveControls?.[device]?.margin );

			function splitStyleValue( value ) {
				// Check for shorthand value (a string value).
				if ( value && typeof value === 'string' ) {
					return {
						top: value,
						right: value,
						bottom: value,
						left: value,
					};
				}
				return value;
			}

			function setOption(device, option, newVal) {
				let newResponsiveControls = responsiveControls || {};
				let newDevice = newResponsiveControls[device];

				// Set newVal in newDevice
				if (!newDevice) {
					newDevice = {};
				}
				if (option !== 'padding' && option !== 'margin') {
					newDevice[option] = newVal ? newVal : undefined;
				} else {
					newDevice[option] = !newVal.top && !newVal.right && !newVal.bottom && !newVal.left ? undefined : newVal;
				}

				// Check if newDevice is empty and clear it
				if ( isResponsiveControlsDeviceEmpty(newDevice) ) {
					newDevice = undefined;
				}

				// Check if newResponsiveControls is empty and reset attribute
				newResponsiveControls[device] = newDevice;
				if ( isResponsiveControlsEmpty(newResponsiveControls) ) {
					setAttributes({	responsiveControls: null });

				// Then set the attribute
				} else {
					setAttributes({	responsiveControls: { ...newResponsiveControls, [device]: newDevice } });
				}
			}			

			return (
				<>
					<PanelRow>
						<ToggleControl
							label={ __('Hide', "tzm-responsive-block-controls") }
							checked={ !!responsiveControls?.[device]?.hidden }
							onChange={ (newVal) => setOption(device, 'hidden', newVal) }
						/>
						<Dashicon icon="visibility"/>
					</PanelRow>
					{ !! isReverseBlock && (
						<PanelRow>
							<ToggleControl
								label={ __('Reverse order', "tzm-responsive-block-controls") }
								checked={ !!responsiveControls?.[device]?.reverse }
								onChange={ (newVal) => setOption(device, 'reverse', newVal) }
							/>
							<Dashicon icon="randomize" />
						</PanelRow>
					) }
					<PanelRow>
						<ToggleControl
							label={ __('Center', "tzm-responsive-block-controls") }
							checked={ !!responsiveControls?.[device]?.center }
							onChange={ (newVal) => setOption(device, 'center', newVal) }
						/>
						<Dashicon icon="editor-aligncenter" />
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __('Full width', "tzm-responsive-block-controls") }
							checked={ !!responsiveControls?.[device]?.fullWidth }
							onChange={ (newVal) => setOption(device, 'fullWidth', newVal) }
						/>
						<Dashicon icon="align-full-width" />
					</PanelRow>

					<Divider />
					<BoxControl
						label={ __( 'Padding' ) }
						values={ paddingValues }
						units={ units }
						onChange={ (newVal) => setOption(device, 'padding', newVal) }
					/>
					<BoxControl
						label={ __( 'Margin' ) }
						inputProps={{ min: -999 }}
						values={ marginValues }
						units={ units }
						onChange={ (newVal) => setOption(device, 'margin', newVal) }
						sides={ isContainerBlock ? ['top', 'bottom']: null }
					/>
				</>
			);
		}
		
		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						className={ classnames('block-editor-panel-responsive', {
							'has-active-phone-options': responsiveControls?.phone,
							'has-active-tablet-options': responsiveControls?.tablet,
							'has-active-laptop-options': responsiveControls?.laptop,
							'has-active-desktop-options': responsiveControls?.desktop
						}) }
						title={ __('Responsiveness', "tzm-responsive-block-controls") }
						initialOpen={ false }
					>
						<TabPanel
							className='responsive-controls-tab-panel'
							tabs={ [
								{
									name: 'phone',
									title: <Dashicon icon="smartphone" />,
									className: 'tab-phone',
									content: <ResponsiveBlockControls device='phone'/>
								},
								{
									name: 'tablet',
									title: <Dashicon icon="tablet" />,
									className: 'tab-tablet',
									content: <ResponsiveBlockControls device='tablet' />
								},
								{
									name: 'laptop',
									title: <Dashicon icon="laptop" />,
									className: 'tab-laptop',
									content: <ResponsiveBlockControls device='laptop'/>
								},
								{
									name: 'desktop',
									title: <Dashicon icon="desktop" />,
									className: 'tab-desktop',
									content: <ResponsiveBlockControls device='desktop'/>
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
 * Add responsive classes to the block in the editor
 */
const addResponsiveClassesEditor = createHigherOrderComponent( (BlockListBlock) => {
	return (props) => {
		
		const {
			attributes,
			className
		} = props;
		
		const {
			responsiveControls
		} = attributes;

		function getClasses() {
			let classes = [];

			if (responsiveControls && typeof responsiveControls === 'object') {
				for (const [device, options] of Object.entries(responsiveControls)) {

					if (typeof options === 'object') {
						for (const [option, value] of Object.entries(options)) {

							if (option !== 'padding' && option !== 'margin' && value) {
								classes.push('tzm-rbc-' + option.toLowerCase() + '-' + device);
							}
						}
					}
				}
			}
			return classes;
		}

		function getStyles() {
			let styles = {};

			if (responsiveControls && typeof responsiveControls === 'object') {
				for (const [device, options] of Object.entries(responsiveControls)) {

					if (typeof options === 'object') {
						for (const [option, value] of Object.entries(options)) {

							if ( (option == 'padding' || option == 'margin') && typeof value === 'object') {
								if (Object.keys(value).length === 4) {
									let isShort = (value['top'] == value['right'] && value['top'] == value['bottom'] && value['top'] == value['left']);
									let valStr = value['top'] + ' ' + value['right'] + ' ' + value['bottom'] + ' ' + value['left'];
									styles['--tzm--rbc--' + option + '--' + device] = isShort ? value['top'] : valStr;
								
								} else {
									for (const [dir, dirVal] of Object.entries(value)) {
										styles['--tzm--rbc--' + option + '-' + dir + '--' + device] = dirVal;
									}
								}
							}
						}
					}
				}
			}
			return styles;
		}

		let wrapperProps = props.wrapperProps || {};
        wrapperProps.style = getStyles();

		return (
			<BlockListBlock	{ ...props } 
				className={ classnames(className, getClasses()) }
				wrapperProps={ wrapperProps }
			/>
		);
	};
}, 'addResponsiveClassesEditor' );


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
		className: classnames( 
			className, 'tzm-rbc-test', {
				[`tzm-rbc-${responsiveControls?.id}`]: responsiveControls && responsiveControls.id
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
   'tzm/responsive-clasess-editor',
   addResponsiveClassesEditor
);

/*addFilter(
	'blocks.getSaveContent.extraProps',
	'tzm/responsive-classes-frontend',
	addResponsiveClasses
);*/