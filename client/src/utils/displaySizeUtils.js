import {
	stripNonDigits,
	getNavPanelButtonListComponentClassName,
	getNavPanelButtonListComponentSubOverflowContainerElementForBugsModifierClassName,
	getNavPanelButtonListComponentSubOverflowContainerElementWithScrollbarModifierClassName,
	getNavPanelButtonListComponentSubOverflowContainerElementWithScrollbarForBugsModifierClassName,
	getNavPanelButtonListComponentListButtonElementWithTopSpacingModifierClassName,
	getItemViewComponentClassName,
	getItemViewComponentPaddingcontainerElementClassName,
	getItemViewComponentOuterDividingContainerElementClassName,
	getListViewTopBarComponentClassName,
	getListViewTableComponentClassName,
	getListViewTableComponentRowElementClassName,
	getItemViewTopBarComponentClassName,
	getItemViewListSidebarComponentClassName,
	getItemViewListSidebarComponentContainerElementWithExpandedModifierClassName,
	toggleClassName,
} from "../utils";

/**
 * Get an Object containing properties for the window's height and width
 *
 * @returns {{
 * 	height: number,
 * 	width: number
 * }} Object containing properties for the window's height and width
 */
export function getWindowSize() {
	const height =
		window.innerHeight ||
		document.documentElement.clientHeight ||
		document.body.clientHeight;
	const width =
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth;
	return { height: height, width: width };
}

/**
 * Get an Object containing properties for the passed element's height and
 * width
 *
 * @param {Element} element - Element to get height and width for
 * @returns {{
 * 	height: number,
 * 	width: number
 * }} Object containing properties for the passed element's height and width
 */
export function getElementSize(element) {
	return { height: element.offsetHeight, width: element.offsetWidth };
}

/**
 * Get an Object containing properties for the passed element's location (top,
 * bottom, right, left)
 *
 * @param {Element} element - Element to get location for
 * @returns {{
 * 	top: rect.top,
 * 	right: rect.right,
 * 	bottom: rect.bottom,
 * 	left: rect.left,
 * }} Object containing properties for the passed element's location
 */
export function getElementLocation(element) {
	const rect = element.getBoundingClientRect();
	return {
		top: rect.top,
		right: rect.right,
		bottom: rect.bottom,
		left: rect.left,
	};
}

/**
 * Get an Object containing properties for the passed element's styles
 *
 * @param {Element} element - Element to get styles for
 * @returns {Object} Object containing properties for the passed element's
 * styles
 */
export function getElementStyle(element) {
	return element.currentStyle || window.getComputedStyle(element);
}

/**
 * Get the width of the scroll bar
 *
 * @returns {number} Width of the scroll bar
 */
export function getScrollbarWidth() {
	const outerElement = document.createElement("div");
	outerElement.style.visibility = "hidden";
	// Adds scroll bar
	outerElement.style.overflow = "scroll";
	// For WinJS apps
	outerElement.style.msOverflowStyle = "scrollbar";
	document.body.appendChild(outerElement);

	const innerElement = document.createElement("div");
	outerElement.appendChild(innerElement);

	const scrollbarWidth = outerElement.offsetWidth - innerElement.offsetWidth;

	outerElement.parentNode.removeChild(outerElement);

	return scrollbarWidth;
}

/**
 * Gets whether the passesed element has a vertical scrollbar present
 *
 * @returns {boolean} Does the passesed element have a vertical scrollbar present
 */
export function isVerticalScrollbarPresent(element) {
	return element !== undefined && element.scrollHeight > element.clientHeight;
}

/**
 * Get critical sizes and styles from NavPanelButtonList component's
 * 'overflow-container' (className) element
 *
 * @returns {number} Critical sizes and styles from NavPanelButtonList
 * component's 'overflow-container' (className) element
 */
