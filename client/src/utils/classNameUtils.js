/**
 * Removes all instances of a className from an element
 *
 * @param {Element} element - The element that will have its className changed
 * @param {string} classToBeRemoved - The className the element should not contain
 *
 * @example
 * // Removes all instances of the className "button--extra-padding" from element
 * removeAllInstancesOfClassName(
 * 	document.getElementsByClassName("js-button")[0],
 * 	"button--extra-padding"
 * )
 */
export function removeAllInstancesOfClassName(element, classToBeRemoved) {
	// Regex to find all instances of the className
	const regex = new RegExp("(?:^|\\s)" + classToBeRemoved + "(?!\\S)", "g");
	// Removes all instances of the className
	element.className = element.className.replace(regex, "");
}

/**
 * If shouldHaveClassName param is true, then ensures element has the passed
 * className. Otherwise will make sure it doesn't. This does not affect other
 * classNames the element has.
 *
 * @param {boolean} shouldHaveClassName - Should the element have the className
 * @param {Element} element - The element that will have it's className toggled
 * @param {string} classToBeToggled - The className the element either should
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
	classToBeToggled
) {
	if (shouldHaveClassName) {
		if (!element.className.includes(classToBeToggled)) {
			// Space is needed for classToBeToggled
			// ...to keep it from merging with other classNames
			element.className = element.className + " " + classToBeToggled;
		}
	} else {
		removeAllInstancesOfClassName(element, classToBeToggled);
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
 * Gets a className equivelent to the 'nav-panel-button-list-component' className
 * used by NavPanelButtonList component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} A className equivelent to 'nav-panel-button-list-component'
 */
export function getNavPanelButtonListComponentClassName() {
	return " js-get-nav-panel-button-list-component";
}

/**
 * Gets classNames equivelent to 'overflow-container overflow-container--for-bugs'
 * className (with modifier) used by NavPanelButtonList component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} classNames equivelent to 'overflow-container overflow-container--for-bugs'
 */
export function getNavPanelButtonListComponentSubOverflowContainerElementForBugsModifierClassName() {
	return " js-get-nav-panel-button-list-component-sub-overflow-container js-get-nav-panel-button-list-component-sub-overflow-container--for-bugs";
}

/**
 * Gets classNames equivelent to 'overflow-container overflow-container--scrollbar-present'
 * className (with modifier) used by NavPanelButtonList component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} classNames equivelent to 'overflow-container overflow-container--scrollbar-present'
 */
export function getNavPanelButtonListComponentSubOverflowContainerElementWithScrollbarModifierClassName() {
	return " js-get-nav-panel-button-list-component-sub-overflow-container js-get-nav-panel-button-list-component-sub-overflow-container--scrollbar-present";
}

/**
 * Gets classNames equivelent to 'overflow-container overflow-container--scrollbar-present sub-overflow-container--scrollbar-for-bugs'
 * className (with modifier) used by NavPanelButtonList component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} classNames equivelent to 'overflow-container overflow-container--scrollbar-present sub-overflow-container--scrollbar-for-bugs'
 */
export function getNavPanelButtonListComponentSubOverflowContainerElementWithScrollbarForBugsModifierClassName() {
	return " js-get-nav-panel-button-list-component-sub-overflow-container js-get-nav-panel-button-list-component-sub-overflow-container--scrollbar-present js-get-nav-panel-button-list-component-sub-overflow-container--scrollbar-for-bugs";
}

/**
 * Gets classNames equivelent to 'list-button list-button--top-spacing'
 * className (with modifier) used by NavPanelButtonList component.
 *
 * Note: This function's purpose is to have the returned className assigned to
 * a temporary element that's used for getting CSS values with JS.
 *
 * @returns {string} classNames equivelent to 'list-button list-button--top-spacing'
 */
