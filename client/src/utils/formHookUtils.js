import { useEffect } from "react";

export function useToggleableDateInputAndTooltip(
	state,
	updateProxyDateState,
	dateContainerClassName,
	tooltipContainerClassName,
	completedIndex
) {
	useEffect(() => {
		addTooltipEventForMouseOverAndOut();
	}, []);

	useEffect(() => {
		toggleDisableElements();
		updateProxyDateStateAfterToggle();
		toggleTooltipDisplay();
	}, [state.status]);

	function handleMouseOver() {
		let tooltipContainerElement = document.getElementsByClassName(
			tooltipContainerClassName
		)[0];

		tooltipContainerElement.style.visibility = "visible";
	}

	function handleMouseOut() {
		let tooltipContainerElement = document.getElementsByClassName(
			tooltipContainerClassName
		)[0];

		tooltipContainerElement.style.visibility = "hidden";
	}

	function addTooltipEventForMouseOverAndOut() {
		let dateContainerElement = document.getElementsByClassName(
			dateContainerClassName
		)[0];

		dateContainerElement.addEventListener("mouseover", handleMouseOver);
		dateContainerElement.addEventListener("mouseout", handleMouseOut);
	};

	function toggleDisableElements() {
		let dateContainerElement = document.getElementsByClassName(
			dateContainerClassName
		)[0];

		if (state.status === completedIndex) {
			for (let child of dateContainerElement.childNodes) {
				child.style.color = "black";
				child.disabled = false;
			}
		} else {
			for (let child of dateContainerElement.childNodes) {
				child.style.color = "#bfbfbf";
				child.disabled = true;
			}
		}
	};

	function updateProxyDateStateAfterToggle() {
		let dateContainerElement = document.getElementsByClassName(
			dateContainerClassName
		)[0];

		if (state.status === completedIndex) {
			for (let child of dateContainerElement.childNodes) {
				if (child.tagName === "INPUT") {
					updateProxyDateState(child.value);
				}
			}
		} else {
			updateProxyDateState(null);
		}
	};

	function toggleTooltipDisplay() {
		let tooltipContainerElement = document.getElementsByClassName(
			tooltipContainerClassName
		)[0];

		if (state.status !== completedIndex) {
			tooltipContainerElement.style.zIndex = "1";
		} else {
			tooltipContainerElement.style.zIndex = "-1";
		}
	}

	return [];
}