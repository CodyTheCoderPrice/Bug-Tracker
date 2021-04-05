// This util imports container names as it works with the redux state
import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../actions/constants/containerNames";

// This util imports actions as it edits the redux state
import {
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
	setWhichCommentComponentsDisplay,
} from "../actions";

/**
 * Will open the project ListView component while closing all components that
 * shouldn't ever be open at the same time as it, as well as the AccountSidebar
 * and the project ListViewCreateItemSidebar (if they were open)
 *
 *
 * @param {JSON} passedReduxState - Current redux state from useSelector
 * @param {Function} dispatch - Redux store's dispatch function from useDispatch
 */
export function openProjectsListView(passedReduxState, dispatch) {
	if (passedReduxState[PROJECT_CONTAINER].componentsDisplay.listView !== true) {
		// Closes all account components
		dispatch(setWhichAccountComponentsDisplay({}));
		// Opens project ListView and keeps same itemViewCurrentItem to allow
		// ...switching back to the project ItemView (if itemViewCurrentItem is
		// ...not null) using the navbar. Closes all other project components
		dispatch(
			setWhichProjectComponentsDisplay({
				listView: true,
				itemViewCurrentItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay
						.itemViewCurrentItem,
			})
		);
		// Keeps same itemViewCurrentItem to allow switching back to the bug
		// ...ItemView (if itemViewCurrentItem is not null) using the navbar.
		// ...Closes all bug components.
		dispatch(
			setWhichBugComponentsDisplay({
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		// Closes all comment components
		dispatch(setWhichCommentComponentsDisplay({}));
	} else if (
		passedReduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ===
			true ||
		passedReduxState[PROJECT_CONTAINER].componentsDisplay
			.listViewCreateItemSidbar === true
	) {
		// Closes all account components
		dispatch(setWhichAccountComponentsDisplay({}));
		// Opens project ListView and keeps same itemViewCurrentItem to allow
		// ...switching back to the project ItemView (if itemViewCurrentItem is
		// ...not null) using the navbar. Closes all other project components
		dispatch(
			setWhichProjectComponentsDisplay({
				listView: true,
				itemViewCurrentItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay
						.itemViewCurrentItem,
			})
		);
	}
}

/**
 * Will open the project ItemView component while closing all components that
 * shouldn't ever be open at the same time as it, as well as the AccountSidebar
 * (if it is open)
 *
 * @param {JSON} passedReduxState - Current redux state from useSelector
 * @param {Function} dispatch - Redux store's dispatch function from useDispatch
 */
export function openProjectsItemView(passedReduxState, dispatch) {
	if (passedReduxState[PROJECT_CONTAINER].componentsDisplay.itemView !== true) {
		// Closes all account components
		dispatch(setWhichAccountComponentsDisplay({}));
		// Opens project ItemView and keeps same itemViewCurrentItem which will
		// ...have been set previously in the project ListView. Closes all
		// ...other project components
		dispatch(
			setWhichProjectComponentsDisplay({
				itemView: true,
				itemViewCurrentItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay
						.itemViewCurrentItem,
			})
		);
		// Keeps same itemViewCurrentItem to allow switching back to the bug
		// ...ItemView (if itemViewCurrentItem is not null) using the navbar.
		// ...Closes all bug components.
		dispatch(
			setWhichBugComponentsDisplay({
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		// Closes all comment components
		dispatch(setWhichCommentComponentsDisplay({}));
	} else if (
		passedReduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ===
		true
	) {
		// Closes all account components
		dispatch(setWhichAccountComponentsDisplay({}));
	}
}

/**
 * Will open the bug ListView component while closing all components that
 * shouldn't ever be open at the same time as it, as well as the AccountSidebar
 * and the bug ListViewCreateItemSidebar (if they were open)
 *
 *
 * @param {JSON} passedReduxState - Current redux state from useSelector
 * @param {Function} dispatch - Redux store's dispatch function from useDispatch
 */
export function openBugsListView(passedReduxState, dispatch) {
	if (passedReduxState[BUG_CONTAINER].componentsDisplay.listView !== true) {
		// Closes all account components
		dispatch(setWhichAccountComponentsDisplay({}));
		// Keeps same itemViewCurrentItem to allow switching back to the
		// ...project ItemView (if itemViewCurrentItem is not null) using the
		// ...navbar. Closes all project components
		dispatch(
			setWhichProjectComponentsDisplay({
				itemViewCurrentItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay
						.itemViewCurrentItem,
			})
		);
		// Opens bug ListView and keeps same itemViewCurrentItem to allow
		// ...switching back to the bug ItemView (if itemViewCurrentItem is
		// ...not null) using the navbar. Closes all other bug components
		dispatch(
			setWhichBugComponentsDisplay({
				listView: true,
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		// Closes all comment components
		dispatch(setWhichCommentComponentsDisplay({}));
	} else if (
		passedReduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ===
			true ||
		passedReduxState[BUG_CONTAINER].componentsDisplay
			.listViewCreateItemSidbar === true
	) {
		// Closes all account components
		dispatch(setWhichAccountComponentsDisplay({}));
		// Opens bug ListView and keeps same itemViewCurrentItem to allow
		// ...switching back to the bug ItemView (if itemViewCurrentItem is
		// ...not null) using the navbar. Closes all other bug components
		dispatch(
			setWhichBugComponentsDisplay({
				listView: true,
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
	}
}

/**
 * Will open the bug ItemView component while closing all components that
 * shouldn't ever be open at the same time as it, as well as the AccountSidebar
 * (if it is open)
 *
 * @param {JSON} passedReduxState - Current redux state from useSelector
 * @param {Function} dispatch - Redux store's dispatch function from useDispatch
 */
export function openBugsItemView(passedReduxState, dispatch) {
	if (passedReduxState[BUG_CONTAINER].componentsDisplay.itemView !== true) {
		// Closes all account components
		dispatch(setWhichAccountComponentsDisplay({}));
		// Keeps same itemViewCurrentItem to allow switching back to the
		// ...project ItemView (if itemViewCurrentItem is not null) using the
		// ...navbar. Closes all project components
		dispatch(
			setWhichProjectComponentsDisplay({
				itemViewCurrentItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay
						.itemViewCurrentItem,
			})
		);
		// Opens bug ItemView and keeps same itemViewCurrentItem which will
		// ...have been set previously in the project ListView. Closes all
		// ...other bug components
		dispatch(
			setWhichBugComponentsDisplay({
				itemView: true,
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		// Closes all comment components
		dispatch(setWhichCommentComponentsDisplay({}));
	} else if (
		passedReduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ===
		true
	) {
		// Closes all account components
		dispatch(setWhichAccountComponentsDisplay({}));
	}
}

/**
 * Closes all views tabs except the project ListView (which moves the user to
 * the ListView if not already there).
 *
 * @param {Event} e - The event created by the onClick
 * @param {JSON} passedReduxState - Current redux state from useSelector
 * @param {Function} dispatch - Redux store's dispatch function from useDispatch
 */
export function closeProjectItemView(e, passedReduxState, dispatch) {
	// Stops onClicks of parent elements from being triggered
	e.stopPropagation();
	// Closes all account components
	dispatch(setWhichAccountComponentsDisplay({}));
	// Closes all project components except the project
	// ...ListViewCreateItemSidebar (if it is open)
	dispatch(
		setWhichProjectComponentsDisplay({
			listView: true,
			listViewCreateItemSidbar:
				passedReduxState[PROJECT_CONTAINER].componentsDisplay
					.listViewCreateItemSidbar,
		})
	);
	// Closes all bug components
	dispatch(setWhichBugComponentsDisplay({}));
	// Clears the bug massDeleteList
	dispatch(setProjectOrBugMassDeleteList(BUG_CONTAINER));
	// Closes all comment components
	dispatch(setWhichCommentComponentsDisplay({}));
}

/**
 * Closes the bug ItemView tab. If user is on the bug ItemView, they are moved
 * to the bug ListView. Otherwise they stay on the current view.
 *
 * @param {Event} e - The event created by the onClick
 * @param {JSON} passedReduxState - Current redux state from useSelector
 * @param {Function} dispatch - Redux store's dispatch function from useDispatch
 */
export function closeBugItemView(e, passedReduxState, dispatch) {
	// Stops onClicks of parent elements from being triggered
	e.stopPropagation();
	dispatch(setWhichAccountComponentsDisplay({}));
	// Closes bug ItemView tab. If the user is on the bug ItemView, they are
	// ...moved to the bug ListView. If the bug ListViewCreateItemSidebar is
	// ...open, it remains open
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
	// Closes all comment components
	dispatch(setWhichCommentComponentsDisplay({}));
}