export function getNavPanelButtonListComponentListButtonElementWithTopSpacingModifierClassName() {
	return " js-get-nav-panel-button-list-component-list-button js-get-nav-panel-button-list-component-list-button--top-spacing";
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

//============================
// Light/Dark mode classNames
//============================
/**
 * Get light/dark mode className for common (i.e. intended for multiple components)
 * element's strong (i.e. more distinct) text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common strong text color
 */
export function getCommonElementStrongTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-common-element-strong-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for common (i.e. intended for multiple components)
 * element's weak (i.e. less distinct) text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common weak text color
 */
export function getCommonWeakElementTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-common-element-weak-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for common (i.e. intended for multiple components)
 * element's 'backend-errors' (className) element's text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common 'backend-errors'
 * (className) element's text color
 */
export function getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-element-backend-errors-text-color-dark-mode-" + dark_mode
	);
}

/**
 * Get light/dark mode className for common (i.e. intended for multiple components)
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
		" js-get-common-char-count-element-limit-reached-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for common (i.e. intended for multiple components)
 * blurred backdrop element's background color and opacity (will be different
 * CSS depending on if the backdrop has clickToClose functionality)
 *
 * @param {boolean} clickToClose - Whether the blurred-backdrop element will
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
		// Click-to-close blurred-backdrop elements have different CSS
		(clickToClose
			? " js-get-common-blurred-backdrop-element-click-to-close-background-color-and-opacity-dark-mode-"
			: " js-get-common-blurred-backdrop-element-background-color-and-opacity-dark-mode-") +
		dark_mode
	);
}

/**
 * Get light/dark mode className for common (i.e. intended for multiple components)
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
		" js-get-common-icon-button-element-text-color-with-hover-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for Common (i.e. intended for multiple components)
 * element's grayed out text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common element's grayed out
 * text color
 */
export function getCommonElementGrayedOutTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return " js-get-common-element-grayed-out-text-color-dark-mode-" + dark_mode;
}

/**
 * Get light/dark mode className for common (i.e. intended for multiple components)
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
 * Get light/dark mode className for common (i.e. intended for multiple components)
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
		" js-get-common-top-bar-component-border-and-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for common (i.e. intended for multiple components)
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
 * Get light/dark mode className for common (i.e. intended for multiple components)
 * ItemView, ItemViewDisplayItemInfo, ItemViewEditItemInfo, and
 * ItemViewCommentBox component's 'item-box' (className) element's background
 * color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common ItemView,
 * ItemViewDisplayItemInfo, ItemViewEditItemInfo, and ItemViewCommentBox
 * component's 'item-box' (className) element's background color
 */
export function getCommonItemViewComponentItemBoxElementBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-item-view-component-item-box-element-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for common (i.e. intended for multiple components)
 * ItemViewEditItemInfo, ItemViewCommentBox and ItemViewCommentsBoxIndividualComment
 * component's form input/textarea/select/option element's border, background,
 * and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common ItemViewEditItemInfo,
 * ItemViewCommentBox and ItemViewCommentsBoxIndividualComment component's form
 * input/textarea/select/option element's border, background, and text color
 */
export function getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-item-view-component-form-input-element-border-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for common (i.e. intended for multiple components)
 * ItemViewEditItemInfo component's 'form-buttons-centered-container__cancel-button'
 * (className) element and ItemViewCommentBoxIndividualComment component's
 * 'individual-comment-divider__form-buttons-centering-container__pair-container__cancel-button'
 * (className) element's background color with hover
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for common
 * ItemViewEditItemInfo component's 'form-buttons-centered-container__cancel-button'
 * (className) element and ItemViewCommentBoxIndividualComment component's
 * 'individual-comment-divider__form-buttons-centering-container__pair-container__cancel-button'
 * (className) element's background color with hover
 */
export function getCommonItemViewComponentFormCancelButtonElementBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-item-view-component-form-cancel-button-element-background-color-with-hover-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for common (i.e. intended for multiple components)
 * ItemViewCommentBoxIndividualCommentDisplayInfo and ItemViewCommentBoxIndividualCommentEditInfo
 * component's'comment-icon-button' (className) element's text color with hover
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewCommentBoxIndividualCommentDisplayInfo
 * and ItemViewCommentBoxIndividualCommentEditInfo component's 'comment-icon-button'
 * element's text color with hover
 */
