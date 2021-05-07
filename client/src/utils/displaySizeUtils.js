import { stripNonDigits, toggleClassName } from "../utils";

/**
 * Get an object containing properties for the window's height and width
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
 * Get an object containing properties for the passed element's height and
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
 * Get an object containing properties for the passed element's location (top,
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
 * Get the base font size of NavbarBreadcrumb breadcrumb-text element (what's
 * set in breadcrumb.scss file)
 *
 * @returns {number} Base fonst size of NavbarBreadcrumb breadcrumb-text
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
 * @returns {number} Width of NavbarBreadcrumb breadcrumb-button-arrow element
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
 * @returns {number} Critical styles (left positions and base font size) from
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
	invisibleTempHamburgerContainerElement.className =
		"js-get-hamburger-container";
	invisibleTempHamburgerContainerElement.visibility = "hidden";
	document.body.appendChild(invisibleTempHamburgerContainerElement);

	// Temporary hamburger-button-container element used to get left position
	const tempHamburgerButtonContainerElement = document.createElement("div");
	tempHamburgerButtonContainerElement.className =
		"js-get-hamburger-button-container";
	// Css requires being child of a hamburger-container element
	invisibleTempHamburgerContainerElement.appendChild(
		tempHamburgerButtonContainerElement
	);
	const hamburgerButtonElementStyles = getElementStyle(
		tempHamburgerButtonContainerElement
	);

	// Temporary hamburger-title element used to get left position and base
	// ...font size
	const tempHamburgerTitleElement = document.createElement("div");
	tempHamburgerTitleElement.className = "js-get-hamburger-title";
	// Css requires being child of a hamburger-container element
	invisibleTempHamburgerContainerElement.appendChild(tempHamburgerTitleElement);
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
 * Get height (size not style) of ListViewTopBar list-view-top-bar-component
 * element
 *
 * @returns {number} Height of ListViewTopBar list-view-top-bar-component
 * element
 */
export function getListViewTopBarHeight() {
	// Creating temporary stand-in list-view-top-bar-component element used to
	// ...get height. Using stand-in element allows function can be called
	// ...without needing real element in the DOM. Made invisible so user never
	// ...sees stand-in element or its child elements.
	const invisibleTempTopBarElement = document.createElement("div");
	invisibleTempTopBarElement.className = "js-get-list-view-top-bar-component";
	invisibleTempTopBarElement.visibility = "hidden";
	document.body.appendChild(invisibleTempTopBarElement);

	const height = getElementSize(invisibleTempTopBarElement).height;

	// Removing stand-in element from DOM by removing from it's own parentNode
	invisibleTempTopBarElement.parentNode.removeChild(invisibleTempTopBarElement);

	return height;
}

/**
 * Get height (size not style) of ListViewTable list-table__row element
 *
 * @returns {number} Height of ListViewTable list-table__row element
 */
