import React from "react";

/**
 * Get JSX containing option elements for status (with status.color
 * as css text color) from statusList to go inside a select element
 *
 * @param {JSON} passedReduxState - Current redux state from useSelector
 * @param {String} reduxContainerName - Redux container for which
 * priorityStatusOptions to use (either props.reduxContainerName,
 * PROJECT_CONTAINER, or BUG_CONTAINER)
 * @returns {JSX} JSX containing option elements for status (with status.color
 * as css text color) from statusList to go inside a select element
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
