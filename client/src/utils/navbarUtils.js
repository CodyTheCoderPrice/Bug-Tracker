import { toggleClassName } from "./elementUtils";
import { getElementSize } from "./displaySizeUtils";

export function setNavbarButtonColor(shouldDisplay, element, nameOfToggledClass) {
	toggleClassName(shouldDisplay, element, nameOfToggledClass);
}