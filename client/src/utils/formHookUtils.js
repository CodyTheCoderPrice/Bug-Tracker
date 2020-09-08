import { useState, useEffect } from "react";

import { toggleClassName } from "./elementUtils";

export function useToggleableDateInput(
	state,
	dateContainerClassName,
	completedIndex
) {
	// perserves a record of the completionDate when the date input is toggled off.
	const [preservedCompletionDate, setPerservedCompletionDate] = useState(
		state.completionDate
	);

	// Tracks the pervious status to know when to update perservedCompletionDate
	const [previousStatus, setPreviousStatus] = useState(state.status);

	useEffect(() => {
		toggleDisableElements();
		if (previousStatus === completedIndex) {
			updatePerservedCompletionDate();
		}
		setPreviousStatus(state.statusId);
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, [state.statusId]);

	function toggleDisableElements() {
		let dateContainerElement = document.getElementsByClassName(
			dateContainerClassName
		)[0];

		for (let child of dateContainerElement.childNodes) {
			if (child.tagName === "LABEL") {
				toggleClassName(
					state.statusId !== completedIndex,
					child,
					"grayed-out-label"
				);
			} else if (child.tagName === "INPUT") {
				toggleClassName(
					state.statusId !== completedIndex,
					child,
					"grayed-out-date"
				);
			}
			child.disabled = state.statusId !== completedIndex;
		}
	}

	function updatePerservedCompletionDate() {
		let dateContainerElement = document.getElementsByClassName(
			dateContainerClassName
		)[0];

		if (state.statusId !== completedIndex) {
			for (let child of dateContainerElement.childNodes) {
				if (child.tagName === "INPUT") {
					setPerservedCompletionDate(child.value);
				}
			}
		}
	}

	return [preservedCompletionDate];
}
