// Util uses container names to work with the redux state
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../actions/constants/containerNames";
// Util uses actions to edit the redux state
import {
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
	setWhichCommentComponentsDisplay,
	setWhichGeneralDropdownsDisplay,
} from "../actions";

/**
 * Sets 'listView' property to true in 'componentsDisplay' property's Object in
 * 'PROJECT_CONTAINER' of the redux state. Keeps 'itemViewCurrentItem' properties
 * the same in 'componentsDisplay' properties' Objects of both 'PROJECT_CONTAINER'
 * and 'BUG_CONTAINER' of the redux state. Sets all other properties in
 * 'componentsDisplay' properties' Objects of 'ACCOUNT_CONTAINER', 'PROJECT_CONTAINER',
 * and 'BUG_CONTAINER' to false. Sets properties in 'componentsDisplay' property's
 * Object in 'COMMENT_CONTAINER' to null.
 *
 * Note: This should be onClick function for elements pertaining to project
 * listView with 'breadcrumb-button' className in NavbarBreadcrumb component and
 * 'hamburger-dropdown__row-button' className in NavbarHamburger component. The
 * purpose of this function is to make project's ListView be the currently
 * dispalyed view component (i.e. as opposed to project's ItemView, bug's
 * ListView, or bug's ItemView). To close all account components. To have no
 * comments in the process of being edited or deleted. And the reasoning both
 * 'itemViewCurrentItem' properties are kept the same is so the current Navbar
 * buttons/options remain unaffected, as those two properties determin which
 * buttons/options display, and are also needed for re-openning either of the
 * ItemView as they determin which project/bug the ItemViews display.
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function switchToProjectsListView(passedReduxState, dispatch) {
	if (
		passedReduxState[PROJECT_CONTAINER].componentsDisplay.listView !== true ||
		passedReduxState[PROJECT_CONTAINER].componentsDisplay
			.listViewCreateItemSidbar === true ||
		passedReduxState[PROJECT_CONTAINER].componentsDisplay
			.listViewDeleteModal === true ||
		Object.values(
			passedReduxState[ACCOUNT_CONTAINER].componentsDisplay
		).indexOf(true) > -1
	) {
		dispatch(setWhichAccountComponentsDisplay({}));
		// Keeps same itemViewCurrentItem, so if it's not null, the user can
		// ...switch back to project ItemView using navbar.
		dispatch(
			setWhichProjectComponentsDisplay({
				listView: true,
				itemViewCurrentItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay
						.itemViewCurrentItem,
			})
		);
		// Keeps itemViewCurrentItem the same, so if it's not null, the user
		// ...can switch back to bug ItemView using navbar.
		dispatch(
			setWhichBugComponentsDisplay({
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	}
}

/**
 * Sets 'itemView' property to true in 'componentsDisplay' property's Object in
 * 'PROJECT_CONTAINER' of the redux state. Also keeps 'itemViewCurrentItem'
 * properties the same in 'componentsDisplay' properties' Objects of both 
 * 'PROJECT_CONTAINER' and 'BUG_CONTAINER' of the redux state. Also sets all other
 * properties in 'componentsDisplay' properties' Objects of 'ACCOUNT_CONTAINER',
 * 'PROJECT_CONTAINER', and 'BUG_CONTAINER' to false. Sets properties in 
 * 'componentsDisplay' property's Object in 'COMMENT_CONTAINER' to null.
 *
 * Note: This should be onClick function for elements pertaining to project
 * itemView with 'breadcrumb-button' className in NavbarBreadcrumb component and
 * 'hamburger-dropdown__row-button' className in NavbarHamburger component. The
 * purpose of this function is to make project's ItemView be the currently
 * dispalyed view component (i.e. as opposed to project's ListView, bug's
 * ListView, or bug's ItemView). To close all account components. To have no
 * comments in the process of being edited or deleted. And the reasoning both
 * 'itemViewCurrentItem' properties are kept the same is so the current Navbar
 * buttons/options remain unaffected, as those two properties determin which
 * buttons/options display, and are also needed for re-openning either of the
 * ItemView as they determin which project/bug the ItemViews display.
 *
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function switchToProjectsItemView(passedReduxState, dispatch) {
	if (
		passedReduxState[PROJECT_CONTAINER].componentsDisplay.itemView !== true ||
		Object.values(
			passedReduxState[ACCOUNT_CONTAINER].componentsDisplay
		).indexOf(true) > -1
	) {
		dispatch(setWhichAccountComponentsDisplay({}));
		// Keeps itemViewCurrentItem the same as project ItemView depends on it
		dispatch(
			setWhichProjectComponentsDisplay({
				itemView: true,
				itemViewCurrentItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay
						.itemViewCurrentItem,
			})
		);
		// Keeps itemViewCurrentItem the same, so if it's not null, the user
		// ...can switch back to bug ItemView using navbar.
		dispatch(
			setWhichBugComponentsDisplay({
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	}
}

/**
 * Sets 'listView' property to true in 'componentsDisplay' property's Object in
 * 'BUG_CONTAINER' of the redux state. Also keeps 'itemViewCurrentItem' properties
 * the same in 'componentsDisplay' properties' Objects of both 'PROJECT_CONTAINER'
 * and 'BUG_CONTAINER' of the redux state. Also sets all other properties in
 * 'componentsDisplay' properties' Objects of 'ACCOUNT_CONTAINER', 
 * 'PROJECT_CONTAINER', and 'BUG_CONTAINER' to false. Sets properties in 
 * 'componentsDisplay' property's Object in 'COMMENT_CONTAINER' to null.
 *
 * Note: This should be onClick function for elements pertaining to bug listView
 * with 'breadcrumb-button' className in NavbarBreadcrumb component and
 * 'hamburger-dropdown__row-button' className in NavbarHamburger component. The
 * purpose of this function is to make bug's ListView be the currently
 * dispalyed view component (i.e. as opposed to project's ListView, project's
 * ItemView, or bug's ItemView). To close all account components. To have no
 * comments in the process of being edited or deleted. And the reasoning both
 * 'itemViewCurrentItem' properties are kept the same is so the current Navbar
 * buttons/options remain unaffected, as those two properties determin which
 * buttons/options display, and are also needed for re-openning either of the
 * ItemView as they determin which project/bug the ItemViews display.
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function SwitchToBugsListView(passedReduxState, dispatch) {
	if (
		passedReduxState[BUG_CONTAINER].componentsDisplay.listView !== true ||
		passedReduxState[BUG_CONTAINER].componentsDisplay
			.listViewCreateItemSidbar === true ||
		passedReduxState[BUG_CONTAINER].componentsDisplay.listViewDeleteModal ===
			true ||
		Object.values(
			passedReduxState[ACCOUNT_CONTAINER].componentsDisplay
		).indexOf(true) > -1
	) {
		dispatch(setWhichAccountComponentsDisplay({}));
		// Keeps same itemViewCurrentItem, so if it's not null, the user can
		// ...switch back to project ItemView using navbar.
		dispatch(
			setWhichProjectComponentsDisplay({
				itemViewCurrentItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay
						.itemViewCurrentItem,
			})
		);
		// Keeps itemViewCurrentItem the same, so if it's not null, the user
		// ...can switch back to bug ItemView using navbar.
		dispatch(
			setWhichBugComponentsDisplay({
				listView: true,
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	}
}

/**
 * Sets 'itemView' property to true in 'componentsDisplay' property's Object in
 * 'BUG_CONTAINER' of the redux state. Also keeps 'itemViewCurrentItem' properties
 * the same in 'componentsDisplay' properties' Objects of both 'PROJECT_CONTAINER'
 * and 'BUG_CONTAINER' of the redux state. Also sets all other properties in
 * 'componentsDisplay' properties' Objects of 'ACCOUNT_CONTAINER', 
 * 'PROJECT_CONTAINER', and 'BUG_CONTAINER' to false. Sets properties in 
 * 'componentsDisplay' property's Object in 'COMMENT_CONTAINER' to null.
 *
 * Note: This should be onClick function for elements pertaining to bug itemView
 * with 'breadcrumb-button' className in NavbarBreadcrumb component and
 * 'hamburger-dropdown__row-button' className in NavbarHamburger component. The
 * purpose of this function is to make bug's ItemView be the currently
 * dispalyed view component (i.e. as opposed to project's ListView, project's
 * ItemView, or bug's ListView). To close all account components. To have no
 * comments in the process of being edited or deleted. And the reasoning both
 * 'itemViewCurrentItem' properties are kept the same is so the current Navbar
 * buttons/options remain unaffected, as those two properties determin which
 * buttons/options display, and are also needed for re-openning either of the
 * ItemView as they determin which project/bug the ItemViews display.
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function switchToBugsItemView(passedReduxState, dispatch) {
	if (
		passedReduxState[BUG_CONTAINER].componentsDisplay.itemView !== true ||
		Object.values(
			passedReduxState[ACCOUNT_CONTAINER].componentsDisplay
		).indexOf(true) > -1
	) {
		dispatch(setWhichAccountComponentsDisplay({}));
		// Keeps itemViewCurrentItem the same, so if it's not null, the user
		// ...can switch back to project ItemView using navbar.
		dispatch(
			setWhichProjectComponentsDisplay({
				itemViewCurrentItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay
						.itemViewCurrentItem,
			})
		);
		// Keeps itemViewCurrentItem the same as bug ItemView depends on it
		dispatch(
			setWhichBugComponentsDisplay({
				itemView: true,
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	}
}

/**
 * Sets 'listView' property to true and keeps 'listViewCreateItemSidbar'
 * property the same in 'componentsDisplay' property's Object in 
 * 'PROJECT_CONTAINER' of the redux state. Sets all other properties in 
 * 'componentsDisplay' property's Objects of 'ACCOUNT_CONTAINER', 
 * 'PROJECT_CONTAINER', and 'BUG_CONTAINER' to false or null (depending on which is
 * their default). Sets properties in 'componentsDisplay' property's Object in
 * 'COMMENT_CONTAINER' to null. Empties 'massDeleteList' property's Object in
 * 'BUG_CONTAINER'.
 *
 * Note: This should be onClick function for element pertaining to project's
 * listView with 'breadcrumb-button__end-container__close-icon-button' className
 * in NavbarBreadcrumb component and 'hamburger-dropdown__row-button__close-icon-button'
 * className in NavbarHamburger component. The purpose of this function is to
 * make project's ListView be the currently dispalyed view component (i.e. as 
 * opposed to project's ItemView, bug's ListView, or bug's ItemView). To keep 
 * project's ListViewCreateItemSidebar open if it was already. To have no project
 * selected for project's ItemView. To close all account and bug components. To
 * have no comments in the process of being edited or deleted. Also the reason 
 * 'massDeleteList' propery's Object in 'BUG_CONTAINER' is emptied is because 
 * without a project selected for project's ItemView means there is no list of 
 * bugs that can be in the massDeleteList.
 *
 * @param {Event} e - Event created by element's onClick handler
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function setTrueForOnlyProjectListViewAndCreateItemSidebar(
	e,
	passedReduxState,
	dispatch
) {
	// Stops onClicks of parent elements from being triggered
	e.stopPropagation();

	dispatch(setWhichAccountComponentsDisplay({}));
	// Keeps listViewCreateItemSidbar the same since the user would not expect
	// ...it to be closed by this function.
	dispatch(
		setWhichProjectComponentsDisplay({
			listView: true,
			listViewCreateItemSidbar:
				passedReduxState[PROJECT_CONTAINER].componentsDisplay
					.listViewCreateItemSidbar,
		})
	);
	dispatch(setWhichBugComponentsDisplay({}));
	dispatch(setProjectOrBugMassDeleteList(BUG_CONTAINER));
	dispatch(setWhichCommentComponentsDisplay({}));
}

/**
 * Keeps 'listViewCreateItemSidbar' property the same, and sets 'listView'
 * property to true if either it or 'itemView' were true, in 'componentsDisplay'
 * property's Object in 'BUG_CONTAINER' of the redux state. Keeps 
 * 'componentsDisplay' property's Object in 'PROJECT_CONTAINER' the same. Sets all 
 * other properties in 'componentsDisplay' properties' Objects of 
 * 'ACCOUNT_CONTAINER' and 'BUG_CONTAINER' to false or null (depending on which is 
 * their default). Sets properties in 'componentsDisplay' property's Object in
 * 'COMMENT_CONTAINER' to null.
 *
 * Note: This should be onClick function for element pertaining to bug's
 * listView with 'breadcrumb-button__end-container__close-icon-button' className
 * in NavbarBreadcrumb component and 'hamburger-dropdown__row-button__close-icon-button'
 * className in NavbarHamburger component. The purpose of this function is to
 * keep the currenly displayed view component the same, unless it's bug's 
 * ItemView, to which it's switched to bug's ListView (i.e. keep same if project's
 * ListView, projects's ItemView, or bug's ListView). To leave project components
 * the same. To keep bug's ListViewCreateItemSidebar open if it was already. To
 * have no bug selected for bug's ItemView. To close all account components. And
 * to have no comments in the process of being edited or deleted.
 *
 * @param {Event} e - Event created by element's onClick handler
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function closeBugItemView(e, passedReduxState, dispatch) {
	// Stops onClicks of parent elements from being triggered
	e.stopPropagation();

	dispatch(setWhichAccountComponentsDisplay({}));
	// Keeps listViewCreateItemSidbar the same since the user would not expect
	// ...it to be closed by this function.
	dispatch(
		setWhichBugComponentsDisplay({
			listView:
				passedReduxState[BUG_CONTAINER].componentsDisplay.listView === true ||
				passedReduxState[BUG_CONTAINER].componentsDisplay.itemView === true
					? true
					: false,
			listViewCreateItemSidbar:
				passedReduxState[BUG_CONTAINER].componentsDisplay
					.listViewCreateItemSidbar,
		})
	);
	dispatch(setWhichCommentComponentsDisplay({}));
}

/**
 * Toggles 'navbarHamburgerDropdown' boolean in 'dropdownsDisplay' Object in
 * 'GENERAL_CONTAINER' of the redux state. Also sets all booleans in 
 * 'componentsDisplay' Object in 'ACCOUNT_CONTAINER' of the redux state to
 * false.
 * 
 * Note: The purpose of this is to toggle whether the NavbarHamburgerDropdown
 * component is being displayed by the app. As well as to have no account 
 * components (that are controlled via the redux state) be displayed because
 * they would not look nice alongside the NavbarHamburgerDropdown component.
 * 
 * @param {Event} e - Event created by element's onClick handler
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function toggleHamburgerDropdown (e, passedReduxState, dispatch) {
	e.stopPropagation();

	dispatch(
		setWhichGeneralDropdownsDisplay({
			navbarHambugerDropdown:
				!passedReduxState[GENERAL_CONTAINER].dropdownsDisplay
					.navbarHambugerDropdown,
		})
	);

	dispatch(setWhichAccountComponentsDisplay({}));
};
