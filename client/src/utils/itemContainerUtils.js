import { stripNonDigits, getElementStyle, getElementSize } from "./displaySizeUtils";
import { toggleClassName } from "./elementUtils";

export function manageSizeOfItemBoxsInPairContainer(
	pairElement,
	toggledClassNameForHeight,
	toggledClassNameForWidth,
) {
	const childNodes = pairElement.childNodes;
	const firstItemBoxElement = childNodes[0];
	const secondItemBoxElement = childNodes[1];

	// Toggles each item box's className for height


	// Toggles each item box's className for width
	const myObserver = new ResizeObserver(() => {
		const itemBoxMinWidth = stripNonDigits(getElementStyle(firstItemBoxElement).minWidth);
		// If both item-boxs can fit next to one another
		const shouldHaveClassName =
			getElementSize(pairElement).width > itemBoxMinWidth * 2;

		
		toggleClassName(shouldHaveClassName, firstItemBoxElement, toggledClassNameForWidth);
		toggleClassName(shouldHaveClassName, secondItemBoxElement, toggledClassNameForWidth);
	});

	myObserver.observe(
		pairElement
	);
}
