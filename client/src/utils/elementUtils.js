// Needed for returning JSX in functions
import React from "react";
import {
	isEmpty,
	getCommonElementGrayedOutTextColorClassNameForLightOrDarkMode,
} from "./index";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

/**
 * If 'errorMessages' param isn't empty, then JSX for the error message(s) is returned.
 *
 * @param {string|string[]} errorMessages - error message(s) to be returned
 * in a span tag(s) if this param is not undefined
 * @param {string} desiredClassName - className to be assigned to the span tag
 * if the 'errorMessages' param isn't empty.
 * @returns {(JSX|null)} Returns either null or JSX for a errorMessages
 *
 * @example
 * // Returns "Email required" in span tag with its className set to "red-text"
 * getErrorMessagesJSX("Email required", "red-text");
 *
 * @example
 * // Returns "Email required" and "Password required" in two seperate span
 * // ...tags with their classNames set to "error"
 * getErrorMessagesJSX(["Email required", "Password required"], "error");
 *
 * @example
 * // Returns null
 * getErrorMessagesJSX(undefined);
 */
export function getErrorMessagesJSX(errorMessages, desiredClassName) {
	if (isEmpty(errorMessages)) {
		return null;
	} else if (Array.isArray(errorMessages)) {
		return errorMessages.map((message, index) => {
			return isEmpty(message) ? null : (
				<span className={desiredClassName} key={index}>
					<FontAwesomeIcon icon={faCircleExclamation} aria-hidden="true" />{" "}
					{message}
				</span>
			);
		});
	} else {
		return (
			<span className={desiredClassName}>
				<FontAwesomeIcon icon={faCircleExclamation} aria-hidden="true" />{" "}
				{errorMessages}
			</span>
		);
	}
}

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
				className={getCommonElementGrayedOutTextColorClassNameForLightOrDarkMode(
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
