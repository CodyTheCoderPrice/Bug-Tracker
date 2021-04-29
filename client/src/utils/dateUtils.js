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
 */
export function formatDateYYYYmmDD(date) {
	return (!isEmpty(date)) ? moment.utc(date).format('YYYY-MM-DD') : "";
}

/**
 * Format date in MM-DD-YYYY, or an empty string if date is empty
 * 
 * @param {(Date|string)} date - Date (type date or string) to be formatted
 * @returns {string} Either the date formated in MM-DD-YYYY, or an empty string
 * if date is empty
 */
export function formatDateMMddYYYY(date) {
	return (!isEmpty(date)) ? moment.utc(date).format('MM-DD-YYYY') : "";
}

/**
 * Converts date to an number
 * 
 * @param {(Date|string)} date - Date (type date or string) to be formatted
 * @returns {number} Date converted to a number
 */
export function dateToInt(date) {
	return (!isEmpty(date)) ? Number(moment.utc(date)) : 0;
}