export function getListViewTableRowHeight() {
	// Creating temporary stand-in list-table-component element to later append
	// ...temporary list-table__row element to for CSS. Using stand-in element
	// ...ensures real element remains unaffected and function can be called
	// ...without needing real element in the DOM. Made invisible so user never
	// ...sees stand-in element or its child elements.
	const invisibleTempListViewComponentElement = document.createElement("div");
	invisibleTempListViewComponentElement.className =
		"js-get-list-table-component";
	invisibleTempListViewComponentElement.visibility = "hidden";
	document.body.appendChild(invisibleTempListViewComponentElement);

	// Temporary list-table__row element used to get height
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

/**
 * Get height (size not style) of ItemViewTopBar item-view-top-bar-component
 * element
 *
 * @returns {number} Height of ItemViewTopBar item-view-top-bar-component
 * element
 */
export function getItemViewTopBarHeight() {
	// Creating temporary stand-in list-view-top-bar-component element used to
	// ...get height. Using stand-in element allows function can be called
	// ...without needing real element in the DOM. Made invisible so user never
	// ...sees stand-in element or its child elements.
	const invisibleTempTopBarElement = document.createElement("div");
	invisibleTempTopBarElement.className = "js-get-item-vew-top-bar-component";
	invisibleTempTopBarElement.visibility = "hidden";
	document.body.appendChild(invisibleTempTopBarElement);

	const height = getElementSize(invisibleTempTopBarElement).height;

	// Removing stand-in element from DOM by removing from it's own parentNode
	invisibleTempTopBarElement.parentNode.removeChild(invisibleTempTopBarElement);

	return height;
}

/**
 * Get width (size not style) of ItemViewListSidebar list-sidebar-component
 * element
 *
 * @returns {number} Width of ItemViewListSidebar list-sidebar-component
 * element
 */
export function getItemViewListSidebarWidth() {
	// Creating temporary stand-in list-sidebar-component element used to get
	// ...width. Using stand-in element allows function can be called without
	// ...needing real element in the DOM. Made invisible so user never sees
	// ...stand-in element or its child elements.
	const invisibleTempListSidebarElement = document.createElement("div");
	invisibleTempListSidebarElement.className = "js-get-list-sidebar-component";
	invisibleTempListSidebarElement.visibility = "hidden";
	document.body.appendChild(invisibleTempListSidebarElement);

	const width = getElementSize(invisibleTempListSidebarElement).width;

	// Removing stand-in element from DOM by removing from it's own parentNode
	invisibleTempListSidebarElement.parentNode.removeChild(
		invisibleTempListSidebarElement
	);

	return width;
}

/**
 * Get minWidth of ItemView outer-dividing-container
 *
 * @returns {number} Height of ItemView outer-dividing-container
 */
export function getItemViewOuterDividingContainerMinWidth() {
	// Creating temporary stand-in item-view-component element to later append
	// ...temporary outer-dividing-container element to for CSS. Using stand-in
	// ...element ensures real element remains unaffected and function can be
	// ...called without needing real element in the DOM. Made invisible so
	// ...user never sees stand-in element or its child elements.
	const invisibleTempItemViewComponentElement = document.createElement("div");
	invisibleTempItemViewComponentElement.className =
		"js-get-item-view-component";
	invisibleTempItemViewComponentElement.visibility = "hidden";
	document.body.appendChild(invisibleTempItemViewComponentElement);

	// Temporary outer-dividing-container element used to get minWidth
	const tempOuterDividingContainerElement = document.createElement("div");
	tempOuterDividingContainerElement.className =
		"js-get-outer-dividing-container";
	// Css requires being child of a item-view-component element
	invisibleTempItemViewComponentElement.appendChild(
		tempOuterDividingContainerElement
	);

	const minWidth = stripNonDigits(
		getElementStyle(tempOuterDividingContainerElement).minWidth
	);

	// Removing stand-in element from DOM by removing from it's own parentNode
	invisibleTempItemViewComponentElement.parentNode.removeChild(
		invisibleTempItemViewComponentElement
	);

	return minWidth;
}

/**
 * Get padding of ItemView padding-container
 *
 * @returns {number} Height of ItemView padding-container
 */
export function getItemViewPaddingContainerPadding() {
	// Creating temporary stand-in item-view-component element to later append
	// ...temporary padding-container element to for CSS. Using stand-in
	// ...element ensures real element remains unaffected and function can be
	// ...called without needing real element in the DOM. Made invisible so
	// ...user never sees stand-in element or its child elements.
	const invisibleTempItemViewComponentElement = document.createElement("div");
	invisibleTempItemViewComponentElement.className =
		"js-get-item-view-component";
	invisibleTempItemViewComponentElement.visibility = "hidden";
	document.body.appendChild(invisibleTempItemViewComponentElement);

	// Temporary padding-container element used to get padding
	const tempPaddingContainerElement = document.createElement("div");
	tempPaddingContainerElement.className = "js-get-padding-container";
	// Css requires being child of a item-view-component element
	invisibleTempItemViewComponentElement.appendChild(
		tempPaddingContainerElement
	);

	const padding = stripNonDigits(
		getElementStyle(tempPaddingContainerElement).paddingLeft
	);

	// Removing stand-in element from DOM by removing from it's own parentNode
	invisibleTempItemViewComponentElement.parentNode.removeChild(
		invisibleTempItemViewComponentElement
	);

	return padding;
}

/**
 * Manages the size of two item-box elements inside a pair-container element.
 * If there is enough space, then fitting them next to one another, otherwise
 * the first on top of the second.
 *
 * @param {Element} pairContainerElement - pair-container element that contains
 * two item-box elements
 * @param {number} outerDivingContainerMinWidth - minWidth for
 * outer-dividing-container elements that contains item-box elements (pair-contain ->
 * outer-dividing-container -> item-box)
 * @param {string} toggledClassNameForOuterDividingContainerHalfWidth -
 * className that gives an outer-dividing-container element half width
 * 
 * @example
 * manageSizeOfItemBoxsInPairContainer(
 * 	document.getElementsByClassName(
 * 		"js-description-info-pair-container"
 * 	)[0],
 * 	560,
 * 	"outer-dividing-container--half-width"
 * );
 */
export function manageSizeOfItemBoxsInPairContainer(
	pairContainerElement,
	outerDivingContainerMinWidth,
	toggledClassNameForOuterDividingContainerHalfWidth
) {
	// Grabbing childNodes keeps from having to pass them as parameters
	const childNodes = pairContainerElement.childNodes;
	// item-box width determined by parent element (outer-dividing-container)
	const firstOuterDividingContianerElement = childNodes[0];
	const secondOuterDividingContianerElement = childNodes[1];

	const myObserver = new ResizeObserver(() => {
		// Whether or not both item-box elements can fit next to one another
		const shouldHaveClassName =
			getElementSize(pairContainerElement).width >
			outerDivingContainerMinWidth * 2;

		// If shouldHaveClassName is true, then cuts item-box widths in half
		// ...allowing them to fit next to one another. Otherwise they are kept
		// ...full width which places the first on top of the second.
		toggleClassName(
			shouldHaveClassName,
			firstOuterDividingContianerElement,
			toggledClassNameForOuterDividingContainerHalfWidth
		);
		toggleClassName(
			shouldHaveClassName,
			secondOuterDividingContianerElement,
			toggledClassNameForOuterDividingContainerHalfWidth
		);
	});

	// When pairContainerElement changes size, myObserver code above is run
	myObserver.observe(pairContainerElement);
}
