
/**
 * Removes all non-digits from a string, and then returns what remains 
 * converted to number. If string does not have any digits, then the number 0
 * is returned.
 * 
 * @param {string} str - Any string
 * @returns {number} String param with all non-digits removed and what remains
 * converted to a number. If string does not have any digits, then the number 0
 * is returned.
 */
export function stripNonDigits(str) {
	return Number(str.replace(/[^\d.-]/g, ""));
}

/**
 * Capitalizes the first letter of each word inside a string, then returns it
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
