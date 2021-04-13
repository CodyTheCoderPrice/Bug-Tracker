import { stripNonDigits, toggleClassName } from "../utils";

/**
 * Get an object containing properties for the window's height and width
 *
 * @returns {Object} Object containing properties for the window's height and
 * width
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
 * Get an object containing properties for the passed element's height and
 * width
 *
 * @param {Element} element - Element to get height and width for
 * @returns {Object} Object containing properties for the passed element's height and
 * width
 */
export function getElementSize(element) {
	return { height: element.offsetHeight, width: element.offsetWidth };
}

/**
 * Get an object containing properties for the passed element's location (top,
 * bottom, right, left)
 *
 * @param {Element} element - Element to get location for
 * @returns {Object} Object containing properties for the passed element's
 * location
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
 * Get an object containing properties for the passed element's styles
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
 * @returns {Number} Width of the scroll bar
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
 * Get the base font size of NavbarBreadcrumb breadcrumb-text element (what's
 * set in breadcrumb.scss file)
 *
 * @returns {Number} Base fonst size of NavbarBreadcrumb breadcrumb-text
 * element
 */
export function getBreadcrumbBaseFontSize() {
	// Creating temporary stand-in breadcrumb-container element to later append 
	// ...temporary breadcrumb-text elements to for CSS. Using stand-in element
	// ...ensures real element remains unaffected and function can be called
	// ...without needing real element in the DOM. Made invisible so user
	// ...never sees stand-in element or its child elements.
	const invisibleTempBreadcrumbContainerElement = document.createElement("div");
	invisibleTempBreadcrumbContainerElement.className =
		"js-get-breadcrumb-container";
	invisibleTempBreadcrumbContainerElement.visibility = "hidden";
	document.body.appendChild(invisibleTempBreadcrumbContainerElement);

	// Temporary breadcrumb-text element used to get base font size
	const tempBreadcrumbTextElement = document.createElement("div");
	tempBreadcrumbTextElement.className = "js-get-breadcrumb-text";
	// Css requires being child of a breadcrumb-continer element
	invisibleTempBreadcrumbContainerElement.appendChild(
		tempBreadcrumbTextElement
	);

	// Removes "px" from string and converts to a number
	const baseFontSize = stripNonDigits(
		getElementStyle(tempBreadcrumbTextElement).fontSize
	);

	// Removing stand-in element from DOM by removing from it's own parentNode
	// ...(also removes all stand-in element's child elements)
	invisibleTempBreadcrumbContainerElement.parentNode.removeChild(
		invisibleTempBreadcrumbContainerElement
	);

	return baseFontSize;
}

/**
 * Get width of NavbarBreadcrumb breadcrumb-button-arrow element
 *
 * @returns {Number} Width of NavbarBreadcrumb breadcrumb-button-arrow element
 */
export function getBreadcrumbButtonArrowWidth() {
	// Creating temporary stand-in breadcrumb-container element to later append 
	// ...temporary breadcrumb-button-arrow elements to for CSS. Using stand-in
	// ...element ensures real element remains unaffected and function can be
	// ...called without needing real element in the DOM. Made invisible so
	// ...user never sees stand-in element or its child elements.
	const invisibleTempBreadcrumbContainerElement = document.createElement("div");
	invisibleTempBreadcrumbContainerElement.className =
		"js-get-breadcrumb-container";
	invisibleTempBreadcrumbContainerElement.visibility = "hidden";
	document.body.appendChild(invisibleTempBreadcrumbContainerElement);

	// Temporary breadcrumb-button-arrow element used to get width
	const tempBreadcrumbButtonArrowElement = document.createElement("div");
	tempBreadcrumbButtonArrowElement.className = "js-get-breadcrumb-button-arrow";
	// Css requires being child of a breadcrumb-continer element
	invisibleTempBreadcrumbContainerElement.appendChild(
		tempBreadcrumbButtonArrowElement
	);

	const arrowWidth = getElementSize(tempBreadcrumbButtonArrowElement).width;

	// Removing stand-in element from DOM by removing from it's own parentNode
	// ...(also removes all stand-in element's child elements)
	invisibleTempBreadcrumbContainerElement.parentNode.removeChild(
		invisibleTempBreadcrumbContainerElement
	);

	return arrowWidth;
}

