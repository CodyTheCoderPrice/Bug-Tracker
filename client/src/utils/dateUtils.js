// Easier to use than Date()
import moment from "moment";

import {
	isEmpty,
} from "./index";


/**
 * Format date in YYYY-MM-DD, or an empty string if date is empty
 * 
 * @param {(Date|string)} date - Date (type date or string) to be formatted
 * @returns {string} Either the date formated in YYYY-MM-DD, or an empty string
 * if date is empty
 * 
 * @example
 * // Returns "2019-12-05"
 * formatDateYYYYmmDD("2019-12-05T05:00:00.000Z");
 */
export function formatDateYYYYmmDD(date) {
	return !isEmpty(date) ? moment.utc(date).format('YYYY-MM-DD') : "";
}

/**
 * Format date in MM-DD-YYYY, or an empty string if date is empty
 * 
 * @param {(Date|string)} date - Date (type date or string) to be formatted
 * @returns {string} Either the date formated in MM-DD-YYYY, or an empty string
 * if date is empty
 * 
 * @example
 * // Returns "12-05-2019"
 * formatDateMMddYYYY("2019-12-05T05:00:00.000Z");
 */
export function formatDateMMddYYYY(date) {
	return !isEmpty(date) ? moment.utc(date).format('MM-DD-YYYY') : "";
}

/**
 * Converts date to an number
 * 
 * @param {(Date|string)} date - Date (type date or string) to be formatted
 * @returns {number} Date converted to a number
 * 
 * @example
 * // Returns 1578200400000
 * dateToInt("2020-01-05T05:00:00.000Z");
 */
export function dateToInt(date) {
	return !isEmpty(date) ? Number(moment.utc(date)) : 0;
}
