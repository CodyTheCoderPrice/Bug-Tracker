export function setNavbarButtonColor(elem, component) {
	if (!component) {
		// When inactive
		// Space is needed before class name to keep from mergin with others
		elem.className = elem.className.replace(
			/(?:^|\s)navbar-button--selected(?!\S)/g,
			""
		);
	} else {
		// When active
		if (!elem.className.includes("navbar-button--selected")) {
			// Space is needed before class name to keep from mergin with others
			elem.className = elem.className + " navbar-button--selected";
		}
	}
}

export function setProjectsIcon(elem, component) {
	if (!component) {
		// When inactive
		elem.className = "fa fa-folder";
	} else {
		// When active
		elem.className = "fa fa-folder-open";
	}
}