/**
 * Get critical styles (left positions and base font size) from NavbarHamburger 
 * hamburger-button-container and hamburger-title elements
 *
 * @returns {Number} Critical styles (left positions and base font size) from
 * NavbarHamburger hamburger-button-container and hamburger-title elements
 */
export function getCriticalHamburgerStyles() {
	// Creating temporary stand-in hamburger-container element to later append 
	// ...temporary hamburger-button-container and hamburger-title elements to
	// ...for CSS. Using stand-in element ensures real element remains
	// ...unaffected and function can be called without needing real element in
	// ...the DOM. Made invisible so user never sees stand-in element or its
	// ...child elements.
	const invisibleTempHamburgerContainerElement = document.createElement("div");
	invisibleTempHamburgerContainerElement.className = "js-get-hamburger-container";
	invisibleTempHamburgerContainerElement.visibility = "hidden";
	document.body.appendChild(invisibleTempHamburgerContainerElement);

	// Temporary hamburger-button-container element used to get left position
	const tempHamburgerButtonContainerElement = document.createElement("div");
	tempHamburgerButtonContainerElement.className = "js-get-hamburger-button-container";
	// Css requires being child of a hamburger-container element
	invisibleTempHamburgerContainerElement.appendChild(tempHamburgerButtonContainerElement);
	const hamburgerButtonElementStyles = getElementStyle(tempHamburgerButtonContainerElement);

	// Temporary hamburger-title element used to get left position and base 
	// ...font size
	const tempHamburgerTitleElement = document.createElement("div");
	tempHamburgerTitleElement.className = "js-get-hamburger-title";
	// Css requires being child of a hamburger-container element
	invisibleTempHamburgerContainerElement.appendChild(
		tempHamburgerTitleElement
	);
	const hamburgerTitleElementStyles = getElementStyle(
		tempHamburgerTitleElement
	);

	const stylejson = {
		buttonLeft: stripNonDigits(hamburgerButtonElementStyles.left),
		titleLeft: stripNonDigits(hamburgerTitleElementStyles.left),
		titleBaseFontSize: stripNonDigits(hamburgerTitleElementStyles.fontSize),
	};

	// Removing stand-in element from DOM by removing from it's own parentNode
	// ...(also removes all stand-in element's child elements)
	invisibleTempHamburgerContainerElement.parentNode.removeChild(
		invisibleTempHamburgerContainerElement
	);

	return stylejson;
}

/**
 * Get height of ListViewTopBar list-view-top-bar element
 *
 * @returns {Number} Height of ListViewTopBar list-view-top-bar element
 */
export function getListViewTopBarHeight() {
	// Creating temporary stand-in list-view-top-bar element used to get height.
	// ...Using stand-in element allows function can be called without needing
	// ...real element in the DOM. Made invisible so user never sees stand-in
	// ...element or its child elements.
	const invisibleTopBarElement = document.createElement("div");
	invisibleTopBarElement.className = "js-get-list-view-top-bar";
	invisibleTopBarElement.visibility = "hidden";
	document.body.appendChild(invisibleTopBarElement);

	const height = getElementSize(invisibleTopBarElement).height;

	// Removing stand-in element from DOM by removing from it's own parentNode
	invisibleTopBarElement.parentNode.removeChild(invisibleTopBarElement);

	return height;
}

/**
 * Get height (size, not style) of ListViewTable list-table__row element
 *
 * @returns {Number} Height of ListViewTable list-table__row element
 */
