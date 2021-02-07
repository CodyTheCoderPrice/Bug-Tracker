import React from "react";
import { isEmpty, getElementSize, toggleClassName } from "./index";

export function displayGrayedOutNoneIfEmpty(itemValue) {
	if (isEmpty(itemValue)) {
		return <span className="grayed-out-none">None</span>;
	} else {
		return itemValue;
	}
}

export function displayGrayedOutMessageIfEmpty(itemValue, message) {
	if (isEmpty(itemValue)) {
		return <span className="grayed-out-none">{message}</span>;
	} else {
		return itemValue;
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
