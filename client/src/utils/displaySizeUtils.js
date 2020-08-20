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

// This function works because the body width = 100%
export function getScrollbarWidth() {
	return { width: (window.innerWidth - document.body.clientWidth) } ;
  }