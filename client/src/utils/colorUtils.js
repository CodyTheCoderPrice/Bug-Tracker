import { getElementStyle } from "./index";

/**
 * Converts r, b, or g of a rbg color value to a hex section.
 *
 * @param {number} rbgSection - either r, b, or g for rbg value
 * @returns {string} The rbgSection converted into a hex section
 * 
 * @example
 * // Returns "8d"
 * rbgSectionToHexSection(141);
 */
function rbgSectionToHexSection(rbgSection) {
	let hexSection = rbgSection.toString(16);
	// if length is 1, then concatinates 0 to the front
	return hexSection.length === 1 ? "0" + hexSection : hexSection;
}

/**
 * Takes r, b, and g of rbg color value to convert to the equivalent hex color
 * value
 *
 * @param {number} r - Red value for rbg color value
 * @param {number} g - Green value for rbg color value
 * @param {number} b - Blue value for rbg color value
 * @returns {string} The equivalent hex color value of a rbg color value
 * 
 * @example
 * // Returns "#568dd5"
 * rgbToHex(86, 141, 213);
 */
function rgbToHex(r, g, b) {
	return "#" + rbgSectionToHexSection(r) + rbgSectionToHexSection(g) + rbgSectionToHexSection(b);
}

/**
 * Takes in the rbg color value as a string and returns equivalent hex color
 * value as a string
 *
 * @param {string} rbgColorValue - rbg color value
 * @returns {string} Equivalent hex color value of rbg color value
 * 
 * @example
 * // Returns "#568dd5"
 * convertRbgColorStringToHexString("rgb(86, 141, 213)");
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
 * @param {{
 * 	id: number,
 * 	option: string,
 * 	color: string
 * }[]} statusList - Status list inside priorityStatusOptions of either the 
 * project or bug container of the redux state
 * @returns {{
 * 	id: number,
 * 	option: string,
 * 	color: string,
 * 	colorHex: string
 * }[]} Status list with the hex color values for each status's bakcground 
 * color appended to each status
 * 
 * @example
 * appendHexValueForColorsToStatusList([
 * 	{
 * 		id: 1,
 * 		option: "Open",
 * 		color: "blue"
 * 	}, {
 * 		id: 2, 
 * 		option: "In Progress",
 * 		color: "purple"
 * 	}, {
 * 		id: 3,
 * 		option: "Testing",
 * 		color: "orange"
 * 	}, {
 * 		id: 4,
 * 		option: "Closed",
 * 		color: "green"
 * 	}
 * ]);
 */
export function appendHexValueForColorsToStatusList(statusList) {
	// Creating temporary stand-in app-component element to later append 
	// ...temporary status-box elements to for CSS. Using stand-in element
	// ...ensures real element remains unaffected and function can be called
	// ...without needing real element in the DOM. Made invisible so user
	// ...never sees stand-in element or its child elements.
	const invisibleTempAppElement = document.createElement("div");
	invisibleTempAppElement.className = "js-get-app-component";
	invisibleTempAppElement.visibility = "hidden";
	document.body.appendChild(invisibleTempAppElement);

	for (let i = 0; i < statusList.length; i++) {
		// Temporary status-box element used to get background color
		const tempStatusColorDiv = document.createElement("div");
		tempStatusColorDiv.className =
			"js-get-status-box-background-color-" + statusList[i].color;
		// Css requires being child of an app-component element
		invisibleTempAppElement.appendChild(tempStatusColorDiv);

		// getElementStyle(tempStatusColorDiv).getPropertyValue("background-color")
		// ...returns rbg color value, so convertRbgColorStringToHexString is used
		const hex = convertRbgColorStringToHexString(
			getElementStyle(tempStatusColorDiv).getPropertyValue(
				"background-color"
			)
		);

		// Appends hex color value to the status
		statusList[i]["colorHex"] = hex;
	}

	// Removing stand-in element from DOM by removing from it's own parentNode
	// ...(also removes all stand-in element's child elements)
	invisibleTempAppElement.parentNode.removeChild(invisibleTempAppElement);

	return statusList;
}

//=================
// Light/Dark mode
//=================
/**
 * Get light/dark mode className for the entire app's primary base background
 * and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for the entire app's primary
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for the entire app's secondary
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className fbackend error element's text
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for char-count element's (when
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
 * @param {boolean} clickToClose - Whether the blurred-background element will
 * close if clicked
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for blurred-background element's
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for base icon-button element's
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for univseral-grayed-out-text
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for base form-input element's
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for list header element's box
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for list row element's border
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for list row element's hover
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for list row element's selected
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for NavbarHamburger dropdown
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountSidebar and
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountSidebar
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountSidebar logout-button
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountModalDeleteAccount
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountModalDeleteAccount
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountModalDeleteAccount
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
 * Get light/dark mode className for AccountModalEditSettings
 * category-container element's border, background, text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountModalEditSettings
 * category-container element's border, background, text color
 */
