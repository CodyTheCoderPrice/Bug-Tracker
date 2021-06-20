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
/**
 * Gets a className equivelent to the 'app-component' className used by App
 * component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'app-component'
 */
export function getAppComponentClassName() {
	return " js-get-app-component";
}

/**
 * Gets a className equivelent to the 'navbar-breadcrumb-component' className
 * used by NavbarBreadcrumb component.
 *
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'navbar-breadcrumb-component'
 */
export function getNavbarBreadcrumbComponentClassName() {
	return " js-get-navbar-breadcrumb-component";
}

/**
 * Gets a className equivelent to the 'breadcrumb-button__text' className used
 * by the breadcrumb button text elements in NavbarBreadcrumb component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'breadcrumb-button__text'
 */
export function getNavbarBreadcrumbComponentButtonTextElementClassName() {
	return " js-get-navbar-breadcrumb-component-button-text-element";
}

/**
 * Gets a className equivelent to the 'breadcrumb-button__end-container__arrow'
 * className used by the breadcrumb button end container arrow elements in
 * NavbarBreadcrumb component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to
 * 'breadcrumb-button__end-container__arrow'
 */
export function getNavbarBreadcrumbComponentButtonEndContainerArrowElementClassName() {
	return " js-get-navbar-breadcrumb-component-button-end-container-arrow-element";
}

/**
 * Gets a className equivelent to the 'navbar-hamburger-component' className
 * used by NavbarHamburger component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'navbar-hamburger-component'
 */
export function getNavbarHamburgerComponentClassName() {
	return " js-get-navbar-hamburger-component";
}

/**
 * Gets a className equivelent to the 'hamburger-button-container' className
 * used by the hamburger button container elements in NavbarHamburger component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'hamburger-button-container'
 */
export function getNavbarHamburgerComponentButtonContainerElementClassName() {
	return " js-get-navbar-hamburger-component-button-container-element";
}

/**
 * Gets a className equivelent to the 'hamburger-title' className used by the
 * hamburger button container elements in NavbarHamburger component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'hamburger-title'
 */
export function getNavbarHamburgerComponentTitleElementClassName() {
	return " js-get-navbar-hamburger-component-title-element";
}

/**
 * Gets a className equivelent to the 'list-view-top-bar-component' className
 * used by ListViewTopBar component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'list-view-top-bar-component'
 */
export function getListViewTopBarComponentClassName() {
	return " js-get-list-view-top-bar-component";
}

/**
 * Gets a className equivelent to the 'list-view-table-component' className
 * used by ListViewTable component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'list-view-table-component'
 */
export function getListViewTableComponentClassName() {
	return " js-get-list-view-table-component";
}

/**
 * Gets a className equivelent to the 'list-table__row' className used by row
 * elements in ListViewTable and ListViewTableItemRow components.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'list-table__row'
 */
export function getListViewTableComponentRowElementClassName() {
	return " js-get-list-view-table-component-row-element";
}

/**
 * Gets a className equivelent to the 'item-view-component' className used by
 * ItemView component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'item-view-component'
 */
export function getItemViewComponentClassName() {
	return " js-get-item-view-component";
}

/**
 * Gets a className equivelent to the 'padding-container' className used by
 * padding container element in ItemView component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'padding-container'
 */
export function getItemViewComponentPaddingcontainerElementClassName() {
	return " js-get-item-view-component-padding-container-element";
}

/**
 * Gets a className equivelent to the 'outer-dividing-container' className used
 * by outer dividing contianer elements in ItemView component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'outer-dividing-container'
 */
export function getItemViewComponentOuterDividingContainerElementClassName() {
	return " js-get-item-view-component-outer-dividing-container-element";
}

/**
 * Gets a className equivelent to the 'item-vew-top-bar-component' className
 * used by ItemViewTopBar component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'item-vew-top-bar-component'
 */
export function getItemViewTopBarComponentClassName() {
	return " js-get-item-vew-top-bar-component";
}

/**
 * Gets a className equivelent to the 'item-view-list-sidebar-component'
 * className used by ItemViewListSidebar component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'item-view-list-sidebar-component'
 */
export function getItemViewListSidebarComponentClassName() {
	return " js-get-item-view-list-sidebar-component";
}

//============================
// Light/Dark mode classNames
//============================
/**
 * Get light/dark mode className for common (i.e. used by multiple components)
 * element's strong (i.e. more distinct) text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common strong text color
 */
export function getCommonElementStrongTextColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-get-common-element-strong-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for common (i.e. used by multiple components)
 * element's weak (i.e. less distinct) text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common weak text color
 */
export function getCommonWeakElementTextColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-get-common-element-weak-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for common (i.e. used by multiple components)
 * element's 'backend-errors' (className) element's text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common 'backend-errors'
 * (className) element's text color
 */
