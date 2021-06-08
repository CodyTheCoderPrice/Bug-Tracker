/**
 * If shouldHaveClassName param is true, then ensures element has the passed
 * className. Otherwise will make sure it doesn't. This does not affect other
 * classNames the element has.
 *
 * @param {boolean} shouldHaveClassName - Should the element have the className
 * @param {Element} element - The element that will have it's className toggled
 * @param {string} nameOfToggledClass - The className the element either should
 * or shouldn't have
 *
 * @example
 * // Ensures element with className "js-button" also has the className
 * // ..."hide-button"
 * toggleClassName(
 * 	true,
 * 	document.getElementsByClassName("js-button")[0],
 * 	"hide-button"
 * )
 *
 * @example
 * // Ensures element with className "js-button" doesn't have the className
 * // ..."hide-button"
 * toggleClassName(
 * 	false,
 * 	document.getElementsByClassName("js-button")[0],
 * 	"hide-button"
 * )
 */
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
		// Regex to find all instances of the className
		const regex = new RegExp("(?:^|\\s)" + nameOfToggledClass + "(?!\\S)", "g");
		// Removes all instances of the className
		element.className = element.className.replace(regex, "");
	}
}

//=====================
// Standard classNames
//=====================
export function getAppComponentClassName() {
	return " js-get-app-component";
}

export function getNavbarBreadcrumbComponentClassName() {
	return " js-get-navbar-breadcrumb-component";
}

export function getNavbarBreadcrumbComponentButtonTextElementClassName() {
	return " js-get-navbar-breadcrumb-button-text";
}

export function getNavbarBreadcrumbComponentButtonEndContainerArrowElementClassName() {
	return " js-get-navbar-breadcrumb-button-end-container-arrow";
}

export function getNavbarHamburgerComponentClassName() {
	return " js-get-navbar-hamburger-component";
}

export function getNavbarHamburgerComponentButtonContainerElementClassName() {
	return " js-get-navbar-hamburger-button-container";
}

export function getNavbarHamburgerComponentTitleElementClassName() {
	return " js-get-navbar-hamburger-title";
}

export function getListViewTopBarComponentClassName() {
	return " js-get-list-view-top-bar-component";
}

export function getListViewTableComponentClassName() {
	return " js-get-list-view-table-component";
}

export function getListViewTableComponentRowElementClassName() {
	return " js-get-list-view-table-row";
}

export function getItemViewComponentClassName() {
	return " js-get-item-view-component";
}

export function getItemViewComponentPaddingcontainerElementClassName() {
	return " js-get-item-view-padding-container";
}

export function getItemViewComponentOuterDividingContainerElementClassName() {
	return " js-get-item-view-outer-dividing-container";
}

export function getItemViewTopBarComponentClassName() {
	return " js-get-item-vew-top-bar-component";
}

export function getItemViewListSidebarComponentClassName() {
	return " js-get-item-view-list-sidebar-component";
}

//============================
// Light/Dark mode classNames
//============================
/**
 * Get light/dark mode className for common (i.e. used by multiple components)
 * strong (i.e. more distinct) text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common strong text color
 */
export function getCommonStrongTextColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-get-common-strong-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for common (i.e. used by multiple components)
 * weak (i.e. less distinct) text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common weak text color
 */
export function getCommonWeakTextColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-get-common-weak-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for common (i.e. used by multiple components)
 * 'backend-errors' (className) element's text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common 'backend-errors'
 * (className) element's text color
 */
export function getCommonBackendErrorsTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-common-backend-errors-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for common (i.e. used by multiple components)
 * char count (when limit is reached) element's text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common char-count (when
 * limit reached) element's text color
 */
export function getCommonCharCountLimitReachedTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-char-count-limit-reached-text-color-dark-mode-" + dark_mode
	);
}

/**
 * Get light/dark mode className for common (i.e. used by multiple components)
 * blurred backdrop element's background color and opacity
 *
 * @param {boolean} clickToClose - Whether the blurred-background element will
 * close if clicked
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common blurred backdrop
 * element's background color and opacity
 */
export function getCommonBlurredBackdropBackgroundColorAndOpacityClassNameForLightOrDarkMode(
	clickToClose,
	dark_mode
) {
	return (
		// Click-to-close blurred-background elements have different css
		(clickToClose
			? " js-get-common-blurred-backdrop-click-to-close-background-color-and-opacity-dark-mode-"
			: " js-get-common-blurred-backdrop-background-color-and-opacity-dark-mode-") +
		dark_mode
	);
}

/**
 * Get light/dark mode className for common (i.e. used by multiple components)
 * icon-button element's text color with hover
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common icon-button element's
 * text color with hover
 */
