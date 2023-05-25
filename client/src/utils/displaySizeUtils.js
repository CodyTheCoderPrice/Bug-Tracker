import {
	stripNonDigits,
	getAuthenticationComponentClassName,
	getAuthenticationComponentModalElementWithExpandedModifierClassName,
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
	// Made hidden so user never sees this element or its children
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
 * Get width (size not style) of Authentication component's
 * 'modal modal--expanded' (className) element
 *
 * @returns {number} Width of Authentication component's
 * 'modal modal--expanded' element
 */
export function getAuthenticationComponentModalElementWithExpandedModifierWidth() {
	// Creating "mimic" element for Authentication component to later append
	// ...child "mimic" elements to so CSS can work properly. Creating "mimic"
	// ...elements allows this function to be called regardless of real elements
	// ...being in the DOM. This also ensures the real elements are unaffected.
	const mimicAuthenticationComponentElement = document.createElement("div");
	mimicAuthenticationComponentElement.className =
		getAuthenticationComponentClassName();
	// Made hidden so user never sees stand-in element or its child elements
	mimicAuthenticationComponentElement.visibility = "hidden";
	document.body.appendChild(mimicAuthenticationComponentElement);

	const mimicModalElementWithExpandedModifier =
		document.createElement("div");
	mimicModalElementWithExpandedModifier.className =
		getAuthenticationComponentModalElementWithExpandedModifierClassName();
	// CSS requires being child of ListViewTable component
	mimicAuthenticationComponentElement.appendChild(
		mimicModalElementWithExpandedModifier
	);

	const width = getElementSize(
		mimicModalElementWithExpandedModifier
	).width;

	mimicAuthenticationComponentElement.parentNode.removeChild(
		mimicAuthenticationComponentElement
	);

	return width;
}

/**
 * Get critical sizes and styles from NavPanelButtonList component's
 * 'overflow-container' (className) element
 *
 * @returns {number} Critical sizes and styles from NavPanelButtonList
 * component's 'overflow-container' (className) element
 */
export function getNavPanelButtonListSizesAndStyles() {
	// Creating "mimic" element for NavPanelButtonList component to later append
	// ...child "mimic" elements to so CSS can work properly. Creating "mimic"
	// ...elements allows this function to be called regardless of real elements
	// ...being in the DOM. This also ensures the real elements are unaffected.
	const mimicNavPanelButtonListComponentElement =
		document.createElement("div");
	mimicNavPanelButtonListComponentElement.className =
		getNavPanelButtonListComponentClassName();
	// Made hidden so user never sees stand-in element or its child elements
	mimicNavPanelButtonListComponentElement.visibility = "hidden";
	document.body.appendChild(mimicNavPanelButtonListComponentElement);

	const mimicSubOverflowContainerElementForBugs =
		document.createElement("div");
	mimicSubOverflowContainerElementForBugs.className =
		getNavPanelButtonListComponentSubOverflowContainerElementForBugsModifierClassName();
	// Css requires being child of NavPanelButtonList component
	mimicNavPanelButtonListComponentElement.appendChild(
		mimicSubOverflowContainerElementForBugs
	);
	const mimicSubOverflowContainerElementForBugsStyles = getElementStyle(
		mimicSubOverflowContainerElementForBugs
	);

	const mimicSubOverflowContainerElementWithScrollbar =
		document.createElement("div");
	mimicSubOverflowContainerElementWithScrollbar.className =
		getNavPanelButtonListComponentSubOverflowContainerElementWithScrollbarModifierClassName();
	// Css requires being child of NavPanelButtonList component
	mimicNavPanelButtonListComponentElement.appendChild(
		mimicSubOverflowContainerElementWithScrollbar
	);
	const mimicSubOverflowContainerElementWithScrollbarStyles = getElementStyle(
		mimicSubOverflowContainerElementWithScrollbar
	);

	const mimicSubOverflowContainerElementWithScrollbarForBugs =
		document.createElement("div");
	mimicSubOverflowContainerElementWithScrollbarForBugs.className =
		getNavPanelButtonListComponentSubOverflowContainerElementWithScrollbarForBugsModifierClassName();
	// Css requires being child of NavPanelButtonList component
	mimicNavPanelButtonListComponentElement.appendChild(
		mimicSubOverflowContainerElementWithScrollbarForBugs
	);
	const mimicSubOverflowContainerElementWithScrollbarForBugsStyles =
		getElementStyle(mimicSubOverflowContainerElementWithScrollbarForBugs);

	const mimicListButtonElementWithTopAndBottomSpacing =
		document.createElement("div");
	mimicListButtonElementWithTopAndBottomSpacing.className =
		getNavPanelButtonListComponentListButtonElementWithTopSpacingModifierClassName();
	// Css requires being child of NavPanelButtonList component
	mimicNavPanelButtonListComponentElement.appendChild(
		mimicListButtonElementWithTopAndBottomSpacing
	);
	const mimicListButtonElementWithTopAndBottomSpacingStyles = getElementStyle(
		mimicListButtonElementWithTopAndBottomSpacing
	);

	const sizesAndStyles = {
		// Removing "px" from Strings and converting to Numbers allows for easier use
		subOverflowContainerForBugsMarginBottom: stripNonDigits(
			mimicSubOverflowContainerElementForBugsStyles.marginBottom
		),
		subOverflowContainerWithScrollbarMarginTop: stripNonDigits(
			mimicSubOverflowContainerElementWithScrollbarStyles.marginTop
		),
		subOverflowContainerWithScrollbarMarginBottom: stripNonDigits(
			mimicSubOverflowContainerElementWithScrollbarStyles.marginBottom
		),
		subOverflowContainerWithScrollbarPaddingTop: stripNonDigits(
			mimicSubOverflowContainerElementWithScrollbarStyles.paddingTop
		),
		subOverflowContainerWithScrollbarPaddingBottom: stripNonDigits(
			mimicSubOverflowContainerElementWithScrollbarStyles.paddingBottom
		),
		subOverflowContainerWithScrollbarForBugsMarginBottom: stripNonDigits(
			mimicSubOverflowContainerElementWithScrollbarForBugsStyles.marginBottom
		),
		subOverflowContainerWithScrollbarForBugsPaddingBottom: stripNonDigits(
			mimicSubOverflowContainerElementWithScrollbarForBugsStyles.paddingBottom
		),
		listButtonHeight: getElementSize(
			mimicListButtonElementWithTopAndBottomSpacing
		).height,
		listButtonWithTopSpacingMarginTop: stripNonDigits(
			mimicListButtonElementWithTopAndBottomSpacingStyles.marginTop
		),
	};

	mimicNavPanelButtonListComponentElement.parentNode.removeChild(
		mimicNavPanelButtonListComponentElement
	);

	return sizesAndStyles;
}

/**
 * Get height (size not style) of ListViewTopBar component
 *
 * @returns {number} Height of of ListViewTopBar component
 */
export function getListViewTopBarComponentHeight() {
	// Creating "mimic" element for ListViewTopBar component. Creating "mimic"
	// ...elements allows this function to be called regardless of real elements
	// ...being in the DOM. This also ensures the real elements are unaffected.
	const mimicListViewTopBarComponentElement = document.createElement("div");
	mimicListViewTopBarComponentElement.className =
		getListViewTopBarComponentClassName();
	// Made hidden so user never sees stand-in element or its child elements
	mimicListViewTopBarComponentElement.visibility = "hidden";
	document.body.appendChild(mimicListViewTopBarComponentElement);

	const height = getElementSize(mimicListViewTopBarComponentElement).height;

	mimicListViewTopBarComponentElement.parentNode.removeChild(
		mimicListViewTopBarComponentElement
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
	// Creating "mimic" element for ListViewTable component to later append
	// ...child "mimic" elements to so CSS can work properly. Creating "mimic"
	// ...elements allows this function to be called regardless of real elements
	// ...being in the DOM. This also ensures the real elements are unaffected.
	const mimicListViewTableComponentElement = document.createElement("div");
	mimicListViewTableComponentElement.className =
		getListViewTableComponentClassName();
	// Made hidden so user never sees stand-in element or its child elements
	mimicListViewTableComponentElement.visibility = "hidden";
	document.body.appendChild(mimicListViewTableComponentElement);

	const mimicListViewTableRowElement = document.createElement("tr");
	mimicListViewTableRowElement.className =
		getListViewTableComponentRowElementClassName();
	// CSS requires being child of ListViewTable component
	mimicListViewTableComponentElement.appendChild(
		mimicListViewTableRowElement
	);

	const height = getElementSize(mimicListViewTableRowElement).height;

	mimicListViewTableComponentElement.parentNode.removeChild(
		mimicListViewTableComponentElement
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
	// Creating "mimic" element for ItemView component to later append
	// ...child "mimic" elements to so CSS can work properly. Creating "mimic"
	// ...elements allows this function to be called regardless of real elements
	// ...being in the DOM. This also ensures the real elements are unaffected.
	const mimicItemViewComponentElement = document.createElement("div");
	mimicItemViewComponentElement.className = getItemViewComponentClassName();
	// Made hidden so user never sees stand-in element or its child elements
	mimicItemViewComponentElement.visibility = "hidden";
	document.body.appendChild(mimicItemViewComponentElement);

	const mimicItemViewComponentPaddingContainerElement =
		document.createElement("div");
	mimicItemViewComponentPaddingContainerElement.className =
		getItemViewComponentPaddingcontainerElementClassName();
	// CSS requires being child of ItemView component
	mimicItemViewComponentElement.appendChild(
		mimicItemViewComponentPaddingContainerElement
	);

	// Removing "px" from Strings and converting to Numbers allows for easier use
	const leftPadding = stripNonDigits(
		// Should be same as right padding
		getElementStyle(mimicItemViewComponentPaddingContainerElement).paddingLeft
	);

	mimicItemViewComponentElement.parentNode.removeChild(
		mimicItemViewComponentElement
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
	// Creating "mimic" element for ItemView component to later append
	// ...child "mimic" elements to so CSS can work properly. Creating "mimic"
	// ...elements allows this function to be called regardless of real elements
	// ...being in the DOM. This also ensures the real elements are unaffected.
	const mimicItemViewComponentElement = document.createElement("div");
	mimicItemViewComponentElement.className = getItemViewComponentClassName();
	// Made hidden so user never sees stand-in element or its child elements
	mimicItemViewComponentElement.visibility = "hidden";
	document.body.appendChild(mimicItemViewComponentElement);

	const mimicItemViewComponentOuterDividingContainerElement =
		document.createElement("div");
	mimicItemViewComponentOuterDividingContainerElement.className =
		getItemViewComponentOuterDividingContainerElementClassName();
	// CSS requires being child of ItemView component
	mimicItemViewComponentElement.appendChild(
		mimicItemViewComponentOuterDividingContainerElement
	);

	// Removing "px" from Strings and converting to Numbers allows for easier use
	const minWidth = stripNonDigits(
		getElementStyle(mimicItemViewComponentOuterDividingContainerElement)
			.minWidth
	);

	mimicItemViewComponentElement.parentNode.removeChild(
		mimicItemViewComponentElement
	);

	return minWidth;
}

/**
 * Get height (size not style) of ItemViewTopBar component
 *
 * @returns {number} Height of ItemViewTopBar component
 */
export function getItemViewTopBarComponentHeight() {
	// Creating "mimic" element for ItemViewTopBar component. Creating "mimic"
	// ...elements allows this function to be called regardless of real elements
	// ...being in the DOM. This also ensures the real elements are unaffected.
	const mimicItemViewTopBarComponentElement = document.createElement("div");
	mimicItemViewTopBarComponentElement.className =
		getItemViewTopBarComponentClassName();
	// Made hidden so user never sees stand-in element or its child elements
	mimicItemViewTopBarComponentElement.visibility = "hidden";
	document.body.appendChild(mimicItemViewTopBarComponentElement);

	const height = getElementSize(mimicItemViewTopBarComponentElement).height;

	mimicItemViewTopBarComponentElement.parentNode.removeChild(
		mimicItemViewTopBarComponentElement
	);

	return height;
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