export function getAccountModalEditSettingsCategoryContainerBorderBackgroundTextColorClassNameForLightOrDarkMode(
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ListViewTopBar and
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ListViewTopBar and
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for CreateItemSidebar element's
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for CreateItemSidebar form-label
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for CreateItemSidebar
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for DeleteModal element's
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for DeleteModal delete-button
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for DeleteModal cancel-button
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for DeleteModal
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ListView empty-list-message
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewTopBar icon-button
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewTopBar
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewTopBar
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemView item-box element's
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewListSidebar
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewListSidebar
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemView form-input
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewEditItemInfo
 * form-label element's disabled text color with no pointer events
 */
export function getItemViewDisabledLabelClassNameForLightOrDarkMode(dark_mode) {
	return " js-set-item-view-diabled-label-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for ItemViewEditItemInfo form-input-date
 * element's disabled background and text color with no pointer events
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewEditItemInfo
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewEditItemInfo and
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
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for
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
/**
 * Get brighter theme className for border color 
 * 
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Brighter theme className for border color 
 */
export function getBrighterBorderColorClassNameForTheme(theme_color) {
	return " js-set-brighter-border-color-theme-" + theme_color;
}
/**
 * Get base theme className for border color 
 * 
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Base theme className for border color 
 */
export function getBaseBorderColorClassNameForTheme(theme_color) {
	return " js-set-base-border-color-theme-" + theme_color;
}


/**
 * Get brighter theme className for background color 
 * 
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Brighter theme className for background color 
 */
export function getBrighterBackgroundColorClassNameForTheme(theme_color) {
	return " js-set-brighter-background-color-theme-" + theme_color;
}
/**
 * Get base theme className for background color 
 * 
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Base theme className for background color 
 */
export function getBaseBackgroundColorClassNameForTheme(theme_color) {
	return " js-set-base-background-color-theme-" + theme_color;
}


/**
 * Get theme className for background color with hover (background color is
 * brighter theme, while hover background color is base theme)
 * 
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme className for background color with hover
 */
export function getBackgroundColorWithHoverClassNameForTheme(theme_color) {
	return " js-set-background-color-with-hover-theme-" + theme_color;
}


/**
 * Get brighter theme className for NavbarBreadcrumb arrow element's border
 * color (since the arrow is made entirely of a border, this changes the entire
 * color of the arrow)
 * 
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Brighter theme className for NavbarBreadcrumb arrow
 * element's border color
 */
export function getBrighterBreadcrumbArrowColorClassNameForTheme(theme_color) {
	return " js-set-brighter-breadcrumb-arrow-color-theme-" + theme_color;
}
/**
 * Get base theme className for NavbarBreadcrumb arrow element's border color
 * (since the arrow is made entirely of a border, this changes the entire color
 * of the arrow)
 * 
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Base theme className for NavbarBreadcrumb arrow element's
 * border color
 */
export function getBaseBreadcrumbArrowColorClassNameForTheme(theme_color) {
	return " js-set-base-breadcrumb-arrow-color-theme-" + theme_color;
}


/**
 * Get theme className for form-submit-button element's background color with
 * hover and focus (background color is brighter theme, while hover/focus
 * background color is base theme)
 * 
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme className for form-submit-button element's
 * background color with hover and focus
 */
export function getformSubmitButtonColorWithHoverAndFocusClassNameForTheme(theme_color) {
	return " js-set-form-submit-button-color-with-hover-focus-theme-" + theme_color;
}


//==========================
// Themes + Light/Dark mode
//==========================
/**
 * Get theme with light/dark mode className for ToggleSwitch element's border,
 * background, and text color
 * 
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for ToggleSwitch
 * element's border, background, amd text color
 */
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

/**
 * Get theme with light/dark mode className for ListViewTopBar new-item-button
 * (during tutorial) element's border color
 * 
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for ListViewTopBar
 * new-item-button (during tutorial) element's border color
 */
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

/**
 * Get theme with light/dark mode className for ListViewTopBar
 * new-item-tutorial element's border, arrow, and text color
 * 
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for ListViewTopBar
 * new-item-tutorial element's border, arrow, and text color
 */
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

/**
 * Get theme with light/dark mode className for form-input element's focus
 * border color
 * 
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for form-input 
 * element's focus border color
 */
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

/**
 * Get theme with light/dark mode className for the entire app's theme based
 * text color
 * 
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for the entire app's 
 * theme based text color
 */
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

/**
 * Get theme with light/dark mode className for CustomCheckbox element's 
 * border, background, text color
 * 
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for CustomCheckbox 
 * element's border, background, text color
 */
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

/**
 * Get theme with light/dark mode className for ListViewTopBar and
 * ItemViewTopBar search-bar element's border, background, and text color
 * 
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for ListViewTopBar 
 * and ItemViewTopBar search-bar element's border, background, and text color
 */
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

/**
 * Get theme with light/dark mode className for base form-input element's 
 * border (with focus), background, and text color
 * 
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for base form-input 
 * element's border (with focus), background, and text color
 */
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

/**
 * Get theme with light/dark mode className for ItemView form-input element's 
 * border (with focus), background, and text color
 * 
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for ItemView 
 * form-input element's border (with focus), background, and text color
 */
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

/**
 * Get theme with light/dark mode className for ItemViewEditItemInfo form-input 
 * (for name) element's border (with focus), background, and text color
 * 
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for 
 * ItemViewEditItemInfo form-input (for name) element's border (with focus), 
 * background, and text color
 */
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
