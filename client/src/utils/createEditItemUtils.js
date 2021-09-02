// Needed for returning JSX in functions
import React from "react";
import { getCommonStatusTextColorClassName } from "./index";

/**
 * Get JSX containing option elements to go inside select element used for
 * setting priority of either a project or bug
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - Redux
 * container (i.e. 'PROJECT_CONTAINER' or 'BUG_CONTAINER') for which
 * 'priorityStatusOptions' property to use
 * @returns {JSX} JSX containing option elements to go inside select element 
 * used for setting priority of either a project or bug
 */
export function getPriorityOptionsForSelect(
	passedReduxState,
	reduxContainerName
) {
	return passedReduxState[
		reduxContainerName
	].priorityStatusOptions.priorityList.map((priority, idx) => {
		return (
			<option key={idx} value={priority.id}>
				{priority.option}
			</option>
		);
	});
}

/**
 * Get JSX containing option elements to go inside select element used for
 * setting status of either a project or bug
 *
 * @param {Object} passedReduxState - Current redux state
 * from useSelector((state) => state)
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - Redux
 * container (i.e. 'PROJECT_CONTAINER' or 'BUG_CONTAINER') for which
 * 'priorityStatusOptions' Object to use
 * @returns {JSX} JSX containing option elements to go inside select element 
 * used for setting status of either a project or bug
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
				className={getCommonStatusTextColorClassName(status.color)}
				key={idx}
				value={status.id}
			>
				{status.option}
			</option>
		);
	});
}
