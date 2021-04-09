import { getElementStyle } from "./index";

/**
 * Converts r, b, or g of a rbg color value to a hex section.
 *
 * @param {Number} rbgSection - either r, b, or g for rbg value
 * @returns {String} The rbgSection converted into a hex section
 */
function rbgSectionToHex(rbgSection) {
	// converts to hex
	let hexSection = rbgSection.toString(16);
	// if length is 1, then concatinates 0 to the front
	return hexSection.length === 1 ? "0" + hexSection : hexSection;
}

/**
 * Takes r, b, and g of rbg color value to convert to the equivalent hex color
 * value
 *
 * @param {Number} r - Red value for rbg color value
 * @param {Number} g - Green value for rbg color value
 * @param {Number} b - Blue value for rbg color value
 * @returns {String} The equivalent hex color value of a rbg color value
 */
function rgbToHex(r, g, b) {
	return "#" + rbgSectionToHex(r) + rbgSectionToHex(g) + rbgSectionToHex(b);
}

/**
 * Takes in the rbg color value as a string and returns equivalent hex color
 * value as a string
 *
 * @param {String} rbgColorValue - rbg color value
 * @returns {String} Equivalent hex color value of rbg color value
 */
function convertRbgColorStringToHexString(rbgColorValue) {
	// Seperates the r, b, and g sections into an array
	const rbgValues = rbgColorValue.match(/\d+/g);
	return rbgValues.length >= 3
		? rgbToHex(Number(rbgValues[0]), Number(rbgValues[1]), Number(rbgValues[2]))
		: null;
}

/**
 * Appends to each status in the status list the hex color values for that
 * status's backcground color
 *
 * @param {Array} statusList - Status list inside priorityStatusOptions of
 * either the project or bug container of the redux state
 * @returns {Array} Status list with the hex color values for each status's
 * bakcground color appended to each status
 */
export function appendHexValueForColorsToStatusList(statusList) {
	// Creating temporary second app element to later append temporary statusBox
	// ...elements to so their css can work. Using second app element ensures
	// ...temporary statusBox elements do not affect the real app element, as
	// ...well as making the removal of all elements created in this function
	// ...from the body quick and easy. Elements are made invisible so the
	// ...user never sees them.
	const invisibleAppElement = document.createElement("div");
	invisibleAppElement.className = "js-calc-app-component";
	invisibleAppElement.visibility = "hidden";
	document.body.appendChild(invisibleAppElement);

	for (let i = 0; i < statusList.length; i++) {
		// Temporary statusBox element used for getting background color
		const invisibleStatusColorDiv = document.createElement("div");
		invisibleStatusColorDiv.className =
			"js-calc-status-box-background-color-" + statusList[i].color;
		invisibleStatusColorDiv.visibility = "hidden";
		invisibleAppElement.appendChild(invisibleStatusColorDiv);

		// getElementStyle(invisibleStatusColorDiv).getPropertyValue("background-color")
		// ...returns rbg color value, so convertRbgColorStringToHexString is used
		const hex = convertRbgColorStringToHexString(
			getElementStyle(invisibleStatusColorDiv).getPropertyValue(
				"background-color"
			)
		);

		// Appends hex color value to the status
		statusList[i]["colorHex"] = hex;
	}

	// Removes invisibleAppElement from body, which also removes all statusBox
	// ...elements. When function ends, they will all be deleted
	invisibleAppElement.parentNode.removeChild(invisibleAppElement);

	return statusList;
}

//=================
// Light/Dark mode
//=================
/**
 * Get light/dark mode className for the entire app's primary base background
 * and text color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for the entire app's primary
 * base background and text color
 */
export function getBaseBackgroundAndTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-base-background-and-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for the entire app's secondary base text color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for the entire app's secondary
 * base text color
 */
export function getBaseSecondaryTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-base-secondary-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for backend error element's text color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className fbackend error element's text
 * color
 */
export function getBackendErrorsTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-backend-errors-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for char-count element's (when limit reached)
 * text color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for char-count element's (when
 * limit reached) text color
 */
