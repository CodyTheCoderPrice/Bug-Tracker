import { useState, useEffect } from "react";

export function useToggleableDateInputAndTooltip(
	state,
	dateContainerClassName,
	tooltipContainerClassName,
	completedIndex
) {
	// Used by custom hook useToggleableDateInputAndTooltip to update completionDate after a toggle.
	// The reason a proxy is used is so hook can only update completionDate and not the rest of the state.
	const [proxyCompletionDate, setProxyCompletionDate] = useState(
		state.completionDate
	);

	useEffect(() => {
		addTooltipEventForMouseOverAndOut();
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		toggleDisableElements();
		setProxyCompletionDateAfterToggle();
		toggleTooltipDisplay();
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, [state.statusId]);

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
	}

	function toggleDisableElements() {
		let dateContainerElement = document.getElementsByClassName(
			dateContainerClassName
		)[0];

		if (state.statusId === completedIndex) {
			for (let child of dateContainerElement.childNodes) {
				child.style.color = "black";
				if (child.tagName === "INPUT") {
					child.style.backgroundColor = "#e5e5e5";
				}

				child.disabled = false;
			}
		} else {
			for (let child of dateContainerElement.childNodes) {
				child.style.color = "#bfbfbf";
				if (child.tagName === "INPUT") {
					child.style.backgroundColor = "#f5f5f5";
				}

				child.disabled = true;
			}
		}
	}

	function setProxyCompletionDateAfterToggle() {
		let dateContainerElement = document.getElementsByClassName(
			dateContainerClassName
		)[0];

		if (state.statusId === completedIndex) {
			for (let child of dateContainerElement.childNodes) {
				if (child.tagName === "INPUT") {
					setProxyCompletionDate(child.value);
				}
			}
		} else {
			setProxyCompletionDate(null);
		}
	}

	function toggleTooltipDisplay() {
		let tooltipContainerElement = document.getElementsByClassName(
			tooltipContainerClassName
		)[0];

		if (state.statusId !== completedIndex) {
			tooltipContainerElement.style.zIndex = "1";
		} else {
			tooltipContainerElement.style.zIndex = "-1";
		}
	}

	return [proxyCompletionDate, setProxyCompletionDate];
}
