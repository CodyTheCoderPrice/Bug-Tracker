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

	return { width: scrollbarWidth };
}

export function calcListContainerSearchFilterSortBarHeight() {
	const invisibleSearchFilterSortBarElement = document.createElement("div");
	invisibleSearchFilterSortBarElement.className = "js-calc-search-filter-sort-component";
	invisibleSearchFilterSortBarElement.visibility = "hidden";
	document.body.appendChild(invisibleSearchFilterSortBarElement);

	const height = getElementSize(invisibleSearchFilterSortBarElement).height;
	invisibleSearchFilterSortBarElement.parentNode.removeChild(invisibleSearchFilterSortBarElement);

	return { height: height };
}

export function calcListContainerTableRowHeight() {
	const invisibleListContainerComponentElement = document.createElement("div");
	invisibleListContainerComponentElement.className = "js-calc-list-table-component";
	invisibleListContainerComponentElement.visibility = "hidden";
	document.body.appendChild(invisibleListContainerComponentElement);

	const invisibleListTableElement = document.createElement("div");
	invisibleListTableElement.className = "js-calc-list-table";
	invisibleListTableElement.visibility = "hidden";
	invisibleListContainerComponentElement.appendChild(invisibleListTableElement);

	const invisibleListTableRowElement = document.createElement("div");
	invisibleListTableRowElement.className = "js-calc-list-table__row";
	invisibleListTableRowElement.visibility = "hidden";
	invisibleListTableElement.appendChild(invisibleListTableRowElement);

	const height = getElementSize(invisibleListTableRowElement).height;
	invisibleListContainerComponentElement.parentNode.removeChild(
		invisibleListContainerComponentElement
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

	return { height: height };
}

export function calcItemContainerListSidebarWidth() {
	const invisibleListSidebarElement = document.createElement("div");
	invisibleListSidebarElement.className = "js-calc-list-sidebar-component";
	invisibleListSidebarElement.visibility = "hidden";
	document.body.appendChild(invisibleListSidebarElement);

	const width = getElementSize(invisibleListSidebarElement).width;
	invisibleListSidebarElement.parentNode.removeChild(
		invisibleListSidebarElement
	);

	return { width: width };
}

export function calcItemContainerOuterDividingContainerMinWidth() {
	const invisibleItemContainerComponentElement = document.createElement("div");
	invisibleItemContainerComponentElement.className = "js-calc-item-container-component";
	invisibleItemContainerComponentElement.visibility = "hidden";
	document.body.appendChild(invisibleItemContainerComponentElement);

	const invisibleOuterDividingContainerElement = document.createElement("div");
	invisibleOuterDividingContainerElement.className = "js-calc-outer-dividing-container";
	invisibleOuterDividingContainerElement.visibility = "hidden";
	invisibleItemContainerComponentElement.appendChild(invisibleOuterDividingContainerElement);

	const minWidth = stripNonDigits(getElementStyle(invisibleOuterDividingContainerElement).minWidth);
	invisibleItemContainerComponentElement.parentNode.removeChild(
		invisibleItemContainerComponentElement
	);

	return minWidth;
}

export function calcItemContainerPaddingContainerPadding() {
	const invisibleItemContainerComponentElement = document.createElement("div");
	invisibleItemContainerComponentElement.className = "js-calc-item-container-component";
	invisibleItemContainerComponentElement.visibility = "hidden";
	document.body.appendChild(invisibleItemContainerComponentElement);

	const invisiblePaddingContainerElement = document.createElement("div");
	invisiblePaddingContainerElement.className = "js-calc-padding-container";
	invisiblePaddingContainerElement.visibility = "hidden";
	invisibleItemContainerComponentElement.appendChild(invisiblePaddingContainerElement);

	const padding = stripNonDigits(getElementStyle(invisiblePaddingContainerElement).paddingLeft);
	invisibleItemContainerComponentElement.parentNode.removeChild(
		invisibleItemContainerComponentElement
	);

	return padding;
}
