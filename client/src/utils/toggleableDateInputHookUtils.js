import { useState, useEffect } from "react";

import { toggleClassName } from "./elementUtils";

export function useToggleableDateInput(
	itemInfo,
	dateContainerClassName,
	completedIndex
) {
	// perserves a record of the completion_date when the date input is toggled off.
	const [preservedCompletionDate, setPerservedCompletionDate] = useState(
		itemInfo.completion_date
	);

	// Tracks the pervious status to know when to update perservedCompletionDate
	const [previousStatusId, setPreviousStatusId] = useState(itemInfo.status);

	useEffect(() => {
		toggleDisableElements();
		if (previousStatusId === completedIndex) {
			updatePerservedCompletionDate();
		}
		setPreviousStatusId(itemInfo.status_id);
		// eslint-disable-next-line
	}, [itemInfo.status_id]);

	function toggleDisableElements() {
		let dateContainerElement = document.getElementsByClassName(
			dateContainerClassName
		)[0];

		for (let child of dateContainerElement.childNodes) {
			if (child.tagName === "LABEL") {
				toggleClassName(
					itemInfo.status_id !== completedIndex,
					child,
					"grayed-out-unclickable-label"
				);
			} else if (child.tagName === "INPUT") {
				toggleClassName(
					itemInfo.status_id !== completedIndex,
					child,
					"grayed-out-unclickable-date"
				);
			}
		}
	}

	function updatePerservedCompletionDate() {
		let dateContainerElement = document.getElementsByClassName(
			dateContainerClassName
		)[0];

		if (itemInfo.status_id !== completedIndex) {
			for (let child of dateContainerElement.childNodes) {
				if (child.tagName === "INPUT") {
					setPerservedCompletionDate(child.value);
				}
			}
		}
	}

	return [preservedCompletionDate];
}
