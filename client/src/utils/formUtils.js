import {
	getIndexOfCompleted,
} from "./projectComboBoxOptionsUtils";

const isEmpty = require("is-empty");

export const toggleCharCountElementColor = (nameOfClass, descriptionLength, charLimit) => {
	let descriptionCharCounter = document.getElementsByClassName(
		nameOfClass
	)[0];

	if (descriptionLength > charLimit) {
		descriptionCharCounter.style.color = "red";
	} else {
		descriptionCharCounter.style.color = "black";
	}
};

export const toggleCompletionDateElementsAndUpdateState = (nameOfClass, state, updateState) => {
	let completionDateContainer = document.getElementsByClassName(
		nameOfClass
	)[0];
	let childElements = completionDateContainer.childNodes;

	if (state.status === getIndexOfCompleted()) {
		for (let child of childElements) {
			child.style.color = "black";
			child.disabled = false;

			if (child.type === "date") {
				updateState({ ...state, completionDate: child.value });
			}
		}
	} else {
		updateState({ ...state, completionDate: null });

		for (let child of childElements) {
			child.style.color = "#bfbfbf";
			child.disabled = true;
		}
	}
};

/* export const setClearedDatesToNull () */