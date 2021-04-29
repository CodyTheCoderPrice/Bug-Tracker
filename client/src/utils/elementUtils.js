// Needed for returning JSX in functions
import React from "react";

import {
	isEmpty,
	getUniversalTextGrayedOutTextColorClassNameForLightOrDarkMode,
} from "./index";

/**
 * Checks if value is empty. If it is not, then it is returned. Otherwise the
 * message is returned.
 * 
 * @param {Any} value - value to be returned if it is not empty
 * @param {string} message - message to be returned if value is empty
 * @returns {Any} Returns the value if it is not empty. Otherwise returns the
 * message.
 */
export function getMessageIfValueIsEmpty(value, message) {
	if (isEmpty(value)) {
		return message;
	} else {
		return value;
	}
}

/**
 * Checks if value is empty. If it is not, then it is returned. Otherwise the
 * message is returned in JSX span to be displayed as grayed out.
 * 
 * @param {Any} value - value to be returned if it is not empty
 * @param {string} message - message to be returned (if value is empty) in JSX
 * span to be displayed as grayed out
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {Any} Returns the value if it is not empty. Otherwise returns the
 * message in JSX span to be displayed as grayed out.
 */
export function displayGrayedOutMessageIfValueIsEmpty(value, message, dark_mode) {
	if (isEmpty(value)) {
		return (
			<span
				className={getUniversalTextGrayedOutTextColorClassNameForLightOrDarkMode(
					dark_mode
				)}
			>
				{message}
			</span>
		);
	} else {
		return value;
	}
}
