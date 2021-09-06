/**
 * Returns true if value is null, undefined, or an empty string. Otherwise
 * returns false.
 *
 * @param {boolean} value - Value of any type
 * @returns {boolean} Whether the value is null, undefined, or an empty string
 */
export function isEmpty(value) {
	return value === null || value === undefined || value === "";
}

/**
 * Takes an array (of strings, numbers, or booleans) and returns a string
 * containing all the array's values
 * 
 * @param {(string|number|boolean)[]} array - an array of strings, numbers,
 * or booleans
 * @returns {String} string contianing all values from the array param
 */
export function getStringOfAllArrayValues(array) {
	let stringOfAllArrayValues = "";

	for (let i = 0; i < array.length; i++) {
		stringOfAllArrayValues += "'" + array[i] + "'";
		if ((i+2) < array.length) {
			stringOfAllArrayValues += ", ";
		} else if ((i+1) < array.length) {
			stringOfAllArrayValues += " and ";
		}
	}

	return stringOfAllArrayValues;
}

/**
 * Returns new Object containing all properties from obj param that meet the
 * condition specified in predicateFunc param
 *
 * @param {Object} obj - Any Object 
 * @param {Function} predicateFun - Callback function for determining which 
 * properties will be in the returned Object
 * @returns {Object}  New Object all properties from obj param that meet the
 * condition specified in predicateFunc param
 */
export function filterObject(obj, predicateFunc) {
	const newObject = {};

	if (typeof predicateFunc === "function") {
		for (let prop in obj) {
			// hasOwnProperty method excludes inherited properties
			if (
				obj.hasOwnProperty(prop) &&
				predicateFunc(obj[prop], prop, obj)
			) {
				newObject[prop] = obj[prop];
			}
		}
	} else {
		console.log(
			"Error: predicateFunction param for filterObject was not a funciton"
		);
	}

	return newObject;
}