export function getNavPanelButtonListSizesAndStyles() {
	// Creating stand-in element for NavPanelButtonList component to later append
	// ...other stand-in elements to so CSS can work properly. using stand-in
	// ...elements allows this function to be called when the real elements
	// ...aren't in the DOM, and ensures real elements remain unaffected.
	const standInNavPanelButtonListComponentElement =
		document.createElement("div");
	standInNavPanelButtonListComponentElement.className =
		getNavPanelButtonListComponentClassName();
	// Made hidden so user never sees stand-in element or its child elements
	standInNavPanelButtonListComponentElement.visibility = "hidden";
	document.body.appendChild(standInNavPanelButtonListComponentElement);

	const standInSubOverflowContainerElementForBugs =
		document.createElement("div");
	standInSubOverflowContainerElementForBugs.className =
		getNavPanelButtonListComponentSubOverflowContainerElementForBugsModifierClassName();
	// Css requires being child of NavPanelButtonList component
	standInNavPanelButtonListComponentElement.appendChild(
		standInSubOverflowContainerElementForBugs
	);
	const standInSubOverflowContainerElementForBugsStyles = getElementStyle(
		standInSubOverflowContainerElementForBugs
	);

	const standInSubOverflowContainerElementWithScrollbar =
		document.createElement("div");
	standInSubOverflowContainerElementWithScrollbar.className =
		getNavPanelButtonListComponentSubOverflowContainerElementWithScrollbarModifierClassName();
	// Css requires being child of NavPanelButtonList component
	standInNavPanelButtonListComponentElement.appendChild(
		standInSubOverflowContainerElementWithScrollbar
	);
	const standInSubOverflowContainerElementWithScrollbarStyles = getElementStyle(
		standInSubOverflowContainerElementWithScrollbar
	);

	const standInSubOverflowContainerElementWithScrollbarForBugs =
		document.createElement("div");
	standInSubOverflowContainerElementWithScrollbarForBugs.className =
		getNavPanelButtonListComponentSubOverflowContainerElementWithScrollbarForBugsModifierClassName();
	// Css requires being child of NavPanelButtonList component
	standInNavPanelButtonListComponentElement.appendChild(
		standInSubOverflowContainerElementWithScrollbarForBugs
	);
	const standInSubOverflowContainerElementWithScrollbarForBugsStyles =
		getElementStyle(standInSubOverflowContainerElementWithScrollbarForBugs);

	const standInListButtonElementWithTopAndBottomSpacing =
		document.createElement("div");
	standInListButtonElementWithTopAndBottomSpacing.className =
		getNavPanelButtonListComponentListButtonElementWithTopSpacingModifierClassName();
	// Css requires being child of NavPanelButtonList component
	standInNavPanelButtonListComponentElement.appendChild(
		standInListButtonElementWithTopAndBottomSpacing
	);
	const standInListButtonElementWithTopAndBottomSpacingStyles = getElementStyle(
		standInListButtonElementWithTopAndBottomSpacing
	);

	const sizeAndStyleObject = {
		// Removing "px" from Strings and converting to Numbers allows for easier use
		subOverflowContainerForBugsMarginBottom: stripNonDigits(
			standInSubOverflowContainerElementForBugsStyles.marginBottom
		),
		subOverflowContainerWithScrollbarMarginTop: stripNonDigits(
			standInSubOverflowContainerElementWithScrollbarStyles.marginTop
		),
		subOverflowContainerWithScrollbarMarginBottom: stripNonDigits(
			standInSubOverflowContainerElementWithScrollbarStyles.marginBottom
		),
		subOverflowContainerWithScrollbarPaddingTop: stripNonDigits(
			standInSubOverflowContainerElementWithScrollbarStyles.paddingTop
		),
		subOverflowContainerWithScrollbarPaddingBottom: stripNonDigits(
			standInSubOverflowContainerElementWithScrollbarStyles.paddingBottom
		),
		subOverflowContainerWithScrollbarForBugsMarginBottom: stripNonDigits(
			standInSubOverflowContainerElementWithScrollbarForBugsStyles.marginBottom
		),
		subOverflowContainerWithScrollbarForBugsPaddingBottom: stripNonDigits(
			standInSubOverflowContainerElementWithScrollbarForBugsStyles.paddingBottom
		),
		listButtonHeight: getElementSize(
			standInListButtonElementWithTopAndBottomSpacing
		).height,
		listButtonWithTopSpacingMarginTop: stripNonDigits(
			standInListButtonElementWithTopAndBottomSpacingStyles.marginTop
		),
	};

	standInNavPanelButtonListComponentElement.parentNode.removeChild(
		standInNavPanelButtonListComponentElement
	);

	return sizeAndStyleObject;
}

/**
 * Get height (size not style) of ListViewTopBar component
 *
 * @returns {number} Height of of ListViewTopBar component
 */
export function getListViewTopBarComponentHeight() {
	// Creating stand-in element for ListViewTopBar component using stand-in
	// ...elements allows this function to be called when the real elements
	// ...aren't in the DOM, and ensures real elements remain unaffected.
	const standInListViewTopBarComponentElement = document.createElement("div");
	standInListViewTopBarComponentElement.className =
		getListViewTopBarComponentClassName();
	// Made hidden so user never sees stand-in element or its child elements
	standInListViewTopBarComponentElement.visibility = "hidden";
	document.body.appendChild(standInListViewTopBarComponentElement);

	const height = getElementSize(standInListViewTopBarComponentElement).height;

	standInListViewTopBarComponentElement.parentNode.removeChild(
		standInListViewTopBarComponentElement
	);

	return height;
}

