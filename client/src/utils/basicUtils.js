/**
 * Returns whether the 'value' param is undefined, NaN, an empty string, an
 * empty array, or null (if 'acceptNull' param is false)
 *
 * @param {*} value - The value to be tested
 * @param {boolean|undefined} [acceptNull=false] - Whether a null value should be
 * considered not empty. Default is false.
 * @returns {boolean} Whether the 'value' param is undefined, NaN, an empty
 * string, an empty array, or null (if 'acceptNull' param is false)
 */
export function isEmpty(value, acceptNull = false) {
	if (Array.isArray(value)) {
		// Removes empty values from array
		value = value.filter((el) => {
			if (typeof el === "number") {
				return !Number.isNaN(el);
			} else if (typeof el === "string") {
				return el.trim() !== "";
			}

			return el !== undefined && (acceptNull ? true : el !== null);
		});
	}
	return (
		(!acceptNull && value === null) ||
		value === undefined ||
		(typeof value === "number" && Number.isNaN(value)) ||
		(typeof value === "string" && value.trim() === "") ||
		(Array.isArray(value) && value.length < 1)
	);
}

/**
 * Returns all indexes from the arr param containing the value param
 *
 * @param {*[]} arr - The array to have its indexes checked
 * @param {*} value - The value being sought for in the arr param
 * @returns {number[]} All indexes from the arr param containing the value param
 */
export function getAllIndexesContainingValueFromArray(arr, value) {
	const indexes = [];
	for (let i = 0; i < arr.length; i++) if (arr[i] === value) indexes.push(i);
	return indexes;
}

/**
 * Returns whether the 'obj' param is an Object. Excludes arrays and null (unless
 * 'acceptNull' param is true)
 *
 * @param {*} obj - Argument to test if is an Object
 * @param {boolean|undefined} [acceptNull=false] - Whether null should be
 * considered an Object. Default is false.
 * @returns {boolean} Whether the 'obj' param is an Object
 */
export function isAnObject(obj, acceptNull = false) {
	return (
		typeof obj === "object" &&
		!Array.isArray(obj) &&
		(acceptNull ? true : obj !== null)
	);
}

/**
 * 
 * @param {*[]} array 
 * @param {string|string[]} types 
 */
export function areArrayElementsOfDesiredTypes(array, types) {

}

/**
 * Removes all non-digits from a String, and then coverts the String to a Number
 * and returns it. If string does not have any digits, then the number 0 is
 * returned.
 *
 * @param {string} str - Any string
 * @returns {number} String param with all non-digits removed and converted to
 * a Number. If string does not have any digits, then the number 0 is returned.
 */
export function stripNonDigits(str) {
	return Number(str.replace(/[^\d.-]/g, ""));
}

/**
 * Capitalizes the first letter of each word inside a string then returns it
 *
 * @param {string} str - Any string
 * @returns {string} String param with the first letter of each word
 * capitalized
 */
export function capitalizeFistLetterOfEachWord(str) {
	return str.toLowerCase().replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

/**
 * Takes an array (of strings, numbers, or booleans) and returns a string
 * containing all 'array' param's values. If 'inQuotations' param is true, then
 * each array value will be placed in quotes.
 *
 * @param {(string|number|boolean)[]} array - an array of strings, numbers,
 * or booleans
 * @param {boolean} inQuotations - should each value be placed in quotations
 * @returns {String} string contianing all values from the array param
 */
export function getStringOfAllArrayValues(array, inQuotations = false) {
	let stringOfAllArrayValues = "";

	for (let i = 0; i < array.length; i++) {
		stringOfAllArrayValues +=
			(inQuotations ? "'" : "") + array[i] + (inQuotations ? "'" : "");
		if (i + 2 < array.length) {
			stringOfAllArrayValues += ", ";
		} else if (i + 1 < array.length) {
			stringOfAllArrayValues += " and ";
		}
	}

	return stringOfAllArrayValues;
}

/**
 * Returns new Object containing all properties from obj param that meet the
 * condition specified in 'predicateFunc' param
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
			if (obj.hasOwnProperty(prop) && predicateFunc(obj[prop], prop, obj)) {
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
