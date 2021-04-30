// Needed for returning JSX in functions
import React from "react";

/**
 * Get JSX containing option elements for priority to go inside select element
 * relating to either projects or a bugs
 *
 * @param {Object} passedReduxState - Current redux state from useSelector
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - Redux 
 * container of which priorityStatusOptions to use
 * PROJECT_CONTAINER, or BUG_CONTAINER)
 * @returns {JSX} JSX containing option elements for priority to go inside a
 * select element relating to either projects or a bugs.
 */
 export function getPriorityOptionsForSelect(
	passedReduxState,
	reduxContainerName
) {
	return passedReduxState[
		reduxContainerName
	].priorityStatusOptions.priorityList.map((priority, idx) => {
		return (
			<option
				key={idx}
				value={priority.id}
			>
				{priority.option}
			</option>
		);
	});
}

/**
 * Get JSX containing option elements for status (with status.color as css text 
 * color) to go inside select element relating to either projects or a bugs
 *
 * @param {Object} passedReduxState - Current redux state from useSelector
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - Redux
 * container of which priorityStatusOptions to use
 * @returns {JSX} JSX containing option elements for status (with status.color
 * as css text color) to go inside a select element
 */
export function getStatusOptionsForSelectWithStatusColors(
	passedReduxState,
	reduxContainerName
) {
	return passedReduxState[
		reduxContainerName
	].priorityStatusOptions.statusList.map((status, idx) => {
		return (
			<option
				className={"js-set-status-box-text-color-" + status.color}
				key={idx}
				value={status.id}
			>
				{status.option}
			</option>
		);
	});
}