export function getCommonItemViewCommentBoxIndividualCommentComponentIconButtonElementTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-common-item-view-comment-box-individual-comment-component-icon-button-element-text-color-with-hover-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for Home component's 'home-component'
 * (className) element's background and text colors.
 *
 * Note: Since child elements inherit text color, any child elements of Home
 * compoennt (i.e. all elements except those in Register and Login components)
 * intented to have the same text color as 'home-container' element will simply
 * inherit it instead of having it set for each one individually.
 *
 * Note: Some of Home component's child element's have functions in this file
 * that still set background-color despite it being the same as the Home compoent,
 * and therefore not making any difference in the way the element appears. While
 * this seems redundant, it's done so if it's descided later to make the element
 * a different background-color than Home compoent, it can quickly be done by
 * editing the corresponding variable in _variables.scss.
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for Home component's
 * 'home-container' element's background and text colors
 */
export function getHomeComponentBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-home-component-background-and-text-color-dark-mode-" + dark_mode
	);
}
/**
 * Get light/dark mode className for Navbar components 'padding-container__account-button'
 * (className) element's text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for Navbar components
 * 'padding-container__account-button' element's text color
 */
export function getNavbarComponentAccountButtonElementTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-navbar-component-account-button-element-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for NavbarBreadcrumb components 'breadcrumb-button'
 * and 'breadcrumb-divider' (classNames) element's text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for NavbarBreadcrumb components
 * 'breadcrumb-button' and 'breadcrumb-divider' element's text color
 */
export function getNavbarBreadcrumbComponentButtonAndDividerElementTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-navbar-breadcrumb-component-button-and-divider-element-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for NavbarBreadcrumb components 'breadcrumb-button--opened'
 * (modifier className) element's opened text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for NavbarBreadcrumb components
 * 'breadcrumb-button--opened' element's opened text color
 */
export function getNavbarBreadcrumbComponentButtonElementOpenedTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-navbar-breadcrumb-component-button-element-opened-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountSidebar components
 * 'sidebar-container' (className) element's background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountSidebar components
 * 'sidebar-container' element's background color
 */
export function getAccountSidebarComponentSidebarContainerElementBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-account-sidebar-component-sidebar-container-element-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountSidebar component's
 * 'horizontal-dividing-line' (className) element's border color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountSidebar component's
 * 'horizontal-dividing-line' element's border color
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
 * 'button-container__logout-button' element's border and hover background color
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
 * 'account-modal' element's background color
 */
export function getAccountModalComponentModalElementBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-account-modal-component-modal-element-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for AccountModalDeleteAccount component's
 * 'form__label__captial-delete' (className) element's text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountModalDeleteAccount
 * component's 'form__label__captial-delete' element's text color
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
 * component's 'form__input-text' element's border (with focus), background,
 * and text colors
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
 * 'form__submit--delete' (modifier className) element's background (with hover)
 * color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for AccountModalDeleteAccount
 * component's 'form__submit--delete' element's background (with hover) color
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
 * component's 'category-container' element's border, background, text color
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
 * 'sidebar-container' element's background color
 */
export function getCreateItemSidebarComponentSidebarContainerElementBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-create-item-sidebar-component-sidebar-container-element-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className to make CreateItemSidebar component's
 * 'form__group-container__input-container__label' (className) element disabled
 * (i.e. no pointer events and grayed out text color)
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className to make CreateItemSidebar
 * component's 'form__group-container__input-container__label' element disabled
 * (i.e. no pointer events and grayed out text color)
 */
export function getCreateItemSidebarComponentLabelElementDisabledClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-create-item-sidebar-component-label-element-diabled-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className to make CreateItemSidebar component's
 * 'form__group-container__input-container__date' (className) element disabled
 * (i.e. no pointer events and grayed out text color)
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className to make CreateItemSidebar
 * component's 'form__group-container__input-container__date' element disabled
 * (i.e. no pointer events and grayed out text color)
 */
