/**
 * Returns true if 'value' param is null, undefined, an empty string, or an
 * empty array. Otherwise returns false.
 *
 * @param {*} value - Value of any type
 * @returns {boolean} Whether the value is null, undefined, an empty string,
 * or an empty array
 */
export function isEmpty(value) {
	if (Array.isArray(value)) {
		// Removes empty values from array
		value = value.filter((el) => {
			if (typeof el === "string") {
				return el.trim() !== "";
			}

			if (typeof el === "number") {
				return !Number.isNaN(el);
			}

			// eslint-disable-next-line eqeqeq
			return el != (null && undefined);
		});
	}

	return (
		value === null ||
		value === undefined ||
		(typeof value === "number" && Number.isNaN(value)) ||
		(typeof value === "string" && value.trim() === "") ||
		(Array.isArray(value) && value.length < 1)
	);
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
