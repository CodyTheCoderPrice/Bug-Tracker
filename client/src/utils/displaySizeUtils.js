export function getWindowSize() {
	const height =
		window.innerElemHeight ||
		document.documentElement.clientHeight ||
		document.body.clientHeight;
	const width =
		window.innerElemWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth;
	return { height: height, width: width };
}

export function getElementSize(nameOfClass) {
	let elem = document.getElementsByClassName(nameOfClass)[0];
	return { height: elem.offsetHeight, width: elem.offsetWidth };
}

export function calcScrollbarWidth() {
	const outerElem = document.createElement('div');
	outerElem.style.visibility = 'hidden';
	// Adds scroll bar
	outerElem.style.overflow = 'scroll';
	// For WinJS apps
	outerElem.style.msOverflowStyle = 'scrollbar';
	document.body.appendChild(outerElem);
  
	const innerElem = document.createElement('div');
	outerElem.appendChild(innerElem);
  
	const scrollbarWidth = (outerElem.offsetWidth - innerElem.offsetWidth);
  
	outerElem.parentNode.removeChild(outerElem);
  
	return {width: scrollbarWidth};
}