export function getCreateItemSidebarComponentInputDateElementDisabledClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-create-item-sidebar-component-input-date-element-diabled-input-date-dark-mode-" +
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
 * 'list-table__row__header' element's box shadow and background color
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
		" js-get-list-view-component-empty-list-message-element-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ListViewTableItemRow component's
 * 'list-view-table-item-row-component' (className) element's border,
 * background, and text colors
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ListViewTableItemRow
 * component's 'list-view-table-item-row-component' element's border, background,
 * and text colors
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
 * component's 'list-view-table-item-row-component' element's hover background
 * color
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
 * 'componentsDisplay' property's Object in project/bug container of the redux
 * state) background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ListViewTableItemRow
 * component's 'list-view-table-item-row-component' element's selected
 * background color
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
 * 'modal-container' element's background color
 */
export function getDeleteModalComponentModalContainerElementBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-delete-modal-component-modal-container-element-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for DeleteModal component's 'warning-trapazoid'
 * (className) element's border color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for DeleteModal component's
 * 'warning-trapazoid' element's border color
 */
export function getDeleteModalComponentTrapazoidElementBorderColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-delete-modal-component-trapazoid-element-border-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for DeleteModal component's
 * 'centered-buttons-container__button' (className) element's background (with
 * hover) color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for  DeleteModal component's
 * 'centered-buttons-container__button' element's background (with hover) color
 */
export function getDeleteModalComponentDeleteButtonElementBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-delete-modal-component-delete-button-element-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for DeleteModal component's
 * 'centered-buttons-container__button--cancel' (modifier className) element's
 * border, background (with hover), text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for DeleteModal component's
 * 'centered-buttons-container__button--cancel' element's border, background
 * (with hover), text color
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
 * 'item-view-top-bar-options-button-component' (className) element's
 * with-dropdown-displayed border, background, and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewTopBarOptionsButton
 * component's 'item-view-top-bar-options-button-component' element's
 * with-dropdown-displayed border border, background, and text color
 */
export function getItemViewTopBarOptionsButtonComponentWithDropdownDisplayedBorderBackgroundTextColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-top-bar-options-button-component-with-dropdown-displayed-background-text-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewTopBarOptionsDropdown component's
 * 'item-view-top-bar-options-dropdown-component__row-button' (className)
 * element's hover background color
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewTopBarOptionsDropdown
 * component's 'item-view-top-bar-options-dropdown-component__row-button'
 * element's hover background color
 */
export function getItemViewTopBarOptionsDropdownComponentRowButtonElementHoverBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-top-bar-options-button-row-button-element-hover-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemView component's
 * 'item-content-container' (className) element's background color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemView component's
 * 'item-content-container' element's background color
 */
export function getItemViewComponentItemContentContainerElementBackgroundColorClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-component-item-content-container-element-background-color-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewEditItemInfo component's
 * 'item-box__group__field__form-completed-date-label' (className) element's
 * disabled text color with no pointer events
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewEditItemInfo
 * component's 'item-box__group__field__form-completed-date-label' element's
 * disabled text color with no pointer events
 */
export function getItemViewEditItemInfoComponentCompletedDateLabelElementDisabledClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-edit-item-info-component-completed-date-label-element-disabled-dark-mode-" +
		dark_mode
	);
}

/**
 * Get light/dark mode className for ItemViewEditItemInfo component's
 * 'item-box__group__field__form-completed-date' (className) element's disabled
 * background and text color with no pointer events
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @returns {string} Light/dark mode className for ItemViewEditItemInfo component's
 * 'item-box__group__field__form-completed-date' element's disabled background
 * and text color with no pointer events
 */
export function getItemViewEditItemInfoComponentInputCompletedDateElementDisabledClassNameForLightOrDarkMode(
	dark_mode
) {
	return (
		" js-get-item-view-edit-item-info-component-input-completed-date-element-disabled-dark-mode-" +
		dark_mode
	);
}