export function getCommonIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-icon-button-text-color-with-hover-dark-mode-" + dark_mode
	);
}

/**
 * Get light/dark mode className for Common (i.e. used by multiple components) 
 * element's (grayed out) text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common element's (grayed out)
 * text color
 */
export function getCommonGrayedOutTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-grayed-out-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for common (i.e. used by multiple components)
 * form input element's border, background, and text colors
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common form input element's
 * border, background, and text colors
 */
export function getCommonFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-form-input-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for Home component's 'home-container'
 * (className) element's background and text colors.
 *
 * Note: Since child elements inherit text color, any elements intented to
 * have the same text color as 'home-container' element will simply inherit it
 * as all other elements (except those in Register and Login components) are
 * children of it.
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for Home component's
 * 'home-container' (className) element's background and text colors
 */
export function getHomeBackgroundColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-get-home-background-and-text-color-dark-mode-" + dark_mode;
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
		" js-get-navbar-hamburger-dropdown-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountSidebar components
 * 'sidebar-container' (className) element's background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountSidebar components
 * 'sidebar-container' (className) element's background color
 */
export function getAccountSidebarBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-account-sidebar-background-color-dark-mode-" + dark_mode;
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
		" js-get-account-sidebar-horizontal-dividing-line-border-color-dark-mode-" +
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
		" js-get-account-sidebar-logout-button-border-hover-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountModal components
 * 'edit-account-modal' (className) element's background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountSidebar components
 * 'edit-account-modal' (className) element's background color
 */
export function getAccountModalBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-account-modal-background-color-dark-mode-" + dark_mode;
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
		" js-get-account-modal-delete-account-capital-delete-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountModalDeleteAccount form input
 * element's border (with focus), background, and text colors
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountModalDeleteAccount
 * form input element's border (with focus), background, and text colors
 */
export function getAccountModalDeleteAccountFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		getCommonFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
			dark_mode
		) +
		(" js-get-account-modal-delete-account-form-input-focus-border-color-dark-mode-" +
			dark_mode)
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
		" js-get-account-modal-delete-account-form-submit-button-background-color-dark-mode-" +
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
		" js-get-account-modal-change-settings-category-container-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for common (i.e. used by multiple components)
 * ListViewTopBar component's 'list-view-top-bar-component' (className) and
 * ItemViewTopBar component's 'item-vew-top-bar-component' (className)
 * element's border and background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common ListViewTopBar
 * component's 'list-view-top-bar-component' (className) and ItemViewTopBar
 * component's 'item-vew-top-bar-component' (className) element's border
 * and background color
 */
export function getCommonTopBarBorderAndBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-common-set-top-bar-border-and-background-color-dark-mode-" + dark_mode
	);
}

/**
 * Get light/dark mode className for common (i.e. used by multiple components)
 * ListViewTopBar/ItemViewTopBar component's button and dropdown element's
 * border, background, and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common
 * ListViewTopBar/ItemViewTopBar component's button and dropdown element's
 * border, background, and text color
 */
export function getCommonTopBarButtonAndDropdownBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-top-bar-button-and-dropdown-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ListViewTable component's
 * 'list-table__row__header' (className) element's box shadow and background
 * color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className ListViewTable component's
 * 'list-table__row__header' (className) element's box shadow and background
 * color
 */
export function getListViewTableHeaderBoxShadowAndBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-list-view-table-row-header-box-shadow-and-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ListViewTableItemRow component's
 * 'list-table__row' (className) element's border, background, and text colors
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ListViewTableItemRow
 * component's 'list-table__row' (className) element's border, background, and
 * text colors
 */
export function getListViewTableItemRowBorderAndTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-list-view-table-item-row-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ListViewTableItemRow component's
 * 'list-table__row' (className) element's hover background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ListViewTableItemRow
 * component's 'list-table__row' (className) element's hover background color
 */
export function getListViewTableItemRowHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-list-view-table-item-row-hover-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ListViewTableItemRow component's
 * 'list-table__row' (className) element's selected (i.e item for row is equal
 * to 'itemViewCurrentItem' property in 'componentsDisplay' Object in project/bug
 * container of the redux state) background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ListViewTableItemRow component's
 * 'list-table__row' (className) element's selected background color
 */
export function getListViewTableItemRowSelectedBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-list-view-table-item-row-selected-background-color-dark-mode-" +
		dark_mode
	);
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
		" js-get-list-view-empty-list-message-text-color-dark-mode-" + dark_mode
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
	return " js-get-create-item-sidebar-background-color-dark-mode-" + dark_mode;
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
	return " js-get-create-item-sidebar-diabled-label-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for CreateItemSidebar form input (type date)
 * element's disabled background and text color with no pointer events
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for CreateItemSidebar
 * form input (type date) element's disabled background and text color with no pointer
 * events
 */
export function getCreateItemSidebarDisableInputDateClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-create-item-sidebar-diabled-input-date-dark-mode-" + dark_mode
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
	return " js-get-delete-modal-background-color-dark-mode-" + dark_mode;
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
		" js-get-delete-modal-delete-button-background-color-dark-mode-" + dark_mode
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
		" js-get-delete-modal-cancel-button-border-background-text-color-dark-mode-" +
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
	return " js-get-delete-modal-trapazoid-border-color-dark-mode-" + dark_mode;
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
		" js-get-item-view-top-bar-icon-button-text-color-with-hover-dark-mode-" +
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
		" js-get-item-view-top-bar-options-button-clicked-border-background-text-color-dark-mode-" +
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
		" js-get-item-view-top-bar-options-dropdown-row-hover-background-color-dark-mode-" +
		dark_mode
	);
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
	return " js-get-item-view-list-sidebar-border-color-mode-" + dark_mode;
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
		" js-get-item-view-list-sidebar-expand-minimize-button-border-and-background-color-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewListSidebar component's
 * 'list-sidebar__table__row__header' (className) element's box shadow and
 * background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className ItemViewListSidebar component's
 * 'list-sidebar__table__row__header' (className) element's box shadow and
 * background color
 */
export function getItemViewListSidebarHeaderBoxShadowAndBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-list-sidebar-row-header-box-shadow-and-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewListSidebarItemRow component's
 * 'list-sidebar__table__row' (className) element's border, background, and
 * text colors
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewListSidebarItemRow
 *  component's 'list-sidebar__table__row' (className) element's border,
 * background, and text colors
 */
export function getItemViewListSidebarItemRowBorderAndTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-list-sidebar-item-row-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewListSidebarItemRow component's
 * 'list-sidebar__table__row' (className) element's hover background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewListSidebarItemRow
 * component's 'list-sidebar__table__row' (className) element's hover
 * background color
 */
export function getItemViewListSidebarItemRowHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-list-sidebar-item-row-hover-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewListSidebarItemRow component's
 * 'list-sidebar__table__row' (className) element's selected (i.e item for row
 * is equal to 'itemViewCurrentItem' property in 'componentsDisplay' Object in
 * project/bug container of the redux state) background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewListSidebarItemRow
 * component's 'list-sidebar__table__row' (className) element's selected
 * background color
 */
export function getItemViewListSidebarItemRowSelectedBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-list-sidebar-item-row-selected-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemView component's
 * 'item-content-container' (className) element's background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemView component's
 * 'item-content-container' (className) element's background color
 */
export function getItemViewContentContainerBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-content-container-background-color-dark-mode-" +
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
	return " js-get-item-view-item-box-background-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for ItemView form input element's border,
 * background, and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemView form input
 * element's border, background, and text color
 */
export function getItemViewFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-form-input-border-background-text-color-dark-mode-" +
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
	return " js-get-item-view-diabled-label-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for ItemViewEditItemInfo form input (type date)
 * element's disabled background and text color with no pointer events
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewEditItemInfo
 * form input (type date) element's disabled background and text color with no
 * pointer events
 */
export function getItemViewDisableInputDateClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-item-view-diabled-input-date-dark-mode-" + dark_mode;
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
		" js-get-item-view-form-cancel-button-button-background-color-with-hover-mode-" +
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
		" js-get-item-view-comment-box-individual-comment-icon-button-text-color-with-hover-mode-" +
		dark_mode
	);
}

//==================
// Theme classNames
//==================
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
	return " js-get-brighter-border-color-theme-" + theme_color;
}
/**
 * Get standard theme className for border color
 *
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Standard theme className for border color
 */
export function getStandardBorderColorClassNameForTheme(theme_color) {
	return " js-get-standard-border-color-theme-" + theme_color;
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
	return " js-get-brighter-background-color-theme-" + theme_color;
}
/**
 * Get standard theme className for background color
 *
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Standard theme className for background color
 */
export function getStandardBackgroundColorClassNameForTheme(theme_color) {
	return " js-get-standard-background-color-theme-" + theme_color;
}

/**
 * Get theme className for background color with hover (background color is
 * brighter theme, while hover background color is standard theme)
 *
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme className for background color with hover
 */
