import { useState, useEffect } from "react";

import { toggleClassName } from "./elementUtils";

export function useToggleableDateInput(
	state,
	dateContainerClassName,
	completedIndex
) {
	// perserves a record of the completion_date when the date input is toggled off.
	const [preservedCompletionDate, setPerservedCompletionDate] = useState(
		state.completion_date
	);

	// Tracks the pervious status to know when to update perservedCompletionDate
	const [previousStatusId, setPreviousStatusId] = useState(state.status);

	useEffect(() => {
		toggleDisableElements();
		if (previousStatusId === completedIndex) {
			updatePerservedCompletionDate();
		}
		setPreviousStatusId(state.status_id);
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, [state.status_id]);

	function toggleDisableElements() {
		let dateContainerElement = document.getElementsByClassName(
			dateContainerClassName
		)[0];

		for (let child of dateContainerElement.childNodes) {
			if (child.tagName === "LABEL") {
				toggleClassName(
					state.status_id !== completedIndex,
					child,
					"grayed-out-label"
				);
			} else if (child.tagName === "INPUT") {
				toggleClassName(
					state.status_id !== completedIndex,
					child,
					"grayed-out-date"
				);
			}
			/* child.disabled = state.status_id !== completedIndex; */
		}
	}

	function updatePerservedCompletionDate() {
		let dateContainerElement = document.getElementsByClassName(
			dateContainerClassName
		)[0];

		if (state.status_id !== completedIndex) {
			for (let child of dateContainerElement.childNodes) {
				if (child.tagName === "INPUT") {
					setPerservedCompletionDate(child.value);
				}
			}
		}
	}

	return [preservedCompletionDate];
}