/**
 * Get height (size not style) of ListViewTable component's 'list-table__row'
 * (className) element
 *
 * @returns {number} Height of ListViewTable component's 'list-table__row'
 * element
 */
export function getListViewTableComponentRowElementHeight() {
	// Creating stand-in element for ListViewTable component to later append
	// ...other stand-in elements to so CSS can work properly. using stand-in
	// ...elements allows this function to be called when the real elements
	// ...aren't in the DOM, and ensures real elements remain unaffected.
	const standInListViewTableComponentElement = document.createElement("div");
	standInListViewTableComponentElement.className =
		getListViewTableComponentClassName();
	// Made hidden so user never sees stand-in element or its child elements
	standInListViewTableComponentElement.visibility = "hidden";
	document.body.appendChild(standInListViewTableComponentElement);

	const standInListViewTableRowElement = document.createElement("tr");
	standInListViewTableRowElement.className =
		getListViewTableComponentRowElementClassName();
	// CSS requires being child of ListViewTable component
	standInListViewTableComponentElement.appendChild(
		standInListViewTableRowElement
	);

	const height = getElementSize(standInListViewTableRowElement).height;

	standInListViewTableComponentElement.parentNode.removeChild(
		standInListViewTableComponentElement
	);

	return height;
}

/**
 * Get paddingLeft (same as paddingRight) of ItemView component's
 * 'padding-container' (className) element
 *
 * @returns {number} paddingLeft of ItemView component's 'padding-container'
 * element
 */
export function getItemViewComponentPaddingContainerElementLeftPadding() {
	// Creating stand-in element for ItemView component to later append
	// ...other stand-in elements to so CSS can work properly. using stand-in
	// ...elements allows this function to be called when the real elements
	// ...aren't in the DOM, and ensures real elements remain unaffected.
	const standInItemViewComponentElement = document.createElement("div");
	standInItemViewComponentElement.className = getItemViewComponentClassName();
	// Made hidden so user never sees stand-in element or its child elements
	standInItemViewComponentElement.visibility = "hidden";
	document.body.appendChild(standInItemViewComponentElement);

	const standInItemViewComponentPaddingContainerElement =
		document.createElement("div");
	standInItemViewComponentPaddingContainerElement.className =
		getItemViewComponentPaddingcontainerElementClassName();
	// CSS requires being child of ItemView component
	standInItemViewComponentElement.appendChild(
		standInItemViewComponentPaddingContainerElement
	);

	// Removing "px" from Strings and converting to Numbers allows for easier use
	const leftPadding = stripNonDigits(
		// Should be same as right padding
		getElementStyle(standInItemViewComponentPaddingContainerElement).paddingLeft
	);

	standInItemViewComponentElement.parentNode.removeChild(
		standInItemViewComponentElement
	);

	return leftPadding;
}

/**
 * Get minWidth of ItemView component's 'outer-dividing-container' (className)
 * element
 *
 * @returns {number} minWidth of ItemView component's 'outer-dividing-container'
 * element
 */
export function getItemViewComponentOuterDividingContainerElementMinWidth() {
	// Creating stand-in element for ItemView component to later append
	// ...other stand-in elements to so CSS can work properly. using stand-in
	// ...elements allows this function to be called when the real elements
	// ...aren't in the DOM, and ensures real elements remain unaffected.
	const standInItemViewComponentElement = document.createElement("div");
	standInItemViewComponentElement.className = getItemViewComponentClassName();
	// Made hidden so user never sees stand-in element or its child elements
	standInItemViewComponentElement.visibility = "hidden";
	document.body.appendChild(standInItemViewComponentElement);

	const standInItemViewComponentOuterDividingContainerElement =
		document.createElement("div");
	standInItemViewComponentOuterDividingContainerElement.className =
		getItemViewComponentOuterDividingContainerElementClassName();
	// CSS requires being child of ItemView component
	standInItemViewComponentElement.appendChild(
		standInItemViewComponentOuterDividingContainerElement
	);

	// Removing "px" from Strings and converting to Numbers allows for easier use
	const minWidth = stripNonDigits(
		getElementStyle(standInItemViewComponentOuterDividingContainerElement)
			.minWidth
	);

	standInItemViewComponentElement.parentNode.removeChild(
		standInItemViewComponentElement
	);

	return minWidth;
}

