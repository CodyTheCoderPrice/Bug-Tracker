import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../actions/constants/containerNames";

import {
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
	setWhichCommentComponentsDisplay,
} from "../actions";

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
