import { toggleClassName } from "./elementUtils";
import { getElementSize } from "./displaySizeUtils";

export function setNavbarButtonColor(component, element, nameOfToggledClass) {
	toggleClassName(component, element, nameOfToggledClass);
}