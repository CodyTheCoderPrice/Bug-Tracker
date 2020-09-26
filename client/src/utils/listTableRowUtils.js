import { toggleClassName } from "./elementUtils";

export function toggleTableRowSelected(
	rowElement,
	shouldBeSelected,
	nameOfClickableClass,
	nameOfSelectedClass
) {
	toggleClassName(!shouldBeSelected, rowElement, nameOfClickableClass);
	toggleClassName(shouldBeSelected, rowElement, nameOfSelectedClass);
}
