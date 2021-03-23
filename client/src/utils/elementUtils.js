import React from "react";

import {
	isEmpty,
	getUniversalTextGrayedOutTextColorClassNameForLightOrDarkMode,
} from "./index";

export function displayMessageIfEmpty(value, message) {
	if (isEmpty(value)) {
		return message;
	} else {
		return value;
	}
}

export function displayGrayedOutMessageIfEmpty(value, message, dark_mode) {
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

export function getSelectOptions(
	objectList,
	objectIdProperty,
	objectOptionProptery
) {
	return objectList.map((obj, idx) => {
		return (
			<option key={idx} value={obj[objectIdProperty]}>
				{obj[objectOptionProptery]}
			</option>
		);
	});
}
