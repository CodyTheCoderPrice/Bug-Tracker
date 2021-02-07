import { getElementStyle } from "./index";

function componentToHex(color) {
	let hex = color.toString(16);
	return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function convertRbgBackgroundColorToHex(rbgBackgroundColor) {
	const rbgValues = rbgBackgroundColor.match(/\d+/g);
	return rbgValues.length >= 3
		? rgbToHex(Number(rbgValues[0]), Number(rbgValues[1]), Number(rbgValues[2]))
		: null;
}

export function appendHexValueForColor(statusList) {
	const invisibleHomeElement = document.createElement("div");
	invisibleHomeElement.className = "js-calc-home-container";
	invisibleHomeElement.visibility = "hidden";
	document.body.appendChild(invisibleHomeElement);

	for (let i = 0; i < statusList.length; i++) {
		const invisibleStatusColorDiv = document.createElement("div");
		invisibleStatusColorDiv.className =
			"js-calc-status-box-background-color-" + statusList[i].color;
		invisibleStatusColorDiv.visibility = "hidden";
		invisibleHomeElement.appendChild(invisibleStatusColorDiv);

		const hex = convertRbgBackgroundColorToHex(
			getElementStyle(invisibleStatusColorDiv).getPropertyValue(
				"background-color"
			)
		);

		statusList[i]["colorHex"] = hex;

		invisibleHomeElement.removeChild(invisibleStatusColorDiv);
	}

	invisibleHomeElement.parentNode.removeChild(invisibleHomeElement);

	return statusList;
}

// Background color
export function getDarkBackgroundColorClassNameForTheme(theme_color) {
	return " js-set-dark-background-color-theme-" + theme_color;
}

export function getLightBackgroundColorClassNameForTheme(theme_color) {
	return " js-set-light-background-color-theme-" + theme_color
}

// Background color with hover
export function getBackgroundColorWithHoverClassNameForTheme(
	theme_color
) {
	return " js-set-background-color-with-hover-theme-" + theme_color;
}

// Breadcrumb arrow color
export function getDarkBreadcrumbArrowColorClassNameForTheme(theme_color) {
	return " js-set-dark-breadcrumb-arrow-color-theme-" + theme_color;
}

export function getLightBreadcrumbArrowColorClassNameForTheme(theme_color) {
	return " js-set-light-breadcrumb-arrow-color-theme-" + theme_color;
}

// Border color
export function getDarkBorderColorClassNameForTheme(theme_color) {
	return " js-set-dark-border-color-theme-" + theme_color;
}

export function getLightBorderColorClassNameForTheme(theme_color) {
	return " js-set-light-border-color-theme-" + theme_color;
}

// Text and link color
export function getTextColorClassNameForTheme(theme_color) {
	return " js-set-text-color-theme-" + theme_color;
}
