import { useState, useEffect } from "react";

export function usePerserveCompletetionDate(
	itemInfo,
	setItemInfo,
	completionDateClassName,
	completedIndex
) {
	// perserves a record of the completion_date when the date input is toggled off.
	const [preservedCompletionDate, setPerservedCompletionDate] = useState(
		itemInfo.completion_date
	);

	// Tracks the pervious status to know when to update perservedCompletionDate
	const [previousStatusId, setPreviousStatusId] = useState(itemInfo.status);

	useEffect(() => {
		// Sets the preservedCompletionDate
		if (previousStatusId === completedIndex) {
			setPerservedCompletionDate(
				document.getElementsByClassName(completionDateClassName)[0].value
			);
		}

		// Updates completion_date with the preservedCompletionDate
		if (itemInfo.status_id !== completedIndex) {
			setItemInfo({ ...itemInfo, completion_date: "" });
		} else {
			setItemInfo({
				...itemInfo,
				completion_date: preservedCompletionDate,
			});
		}

		setPreviousStatusId(itemInfo.status_id);
		// eslint-disable-next-line
	}, [itemInfo.status_id]);
}