export function getCharCountLimitReachedTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-char-count-limit-reached-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for blurred-background element's background
 * color and opacity
 *
 * @param {Boolean} clickToClose - Whether the blurred-background element will
 * close if clicked
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for blurred-background element's
 * background color and opacity
 */
export function getBlurredBackgroundBackgroundColorAndOpacityClassNameForLightOrDarkMode(
	clickToClose,
	dark_mode
) {
	return (
		// Click-to-close blurred-background elements have different css
		(clickToClose
			? " js-set-click-to-close-blurred-background-background-color-and-opacity-dark-mode-"
			: " js-set-blurred-background-background-color-and-opacity-dark-mode-") +
		dark_mode
	);
}

/**
 * Get light/dark mode className for base icon-button element's text color with
 * hover
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for base icon-button element's
 * text color with hover
 */
export function getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-base-icon-button-text-color-with-hover-dark-mode-" + dark_mode
	);
}

/**
 * Get light/dark mode className for univseral-grayed-out-text element's text
 * color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for univseral-grayed-out-text
 * element's text color
 */
export function getUniversalTextGrayedOutTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" universal-text-grayed-out js-set-universal-text-grayed-out-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for base form-input element's border,
 * background, and text color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for base form-input element's
 * border, background, and text color
 */
export function getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-base-form-input-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for list header element's box shadow,
 * background, and text color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for list header element's box
 * shadow, background, and text color
 */
export function getListHeaderBoxShadowAndBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-list-header-box-shadow-and-background-color-dark-mode-" + dark_mode
	);
}

/**
 * Get light/dark mode className for list row element's border and text color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for list row element's border
 * and text color
 */
export function getListRowBorderAndTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-list-row-border-and-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for list row element's hover background color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for list row element's hover
 * background color
 */
export function getListRowHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-list-row-hover-background-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for list row element's selected background
 * color (i.e when item for the row is the target item)
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for list row element's selected
 * background color
 */
export function getListRowSelectedBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-list-row-selected-background-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for NavbarHamburger dropdown element's border,
 * background (with hover and selected), and text color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for NavbarHamburger dropdown
 * element's border, background (with hover and selected), and text color
 */
export function getNavbarHamburgerDropdownBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-navbar-hamburger-dropdown-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountSidebar and AccountModal element's
 * background color (both components have same background color css)
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for AccountSidebar and
 * AccountModal element's background color
 */
export function getAccountSidebarAndModalBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-sidebar-modal-background-color-dark-mode-" + dark_mode
	);
}

/**
 * Get light/dark mode className for AccountSidebar horizontal-dividing-line
 * element's border color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for AccountSidebar
 * horizontal-dividing-line element's border color
 */
export function getAccountSidebarHorizontalDividingLineBorderColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-sidebar-horizontal-dividing-line-border-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountSidebar logout-button element's
 * border and hover background color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for AccountSidebar logout-button
 * element's border and hover background color
 */
export function getAccountSidebarLogoutButtonBorderHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-sidebar-logout-button-border-hover-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountModalDeleteAccount capital-delete
 * element's text color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for AccountModalDeleteAccount
 * capital-delete element's text color
 */
export function getAccountModalDeleteAccountCapitalDeleteTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-modal-delete-account-capital-delete-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountModalDeleteAccount form-input
 * element's focus background color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for AccountModalDeleteAccount
 * form-input element's focus background color
 */
export function getAccountModalDeleteAccountFormInputFocusBorderColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-modal-delete-account-form-input-focus-border-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountModalDeleteAccount
 * form-submit-button element's background (with hover) color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for AccountModalDeleteAccount
 * form-submit-button element's background (with hover) color
 */
export function getAccountModalDeleteAccountFormSubmitButtonBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-modal-delete-account-form-submit-button-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountModalChangeSettings
 * category-container element's border, background, text color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for AccountModalChangeSettings
 * category-container element's border, background, text color
 */
