import { toggleClassName } from "./elementUtils";

export function toggleOptionsDropdownDisplay(
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
