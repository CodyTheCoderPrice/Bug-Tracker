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

export function manageSizeOfItemBoxsInPairContainer(
	pairElement,
	toggledClassNameForWidth,
	outerDivingContainerMinWidth,
) {
	const childNodes = pairElement.childNodes;
	// Item box width is determing by its outerDividingContainer
	const firstOuterDividingContianerElement = childNodes[0];
	const secondOuterDividingContianerElement = childNodes[1];

	// Toggles each item box's className for width
	const myObserver = new ResizeObserver(() => {
		// If both item-boxs can fit next to one another
		const shouldHaveClassName =
			getElementSize(pairElement).width > outerDivingContainerMinWidth * 2;

		
		toggleClassName(shouldHaveClassName, firstOuterDividingContianerElement, toggledClassNameForWidth);
		toggleClassName(shouldHaveClassName, secondOuterDividingContianerElement, toggledClassNameForWidth);
	});

	myObserver.observe(
		pairElement
	);
}
