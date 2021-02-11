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
	invisibleHomeElement.className = "js-calc-app-component";
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

//=================
// Light/Dark mode
//=================
// Light/Dark mode text color for Home text elements
export function getHomeTextColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-set-home-text-color-dark-mode-" + dark_mode;
}

// Light/Dark mode background color for Home component
export function getHomeBackgroundColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-set-home-background-color-dark-mode-" + dark_mode;
}

// Light/Dark mode border and background colors for CustomCheckbox checkbox
export function getCustomCheckboxBorderAndBackgroundColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-set-custom-checkbox-border-and-background-color-dark-mode-" + dark_mode;
}

// Light/Dark mode background colors for TopBar
export function getTopBarBackgroundColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-set-top-bar-background-color-dark-mode-" + dark_mode;
}

// Light/Dark mode background and text colors for TopBar search-bar
export function getTopBarSearchBarBackgroundAndTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-top-bar-search-bar-background-text-color-dark-mode-" + dark_mode;
}

// Light/Dark mode border, background, and text color for TopBar buttons
export function getTopBarButtonBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-top-bar-button-border-background-text-color-dark-mode-" + dark_mode
	);
}

// Light/Dark mode text colors with hover for base icon-buttons
export function getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-base-icon-button-background-color-with-hover-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode text colors with hover for more distinct icon-buttons
export function getMoreDistinctIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-more-distinct-icon-button-background-color-with-hover-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode background colors for CreateItemSidebar component
export function getCreateItemSidebarBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-create-item-sidebar-background-color-dark-mode-" + dark_mode;
}

// Light/Dark mode border, background, and text color for base form-input
export function getCreateItemSidebarFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-create-item-sidebar-form-input-border-background-text-border-text-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode disabled base label
export function getCreateItemSidebarDisabledLabelClassNameForLightOrDarkMode(dark_mode) {
	return " js-set-create-item-sidebar-diabled-label-dark-mode-" + dark_mode;
}

// Light/Dark mode disabled base input date
export function getCreateItemSidebarDisableInputDateClassNameForLightOrDarkMode(dark_mode) {
	return " js-set-create-item-sidebar-diabled-input-date-dark-mode-" + dark_mode;
}

// Light/Dark mode hover background colors for list rows
export function getListRowHoverBackgroundColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-set-list-row-hover-background-color-dark-mode-" + dark_mode;
}

// Light/Dark mode selected background colors for list rows
export function getListRowSelectedBackgroundColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-set-list-row-selected-background-color-dark-mode-" + dark_mode;
}

// Light/Dark mode background colors for ListView mass-delete-button
export function getListViewMassDeleteButtonTextColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-set-list-view-mass-delete-button-text-color-dark-mode-" + dark_mode;
}

// Light/Dark mode border, background, and text color for ItemViewTopBar options-button
export function getItemViewTopBarOptionsButtonClickedBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-top-bar-options-button-clicked-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode hover background color for ItemViewTopBar options-dropdown-row
export function getItemViewTopBarOptionsDropdownRowHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-top-bar-options-dropdown-row-hover-background-color-dark-mode-" + dark_mode
	);
}

// Light/Dark mode background colors for ItemView item-box
export function getItemViewItemBoxBackgroundColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-set-item-view-item-box-background-color-dark-mode-" + dark_mode;
}


//========
// Themes
//========
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
