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
 * Also supports splitting border-related values (e.g., border-radius) into top-left, top-right, bottom-right, and bottom-left.
 * 
 * @param {string|object} value     The shorthand value to split, typically a string (e.g., '10px').
 *                                  If it is already an object or undefined, it is returned as-is.
 * @param {boolean} isBorder        Whether to format the values for border-related properties (e.g., border-radius).
 * 
 * @return {object|string}          Returns an object with `top`, `right`, `bottom`, and `left` properties if `isBorder` is false.
 *                                  Returns an object with `topLeft`, `topRight`, `bottomRight`, and `bottomLeft` if `isBorder` is true.
 */
export function splitStyleValue( value, isBorder = false ) {
	if ( value && typeof value === 'string' ) {
		if (isBorder) {
			return {
				topLeft: value,
				topRight: value,
				bottomRight: value,
				bottomLeft: value,
			}
		} else {
			return {
				top: value,
				right: value,
				bottom: value,
				left: value,
			}
		}
	}
	return value;
}


/**
 * Validates and ensures that box-related values (e.g., padding, margin border-radius) have appropriate fallback units.
 *
 * @param {string|number|object} value	The box value to validate.
 * 
 * @return {string|object|undefined} 	Returns the validated value with fallback units added or `undefined` if the object has no valid sides with values.
 */
export function validateBoxValue( value ) {       
	// Handle object with multiple values (like top, right, bottomLeft, etc.) or a single value
	if ( typeof value === 'object' && value !== null ) {
		const paddedVal = {};

		// Ensure that each side has a fallback unit
		for (let side in value) {
			paddedVal[side] = addFallbackUnit(value[side]);
		}

		// Check if any of the box sides have values, otherwise set to undefined
		return Object.values(paddedVal).some(val => val !== undefined) ? paddedVal : undefined;

	} else {
		// Ensure that the single value has a fallback unit
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
