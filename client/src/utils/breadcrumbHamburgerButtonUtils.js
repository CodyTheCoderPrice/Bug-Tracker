// Util uses container names to work with the redux state
import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../actions/constants/containerNames";

// Util uses actions to edit the redux state
import {
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
	setWhichCommentComponentsDisplay,
} from "../actions";

/**
 * Sets project ListView component to true while setting all other project,
 * account, bug, and comment components to false. Sets project/bug
 * itemViewEditItemInfo to false, and keeps project/bug itemViewCurrentItem the
 * same so the current Navbar button options remain unaffected.
 *
 * @param {Object} passedReduxState - Current redux state from 
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from useDispatch()
 */
export function openProjectsListView(passedReduxState, dispatch) {
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
 * Sets project ItemView component to true while setting all other project,
 * account, bug, and comment components to false. Keeps project
 * itemViewEditItemInfo the same, but sets bug itemViewEditItemInfo to false.
 * Keeps project/bug itemViewCurrentItem the same so the current Navbar button
 * options remain unaffected.
 *
 * @param {Object} passedReduxState - Current redux state from 
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from useDispatch()
 */
export function openProjectsItemView(passedReduxState, dispatch) {
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
 * Sets bug ListView component to true while setting all other bug, account,
 * project, and comment components to false. Sets project/bug
 * itemViewEditItemInfo to false, and keeps project/bug itemViewCurrentItem the
 * same so the current Navbar button options remain unaffected.
 *
 * @param {Object} passedReduxState - Current redux state from 
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from useDispatch()
 */
export function openBugsListView(passedReduxState, dispatch) {
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
 * Sets bug ItemView component to true while setting all other bug, account,
 * project, and comment components to false. Keeps bug itemViewEditItemInfo the
 * same, but sets project itemViewEditItemInfo to false. Keeps project/bug
 * itemViewCurrentItem the same so the current Navbar button options remain
 * unaffected.
 *
 * @param {Object} passedReduxState - Current redux state from 
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from useDispatch()
 */
export function openBugsItemView(passedReduxState, dispatch) {
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
 * Sets project ListView component to true while keeping project
 * ListViewCreateItemSidbar component the same. Sets all other project, 
 * account, bug, and comment components to false. Keeps the project 
 * massDeleteList the same, but empties the bug massDeleteList. Sets the 
 * project/bug itemViewCurrentItem to null.
 *
 * @param {Event} e - The event created by the onClick
 * @param {Object} passedReduxState - Current redux state from 
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from useDispatch()
 */
export function closeProjectItemView(e, passedReduxState, dispatch) {
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
 * Keeps all project components the same. Sets bug ListView component to true 
 * if either the bug ListView or ItemView component is open. Keeps bug 
 * ListViewCreateItemSidbar component the same.  Closes all other bug 
 * components and sets bug itemViewCurrentItem to null. Sets all account and
 * comment components to false.
 *
 * @param {Event} e - The event created by the onClick
 * @param {Object} passedReduxState - Current redux state from 
 * useSelector((state) => state)
 * @param {Function} dispatch - Redux store's dispatch function from useDispatch()
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
