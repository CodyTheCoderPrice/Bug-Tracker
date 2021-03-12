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
// Light/Dark mode -- Base -- background and text colors
export function getBaseBackgroundAndTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-base-background-and-text-color-dark-mode-" + dark_mode;
}

// Light/Dark mode -- Base secondary -- text colors
export function getBaseSecondaryTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-base-secondary-text-color-dark-mode-" + dark_mode;
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

// Light/Dark mode -- universal-text-grayed-out -- text colors
export function getUniversalTextGrayedOutTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" universal-text-grayed-out js-set-universal-text-grayed-out-text-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- base form-input -- border, background, and text color
export function getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-base-form-input-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- NavbarHamburger dropdown -- border, background (with hover and selected), and text colors
export function getNavbarHamburgerDropdownBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-navbar-hamburger-dropdown-border-background-text-color-dark-mode-" +
		dark_mode
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

// Light/Dark mode -- AccountSidebar horizontal-dividing-line -- border colors
export function getAccountSidebarHorizontalDividingLineBorderColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-sidebar-horizontal-dividing-line-border-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- AccountSidebar logout-button -- border hover background colors
export function getAccountSidebarLogoutButtonBorderHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-sidebar-logout-button-border-hover-background-color-dark-mode-" +
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

// Light/Dark mode -- AccountModalChangeSettings category container -- border, background, text color
export function getAccountModalChangeSettingsCategoryContainerBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-modal-change-settings-category-container-border-background-text-color-dark-mode-" +
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

// Light/Dark mode -- TopBar new-item-button during tutorial -- border color
export function getTopBarNewItemButtonTutorialBorderColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-top-bar-new-item-button-tutorial-border-color-dark-mode-" +
		dark_mode
	);
}

// Light/Dark mode -- TopBar new-item-tutorial -- border, arrow, and text colors
export function getTopBarNewItemTutorialBorderArrowTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-top-bar-new-item-tutorial-border-background-text-color-dark-mode-" +
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

// Light/Dark mode -- list rows -- border and text colors
export function getListRowBorderAndTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-list-row-border-and-text-color-dark-mode-" + dark_mode;
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

// Light/Dark mode -- ItemView form-input -- border, background, and text color
export function getItemViewFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-form-input-border-background-text-color-dark-mode-" +
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
// Theme border colors
export function getBrighterBorderColorClassNameForTheme(theme_color) {
	return " js-set-brighter-border-color-theme-" + theme_color;
}
export function getBaseBorderColorClassNameForTheme(theme_color) {
	return " js-set-base-border-color-theme-" + theme_color;
}

// Theme background colors
export function getBrighterBackgroundColorClassNameForTheme(theme_color) {
	return " js-set-brighter-background-color-theme-" + theme_color;
}
export function getBaseBackgroundColorClassNameForTheme(theme_color) {
	return " js-set-base-background-color-theme-" + theme_color;
}

// Theme background (with hover) colors
export function getBackgroundColorWithHoverClassNameForTheme(theme_color) {
	return " js-set-background-color-with-hover-theme-" + theme_color;
}

// Theme -- breadcrumb arrow -- border colors
export function getBrighterBreadcrumbArrowColorClassNameForTheme(theme_color) {
	return " js-set-brighter-breadcrumb-arrow-color-theme-" + theme_color;
}
export function getBaseBreadcrumbArrowColorClassNameForTheme(theme_color) {
	return " js-set-base-breadcrumb-arrow-color-theme-" + theme_color;
}

// Theme -- form-submit button -- background (with hover/focus) colors
export function getformSubmitButtonColorClassNameForTheme(theme_color) {
	return " js-set-form-submit-button-color-theme-" + theme_color;
}

//==========================
// Themes + Light/Dark mode
//==========================
// Theme + Light/Dark mode -- ToggleSwitch -- border, background, amd text colors
export function getToggleSwitchBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-set-toggle-switch-border-background-text-colors-mode-dark-theme-"
			: " js-set-toggle-switch-border-background-text-colors-mode-light-theme-") +
		theme_color
	);
}

// Theme + Light/Dark mode -- focus border color
export function getFocusBorderColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-set-focus-border-color-mode-dark-theme-"
			: " js-set-focus-border-color-mode-light-theme-") + theme_color
	);
}

// Theme + Light/Dark mode -- text color
export function getTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-set-text-color-mode-dark-theme-"
			: " js-set-text-color-mode-light-theme-") + theme_color
	);
}

// Theme + Light/Dark mode -- CustomCheckbox -- border, background, text colors
export function getCustomCheckboxBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-set-custom-checkbox-border-background-text-color-mode-dark-theme-"
			: " js-set-custom-checkbox-border-background-text-color-mode-light-theme-") +
		theme_color
	);
}

// Theme + Light/Dark mode -- TopBar search-bar -- border, background, and text colors
export function getTopBarSearchBarBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-set-top-bar-search-bar-border-background-text-color-mode-dark-theme-"
			: " js-set-top-bar-search-bar-border-background-text-color-mode-light-theme-") +
		theme_color
	);
}

// Theme + Light/Dark mode -- base form-input -- border (with focus), background, and text colors
export function getBaseFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
			dark_mode
		) +
		getFocusBorderColorClassNameForThemeWithLightOrDarkMode(
			dark_mode,
			theme_color
		)
	);
}

// Theme + Light/Dark mode -- ItemView form-input -- border (with focus), background, and text color
export function getItemViewFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		getItemViewFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
			dark_mode
		) +
		getFocusBorderColorClassNameForThemeWithLightOrDarkMode(
			dark_mode,
			theme_color
		)
	);
}

// Theme + Light/Dark mode -- ItemViewEditItemInfo form-input for name -- border (with focus), background, and text color
export function getItemViewEditItemInfoFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		getItemViewFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
			dark_mode
		) +
		(dark_mode
			? " js-set-item-view-edit-item-info-form-name-input-focus-border-color-mode-dark-theme-"
			: " js-set-item-view-edit-item-info-form-name-input-focus-border-color-mode-light-theme-") +
		theme_color
	);
}