export function getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-common-element-backend-errors-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for common (i.e. used by multiple components)
 * char count element's text color (when limit is reached)
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common char-count (when
 * limit reached) element's text color
 */
export function getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-char-count-element-limit-reached-text-color-dark-mode-" + dark_mode
	);
}

/**
 * Get light/dark mode className for common (i.e. used by multiple components)
 * blurred backdrop element's background color and opacity (will be different
 * CSS depending on if the backdrop has clickToClose functionality)
 *
 * @param {boolean} clickToClose - Whether the blurred-background element will
 * close if clicked
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common blurred backdrop
 * element's background color and opacity
 */
export function getCommonBlurredBackdropElementBackgroundColorAndOpacityClassNameForLightOrDarkMode(
	clickToClose,
	dark_mode
) {
	return (
		// Click-to-close blurred-background elements have different CSS
		(clickToClose
			? " js-get-common-blurred-backdrop-element-click-to-close-background-color-and-opacity-dark-mode-"
			: " js-get-common-blurred-backdrop-element-background-color-and-opacity-dark-mode-") +
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
export function getCommonIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-icon-button-element-text-color-with-hover-dark-mode-" + dark_mode
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
export function getCommonElementGrayedOutTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-common-element-grayed-out-text-color-dark-mode-" + dark_mode;
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
 * 'account-modal' (className) element's background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountSidebar components
 * 'account-modal' (className) element's background color
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
 * Get common (i.e. used by multiple components) brighter theme className for
 * border color
 *
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Common brighter theme className for border color
 */
export function getCommonBrighterBorderColorClassNameForTheme(theme_color) {
	return " js-get-common-brighter-border-color-theme-" + theme_color;
}
/**
 * Get common (i.e. used by multiple components) standard theme className for
 * border color
 *
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Common standard theme className for border color
 */
export function getCommonStandardBorderColorClassNameForTheme(theme_color) {
	return " js-get-common-standard-border-color-theme-" + theme_color;
}

/**
 * Get common (i.e. used by multiple components) brighter theme className for
 * background color
 *
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Common brighter theme className for background color
 */
export function getCommonBrighterBackgroundColorClassNameForTheme(theme_color) {
	return " js-get-common-brighter-background-color-theme-" + theme_color;
}
/**
 * Get common (i.e. used by multiple components) standard theme className for
 * background color
 *
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Common standard theme className for background color
 */
export function getCommonStandardBackgroundColorClassNameForTheme(theme_color) {
	return " js-get-common-standard-background-color-theme-" + theme_color;
}

/**
 * Get common (i.e. used by multiple components) theme className for background
 * color with hover (background color is brighter theme, while hover background
 * color is standard theme)
 *
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Common theme className for background color with hover
 */
export function getCommonBackgroundColorWithHoverClassNameForTheme(
	theme_color
) {
	return " js-get-common-background-color-with-hover-theme-" + theme_color;
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
 * Get theme className for common (i.e. used by multiple components)
 * form-submit-button element's background color with hover and focus
 * (background color is brighter theme, while hover/focus background color is
 * standard theme)
 *
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme className for common form-submit-button element's
 * background color with hover and focus
 */
export function getCommonformSubmitButtonColorWithHoverAndFocusClassNameForTheme(
	theme_color
) {
	return (
		" js-get-common-form-submit-button-color-with-hover-focus-theme-" +
		theme_color
	);
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

//====================================
// Theme + Light/Dark mode classNames
//====================================
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
 * components) form input element's focus border color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for common form input
 * element's focus border color
 */
export function getCommonFormInputFocusBorderColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-get-common-form-input-focus-border-color-mode-dark-theme-"
			: " js-get-common-form-input-focus-border-color-mode-light-theme-") +
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
		getCommonFormInputFocusBorderColorClassNameForThemeWithLightOrDarkMode(
			dark_mode,
			theme_color
		)
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
 * Get theme with light/dark mode className for ListViewTopBar Component's
 * 'centering-container__new-item-button--tutorial' (className) element's
 * border color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for ListViewTopBar
 * component's 'centering-container__new-item-button--tutorial' (className)
 * element's border color
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
 * 'new-item-tutorial-container' element's border, arrow, and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for ListViewTopBar
 * 'new-item-tutorial-container' element's border, arrow, and text color
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
		getCommonFormInputFocusBorderColorClassNameForThemeWithLightOrDarkMode(
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
export function getCommonStatusBackgroundColorClassName(statusColor) {
	return " js-get-common-status-background-color-" + statusColor;
}

export function getCommonStatusTextColorClassName(statusColor) {
	return " js-get-common-status-text-color-" + statusColor;
}