//==================
// Theme classNames
//==================
/**
 * Get common (i.e. intended for multiple components) brighter theme className for
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
 * Get common (i.e. intended for multiple components) standard theme className for
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
 * Get common (i.e. intended for multiple components) brighter theme className for
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
 * Get common (i.e. intended for multiple components) standard theme className for
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
 * Get common (i.e. intended for multiple components) theme className for background
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
 * Get theme className for common (i.e. intended for multiple components)
 * form submit button element's background color with hover and focus
 * (background color is brighter theme, while hover/focus background color is
 * standard theme)
 *
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme className for common form submit button element's
 * background color with hover and focus
 */
export function getCommonFormSubmitButtonElementBackgroundColorWithHoverAndFocusClassNameForTheme(
	theme_color
) {
	return (
		" js-get-common-component-form-submit-button-element-background-color-with-hover-focus-theme-" +
		theme_color
	);
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
 * components) form input/textarea/select/option element's focus border color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for common form
 * input/textarea/select/option element's focus border color
 */
export function getCommonFormInputElementFocusBorderColorClassNameForThemeWithLightOrDarkMode(
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
 * components) form input/textarea/select/option element's border (with focus),
 * background, and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for common form
 * input/textarea/select/option element's border (with focus), background, and
 * text color
 */
export function getCommonFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		getCommonElementFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
			dark_mode
		) +
		getCommonFormInputElementFocusBorderColorClassNameForThemeWithLightOrDarkMode(
			dark_mode,
			theme_color
		)
	);
}

/**
 * Get theme with light/dark mode className for common (i.e. used by multiple
 * components) ListViewTopBar component's 'search-centering-container__centered-container'
 * (className) element and ItemViewTopBar component's 'search-container'
 * (className) element's border, background, and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for common
 * ListViewTopBar component's 'search-centering-container__centered-container'
 * element and ItemViewTopBar component's 'search-container' element's border,
 * background, and text color
 */
export function getCommonTopBarComponentSearchContainerElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-get-common-top-bar-component-search-container-element-border-background-text-color-mode-dark-theme-"
			: " js-get-common-top-bar-component-search-container-element-border-background-text-color-mode-light-theme-") +
		theme_color
	);
}

/**
 * Get theme with light/dark mode className for common (i.e. used by multiple
 * components) ItemViewEditItemInfo, ItemViewCommentBox and
 * ItemViewCommentsBoxIndividualComment component's form input/textarea/select/option
 * element's border (with focus), background, and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for common
 * ItemViewEditItemInfo, ItemViewCommentBox and ItemViewCommentsBoxIndividualComment
 * component's form input/textarea/select/option element's border (with focus),
 * background, and text color
 */
export function getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
			dark_mode
		) +
		getCommonFormInputElementFocusBorderColorClassNameForThemeWithLightOrDarkMode(
			dark_mode,
			theme_color
		)
	);
}

/**
 * Get theme with light/dark mode className for ListViewTopBar Component's
 * 'new-item-centering-container__button--tutorial' (modifier className)
 * element's border color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for ListViewTopBar
 * component's 'new-item-centering-container__button--tutorial' element's
 * border color
 */
export function getListViewTopBarComponentNewItemButtonTutorialElementBorderColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-get-list-view-top-bar-component-new-item-button-tutorial-element-border-color-mode-dark-theme-"
			: " js-get-list-view-top-bar-component-new-item-button-tutorial-element-border-color-mode-light-theme-") +
		theme_color
	);
}

/**
 * Get theme with light/dark mode className for ListViewTopBar component's
 * 'new-item-tutorial-container' (className) element's border, arrow, and text
 * color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for ListViewTopBar
 * component's 'new-item-tutorial-container' element's border, arrow, and text
 * color
 */
export function getListViewTopBarComponentNewItemTutorialElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-get-list-view-top-bar-component-new-item-tutorial-element-border-background-text-color-mode-dark-theme-"
			: " js-get-list-view-top-bar-component-new-item-tutorial-element-border-background-text-color-mode-light-theme-") +
		theme_color
	);
}