export function getListViewTableRowHeight() {
	// Creating temporary stand-in list-table-component element to later append 
	// ...temporary list-table__row element to for CSS. Using stand-in element
	// ...ensures real element remains unaffected and function can be called 
	// ...without needing real element in the DOM. Made invisible so user never
	// ...sees stand-in element or its child elements.
	const invisibleTempListViewComponentElement = document.createElement("div");
	invisibleTempListViewComponentElement.className = "js-get-list-table-component";
	invisibleTempListViewComponentElement.visibility = "hidden";
	document.body.appendChild(invisibleTempListViewComponentElement);

	// Temporary list-table__row element used to get height.
	const tempListTableRowElement = document.createElement("tr");
	tempListTableRowElement.className = "js-get-list-table__row";
	// Css requires being child of a list-table-component element
	invisibleTempListViewComponentElement.appendChild(tempListTableRowElement);

	const height = getElementSize(tempListTableRowElement).height;

	// Removing stand-in element from DOM by removing from it's own parentNode
	invisibleTempListViewComponentElement.parentNode.removeChild(
		invisibleTempListViewComponentElement
	);

	return height;
}

export function getItemViewTopBarHeight() {
	const invisibleTopBarElement = document.createElement("div");
	invisibleTopBarElement.className = "js-get-item-vew-top-bar-component";
	invisibleTopBarElement.visibility = "hidden";
	document.body.appendChild(invisibleTopBarElement);

	const height = getElementSize(invisibleTopBarElement).height;
	invisibleTopBarElement.parentNode.removeChild(invisibleTopBarElement);

	return height;
}

export function getItemViewListSidebarWidth() {
	const invisibleListSidebarElement = document.createElement("div");
	invisibleListSidebarElement.className = "js-get-list-sidebar-component";
	invisibleListSidebarElement.visibility = "hidden";
	document.body.appendChild(invisibleListSidebarElement);

	const width = getElementSize(invisibleListSidebarElement).width;
	invisibleListSidebarElement.parentNode.removeChild(
		invisibleListSidebarElement
	);

	return width;
}

export function getItemViewOuterDividingContainerMinWidth() {
	const invisibleItemViewComponentElement = document.createElement("div");
	invisibleItemViewComponentElement.className = "js-get-item-view-component";
	invisibleItemViewComponentElement.visibility = "hidden";
	document.body.appendChild(invisibleItemViewComponentElement);

	const invisibleOuterDividingContainerElement = document.createElement("div");
	invisibleOuterDividingContainerElement.className =
		"js-get-outer-dividing-container";
	invisibleOuterDividingContainerElement.visibility = "hidden";
	invisibleItemViewComponentElement.appendChild(
		invisibleOuterDividingContainerElement
	);

	const minWidth = stripNonDigits(
		getElementStyle(invisibleOuterDividingContainerElement).minWidth
	);
	invisibleItemViewComponentElement.parentNode.removeChild(
		invisibleItemViewComponentElement
	);

	return minWidth;
}

export function getItemViewPaddingContainerPadding() {
	const invisibleItemViewComponentElement = document.createElement("div");
	invisibleItemViewComponentElement.className = "js-get-item-view-component";
	invisibleItemViewComponentElement.visibility = "hidden";
	document.body.appendChild(invisibleItemViewComponentElement);

	const invisiblePaddingContainerElement = document.createElement("div");
	invisiblePaddingContainerElement.className = "js-get-padding-container";
	invisiblePaddingContainerElement.visibility = "hidden";
	invisibleItemViewComponentElement.appendChild(
		invisiblePaddingContainerElement
	);

	const padding = stripNonDigits(
		getElementStyle(invisiblePaddingContainerElement).paddingLeft
	);
	invisibleItemViewComponentElement.parentNode.removeChild(
		invisibleItemViewComponentElement
	);

	return padding;
}

export function manageSizeOfItemBoxsInPairContainer(
	pairElement,
	toggledClassNameForWidth,
	outerDivingContainerMinWidth
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

		toggleClassName(
			shouldHaveClassName,
			firstOuterDividingContianerElement,
			toggledClassNameForWidth
		);
		toggleClassName(
			shouldHaveClassName,
			secondOuterDividingContianerElement,
			toggledClassNameForWidth
		);
	});

	myObserver.observe(pairElement);
}
