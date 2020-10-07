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

export function calcViewItemTopBarHeight() {
	const invisibleTopBarElement = document.createElement("div");
	invisibleTopBarElement.className = "top-bar-component";
	invisibleTopBarElement.visibility = "hidden";
	document.body.appendChild(invisibleTopBarElement);

	const height = getElementSize(invisibleTopBarElement).height;
	invisibleTopBarElement.parentNode.removeChild(invisibleTopBarElement);

	return { height: height };
}

export function calcMiniListTableWidth() {
	const invisibleMiniListTableElement = document.createElement("div");
	invisibleMiniListTableElement.className = "mini-list-table-component";
	invisibleMiniListTableElement.visibility = "hidden";
	document.body.appendChild(invisibleMiniListTableElement);

	const width = getElementSize(invisibleMiniListTableElement).width;
	invisibleMiniListTableElement.parentNode.removeChild(invisibleMiniListTableElement);

	return { width: width };
}