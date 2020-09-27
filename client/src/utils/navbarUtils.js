import { toggleClassName } from "./elementUtils";
import { getElementSize } from "./displaySizeUtils";

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

export function nabvarButtonResize(
	navbarButtonElement,
	navbarButtonTextElement,
	nameOfNavbarButtonTextForMeasurmentClass
) {
	const textMeasurmentElement = navbarButtonTextElement.cloneNode(true);
	textMeasurmentElement.className = nameOfNavbarButtonTextForMeasurmentClass;
	navbarButtonElement.parentNode.appendChild(textMeasurmentElement);

	console.log(getElementSize(textMeasurmentElement));

	navbarButtonElement.style.width = getElementSize(textMeasurmentElement).width + 60 + "px";

	textMeasurmentElement.parentNode.removeChild(textMeasurmentElement);
}