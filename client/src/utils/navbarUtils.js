import { toggleClassName } from "./elementUtils";;

export function setNavbarButtonColor(shouldDisplay, element, nameOfToggledClass) {
	toggleClassName(shouldDisplay, element, nameOfToggledClass);
}