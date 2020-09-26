/* import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; */
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
