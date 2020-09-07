import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleClassName } from "./elementUtils";

export function toggleDropdownButtonDisplay(
	shouldDisplay,
	buttonElement,
	dropdownElement,
	nameOfToggledClass
) {
	toggleClassName(shouldDisplay, buttonElement, nameOfToggledClass);
	shouldDisplay
		? (dropdownElement.style.visibility = "visible")
		: (dropdownElement.style.visibility = "hidden");
}

/* // Custom Hook
export function useToggleSortButtons(
	dispatchFunction,
	reduxProperty,
	activeButtonClassName,
	clickedClassNameAppendix,
) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	return [previousButtonElement, setPreviousButtonElement];
} */
