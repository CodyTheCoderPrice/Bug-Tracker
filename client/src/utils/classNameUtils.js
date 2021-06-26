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
 * icon button element's text color with hover
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common icon button element's
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
export function getCommonElementFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-element-form-input-border-background-text-color-dark-mode-" +
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
 export function getCommonTopBarComponentBorderAndBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-top-bar-component-border-and-background-color-dark-mode-" + dark_mode
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
export function getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-top-bar-component-button-and-dropdown-element-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for Home component's 'home-component'
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
export function getHomeComponentBackgroundColorClassNameForLightOrDarkMode(dark_mode) {
	return " js-get-home-component-background-and-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for NavbarHamburger component's 
 * 'hamburger-dropdown' (className) element's border, background (with hover
 * and selected), and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for NavbarHamburger component's 
 * 'hamburger-dropdown' (className) element's border, background (with hover 
 * and selected), and text color
 */
export function getNavbarHamburgerComponentDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-navbar-hamburger-component-dropdown-element-border-background-text-color-dark-mode-" +
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
export function getAccountSidebarComponentSidebarContainerElementBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-account-sidebar-component-sidebar-container-element-background-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for AccountSidebar component's 
 * 'horizontal-dividing-line' (className) element's border color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountSidebar component's 
 * 'horizontal-dividing-line' (className) element's border color
 */
export function getAccountSidebarComponentHorizontalDividingLineElementBorderColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-account-sidebar-component-horizontal-dividing-line-element-border-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountSidebar component's 
 * 'button-container__logout-button' (className) element's border and hover 
 * background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountSidebar component's 
 * 'button-container__logout-button' (className) element's border and hover 
 * background color
 */
export function getAccountSidebarComponentLogoutButtonElementBorderHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-account-sidebar-component-logout-button-element-border-hover-background-color-dark-mode-" +
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
export function getAccountModalComponentModalElementBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-account-modal-component-modal-element-background-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for AccountModalDeleteAccount component's
 * 'form__label__captial-delete' (className) element's text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountModalDeleteAccount 
 * component's 'form__label__captial-delete' (className) element's text color
 */
export function getAccountModalDeleteAccountComponentCapitalDeleteElementTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-account-modal-delete-account-component-capital-delete-element-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountModalDeleteAccount component's
 * 'form__input-text' (className) element's border (with focus), background,
 * and text colors
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountModalDeleteAccount 
 * component's 'form__input-text' (className) element's border (with focus), 
 * background, and text colors
 */
export function getAccountModalDeleteAccountComponentFormInputElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		getCommonElementFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
			dark_mode
		) +
		(" js-get-account-modal-delete-account-component-form-input-element-focus-border-color-dark-mode-" +
			dark_mode)
	);
}

/**
 * Get light/dark mode className for AccountModalDeleteAccount component's
 * 'form__submit--delete' (className) element's background (with hover) color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountModalDeleteAccount 
 * component's 'form__submit--delete' (className) element's background (with
 * hover) color
 */
export function getAccountModalDeleteAccountComponentFormSubmitElementBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-account-modal-delete-account-component-form-submit-element-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountModalEditSettings component's 
 * 'category-container' (className) element's border, background, text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountModalEditSettings 
 * component's 'category-container' (className) element's border, background,
 * text color
 */
export function getAccountModalEditSettingsComponentCategoryContainerElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-account-modal-edit-settings-component-category-container-element-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for CreateItemSidebar component's 
 * 'sidebar-container' (className) element's background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for CreateItemSidebar component's 
 * 'sidebar-container' (className) element's background color
 */
 export function getCreateItemSidebarComponentSidebarContainerElementBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-create-item-sidebar-component-sidebar-container-element-background-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className to make CreateItemSidebar component's 
 * 'form__group-container__input-container__label' (className) element disabled
 * (i.e. no pointer events and grayed out text color)
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className to make CreateItemSidebar 
 * component's 'form__group-container__input-container__label' (className) 
 * element disabled (i.e. no pointer events and grayed out text color)
 */
export function getCreateItemSidebarComponentLabelElementDisabledClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-create-item-sidebar-component-label-element-diabled-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className to make CreateItemSidebar component's
 * 'form__group-container__input-container__date' (className) element disabled
 * (i.e. no pointer events and grayed out text color)
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className to make CreateItemSidebar 
 * component's 'form__group-container__input-container__date' (className) 
 * element disabled (i.e. no pointer events and grayed out text color)
 */
export function getCreateItemSidebarComponentInputDateElementDisabledClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-create-item-sidebar-component-input-date-element-diabled-input-date-dark-mode-" + dark_mode
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
export function getListViewTableComponentRowHeaderElementBoxShadowAndBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-list-view-table-component-row-header-element-box-shadow-and-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ListView Component's 
 * 'empty-list-message-centering-container__message' (className) element's text
 * color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ListView Component's 
 * 'empty-list-message-centering-container__message' element's text color
 */
 export function getListViewComponentEmptyListMessageElementTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-list-view-component-empty-list-message-element-text-color-dark-mode-" + dark_mode
	);
}

/**
 * Get light/dark mode className for ListViewTableItemRow component's
 * 'list-view-table-item-row-component' (className) element's border, 
 * background, and text colors
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ListViewTableItemRow
 * component's 'list-view-table-item-row-component' (className) element's 
 * border, background, and text colors
 */
export function getListViewTableItemRowComponentBorderAndTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-list-view-table-item-row-component-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ListViewTableItemRow component's
 * 'list-view-table-item-row-component' (className) element's hover background 
 * color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ListViewTableItemRow 
 * component's 'list-view-table-item-row-component' (className) element's hover 
 * background color
 */
export function getListViewTableItemRowComponentHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-list-view-table-item-row-component-hover-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ListViewTableItemRow component's
 * 'list-view-table-item-row-component' (className) element's selected (i.e.
 * component's item prop is equal to 'itemViewCurrentItem' property in 
 * 'componentsDisplay' Object in project/bug container of the redux state) 
 * background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ListViewTableItemRow 
 * component's 'list-view-table-item-row-component' (className) element's 
 * selected background color
 */
export function getListViewTableItemRowComponentSelectedBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-list-view-table-item-row-component-selected-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for DeleteModal component's 'modal-container'
 * (className) element's background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for DeleteModal component's
 * 'modal-container' (className) element's background color
 */
export function getDeleteModalComponentModalContainerElementBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-delete-modal-component-modal-container-element-background-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for DeleteModal component's 'warning-trapazoid' 
 * (className) element's border color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for DeleteModal component's
 * 'warning-trapazoid' (className) element's border color
 */
 export function getDeleteModalComponentTrapazoidElementBorderColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-delete-modal-component-trapazoid-element-border-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for DeleteModal component's
 * 'centered-buttons-container__button' (className) element's background (with 
 * hover) color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for  DeleteModal component's
 * 'centered-buttons-container__button' (className) element's background (with 
 * hover) color
 */
export function getDeleteModalComponentDeleteButtonElementBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-delete-modal-component-delete-button-element-background-color-dark-mode-" + dark_mode
	);
}

/**
 * Get light/dark mode className for DeleteModal component's 
 * 'centered-buttons-container__button--cancel' (className) element's border,
 * background (with hover), text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for DeleteModal component's
 * 'centered-buttons-container__button--cancel' (className) element's border,
 * background (with hover), text color
 */
export function getDeleteModalComponentCancelButtonElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-delete-modal-component-cancel-button-element-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewTopBar component's icon button 
 * element's text color with hover
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewTopBar component's 
 * icon button element's text color with hover
 */
export function getItemViewTopBarComponentIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-top-bar-component-icon-button-element-text-color-with-hover-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewTopBar component's 
 * 'item-options-container__icon-button' (className) element's clicked (i.e. 
 * dropdown is active) border, background, and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewTopBar component's 
 * 'item-options-container__icon-button' (className) element's clicked border,
 * background, and text color
 */
export function getItemViewTopBarComponentOptionsIconButtonElementClickedBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-top-bar-component-options-icon-button-element-clicked-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewTopBar component's 
 * 'item-options-container__dropdown__row-button' (className) element's hover 
 * background color
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewTopBar component's 
 * 'item-options-container__dropdown__row-button' (className) element's hover 
 * background color
 */
export function getItemViewTopBarComponentOptionsDropdownRowButtonElementHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-top-bar-component-options-dropdown-row-button-element-hover-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewListSidebar component's
 * 'expand-minimize-button' (className) element's border, background (with 
 * hover), and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewListSidebar 
 * component's 'expand-minimize-button' (className) element's border, background
 * (with hover), and text color
 */
 export function getItemViewListSidebarComponentExpandMinimizeButtonElementBorderAndBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-list-sidebar-component-expand-minimize-button-element-border-and-background-color-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewListSidebar component's 
 * 'list-sidebar-container' (className) element's border color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewListSidebar 
 * component's 'list-sidebar-container' (className) element's border color
 */
export function getItemViewListSidebarComponentSidebarContainerElementBorderColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-item-view-list-sidebar-component-sidebar-container-element-border-color-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for ItemViewListSidebar component's
 * 'list-sidebar-container__table__row__header' (className) element's box 
 * shadow, background, and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className ItemViewListSidebar component's
 * 'list-sidebar-container__table__row__header' (className) element's box 
 * shadow, background, and text color
 */
export function getItemViewListSidebarComponentTableRowHeaderElementBoxShadowBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-list-sidebar-component-table-row-header-element-box-shadow-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewListSidebarItemRow component's
 * 'item-view-list-sidebar-item-row-component' (className) element's border,
 * background, and text colors
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewListSidebarItemRow 
 * component's 'item-view-list-sidebar-item-row-component' (className) element's
 * border, background, and text colors
 */
 export function getItemViewListSidebarItemRowComponentBorderAndTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-list-sidebar-item-row-component-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewListSidebarItemRow component's
 * 'item-view-list-sidebar-item-row-component' (className) element's hover 
 * background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewListSidebarItemRow 
 * component's 'item-view-list-sidebar-item-row-component' (className) element's
 * hover background color
 */
export function getItemViewListSidebarItemRowComponentHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-list-sidebar-item-row-component-hover-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewListSidebarItemRow component's
 * 'item-view-list-sidebar-item-row-component' (className) element's selected
 * (i.e item for row is equal to 'itemViewCurrentItem' property in 
 * 'componentsDisplay' Object in project/bug container of the redux state) 
 * background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewListSidebarItemRow
 * component's 'item-view-list-sidebar-item-row-component' (className) element's
 * selected background color
 */
export function getItemViewListSidebarItemRowComponentSelectedBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-list-sidebar-item-row-component-selected-background-color-dark-mode-" +
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
 * icon button element's text color with hover
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for
 * ItemViewCommentBoxIndividualComment icon button element's text color with
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
		getCommonElementFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
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
