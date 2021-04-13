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
 * Get the base font size (what's set in css file) of NavbarBreadcrumb
 * breadcrumb-text element
 * 
 * @returns {Number} Base fonst size of NavbarBreadcrumb breadcrumb-text
 * element
 */
export function getBreadcrumbBaseFontSize() {
	// Creating temporary second NavbarBreadcrumb element to later append 
	// ...temporary breadcrumb-text element to so their css can work. Using 
	// ...seperate NavbarBreadcrumb element ensures real NavbarBreadcrumb
	// ...element remains unaffected. Made invisible so user never sees it
	// ...or the elements appended to it.
	const invisibleBreadcrumbContainerElement = document.createElement("div");
	invisibleBreadcrumbContainerElement.className =
		"js-get-breadcrumb-container";
	invisibleBreadcrumbContainerElement.visibility = "hidden";
	document.body.appendChild(invisibleBreadcrumbContainerElement);

	// Temporary breadcrumb-text element used for getting base font size
	const tempBreadcrumbTextElement = document.createElement("div");
	tempBreadcrumbTextElement.className = "js-get-breadcrumb-text";
	// Css requires being child of a breadcrumb-continer element
	invisibleBreadcrumbContainerElement.appendChild(
		tempBreadcrumbTextElement
	);

	// Removes "px" from string and converts to a number
	const baseFontSize = stripNonDigits(
		getElementStyle(tempBreadcrumbTextElement).fontSize
	);

	// Parent node is the body, so removing from own parentNode, removes from
	// ...the body, along with childNodes (tempBreadcrumbTextElement) 
	invisibleBreadcrumbContainerElement.parentNode.removeChild(
		invisibleBreadcrumbContainerElement
	);

	return baseFontSize;
}

export function getBreadcrumbButtonArrowWidth() {
	const invisibleBreadcrumbContainerElement = document.createElement("div");
	invisibleBreadcrumbContainerElement.className =
		"js-get-breadcrumb-container";
	invisibleBreadcrumbContainerElement.visibility = "hidden";
	document.body.appendChild(invisibleBreadcrumbContainerElement);

	const invisibleBreadcrumbButtonArrowElement = document.createElement("div");
	invisibleBreadcrumbButtonArrowElement.className =
		"js-get-breadcrumb-button-arrow";
	invisibleBreadcrumbButtonArrowElement.visibility = "hidden";
	invisibleBreadcrumbContainerElement.appendChild(
		invisibleBreadcrumbButtonArrowElement
	);

	const arrowWidth = getElementSize(invisibleBreadcrumbButtonArrowElement)
		.width;

	invisibleBreadcrumbContainerElement.parentNode.removeChild(
		invisibleBreadcrumbContainerElement
	);

	return arrowWidth;
}

export function getHamburgerStyles() {
	const invisibleHamburgerContainerElement = document.createElement("div");
	invisibleHamburgerContainerElement.className = "js-get-hamburger-container";
	invisibleHamburgerContainerElement.visibility = "hidden";
	document.body.appendChild(invisibleHamburgerContainerElement);

	const invisibleHamburgerElement = document.createElement("div");
	invisibleHamburgerElement.className = "js-get-hamburger-button-container";
	invisibleHamburgerElement.visibility = "hidden";
	invisibleHamburgerContainerElement.appendChild(invisibleHamburgerElement);

	const invisibleHamburgerTitleElement = document.createElement("div");
	invisibleHamburgerTitleElement.className = "js-get-hamburger-title";
	invisibleHamburgerTitleElement.visibility = "hidden";
	invisibleHamburgerContainerElement.appendChild(
		invisibleHamburgerTitleElement
	);

	const hamburgerElementStyles = getElementStyle(invisibleHamburgerElement);
	const hamburgerTitleElementStyles = getElementStyle(
		invisibleHamburgerTitleElement
	);

	const stylejson = {
		buttonLeft: stripNonDigits(hamburgerElementStyles.left),
		titleLeft: stripNonDigits(hamburgerTitleElementStyles.left),
		titleBaseFontSize: stripNonDigits(hamburgerTitleElementStyles.fontSize),
	};
	invisibleHamburgerContainerElement.parentNode.removeChild(
		invisibleHamburgerContainerElement
	);

	return stylejson;
}

export function getListViewTopBarHeight() {
	const invisibleTopBarElement = document.createElement("div");
	invisibleTopBarElement.className =
		"js-get-list-view-top-bar";
	invisibleTopBarElement.visibility = "hidden";
	document.body.appendChild(invisibleTopBarElement);

	const height = getElementSize(invisibleTopBarElement).height;
	invisibleTopBarElement.parentNode.removeChild(
		invisibleTopBarElement
	);

	return height;
}

export function getListViewTableRowHeight() {
	const invisibleListViewComponentElement = document.createElement("div");
	invisibleListViewComponentElement.className = "js-get-list-table-component";
	invisibleListViewComponentElement.visibility = "hidden";
	document.body.appendChild(invisibleListViewComponentElement);

	const invisibleListTableElement = document.createElement("div");
	invisibleListTableElement.className = "js-get-list-table";
	invisibleListTableElement.visibility = "hidden";
	invisibleListViewComponentElement.appendChild(invisibleListTableElement);

	const invisibleListTableRowElement = document.createElement("div");
	invisibleListTableRowElement.className = "js-get-list-table__row";
	invisibleListTableRowElement.visibility = "hidden";
	invisibleListTableElement.appendChild(invisibleListTableRowElement);

	const height = getElementSize(invisibleListTableRowElement).height;
	invisibleListViewComponentElement.parentNode.removeChild(
		invisibleListViewComponentElement
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
	invisibleItemViewComponentElement.className =
		"js-get-item-view-component";
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
	invisibleItemViewComponentElement.className =
		"js-get-item-view-component";
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
