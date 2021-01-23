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

export function getElementSize(element) {
	return { height: element.offsetHeight, width: element.offsetWidth };
}

export function getElementLocation(element) {
	const rect = element.getBoundingClientRect();
	return {
		top: rect.top,
		right: rect.right,
		bottom: rect.bottom,
		left: rect.left,
	};
}

export function getElementStyle(element) {
	return element.currentStyle || window.getComputedStyle(element);
}

export function stripNonDigits(stringValue) {
	return Number(stringValue.replace(/[^\d.-]/g, ""));
}

export function calcScrollbarWidth() {
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

export function calcBreadcrumbBaseFontSize() {
	const invisibleBreadcrumbContainerElement = document.createElement("div");
	invisibleBreadcrumbContainerElement.className =
		"js-calc-breadcrumb-container";
	invisibleBreadcrumbContainerElement.visibility = "hidden";
	document.body.appendChild(invisibleBreadcrumbContainerElement);

	const invisibleBreadcrumbTextElement = document.createElement("div");
	invisibleBreadcrumbTextElement.className = "js-calc-breadcrumb-text";
	invisibleBreadcrumbTextElement.visibility = "hidden";
	invisibleBreadcrumbContainerElement.appendChild(
		invisibleBreadcrumbTextElement
	);

	const baseFontSize = stripNonDigits(
		getElementStyle(invisibleBreadcrumbTextElement).fontSize
	);
	invisibleBreadcrumbContainerElement.parentNode.removeChild(
		invisibleBreadcrumbContainerElement
	);

	return baseFontSize;
}

export function calcBreadcrumbButtonArrowWidth() {
	const invisibleBreadcrumbContainerElement = document.createElement("div");
	invisibleBreadcrumbContainerElement.className =
		"js-calc-breadcrumb-container";
	invisibleBreadcrumbContainerElement.visibility = "hidden";
	document.body.appendChild(invisibleBreadcrumbContainerElement);

	const invisibleBreadcrumbButtonArrowElement = document.createElement("div");
	invisibleBreadcrumbButtonArrowElement.className =
		"js-calc-breadcrumb-button-arrow";
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

export function calcHamburgerStyles() {
	const invisibleHamburgerContainerElement = document.createElement("div");
	invisibleHamburgerContainerElement.className = "js-calc-hamburger-container";
	invisibleHamburgerContainerElement.visibility = "hidden";
	document.body.appendChild(invisibleHamburgerContainerElement);

	const invisibleHamburgerElement = document.createElement("div");
	invisibleHamburgerElement.className = "js-calc-hamburger-button-container";
	invisibleHamburgerElement.visibility = "hidden";
	invisibleHamburgerContainerElement.appendChild(invisibleHamburgerElement);

	const invisibleHamburgerTitleElement = document.createElement("div");
	invisibleHamburgerTitleElement.className = "js-calc-hamburger-title";
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

export function calcListViewSearchFilterSortBarHeight() {
	const invisibleSearchFilterSortBarElement = document.createElement("div");
	invisibleSearchFilterSortBarElement.className =
		"js-calc-search-filter-sort-component";
	invisibleSearchFilterSortBarElement.visibility = "hidden";
	document.body.appendChild(invisibleSearchFilterSortBarElement);

	const height = getElementSize(invisibleSearchFilterSortBarElement).height;
	invisibleSearchFilterSortBarElement.parentNode.removeChild(
		invisibleSearchFilterSortBarElement
	);

	return height;
}

export function calcListViewTableRowHeight() {
	const invisibleListViewComponentElement = document.createElement("div");
	invisibleListViewComponentElement.className = "js-calc-list-table-component";
	invisibleListViewComponentElement.visibility = "hidden";
	document.body.appendChild(invisibleListViewComponentElement);

	const invisibleListTableElement = document.createElement("div");
	invisibleListTableElement.className = "js-calc-list-table";
	invisibleListTableElement.visibility = "hidden";
	invisibleListViewComponentElement.appendChild(invisibleListTableElement);

	const invisibleListTableRowElement = document.createElement("div");
	invisibleListTableRowElement.className = "js-calc-list-table__row";
	invisibleListTableRowElement.visibility = "hidden";
	invisibleListTableElement.appendChild(invisibleListTableRowElement);

	const height = getElementSize(invisibleListTableRowElement).height;
	invisibleListViewComponentElement.parentNode.removeChild(
		invisibleListViewComponentElement
	);

	return height;
}

export function calcViewItemTopBarHeight() {
	const invisibleTopBarElement = document.createElement("div");
	invisibleTopBarElement.className = "js-calc-top-bar-component";
	invisibleTopBarElement.visibility = "hidden";
	document.body.appendChild(invisibleTopBarElement);

	const height = getElementSize(invisibleTopBarElement).height;
	invisibleTopBarElement.parentNode.removeChild(invisibleTopBarElement);

	return height;
}

export function calcItemViewListSidebarWidth() {
	const invisibleListSidebarElement = document.createElement("div");
	invisibleListSidebarElement.className = "js-calc-list-sidebar-component";
	invisibleListSidebarElement.visibility = "hidden";
	document.body.appendChild(invisibleListSidebarElement);

	const width = getElementSize(invisibleListSidebarElement).width;
	invisibleListSidebarElement.parentNode.removeChild(
		invisibleListSidebarElement
	);

	return width;
}

export function calcItemViewOuterDividingContainerMinWidth() {
	const invisibleItemViewComponentElement = document.createElement("div");
	invisibleItemViewComponentElement.className =
		"js-calc-item-container-component";
	invisibleItemViewComponentElement.visibility = "hidden";
	document.body.appendChild(invisibleItemViewComponentElement);

	const invisibleOuterDividingContainerElement = document.createElement("div");
	invisibleOuterDividingContainerElement.className =
		"js-calc-outer-dividing-container";
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

export function calcItemViewPaddingContainerPadding() {
	const invisibleItemViewComponentElement = document.createElement("div");
	invisibleItemViewComponentElement.className =
		"js-calc-item-container-component";
	invisibleItemViewComponentElement.visibility = "hidden";
	document.body.appendChild(invisibleItemViewComponentElement);

	const invisiblePaddingContainerElement = document.createElement("div");
	invisiblePaddingContainerElement.className = "js-calc-padding-container";
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
