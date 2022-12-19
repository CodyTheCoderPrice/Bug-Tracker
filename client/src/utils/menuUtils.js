// Util uses container names to work with the redux state
import {
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../actions/constants/containerNames";
// Util uses actions to edit the redux state
import {
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
	setWhichCommentComponentsDisplay,
} from "../actions";

/**
 * Sets 'listViewComponentShouldDisplay' property to true in 'componentsDisplay' property's Object in
 * 'PROJECT_CONTAINER' of the redux state. Keeps 'itemViewCurrentItem' properties
 * the same in 'componentsDisplay' properties' Objects of both 'PROJECT_CONTAINER'
 * and 'BUG_CONTAINER' of the redux state. Sets all other properties in
 * 'componentsDisplay' properties' Objects of 'ACCOUNT_CONTAINER', 'PROJECT_CONTAINER',
 * and 'BUG_CONTAINER' to false. Sets properties in 'componentsDisplay' property's
 * Object in 'COMMENT_CONTAINER' to null.
 *
 * Note: The purpose of this function is to make project's ListView be the currently
 * dispalyed view component (i.e. as opposed to project's ItemView, bug's
 * ListView, or bug's ItemView). To close all account components. To have no
 * comments in the process of being edited or deleted. And the reasoning both
 * 'itemViewCurrentItem' properties are kept the same is so the current Navbar
 * buttons/options remain unaffected, as those two properties determin which
 * buttons/options display, and are also needed for re-openning either of the
 * ItemView components as they determin which project/bug the ItemViews display.
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function switchToProjectsListView(passedReduxState, dispatch) {
	// Only runs if something needs to change in the redux state
	if (
		passedReduxState[PROJECT_CONTAINER].componentsDisplay
			.listViewComponentShouldDisplay !== true ||
		passedReduxState[PROJECT_CONTAINER].componentsDisplay
			.listViewCreateItemSidbarComponentShouldDisplay === true ||
		passedReduxState[PROJECT_CONTAINER].componentsDisplay
			.deleteModalComponentForListViewShouldDisplay === true ||
		Object.values(
			passedReduxState[ACCOUNT_CONTAINER].componentsDisplay
		).indexOf(true) > -1
	) {
		dispatch(setWhichAccountComponentsDisplay({}));
		// Keeps same itemViewCurrentItem, so if it's not null, the user can
		// ...switch back to project ItemView using navbar.
		dispatch(
			setWhichProjectComponentsDisplay({
				listViewComponentShouldDisplay: true,
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
 * Sets 'itemViewComponentShouldDisplay' property to true in 'componentsDisplay' property's Object in
 * 'PROJECT_CONTAINER' of the redux state. Also keeps 'itemViewCurrentItem'
 * properties the same in 'componentsDisplay' properties' Objects of both
 * 'PROJECT_CONTAINER' and 'BUG_CONTAINER' of the redux state. Also sets all other
 * properties in 'componentsDisplay' properties' Objects of 'ACCOUNT_CONTAINER',
 * 'PROJECT_CONTAINER', and 'BUG_CONTAINER' to false. Sets properties in
 * 'componentsDisplay' property's Object in 'COMMENT_CONTAINER' to null.
 *
 * Note: The purpose of this function is to make project's ItemView be the currently
 * dispalyed view component (i.e. as opposed to project's ListView, bug's
 * ListView, or bug's ItemView). To close all account components. To have no
 * comments in the process of being edited or deleted. And the reasoning both
 * 'itemViewCurrentItem' properties are kept the same is so the current Navbar
 * buttons/options remain unaffected, as those two properties determin which
 * buttons/options display, and are also needed for re-openning either of the
 * ItemView components as they determin which project/bug the ItemViews display.
 *
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function switchToProjectsItemView(passedReduxState, dispatch) {
	// For optimization, only runs if something needs to change
	if (
		passedReduxState[PROJECT_CONTAINER].componentsDisplay
			.itemViewComponentShouldDisplay !== true ||
		Object.values(
			passedReduxState[ACCOUNT_CONTAINER].componentsDisplay
		).indexOf(true) > -1
	) {
		dispatch(setWhichAccountComponentsDisplay({}));
		// Keeps itemViewCurrentItem the same as project ItemView depends on it
		dispatch(
			setWhichProjectComponentsDisplay({
				itemViewComponentShouldDisplay: true,
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
 * Sets 'listViewComponentShouldDisplay' property to true in 'componentsDisplay' property's Object in
 * 'BUG_CONTAINER' of the redux state. Also keeps 'itemViewCurrentItem' properties
 * the same in 'componentsDisplay' properties' Objects of both 'PROJECT_CONTAINER'
 * and 'BUG_CONTAINER' of the redux state. Also sets all other properties in
 * 'componentsDisplay' properties' Objects of 'ACCOUNT_CONTAINER',
 * 'PROJECT_CONTAINER', and 'BUG_CONTAINER' to false. Sets properties in
 * 'componentsDisplay' property's Object in 'COMMENT_CONTAINER' to null.
 *
 * Note: The purpose of this function is to make bug's ListView be the currently
 * dispalyed view component (i.e. as opposed to project's ListView, project's
 * ItemView, or bug's ItemView). To close all account components. To have no
 * comments in the process of being edited or deleted. And the reasoning both
 * 'itemViewCurrentItem' properties are kept the same is so the current Navbar
 * buttons/options remain unaffected, as those two properties determin which
 * buttons/options display, and are also needed for re-openning either of the
 * ItemView components as they determin which project/bug the ItemViews display.
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function switchToBugsListView(passedReduxState, dispatch) {
	// For optimization, only runs if something needs to change
	if (
		passedReduxState[BUG_CONTAINER].componentsDisplay
			.listViewComponentShouldDisplay !== true ||
		passedReduxState[BUG_CONTAINER].componentsDisplay
			.listViewCreateItemSidbarComponentShouldDisplay === true ||
		passedReduxState[BUG_CONTAINER].componentsDisplay
			.deleteModalComponentForListViewShouldDisplay === true ||
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
				listViewComponentShouldDisplay: true,
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	}
}

/**
 * Sets 'itemViewComponentShouldDisplay' property to true in 'componentsDisplay' property's Object in
 * 'BUG_CONTAINER' of the redux state. Also keeps 'itemViewCurrentItem' properties
 * the same in 'componentsDisplay' properties' Objects of both 'PROJECT_CONTAINER'
 * and 'BUG_CONTAINER' of the redux state. Also sets all other properties in
 * 'componentsDisplay' properties' Objects of 'ACCOUNT_CONTAINER',
 * 'PROJECT_CONTAINER', and 'BUG_CONTAINER' to false. Sets properties in
 * 'componentsDisplay' property's Object in 'COMMENT_CONTAINER' to null.
 *
 * Note: The purpose of this function is to make bug's ItemView be the currently
 * dispalyed view component (i.e. as opposed to project's ListView, project's
 * ItemView, or bug's ListView). To close all account components. To have no
 * comments in the process of being edited or deleted. And the reasoning both
 * 'itemViewCurrentItem' properties are kept the same is so the current Navbar
 * buttons/options remain unaffected, as those two properties determin which
 * buttons/options display, and are also needed for re-openning either of the
 * ItemView components as they determin which project/bug the ItemViews display.
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function switchToBugsItemView(passedReduxState, dispatch) {
	// For optimization, only runs if something needs to change
	if (
		passedReduxState[BUG_CONTAINER].componentsDisplay
			.itemViewComponentShouldDisplay !== true ||
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
				itemViewComponentShouldDisplay: true,
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	}
}

/**
 * JSDOC INCOMPLETE
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} targetReduxContainerName - name of
 * which container ('PROJECT_CONTAINER' or 'BUG_CONTAINER') the target item
 * belongs to.
 * @param {({
 * 		id: number,
 * 		account_id: (number|undefined),
 * 		project_id: (number,undefined),
 * 		name: string,
 * 		description: string,
 * 		location: (string|undefined),
 * 		creation_date: string,
 * 		start_date: (string|null),targetItem
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * 		priority_id: number,
 * 		priority_option: string,
 * 		status_id: number,
 * 		status_option: string,
 * 		last_edited_timestamp: string
 * 	}|null|undefined)} targetItem - item intended to be set as the current item
 * inside the target redux container
 */
export function switchToProjectOrBugItemViewAndCurrentItem(
	passedReduxState,
	dispatch,
	targetReduxContainerName,
	targetItem
) {
	const changingCurrentItem =
		passedReduxState[targetReduxContainerName].componentsDisplay
			.itemViewCurrentItem === null ||
		passedReduxState[targetReduxContainerName].componentsDisplay
			.itemViewCurrentItem.id !== targetItem.id;

	// For optimization, only runs if something needs to change
	if (
		passedReduxState[targetReduxContainerName].componentsDisplay
			.itemViewComponentShouldDisplay === false ||
		changingCurrentItem ||
		Object.values(
			passedReduxState[ACCOUNT_CONTAINER].componentsDisplay
		).indexOf(true) > -1
	) {
		switch (targetReduxContainerName) {
			case PROJECT_CONTAINER:
				dispatch(setWhichAccountComponentsDisplay({}));
				dispatch(
					setWhichProjectComponentsDisplay({
						listViewComponentShouldDisplay: false,
						itemViewComponentShouldDisplay: true,
						itemViewCurrentItem: targetItem,
					})
				);
				dispatch(
					setWhichBugComponentsDisplay({
						listViewComponentShouldDisplay: false,
						itemViewComponentShouldDisplay: false,
						itemViewCurrentItem: !changingCurrentItem
							? passedReduxState[BUG_CONTAINER].componentsDisplay
									.itemViewCurrentItem
							: // null when different project is opened to
							  // ...prevent errors with bug itemViewCurrentItem
							  // ...not belonging to project
							  null,
					})
				);
				dispatch(setWhichCommentComponentsDisplay({}));
				break;
			case BUG_CONTAINER:
				dispatch(setWhichAccountComponentsDisplay({}));
				dispatch(
					setWhichProjectComponentsDisplay({
						listViewComponentShouldDisplay: false,
						itemViewComponentShouldDisplay: false,
						itemViewCurrentItem:
							passedReduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewCurrentItem,
					})
				);
				dispatch(
					setWhichBugComponentsDisplay({
						listViewComponentShouldDisplay: false,
						itemViewComponentShouldDisplay: true,
						itemViewCurrentItem: targetItem,
					})
				);
				dispatch(setWhichCommentComponentsDisplay({}));
				break;
			default:
				break;
		}
	}
}

/**
 * Returns text for both NavbarSoloTitle component and one of NavbarBreadcrumb 
 * components 'breadcrumb-button__title' (className) element and NavbarSoloTitle
 * component.
 * 
 * Note: The reason this simple function exists is to ensure consistence 
 * between both components
 *
 * @returns {String} string containing text for both NavbarSoloTitle component 
 * and one of NavbarBreadcrumb components 'breadcrumb-button__title' (className) 
 * element and NavbarSoloTitle component.
*/
export function getProjectsText() {
	return "Projects";
}

/**
 * Returns text for both NavbarSoloTitle component and one of NavbarBreadcrumb 
 * components 'breadcrumb-button__title' (className) element and NavbarSoloTitle
 * component.
 * 
 * Note: The reason this simple function exists is to ensure consistence 
 * between both components
 *
 * @returns {String} string containing the text for both NavbarSoloTitle component 
 * and one of NavbarBreadcrumb components 'breadcrumb-button__title' (className) 
 * element and NavbarSoloTitle component.
*/
export function getBugsText() {
	return "Bugs";
}