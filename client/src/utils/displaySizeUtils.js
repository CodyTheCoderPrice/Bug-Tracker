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

export function getElementSize(nameOfClass) {
	let elem = document.getElementsByClassName(nameOfClass)[0];
	return { height: elem.offsetHeight, width: elem.offsetWidth };
}

export function getScrollbarWidth() {
	// Creating invisible container
	const outer = document.createElement('div');
	outer.style.visibility = 'hidden';
	outer.style.overflow = 'scroll'; // forcing scrollbar to appear
	outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
	document.body.appendChild(outer);
  
	// Creating inner element and placing it in the container
	const inner = document.createElement('div');
	outer.appendChild(inner);
  
	// Calculating difference between container's full width and the child width
	const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  
	// Removing temporary elements from the DOM
	outer.parentNode.removeChild(outer);
  
	return scrollbarWidth;
}
