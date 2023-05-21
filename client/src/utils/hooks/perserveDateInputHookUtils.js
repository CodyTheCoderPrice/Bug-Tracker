import { useState, useEffect } from "react";

/**
 * Custom hook that will make it so during session of creating/editing an item,
 * if input element (of type date) for selecting a 'completion_date' value for
 * itemInfoState param Object is active (meaning user can enter a completion
 * date since 'status' property in itemInfoState param Object is set to 
 * "completed"), but during the same session the 'status' property is later 
 * changed, then this hook will preserve a copy of 'completion_date' property 
 * value before updating 'completion_date' property to be an empty string (as
 * there would be no completion date), so if 'status' property is later set back
 * to "completed", then the preserved 'completion_date' value will be restored.
 * 
 * Note: The purpose of this custom hook is to be used by ListViewCreateItemSidebar 
 * and ItemViewEditItemInfo components, to make them more user friendly, as the 
 * user would not need to re-enter the completion date if they change the status 
 * away from "completed" and then back to "completed".
 *
 * @param {{
 * 	id: (number|undefined), 
 *  name: string, 
 * 	description: string, 
 * 	location: string, 
 * 	priority_id: number,
 * 	priorityOption: (string|undefined), 
 * 	status_id: number, 
 * 	statusOption: (string|undefined), 
 * 	creation_date: (string|undefined),
 * 	start_date: string, 
 * 	due_date: string,
 * 	completion_date: string 
 * }} itemInfoState - State variable from the itemInfo useState
 * @param {Function} setItemInfoFunction - Setter function variable from the
 * itemInfo useState
 * @param {string} completionDateUniqueClassName - Unique className assigned to
 * input element (of type date) for selecting a 'completion_date' value for 
 * itemInfoState param Object
 * @param {Object} passedReduxState - Current redux state from 
 * useSelector((state) => state)
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - Redux
 * container (i.e. 'PROJECT_CONTAINER' or 'BUG_CONTAINER') for which 
 * 'priorityStatusOptions' property to use
 * 
 * @example
 * // Used while editing a bug
 * usePerserveCompletetionDate(
 * 	{
 * 		id: 95,
 * 		name: "Redux persist bug",
 * 		description: "Certain containers not being persisted in redux",
 * 		location: "Redux",
 * 		priority_id: 4,
 * 		priorityOption: "High",
 * 		status_id: 3,
 * 		statusOption: "Testing",
 * 		creation_date: "10-22-2020",
 * 		start_date: "2020-10-22",
 * 		due_date: "2020-10-24",
 * 		completion_date: ""
 * 	},
 * 	setItemInfo,
 * 	"js-completion-date",
 * 	reduxState,
 * 	"BUG_CONTAINER"
 * );
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemInfoState.status_id]);
}
