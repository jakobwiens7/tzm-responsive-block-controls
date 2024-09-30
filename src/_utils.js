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
	if (value === '') return value;
	else if (typeof value === 'number') return value + defaultUnit;
	else if (typeof value === 'string' && !isNaN(value)) return value.trim() + defaultUnit;
	
	return value;
}


/**
 * Splits a shorthand CSS value into individual values for top, right, bottom, and left.
 * 
 * @param {string|object} value - The shorthand value to split, typically a string (e.g., '10px'). If it is already an object or an undefined value, it is returned as-is.
 *
 * @return {object|string} - Returns an object with `top`, `right`, `bottom`, and `left` properties if the input is a string.
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
 * Removed empty nodes from nested objects.
 *
 * @param {Object} object
 * @return {Object} Object cleaned from empty nodes.
 */
export const cleanEmptyObject = ( object ) => {
	if ( ! isObject( object ) || Array.isArray( object ) ) return object;
	
	const cleanedNestedObjects = pickBy(
		mapValues( object, cleanEmptyObject ),
		identity
	);
	return isEmpty( cleanedNestedObjects ) ? undefined : cleanedNestedObjects;
};