/**
 * Get height (size not style) of ItemViewTopBar component
 *
 * @returns {number} Height of ItemViewTopBar component
 */
export function getItemViewTopBarComponentHeight() {
	// Creating stand-in element for ListViewTopBar component using stand-in
	// ...elements allows this function to be called when the real elements
	// ...aren't in the DOM, and ensures real elements remain unaffected.
	const standInItemViewTopBarComponentElement = document.createElement("div");
	standInItemViewTopBarComponentElement.className =
		getItemViewTopBarComponentClassName();
	// Made hidden so user never sees stand-in element or its child elements
	standInItemViewTopBarComponentElement.visibility = "hidden";
	document.body.appendChild(standInItemViewTopBarComponentElement);

	const height = getElementSize(standInItemViewTopBarComponentElement).height;

	standInItemViewTopBarComponentElement.parentNode.removeChild(
		standInItemViewTopBarComponentElement
	);

	return height;
}

/**
 * Get width (size not style) of ItemViewListSidebar component's 'list-sidebar-container list-sidebar-container--expanded'
 * (className with modifier) element
 *
 *
 * @returns {number} Width of ItemViewListSidebar component's 'list-sidebar-container list-sidebar-container--expanded'
 * element
 */
export function getItemViewListSidebarComponentContainerElementWithExpandedModifierWidth() {
	// Creating stand-in element for ItemViewListSidebar component to later
	// ...append other stand-in elements to so CSS can work properly. using
	// ...stand-in elements allows this function to be called when the real
	// ...elements aren't in the DOM, and ensures real elements remain unaffected.
	const standInItemViewListSidebarComponentElement =
		document.createElement("div");
	standInItemViewListSidebarComponentElement.className =
		getItemViewListSidebarComponentClassName();
	// Made hidden so user never sees stand-in element or its child elements
	standInItemViewListSidebarComponentElement.visibility = "hidden";
	document.body.appendChild(standInItemViewListSidebarComponentElement);

	const standInItemViewListSidebarComponentContainerElementWithExpandedModifier =
		document.createElement("div");
	standInItemViewListSidebarComponentContainerElementWithExpandedModifier.className =
		getItemViewListSidebarComponentContainerElementWithExpandedModifierClassName();
	// CSS requires being child of ItemView component
	standInItemViewListSidebarComponentElement.appendChild(
		standInItemViewListSidebarComponentContainerElementWithExpandedModifier
	);

	const width = getElementSize(
		standInItemViewListSidebarComponentContainerElementWithExpandedModifier
	).width;

	standInItemViewListSidebarComponentElement.parentNode.removeChild(
		standInItemViewListSidebarComponentElement
	);

	return width;
}

/**
 * Manages the size of two 'item-box' (className) elements inside a 'pair-container'
 * (className) element. If there is enough space, has both 'item-box' elements
 * fit side by side, otherwise has the first sit on top of the second.
 *
 * @param {Element} pairContainerElement - 'pair-container' element that contains
 * two 'item-box' (className) elements
 * @param {number} outerDivingContainerMinWidth - minWidth for
 * 'outer-dividing-container' element that contains item-box elements (i.e.
 * 'itemViewComponentOuterDividingContainerElementMinWidth' property in
 * 'constants' property's Object of 'SIZE_CONTAINER' of the redux state)
 *
 * @example
 * manageSizeOfItemBoxsElementInPairContainerElement(
 * 	document.getElementsByClassName(
 * 		"js-description-info-pair-container"
 * 	)[0],
 * 	560,
 * );
 */
export function manageSizeOfItemBoxsElementInPairContainerElement(
	pairContainerElement,
	outerDivingContainerMinWidth
) {
	// Grabbing childNodes keeps from having to pass them as parameters
	const childNodes = pairContainerElement.childNodes;
	// item-box width determined by parent element ('outer-dividing-container')
	const firstOuterDividingContianerElement = childNodes[0];
	const secondOuterDividingContianerElement = childNodes[1];

	const myObserver = new ResizeObserver(() => {
		// Whether or not both item-box elements can fit next to one another
		const shouldHaveClassName =
			getElementSize(pairContainerElement).width >
			outerDivingContainerMinWidth * 2;

		toggleClassName(
			shouldHaveClassName,
			firstOuterDividingContianerElement,
			"outer-dividing-container--half-width"
		);
		toggleClassName(
			shouldHaveClassName,
			secondOuterDividingContianerElement,
			"outer-dividing-container--half-width"
		);
	});

	myObserver.observe(pairContainerElement);
}
