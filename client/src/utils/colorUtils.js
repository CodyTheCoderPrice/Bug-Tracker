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

// Dark/Light mode background color for home component
export function getHomeBackgroundColorClassNameForDarkMode(dark_mode) {
	return " js-set-home-background-color-dark-mode-" + dark_mode;
}

// Dark/Light mode background colors for searchFilterSearch/top bar
export function getBarBackgroundColorClassNameForDarkMode(dark_mode) {
	return " js-set-bar-background-color-dark-mode-" + dark_mode;
}

// Dark/Light mode background and text colors for searchFilterSearch/top bar search bar
export function getBarSearchBarBackgroundAndTextColorClassNameForDarkMode(dark_mode) {
	return " js-set-bar-search-bar-background-text-color-dark-mode-" + dark_mode;
}

// Dark/Light mode border, background, and text color for searchFilterSearch/top bar buttons
export function getBarButtonBorderBackgroundTextColorClassNameForDarkMode(dark_mode) {
	return " js-set-bar-button-border-background-text-color-dark-mode-" + dark_mode;
}

// Dark/Light mode background colors for createItemSidebar component
export function getCreateItemSidebarBackgroundColorClassNameForDarkMode(dark_mode) {
	return " js-set-create-item-sidebar-background-color-dark-mode-" + dark_mode;
}

// Dark/Light mode text colors with hover for base icon buttons
export function getBaseIconButtonTextColorWithHoverClassNameForDarkMode(dark_mode) {
	return " js-set-base-icon-button-background-color-with-hover-dark-mode-" + dark_mode;
}

// Dark/Light mode text colors with hover for more distinct icon buttons
export function getMoreDistinctIconButtonTextColorWithHoverClassNameForDarkMode(dark_mode) {
	return " js-set-more-distinct-icon-button-background-color-with-hover-dark-mode-" + dark_mode;
}

// Dark/Light mode border, background, and text color for base form-input
export function getBaseFormInputBorderBackgroundTextColorClassNameForDarkMode(dark_mode) {
	return " js-set-base-form-input-border-background-text-border-text-color-dark-mode-" + dark_mode;
}

// Dark/Light mode disable base label
export function getBaseDisabledLabelClassNameForDarkMode(dark_mode) {
	return " js-set-base-diabled-label-dark-mode-" + dark_mode;
}

// Dark/Light mode disable base input date
export function getBaseDisableInputDateClassNameForDarkMode(dark_mode) {
	return " js-set-base-diabled-input-date-dark-mode-" + dark_mode;
}

// Dark/Light mode background colors for itemView item-box
export function getItemBoxBackgroundColorClassNameForDarkMode(dark_mode) {
	return " js-set-item-box-background-color-dark-mode-" + dark_mode;
}

// Dark/Light mode text color for base text elements
export function getBaseTextColorClassNameForDarkMode(dark_mode) {
	return " js-set-base-text-color-dark-mode-" + dark_mode;
}

// Theme background color
export function getDarkBackgroundColorClassNameForTheme(theme_color) {
	return " js-set-dark-background-color-theme-" + theme_color;
}

export function getLightBackgroundColorClassNameForTheme(theme_color) {
	return " js-set-light-background-color-theme-" + theme_color;
}

// Theme background color with hover
export function getBackgroundColorWithHoverClassNameForTheme(theme_color) {
	return " js-set-background-color-with-hover-theme-" + theme_color;
}

// Theme breadcrumb arrow color
export function getDarkBreadcrumbArrowColorClassNameForTheme(theme_color) {
	return " js-set-dark-breadcrumb-arrow-color-theme-" + theme_color;
}

export function getLightBreadcrumbArrowColorClassNameForTheme(theme_color) {
	return " js-set-light-breadcrumb-arrow-color-theme-" + theme_color;
}

// Theme border color
export function getDarkBorderColorClassNameForTheme(theme_color) {
	return " js-set-dark-border-color-theme-" + theme_color;
}

export function getLightBorderColorClassNameForTheme(theme_color) {
	return " js-set-light-border-color-theme-" + theme_color;
}

// Theme text and link color
export function getTextColorClassNameForTheme(theme_color) {
	return " js-set-text-color-theme-" + theme_color;
}
