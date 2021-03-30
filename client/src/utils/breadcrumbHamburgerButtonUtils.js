// This util imports container names as it works with the redux state
import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
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
 * Will open the ListView component for projects while closing components that
 * either shouldn't ever be open at the same time as it, or can also be open at 
 * the same time, but the user would expect to close when it is being openned.
 * 
 * @param {JSON} passedReduxState - Current redux state from useSelector
 * @param {Function} dispatch - Redux store's dispatch function from useDispatch
 */
export function openProjectsListView(passedReduxState, dispatch) {
	if (passedReduxState[PROJECT_CONTAINER].componentsDisplay.listView !== true) {
		dispatch(
			setWhichProjectComponentsDisplay({
				listView: true,
				targetItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay.targetItem,
			})
		);
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(
			setWhichBugComponentsDisplay({
				targetItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.targetItem,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	} else if (
		passedReduxState[PROJECT_CONTAINER].componentsDisplay
			.listViewCreateItemSidbar === true
	) {
		dispatch(
			setWhichProjectComponentsDisplay({
				listView: true,
				targetItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay.targetItem,
			})
		);
	}
}

export function openProjectsItemView(passedReduxState, dispatch) {
	if (
		passedReduxState[PROJECT_CONTAINER].componentsDisplay.itemsContainer !==
		true
	) {
		dispatch(
			setWhichProjectComponentsDisplay({
				itemView: true,
				targetItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay.targetItem,
			})
		);
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(
			setWhichBugComponentsDisplay({
				targetItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.targetItem,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	}
}

export function openBugsListView(passedReduxState, dispatch) {
	if (passedReduxState[BUG_CONTAINER].componentsDisplay.listView !== true) {
		dispatch(
			setWhichBugComponentsDisplay({
				listView: true,
				targetItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.targetItem,
			})
		);
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(
			setWhichProjectComponentsDisplay({
				targetItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay.targetItem,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	} else if (
		passedReduxState[BUG_CONTAINER].componentsDisplay
			.listViewCreateItemSidbar === true
	) {
		dispatch(
			setWhichBugComponentsDisplay({
				listView: true,
				targetItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.targetItem,
			})
		);
	}
}

export function openBugsItemView(passedReduxState, dispatch) {
	if (passedReduxState[BUG_CONTAINER].componentsDisplay.itemView !== true) {
		dispatch(
			setWhichBugComponentsDisplay({
				itemView: true,
				targetItem:
					passedReduxState[BUG_CONTAINER].componentsDisplay.targetItem,
			})
		);
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(
			setWhichProjectComponentsDisplay({
				targetItem:
					passedReduxState[PROJECT_CONTAINER].componentsDisplay.targetItem,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	}
}

export function closeProjectItemView(e, passedReduxState, dispatch) {
	e.stopPropagation();
	dispatch(
		setWhichProjectComponentsDisplay({
			...passedReduxState[PROJECT_CONTAINER].componentsDisplay,
			listView: true,
			itemView: false,
			targetItem: null,
		})
	);
	dispatch(setWhichAccountComponentsDisplay({}));
	dispatch(setWhichBugComponentsDisplay({}));
	dispatch(setProjectOrBugMassDeleteList(BUG_CONTAINER));
	dispatch(setWhichCommentComponentsDisplay({}));
}

export function closeBugItemView(e, passedReduxState, dispatch) {
	e.stopPropagation();
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
			targetItem: null,
		})
	);
	dispatch(setWhichAccountComponentsDisplay({}));
	// projectComponentsDisplay is not cleared here on purpose
	dispatch(setWhichCommentComponentsDisplay({}));
}
