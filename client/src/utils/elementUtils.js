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

export function populateComboBox(
	comboBoxElement,
	populateList,
	defaultSelectedValueId
) {
	for (let i = 0; i < populateList.length; i++) {
		let optionElement = document.createElement("option");

		// Makes the first item of the populateList the default selection
		if (i === 0) {
			optionElement.selected = "selected";
		}

		optionElement.value = populateList[i].id;
		optionElement.textContent = populateList[i].option;
		if (populateList[i].color !== undefined) {
			optionElement.className =
				"js-set-status-box-text-color-" + populateList[i].color;
		}
		comboBoxElement.appendChild(optionElement);
	}

	comboBoxElement.value = defaultSelectedValueId;
}
