import { useState, useEffect } from "react";

/**
 * During the process of creating/editing an item, if a completion date value
 * is set but the status is then changed (which turns off completion date),
 * this hook will set completion_date in the itemInfoState to an empty string,
 * but preserve a copy of the value, so if status is later set back to
 * completed, the previous completion date will be restored.
 *
 * @param {Object} itemInfoState - State variable from the itemInfo useState
 * @param {Function} setItemInfoFunction - Setter function variable from the
 * itemInfo useState
 * @param {string} completionDateUniqueClassName - Unique className assigned to
 * the input date element for completion date
 * @param {Object} passedReduxState - Current redux state from useSelector
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - Redux
 * container of which priorityStatusOptions to use
 */
export function usePerserveCompletetionDate(
	itemInfoState,
	setItemInfoFunction,
	completionDateUniqueClassName,
	passedReduxState,
	reduxContainerName
) {
	const [preservedCompletionDate, setPerservedCompletionDate] = useState(
		itemInfoState.completion_date
	);

	// Used to known when to update preservedCompletionDate
	const [previousStatusId, setPreviousStatusId] = useState(
		itemInfoState.status
	);

	useEffect(() => {
		if (
			previousStatusId ===
			passedReduxState[reduxContainerName].priorityStatusOptions
				.statusCompletionId
		) {
			setPerservedCompletionDate(
				document.getElementsByClassName(completionDateUniqueClassName)[0].value
			);
		}

		if (
			itemInfoState.status_id !==
			passedReduxState[reduxContainerName].priorityStatusOptions
				.statusCompletionId
		) {
			setItemInfoFunction({ ...itemInfoState, completion_date: "" });
		} else if (itemInfoState.completion_date !== preservedCompletionDate) {
			setItemInfoFunction({
				...itemInfoState,
				completion_date: preservedCompletionDate,
			});
		}

		setPreviousStatusId(itemInfoState.status_id);
		// eslint-disable-next-line
	}, [itemInfoState.status_id]);
}
