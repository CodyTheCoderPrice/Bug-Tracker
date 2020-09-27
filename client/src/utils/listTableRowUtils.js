import { toggleClassName } from "./elementUtils";

export function toggleTableRowSelected(
	targetItem,
	item,
	rowElement,
	nameOfHighlightClass,
	nameOfSelectedClass
) {
	const shouldHighlightOnHover =
		targetItem === null;
	toggleClassName(shouldHighlightOnHover, rowElement, nameOfHighlightClass);

	const shouldBeSelected =
		targetItem !== null &&
		targetItem.id === item.id;
	toggleClassName(shouldBeSelected, rowElement, nameOfSelectedClass);
}
