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
 * and ListViewCreateItemSidebar for projects (if they were open)
 * 
 *
 * @param {JSON} passedReduxState - Current redux state from useSelector
 * @param {Function} dispatch - Redux store's dispatch function from useDispatch
 */
export function openProjectsListView(passedReduxState, dispatch) {
	if (passedReduxState[PROJECT_CONTAINER].componentsDisplay.listView !== true) {
		// Closes all account components
		dispatch(setWhichAccountComponentsDisplay({}));
		// Opens project ListView and keeps same itemViewCurrentItem to allow switching
		// ...back to the project ItemView (if itemViewCurrentItem is not null) using
		// ...the navbar. Closes all other project components.
		dispatch(
			setWhichProjectComponentsDisplay({
				listView: true,
				itemViewCurrentItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		// Closes eeps same itemViewCurrentItem, since if not null, 
		// ...then project ItemView for that itemViewCurrentItem is being maintained to
		// ...allow switching back to it using the navbar
		dispatch(
			setWhichBugComponentsDisplay({
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	} else if (
		passedReduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ===
			true ||
		passedReduxState[PROJECT_CONTAINER].componentsDisplay
			.listViewCreateItemSidbar === true
	) {
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(
			setWhichProjectComponentsDisplay({
				listView: true,
				itemViewCurrentItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
	}
}

export function openProjectsItemView(passedReduxState, dispatch) {
	if (passedReduxState[PROJECT_CONTAINER].componentsDisplay.itemView !== true) {
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(
			setWhichProjectComponentsDisplay({
				itemView: true,
				itemViewCurrentItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		dispatch(
			setWhichBugComponentsDisplay({
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	} else if (
		passedReduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ===
		true
	) {
		dispatch(setWhichAccountComponentsDisplay({}));
	}
}

export function openBugsListView(passedReduxState, dispatch) {
	if (passedReduxState[BUG_CONTAINER].componentsDisplay.listView !== true) {
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(
			setWhichProjectComponentsDisplay({
				itemViewCurrentItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		dispatch(
			setWhichBugComponentsDisplay({
				listView: true,
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	} else if (
		passedReduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ===
			true ||
		passedReduxState[BUG_CONTAINER].componentsDisplay
			.listViewCreateItemSidbar === true
	) {
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(
			setWhichBugComponentsDisplay({
				listView: true,
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
	}
}

export function openBugsItemView(passedReduxState, dispatch) {
	if (passedReduxState[BUG_CONTAINER].componentsDisplay.itemView !== true) {
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(
			setWhichProjectComponentsDisplay({
				itemViewCurrentItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		dispatch(
			setWhichBugComponentsDisplay({
				itemView: true,
				itemViewCurrentItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	} else if (
		passedReduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ===
		true
	) {
		dispatch(setWhichAccountComponentsDisplay({}));
	}
}

export function closeProjectItemView(e, passedReduxState, dispatch) {
	e.stopPropagation();
	dispatch(setWhichAccountComponentsDisplay({}));
	dispatch(
		setWhichProjectComponentsDisplay({
			...passedReduxState[PROJECT_CONTAINER].componentsDisplay,
			listView: true,
			itemView: false,
			itemViewCurrentItem: null,
		})
	);
	dispatch(setWhichBugComponentsDisplay({}));
	dispatch(setProjectOrBugMassDeleteList(BUG_CONTAINER));
	dispatch(setWhichCommentComponentsDisplay({}));
}

export function closeBugItemView(e, passedReduxState, dispatch) {
	e.stopPropagation();
	dispatch(setWhichAccountComponentsDisplay({}));
	// <-- projectComponentsDisplay is not cleared here on purpose
	dispatch(
		setWhichBugComponentsDisplay({
			...passedReduxState[BUG_CONTAINER].componentsDisplay,
			// Keeps the user on their current tab (since the user can close a bug from the project tab)
			listView:
				passedReduxState[BUG_CONTAINER].componentsDisplay.listView === true ||
				passedReduxState[BUG_CONTAINER].componentsDisplay.itemView === true
					? true
					: false,
			itemView: false,
			itemViewCurrentItem: null,
		})
	);
	dispatch(setWhichCommentComponentsDisplay({}));
}
