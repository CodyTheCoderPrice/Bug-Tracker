export function setNavbarButtonColor(elem, component) {
	if (!component) {
		// When inactive
		elem.style.backgroundColor = "#50677f";
	} else {
		// When active
		elem.style.backgroundColor = "#596f87";
	}
};

export function setProjectsIcon(component) {
	if (!component) {
		// When inactive
		document.getElementById("projectsIcon").className = "fa fa-folder";
	} else {
		// When active
		document.getElementById("projectsIcon").className = "fa fa-folder-open";
	}
};
