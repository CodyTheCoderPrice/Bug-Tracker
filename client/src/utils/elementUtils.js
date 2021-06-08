// Needed for returning JSX in functions
import React from "react";
import {
	isEmpty,
	getCommonGrayedOutTextColorClassNameForLightOrDarkMode,
} from "./index";

/**
 * Checks if value is empty. If it is not, then it is returned. Otherwise the
 * alternative is returned.
 *
 * @param {(string|number|boolean)} value - value to be returned if it is not 
 * empty
 * @param {(string|number|JSX)} alternative - alternative value to be returned
 * if value is empty
 * @returns {(string|number|boolean|JSX)} Returns the value if it is not empty.
 * Otherwise returns the alternative value.
 * 
 * @example
 * // Returns "03-19-2020"
 * getAlternativeWhenValueIsEmpty("03-19-2020", "-");
 * 
 * @example
 * // Returns "-"
 * getAlternativeWhenValueIsEmpty(null, "-");
 */
export function getAlternativeWhenValueIsEmpty(value, alternative) {
	if (isEmpty(value)) {
		return alternative;
	} else {
		return value;
	}
}

/**
 * Checks if value is empty. If it is not, then it is returned. Otherwise the
 * alternative is returned in JSX span to be displayed as grayed out.
 *
 * @param {(string|number|boolean)} value - value to be returned if it is not empty
 * @param {string} alternative - alternative value to be returned (if value is empty) in JSX
 * span to be displayed as grayed out
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {(string|number|boolean|JSX)} Returns the value if it is not empty. Otherwise returns the
 * alternative value in JSX span tag to be displayed as grayed out.
 * 
 * @example
 * // Returns "03-19-2020"
 * getAlternativeWhenValueIsEmpty("03-19-2020", "none");
 * 
 * @example
 * // Returns "none" in span tag to be displayed as grayed out
 * getAlternativeWhenValueIsEmpty(null, "none");
 */
export function displayGrayedOutAlternativeWhenValueIsEmpty(
	value,
	alternative,
	dark_mode
) {
	if (isEmpty(value)) {
		return (
			<span
				className={getCommonGrayedOutTextColorClassNameForLightOrDarkMode(
					dark_mode
				)}
			>
				{alternative}
			</span>
		);
	} else {
		return value;
	}
}
