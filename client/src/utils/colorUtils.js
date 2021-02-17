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
// Light/Dark mode -- Home component -- background and text colors
export function getHomeBackgroundAndTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-home-background-and-text-color-dark-mode-" + dark_mode;
}

// Light/Dark mode -- backend-errors -- text colors
export function getBackendErrorsTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-backend-errors-text-color-dark-mode-" + dark_mode;
}

// Light/Dark mode -- char-count limit reached -- text colors
export function getCharCountLimitReachedTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-char-count-limit-reached-text-color-dark-mode-" + dark_mode;
}

// Light/Dark mode -- blurred-background -- background color and opacity
export function getBlurredBackgroundBackgroundColorAndOpacityClassNameForLightOrDarkMode(
	clickToClose,
	dark_mode
) {
	return (
		(clickToClose
			? " js-set-click-to-close-blurred-background-background-color-and-opacity-dark-mode-"
			: " js-set-blurred-background-background-color-and-opacity-dark-mode-") +
		dark_mode
	);
}

// Light/Dark mode -- base icon-buttons -- text colors with hover
export function getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-base-icon-button-text-color-with-hover-dark-mode-" + dark_mode
	);
}

// Light/Dark mode -- CustomCheckbox -- border and background colors
export function getCustomCheckboxBorderAndBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-custom-checkbox-border-and-background-color-dark-mode-" + dark_mode
	);
}

// Light/Dark mode -- ToggleSwitch -- border, background, amd text colors
export function getToggleSwitchBorderBackgroundTextColorClassNameForLightOrDarkMode(
	isOn,
	dark_mode
) {
	return (
		(isOn
			? " js-set-toggle-switch-on-border-background-text-colors-dark-mode-"
			: " js-set-toggle-switch-off-border-background-text-colors-dark-mode-") +
		dark_mode
	);
}

// Light/Dark mode -- universal-text-grayed-out -- text colors
export function getUniversalTextGrayedOutTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-universal-text-grayed-out-text-color-dark-mode-" + dark_mode;
}

// Light/Dark mode -- base form-input -- border (with focus), background, and text color
export function getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-base-form-input-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- TopBar -- border and background colors
export function getTopBarBorderAndBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-top-bar-border-and-background-color-dark-mode-" + dark_mode;
}

// Light/Dark mode -- TopBar buttons -- border, background, and text color
export function getTopBarButtonBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-top-bar-button-border-background-text-color-dark-mode-" + dark_mode
	);
}

// Light/Dark mode -- TopBar search-bar -- background and text colors
export function getTopBarSearchBarBackgroundAndTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-top-bar-search-bar-background-text-color-dark-mode-" + dark_mode
	);
}

// Light/Dark mode -- AccountSidebar and AccountModal -- background colors
export function getAccountSidebarAndModalBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-sidebar-modal-background-color-dark-mode-" + dark_mode
	);
}

// Light/Dark mode -- AccountSidebar logout-button -- hover background colors
export function getAccountSidebarLogoutButtonHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-sidebar-logout-button-hover-background-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- AccountModalDeleteAccount capital-delete -- text colors
export function getAccountModalDeleteAccountCapitalDeleteTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-modal-delete-account-capital-delete-text-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- AccountModalDeleteAccount form-input -- focus background colors
export function getAccountModalDeleteAccountFormInputFocusBorderColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-modal-delete-account-form-input-focus-border-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- AccountModalDeleteAccount form-submit button -- background (with hover) colors
export function getAccountModalDeleteAccountFormSubmitButtonBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-modal-delete-account-form-submit-button-background-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- CreateItemSidebar component -- background colors
export function getCreateItemSidebarBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-create-item-sidebar-background-color-dark-mode-" + dark_mode;
}

// Light/Dark mode -- CreateItemSidebar -- disabled form-label
export function getCreateItemSidebarDisabledLabelClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-create-item-sidebar-diabled-label-dark-mode-" + dark_mode;
}

// Light/Dark mode -- CreateItemSidebar -- disabled form-input type date
export function getCreateItemSidebarDisableInputDateClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-create-item-sidebar-diabled-input-date-dark-mode-" + dark_mode
	);
}

// Light/Dark mode -- list rows -- border colors
export function getListRowBorderColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-set-list-row-border-color-dark-mode-" + dark_mode;
}

// Light/Dark mode -- list rows -- hover background colors
export function getListRowHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-list-row-hover-background-color-dark-mode-" + dark_mode;
}

// Light/Dark mode -- list rows -- selected background colors
export function getListRowSelectedBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-list-row-selected-background-color-dark-mode-" + dark_mode;
}

// Light/Dark mode -- list headers -- box shadow, background, and text colors
export function getListHeaderBoxShadowAndBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-list-header-box-shadow-and-background-color-dark-mode-" + dark_mode
	);
}