/**
 * Get theme with light/dark mode className for ItemViewEditItemInfo component's
 * 'name-centering-container__form-name-input' (className) element's border
 * (with focus), background, and text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for
 * ItemViewEditItemInfo component's 'name-centering-container__form-name-input'
 * element's border (with focus), background, and text color
 */
export function getItemViewEditItemInfoComponentFormNameInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
			dark_mode
		) +
		(dark_mode
			? " js-get-item-view-edit-item-info-component-form-name-input-element-focus-border-color-mode-dark-theme-"
			: " js-get-item-view-edit-item-info-component-form-name-input-element-focus-border-color-mode-light-theme-") +
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
 * component's 'custom-checkbox-component' element's border, background, text
 * color
 */
export function getCustomCheckboxComponentBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-get-custom-checkbox-component-border-background-text-color-mode-dark-theme-"
			: " js-get-custom-checkbox-component-border-background-text-color-mode-light-theme-") +
		theme_color
	);
}

/**
 * Get theme with light/dark mode className for ToggleSwitch component's
 * 'toggle-switch-component' (className) element's border, background, and
 * text color
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("blue-turkish"|
 * 	"blue-queen"|
 * 	"blue-sky"|
 * 	"blue-turquoise"|
 * 	"purple-rain")} theme_color - The current theme the app is set to use
 * @returns {string} Theme with light/dark mode className for ToggleSwitch
 * component 'toggle-switch-component' element border, background, and text
 * color
 */
export function getToggleSwitchComponentBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
	dark_mode,
	theme_color
) {
	return (
		(dark_mode
			? " js-get-toggle-switch-component-border-background-text-colors-mode-dark-theme-"
			: " js-get-toggle-switch-component-border-background-text-colors-mode-light-theme-") +
		theme_color
	);
}

//=======================================
// Location + Light/Dark mode classNames
//=======================================
/**
 * Get location with light/dark mode className for a Common (i.e. used by
 * multiple components) tooltip to be added to the element bearing the returned
 * className
 *
 * Note: Set the desired content for the tooltip inside a 'data-tooltip'
 * attribute in the element bearing the returned className.
 *
 * @param {boolean} dark_mode - Whether the app is in dark mode or not
 * @param {("top"|"right"|"bottom"|"left")} location - where the tooltip will be
 * located relative to the element this className is applied to
 * @returns {string} Light/dark mode className for common tooltip element's
 * background and text colors
 */
export function getCommonElementToolTipBackgroundTextColorClassNameForLocationWithLightOrDarkMode(
	dark_mode,
	location
) {
	return (
		" js-get-common-element-tooltip-background-text-color-location-" +
		location +
		"-dark-mode-" +
		dark_mode
	);
}

//=========================
// Status Color classNames
//=========================
/**
 * Get common (i.e. intended for multiple components) status color className for
 * background color.
 *
 * Note: This function is used for changing the background color of status box
 * elements, as well as being used by a function in colorUtils for calculating
 * each status color into hex.
 *
 * @param {("gray"|
 * 	"blue"|
 * 	"purple"|
 * 	"orange"|
 * 	"green"|
 * 	"red")} statusColor - The status for which status color className should be
 * returned
 * @returns {string} Common status color className for background color
 */
export function getCommonStatusBackgroundColorClassName(statusColor) {
	return " js-get-common-status-background-color-" + statusColor;
}

/**
 * Get common (i.e. intended for multiple components) status color className for
 * text color.
 *
 * Note: This function is used to change text color in status form select boxes,
 * as well as for status statistics in ItemViewBugPieChart component.
 *
 * @param {("gray"|
 * 	"blue"|
 * 	"purple"|
 * 	"orange"|
 * 	"green"|
 * 	"red")} statusColor - The status for which status color className should be
 * returned
 * @returns {string} Common status color className for text color
 */
export function getCommonStatusTextColorClassName(statusColor) {
	return " js-get-common-status-text-color-" + statusColor;
}
