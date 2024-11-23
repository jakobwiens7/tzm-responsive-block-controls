/**
 * External dependencies
 */
import { isEmpty, isObject, identity, mapValues, pickBy } from 'lodash';


/**
 * Adds a fallback unit to a numeric or string value if it doesn't already have one.
 * 
 * @param {string|number} value - The value to which a unit should be appended. It can be a number, string, or an empty value.
 * @param {string} defaultUnit - The unit to append to the value if it doesn't already have a unit. Defaults to 'px'.
 * 
 * @return {string|number} - Returns the value with the default unit appended if the value is a number or a numeric string. 
 */
export function addFallbackUnit(value, defaultUnit = 'px') {
	if (value === '' || isNaN(parseFloat(value))) return null;
	else if (typeof value === 'number') return value + defaultUnit;
	else if (typeof value === 'string' && !isNaN(value)) return value.trim() + defaultUnit;
	
	return value;
}


/**
 * Splits a shorthand CSS value into individual values for top, right, bottom, and left.
 * 
 * @param {string|object} value 	The shorthand value to split, typically a string (e.g., '10px'). 
 * 									If it is already an object or an undefined value, it is returned as-is.
 *
 * @return {object|string} 			Returns an object with `top`, `right`, `bottom`, and `left` properties if the input is a string.
 */
export function splitStyleValue( value ) {
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


/**
 * Validates and ensures that box-related values (e.g., padding or margin) have appropriate fallback units.
 *
 * @param {string|number|object} value	The box value to validate.
 * 
 * @return {string|object|undefined} 	Returns the validated value with fallback units added or `undefined` if the object has no valid sides with values.
 */
export function validateBoxValue( value ) {       
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


/**
 * Utility function to check if an object has any nested value.
 * 
 * @param {object} 	obj		The object to check.
 * 
 * @return {boolean}		True if any child value is truthy, otherwise false.
 */
export function hasNestedValue( object ) {
    if (!object || typeof object !== "object") return false; // Return false for null, undefined, or non-objects

    return Object.values(object).some(value => {
        if (typeof value === "object" && value !== null) {
            // Recursive call for nested objects
            return hasNestedValue(value);
        }
        return !!value; // Check if the value is truthy
    });
}


/**
 * Removed empty nodes from nested objects.
 *
 * @param {Object} object
 * @return {Object} Object cleaned from empty nodes.
 */
export const cleanEmptyObject = ( object ) => {
	if ( ! isObject( object ) || Array.isArray( object ) ) return object;
	
    // Custom filter function to exclude only null, undefined, false and empty string values
    const isNotEmptyValue = (value) => value !== null && value !== undefined && value !== '' && value !== false;
	
	const cleanedNestedObjects = pickBy(
		mapValues( object, cleanEmptyObject ),
		//identity
		isNotEmptyValue
	);
	return isEmpty( cleanedNestedObjects ) ? undefined : cleanedNestedObjects;
};


/**
 * Helper functions to determine supported blocks by feature
 * 
 * @param {Object} props
 * @param {Object} parentProps 
 * @param {Boolean} hasInnerBlocks 
 */
export const hasBlockWidth = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		parentProps?.attributes?.layout?.type === "flex" ||
		props.name === 'core/column' ||
		props.name === 'core/button' ||
		props.name === 'core/social-link' ||
		props.name === 'core/navigation-item' ||
		(props.name === 'core/image' && parentProps?.name === 'core/gallery')
	) return true;
	
	else return false;
}

export const hasBlockMediaWidth = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		props.name === 'core/site-logo' ||
		props.name === 'core/post-featured-image' ||
		props.name === 'core/avatar' ||
		props.name === 'core/video' ||
		(props.name === 'core/image' && parentProps?.name !== 'core/gallery')
	) return true;
	
	else return false;
}

export const hasBlockJustify = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		props.attributes.layout?.type === "flex" ||
		props.name === 'core/navigation' ||
		props.name === 'core/buttons' ||
		props.name === 'core/social-links'
	) return true;
	
	else return false;
}

export const hasBlockReverse = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		props.attributes.layout?.type === "flex" ||
		props.name === 'core/navigation' ||
		props.name === 'core/columns' ||
		//props.name === 'core/media-text' ||
		props.name === 'core/gallery' ||
		props.name === 'core/buttons' ||
		props.name === 'core/social-links'
	) return true;
	
	else return false;
}

export const hasBlockMediaAlign = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		props.name === 'core/site-logo' ||
		props.name === 'core/post-featured-image' ||
		props.name === 'core/avatar' ||
		(props.name === 'core/image' && parentProps?.name !== 'core/gallery')
	) return true;
	
	else return false;
}

export const hasBlockFocalPoint = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		(
			props.name === 'core/media-text' ||
			props.name === 'core/image' ||
			props.name === 'core/video' ||
			props.name === 'core/cover' ||
			props.name === 'tzm/section'
		) && (
			!! props.attributes.url ||
			!! props.attributes.mediaUrl ||
			!! props.attributes.style?.background?.backgroundImage?.url || 
			props.attributes.useFeaturedImage
		)
	) return true;
	
	else return false;
}

export const hasBlockTextAlign = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		props.name !== 'core/site-logo' &&
		props.name !== 'core/post-featured-image' &&
		props.name !== 'core/video' &&
		props.name !== 'core/audio' &&
		props.name !== 'core/spacer' &&
		props.name !== 'core/separator' &&
		props.name !== 'core/avatar'
	) return true;
	
	else return false;
}

export const hasBlockFontSize = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		props.name !== 'core/site-logo' &&
		props.name !== 'core/post-featured-image' &&
		props.name !== 'core/video' &&
		props.name !== 'core/audio' &&
		props.name !== 'core/spacer' &&
		props.name !== 'core/separator' &&
		props.name !== 'core/avatar'
	) return true;
	
	else return false;
}

export const hasBlockPadding = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		props.name !== 'core/spacer' &&
		props.name !== 'core/separator' &&
		props.name !== 'core/calendar' &&
		props.name !== 'core/search'
	) return true;
	
	else return false;
}

export const hasBlockMargin = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		true // WIP
	) return true;
	
	else return false;
}

export const hasBlockGap = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		!! hasInnerBlocks &&
		props.name !== 'core/list' &&
		props.name !== 'core/list-item' &&
		props.name !== 'core/page-list' &&
		props.name !== 'core/comments' &&
		props.name !== 'core/quote' &&
		props.name !== 'core/details'
	) return true;
	
	else return false;
}

export const hasBlockMinHeight = (props, parentProps = null, hasInnerBlocks = false) => {
	if (! props) return;

	if (
		"minHeight" in props.attributes ||
		props.name === "core/cover" ||
		props.name === "core/group" ||
		props.name === "core/post-content" ||
		props.name === "core/columns" ||
		props.name === "core/spacer" ||
		props.name === "tzm/section"
	) return true;
	
	else return false;
}