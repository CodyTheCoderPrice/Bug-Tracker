import React from "react";
import { isEmpty } from "./basicUtils";

export function displayGrayedOutNoneIfEmpty(itemValue) {
	if (isEmpty(itemValue)) {
		return <span className="grayed-out-none">None</span>;
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
				"status-box-text-color-" + populateList[i].color;
		}
		comboBoxElement.appendChild(optionElement);
	}

	comboBoxElement.value = defaultSelectedValueId;
}

export function toggleClassName(
	shouldHaveClassName,
	element,
	nameOfToggledClass
) {
	if (shouldHaveClassName) {
		if (!element.className.includes(nameOfToggledClass)) {
			// Space is needed for nameOfToggledClass
			// ...to keep it from merging with other classNames
			element.className = element.className + " " + nameOfToggledClass;
		}
	} else {
		const regex = new RegExp("(?:^|\\s)" + nameOfToggledClass + "(?!\\S)", "g");
		element.className = element.className.replace(regex, "");
	}
}