export function getAccountModalChangeSettingsCategoryContainerBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-account-modal-change-settings-category-container-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ListViewTopBar and ItemViewTopBar
 * element's border and background color (both components have same css for
 * border and background color)
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for ListViewTopBar and
 * ItemViewTopBar element's border and background color
 */
export function getTopBarBorderAndBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-top-bar-border-and-background-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for ListViewTopBar and ItemViewTopBar button
 * element's border, background, and text color (both components have same
 * button css for border, background, and text color)
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for ListViewTopBar and
 * ItemViewTopBar button element's border, background, and text color
 */
export function getTopBarButtonBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-top-bar-button-border-background-text-color-dark-mode-" + dark_mode
	);
}

/**
 * Get light/dark mode className for CreateItemSidebar element's background color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for CreateItemSidebar element's
 * background color
 */
export function getCreateItemSidebarBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-create-item-sidebar-background-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for CreateItemSidebar form-label element's
 * disabled text color with no pointer events
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for CreateItemSidebar form-label
 * element's disabled text color with no pointer events
 */
export function getCreateItemSidebarDisabledLabelClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-create-item-sidebar-diabled-label-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for CreateItemSidebar form-input-date
 * element's disabled background and text color with no pointer events
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for CreateItemSidebar
 * form-input-date element's disabled background and text color with no pointer
 * events
 */
export function getCreateItemSidebarDisableInputDateClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-create-item-sidebar-diabled-input-date-dark-mode-" + dark_mode
	);
}

/**
 * Get light/dark mode className for DeleteModal element's background color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for DeleteModal element's
 * background color
 */
export function getDeleteModalBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-delete-modal-background-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for DeleteModal delete-button element's
 * background (with hover) color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for DeleteModal delete-button
 * element's background (with hover) color
 */
export function getDeleteModalDeleteButtonBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-delete-modal-delete-button-background-color-dark-mode-" + dark_mode
	);
}

/**
 * Get light/dark mode className for DeleteModal cancel-button element's
 * border, background (with hover), text color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for DeleteModal cancel-button
 * element's border, background (with hover), text color
 */
export function getDeleteModalCancelButtonBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-delete-modal-cancel-button-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for DeleteModal warning-trapazoid element's
 * border color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for DeleteModal
 * warning-trapazoid element's border color
 */
export function getDeleteModalTrapazoidBorderColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-delete-modal-trapazoid-border-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for ListView empty-list-message element's text
 * color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for ListView empty-list-message
 * element's text color
 */
export function getListViewEmptyListMessageTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-list-view-empty-list-message-text-color-dark-mode-" + dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewTopBar icon-button element's text
 * color with hover
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for ItemViewTopBar icon-button
 * element's text color with hover
 */
 export function getItemViewTopBarIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-top-bar-icon-button-text-color-with-hover-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewTopBar options-button element's
 * clicked (dropdown is active) border, background, and text color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for ItemViewTopBar
 * options-button element's clicked border, background, and text color
 */
export function getItemViewTopBarOptionsButtonClickedBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-top-bar-options-button-clicked-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewTopBar options-dropdown-row
 * element's hover background color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for ItemViewTopBar
 * options-dropdown-row element's hover background color
 */
export function getItemViewTopBarOptionsDropdownRowHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-top-bar-options-dropdown-row-hover-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemView item-box element's background
 * color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for ItemView item-box element's
 * background color
 */
export function getItemViewItemBoxBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-item-view-item-box-background-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for ItemViewListSidebar element's border color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for ItemViewListSidebar
 * element's border color
 */
export function getItemViewListSidebarBorderColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-item-view-list-sidebar-border-color-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for ItemViewListSidebar expand-minimize-button
 * element's border, background (with hover), and text color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for ItemViewListSidebar
 * expand-minimize-button element's border, background (with hover), and text
 * color
 */
export function getItemViewListSidebarExpandMinimizeButtonBorderAndBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-list-sidebar-expand-minimize-button-border-and-background-color-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemView form-input element's border,
 * background, and text color
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for ItemView form-input
 * element's border, background, and text color
 */