export function getBackgroundColorWithHoverClassNameForTheme(theme_color) {
	return " js-get-background-color-with-hover-theme-" + theme_color;
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
	return " js-get-brighter-breadcrumb-arrow-color-theme-" + theme_color;
}
/**
 * Get standard theme className for NavbarBreadcrumb arrow element's border color
 * (since the arrow is made entirely of a border, this changes the entire color
 * of the arrow)
 *
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Standard theme className for NavbarBreadcrumb arrow element's
 * border color
 */
export function getStandardBreadcrumbArrowColorClassNameForTheme(theme_color) {
	return " js-get-standard-breadcrumb-arrow-color-theme-" + theme_color;
}

/**
 * Get theme className for form-submit-button element's background color with
 * hover and focus (background color is brighter theme, while hover/focus
 * background color is standard theme)
 *
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme className for form-submit-button element's
 * background color with hover and focus
 */
export function getformSubmitButtonColorWithHoverAndFocusClassNameForTheme(
	theme_color
) {
	return (
		" js-get-form-submit-button-color-with-hover-focus-theme-" + theme_color
	);
}

//====================================
// Theme + Light/Dark mode classNames
//====================================
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
			? " js-get-top-bar-new-item-button-tutorial-border-color-mode-dark-theme-"
			: " js-get-top-bar-new-item-button-tutorial-border-color-mode-light-theme-") +
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
			? " js-get-top-bar-new-item-tutorial-border-background-text-color-mode-dark-theme-"
			: " js-get-top-bar-new-item-tutorial-border-background-text-color-mode-light-theme-") +
		theme_color
	);
}

/**
 * Get theme with light/dark mode className for form input element's focus
 * border color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for form input
 * element's focus border color
 */
export function getFocusBorderColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-get-focus-border-color-mode-dark-theme-"
			: " js-get-focus-border-color-mode-light-theme-") + theme_color
	);
}

/**
 * Get theme with light/dark mode className for Common (i.e. used by multiple
 * components) element's theme based text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for common element's
 * theme based text color
 */
export function getCommonTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-get-common-text-color-mode-dark-theme-"
			: " js-get-common-text-color-mode-light-theme-") + theme_color
	);
}

/**
 * Get theme with light/dark mode className for common (i.e. used by multiple
 * components) ListViewTopBar/ItemViewTopBar search container element's border,
 * background, and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for common
 * ListViewTopBar/ItemViewTopBar search container element's border, background,
 * and text color
 */
export function getCommonTopBarSearchContainerBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-get-common-top-bar-search-container-border-background-text-color-mode-dark-theme-"
			: " js-get-common-top-bar-search-container-border-background-text-color-mode-light-theme-") +
		theme_color
	);
}

/**
 * Get theme with light/dark mode className for common (i.e. used by multiple
 * components) form input element's border (with focus), background, and text
 * color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for common form input
 * element's border (with focus), background, and text color
 */
export function getCommonFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		getCommonFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
			dark_mode
		) +
		getFocusBorderColorClassNameForThemeWithLightOrDarkMode(
			dark_mode,
			theme_color
		)
	);
}

/**
 * Get theme with light/dark mode className for ItemView form input element's
 * border (with focus), background, and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for ItemView
 * form input element's border (with focus), background, and text color
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
 * Get theme with light/dark mode className for ItemViewEditItemInfo form input
 * (for name) element's border (with focus), background, and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for
 * ItemViewEditItemInfo form input (for name) element's border (with focus),
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
			? " js-get-item-view-edit-item-info-form-name-input-focus-border-color-mode-dark-theme-"
			: " js-get-item-view-edit-item-info-form-name-input-focus-border-color-mode-light-theme-") +
		theme_color
	);
}

/**
 * Get theme with light/dark mode className for CustomCheckbox component's
 * 'custom-checkbox-component' (className) element's border, background, text
 * color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for CustomCheckbox
 * component's 'custom-checkbox-component' (className) element's border,
 * background, text color
 */
export function getCustomCheckboxBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-get-custom-checkbox-border-background-text-color-mode-dark-theme-"
			: " js-get-custom-checkbox-border-background-text-color-mode-light-theme-") +
		theme_color
	);
}

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
			? " js-get-toggle-switch-border-background-text-colors-mode-dark-theme-"
			: " js-get-toggle-switch-border-background-text-colors-mode-light-theme-") +
		theme_color
	);
}

//=========================
// Status Color classNames
//=========================
export function getStatusBackgroundColorClassName(statusBoxColor) {
	return " js-get-status-background-color-" + statusBoxColor;
}

export function getStatusTextColorClassName(statusBoxColor) {
	return " js-get-status-text-color-" + statusBoxColor;
}
