import { stripNonDigits, getElementStyle, getElementSize } from "./displaySizeUtils";
import { toggleClassName } from "./elementUtils";

export function manageSizeOfItemBoxsInPairContainer(
	pairElement,
	toggledClassNameForWidth,
	outerDivingContainerMinWidth,
) {
	const childNodes = pairElement.childNodes;
	// Item box width is determing by its outerDividingContainer
	const firstOuterDividingContianerElement = childNodes[0];
	const secondOuterDividingContianerElement = childNodes[1];

	// Toggles each item box's className for width
	const myObserver = new ResizeObserver(() => {
		// If both item-boxs can fit next to one another
		const shouldHaveClassName =
			getElementSize(pairElement).width > outerDivingContainerMinWidth * 2;

		
		toggleClassName(shouldHaveClassName, firstOuterDividingContianerElement, toggledClassNameForWidth);
		toggleClassName(shouldHaveClassName, secondOuterDividingContianerElement, toggledClassNameForWidth);
	});

	myObserver.observe(
		pairElement
	);
}