// Light/Dark mode -- DeleteModal component -- background color
export function getDeleteModalBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-delete-modal-background-color-dark-mode-" + dark_mode;
}

// Light/Dark mode -- DeleteModal delete-button -- background (with hover) color
export function getDeleteModalDeleteButtonBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-delete-modal-delete-button-background-color-dark-mode-" + dark_mode
	);
}

// Light/Dark mode -- DeleteModal cancel-button -- border, background (with hover), text color
export function getDeleteModalCancelButtonBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-delete-modal-cancel-button-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- DeleteModal warning-trapazoid -- border color
export function getDeleteModalTrapazoidBorderColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-delete-modal-trapazoid-border-color-dark-mode-" + dark_mode;
}

// Light/Dark mode -- temViewTopBar options-button -- border, background, and text colors
export function getItemViewTopBarOptionsButtonClickedBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-top-bar-options-button-clicked-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- ItemViewTopBar options-dropdown-row -- hover background color
export function getItemViewTopBarOptionsDropdownRowHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-top-bar-options-dropdown-row-hover-background-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- ItemViewTopBar icon-buttons -- text colors with hover
export function getItemViewTopBarIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-top-bar-icon-button-text-color-with-hover-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- ItemView item-box -- background colors
export function getItemViewItemBoxBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-item-view-item-box-background-color-dark-mode-" + dark_mode;
}

// Light/Dark mode -- ItemViewListSidebar -- border colors
export function getItemViewListSidebarBorderColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-item-view-list-sidebar-border-color-mode-" + dark_mode;
}

// Light/Dark mode -- ItemViewListSidebar expand-minimize-button -- border, background (with hover), and text colors
export function getItemViewListSidebarExpandMinimizeButtonBorderAndBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-list-sidebar-expand-minimize-button-border-and-background-color-mode-" +
		dark_mode
	);
}

// Light/Dark mode --  ItemViewEditItemInfo form-input for name -- border (with focus -- top, bottom, left), background, text color
export function getItemViewFormNameInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-form-input-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- ItemViewEditItemInfo name char-count-container -- border color (top, bottom, right)
export function getItemViewFormNameCharCountContainerFocusBorderColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-form-name-char-count-container-top-bottom-right-box-shadow-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- ItemViewEditItemInfo -- disabled form-label
export function getItemViewDisabledLabelClassNameForLightOrDarkMode(dark_mode) {
	return " js-set-item-view-diabled-label-dark-mode-" + dark_mode;
}

// Light/Dark mode -- ItemViewEditItemInfo -- disabled form-input type date
export function getItemViewDisableInputDateClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-item-view-diabled-input-date-dark-mode-" + dark_mode;
}

// Light/Dark -- ItemView form cancel button -- mode background color (with hover)
export function getItemViewFormCancelButtonBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-form-cancel-button-button-background-color-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- ItemViewCommentBoxIndividualComment icon-button -- text color (with hover)
export function getItemViewCommentBoxIndividualCommentIconButtonTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-comment-box-individual-comment-icon-button-text-color-mode-" +
		dark_mode
	);
}

//========
// Themes
//========
// Theme border color
export function getLightBorderColorClassNameForTheme(theme_color) {
	return " js-set-brighter-border-color-theme-" + theme_color;
}
export function getDarkBorderColorClassNameForTheme(theme_color) {
	return " js-set-base-border-color-theme-" + theme_color;
}

// Theme background color
export function getLightBackgroundColorClassNameForTheme(theme_color) {
	return " js-set-brighter-background-color-theme-" + theme_color;
}
export function getDarkBackgroundColorClassNameForTheme(theme_color) {
	return " js-set-base-background-color-theme-" + theme_color;
}

// Theme background color with hover
export function getBackgroundColorWithHoverClassNameForTheme(theme_color) {
	return " js-set-background-color-with-hover-theme-" + theme_color;
}

// Theme breadcrumb arrow color
export function getLightBreadcrumbArrowColorClassNameForTheme(theme_color) {
	return " js-set-brighter-breadcrumb-arrow-color-theme-" + theme_color;
}
export function getDarkBreadcrumbArrowColorClassNameForTheme(theme_color) {
	return " js-set-base-breadcrumb-arrow-color-theme-" + theme_color;
}

// Theme form-submit button colors
export function getformSubmitButtonColorClassNameForTheme(theme_color) {
	return " js-set-form-submit-button-color-theme-" + theme_color;
}

//==========================
// Themes + Light/Dark mode
//==========================
// Theme text color
export function getTextColorClassNameForThemeWithLightOrDarkMode(dark_mode, theme_color) {
	return (
		(dark_mode
			? " js-set-text-color-mode-dark-theme-"
			: " js-set-text-color-mode-light-theme-") + theme_color
	);
}
