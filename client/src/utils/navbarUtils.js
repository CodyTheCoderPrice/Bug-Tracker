export function setNavbarButtonColor(elem, component) {
	if (component) {
		if (!elem.className.includes("navbar-button--selected")) {
			// Space is needed before class to keep it from merging with others
			elem.className = elem.className + " navbar-button--selected";
		}
	} else {
		elem.className = elem.className.replace(
			/(?:^|\s)navbar-button--selected(?!\S)/g,
			""
		);
	}
}

export function setProjectsIcon(elem, component) {
	if (component) {
		// Open folder icon
		elem.className = "fa fa-folder-open";
	} else {
		// Closed folder icon
		elem.className = "fa fa-folder";
	}
}