export function getItemViewFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-form-input-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewEditItemInfo form-label element's
 * disabled text color with no pointer events
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for ItemViewEditItemInfo
 * form-label element's disabled text color with no pointer events
 */
export function getItemViewDisabledLabelClassNameForLightOrDarkMode(dark_mode) {
	return " js-set-item-view-diabled-label-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for ItemViewEditItemInfo form-input-date
 * element's disabled background and text color with no pointer events
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for ItemViewEditItemInfo
 * form-input-date element's disabled background and text color with no pointer
 * events
 */
export function getItemViewDisableInputDateClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-set-item-view-diabled-input-date-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for ItemViewEditItemInfo and
 * ItemViewCommentBoxIndividualComment form-cancel-button element's background
 * color with hover (both components have same form-cancel-button css for
 * background color with hover)
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for ItemViewEditItemInfo and
 * ItemViewCommentBoxIndividualComment form-cancel-button element's background
 * color with hover
 */
export function getItemViewFormCancelButtonBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-form-cancel-button-button-background-color-with-hover-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewCommentBoxIndividualComment
 * icon-button element's text color with hover
 *
 * @param {Boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {String} Light/dark mode className for
 * ItemViewCommentBoxIndividualComment icon-button element's text color with
 * hover
 */
export function getItemViewCommentBoxIndividualCommentIconButtonTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-set-item-view-comment-box-individual-comment-icon-button-text-color-with-hover-mode-" +
		dark_mode
	);
}

//========
// Themes
//========
// Theme border color
export function getBrighterBorderColorClassNameForTheme(theme_color) {
	return " js-set-brighter-border-color-theme-" + theme_color;
}
export function getBaseBorderColorClassNameForTheme(theme_color) {
	return " js-set-base-border-color-theme-" + theme_color;
}

// Theme background color
export function getBrighterBackgroundColorClassNameForTheme(theme_color) {
	return " js-set-brighter-background-color-theme-" + theme_color;
}
export function getBaseBackgroundColorClassNameForTheme(theme_color) {
	return " js-set-base-background-color-theme-" + theme_color;
}

// Theme background (with hover) color
export function getBackgroundColorWithHoverClassNameForTheme(theme_color) {
	return " js-set-background-color-with-hover-theme-" + theme_color;
}

// Theme -- breadcrumb arrow -- border color
export function getBrighterBreadcrumbArrowColorClassNameForTheme(theme_color) {
	return " js-set-brighter-breadcrumb-arrow-color-theme-" + theme_color;
}
export function getBaseBreadcrumbArrowColorClassNameForTheme(theme_color) {
	return " js-set-base-breadcrumb-arrow-color-theme-" + theme_color;
}

// Theme -- form-submit button -- background (with hover/focus) color
export function getformSubmitButtonColorClassNameForTheme(theme_color) {
	return " js-set-form-submit-button-color-theme-" + theme_color;
}

//==========================
// Themes + Light/Dark mode
//==========================
// Theme + Light/Dark mode -- ToggleSwitch -- border, background, amd text color
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

// Theme + Light/Dark mode -- TopBar new-item-button during tutorial -- border color
export function getTopBarNewItemButtonTutorialBorderColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-set-top-bar-new-item-button-tutorial-border-color-mode-dark-theme-"
			: " js-set-top-bar-new-item-button-tutorial-border-color-mode-light-theme-") +
		theme_color
	);
}

// Theme + Light/Dark mode -- TopBar new-item-tutorial -- border, arrow, and text color
export function getTopBarNewItemTutorialBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-set-top-bar-new-item-tutorial-border-background-text-color-mode-dark-theme-"
			: " js-set-top-bar-new-item-tutorial-border-background-text-color-mode-light-theme-") +
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

// Theme + Light/Dark mode -- CustomCheckbox -- border, background, text color
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

// Theme + Light/Dark mode -- TopBar search-bar -- border, background, and text color
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

// Theme + Light/Dark mode -- base form-input -- border (with focus), background, and text color
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
