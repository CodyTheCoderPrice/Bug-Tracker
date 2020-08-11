import { useState, useRef, useEffect, useCallback } from 'react';

export const toggleCharCountColor = (
	nameOfClass,
	descriptionLength,
	charLimit
) => {
	document.getElementsByClassName(nameOfClass)[0].style.color =
		descriptionLength > charLimit ? "red" : "black";
};

export class ToggleableDateInput {
	constructor(
		state,
		updateState,
		dateContainerClassName,
		tooltipContainerClassName,
		completedIndex
	) {
		this.state = state;
		this.updateState = updateState;
		this.dateContainerClassName = dateContainerClassName;
		this.tooltipContainerClassName = tooltipContainerClassName;
		this.completedIndex = completedIndex;
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
	}

	toggleDisableElements = () => {
		let dateContainerElement = document.getElementsByClassName(
			this.dateContainerClassName
		)[0];

		if (this.state.status === this.completedIndex) {
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

	updateStateAfterToggle = () => {
		let dateContainerElement = document.getElementsByClassName(
			this.dateContainerClassName
		)[0];

		if (this.state.status === this.completedIndex) {
			for (let child of dateContainerElement.childNodes) {
				if (child.tagName === "INPUT") {
					this.updateState({
						...this.state,
						completionDate: child.value,
					});
				}
			}
		} else {
			this.updateState({ ...this.state, completionDate: null });
		}
	};
	
	handleMouseOver = () => {
		let tooltipContainerElement = document.getElementsByClassName(
			this.tooltipContainerClassName
		)[0];

		tooltipContainerElement.style.visibility = "visible";
	}

	handleMouseOut = () => {
		let tooltipContainerElement = document.getElementsByClassName(
			this.tooltipContainerClassName
		)[0];

		tooltipContainerElement.style.visibility = "hidden";
	}

	toggleTooltipEventListener = () => {
		if (this.state.status !== this.completedIndex){
			this.addTooltipEventForMouseOverAndOut();
		} else {
			console.log("Beep");
			this.removeTooltipEventForMouseOverAndOut();
			console.log("Boop");
		}
	}

	addTooltipEventForMouseOverAndOut = () => {
		let dateContainerElement = document.getElementsByClassName(
			this.dateContainerClassName
		)[0];

		dateContainerElement.addEventListener("mouseover", this.handleMouseOver);
		dateContainerElement.addEventListener("mouseout", this.handleMouseOut);
	};

	removeTooltipEventForMouseOverAndOut = () => {
		let dateContainerElement = document.getElementsByClassName(
			this.dateContainerClassName
		)[0];

		dateContainerElement.removeEventListener("mouseover", this.handleMouseOver);
		dateContainerElement.removeEventListener("mouseout", this.handleMouseOut);
	};
}
