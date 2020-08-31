import { toggleClassName } from "./elementUtils";

export function setNavbarButtonColor(component, element, nameOfToggledClass) {
	toggleClassName(component, element, nameOfToggledClass);
}

export function setProjectsIcon(component, element) {
	if (component) {
		// Open folder icon
		element.className = "fa fa-folder-open";
	} else {
		// Closed folder icon
		element.className = "fa fa-folder";
	}
}