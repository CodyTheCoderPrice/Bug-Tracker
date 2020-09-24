import { toggleClassName } from "./elementUtils";

export function toggleDisableButtons(shouldDisable, buttonsContainerClassName, disableModifierClassName) {
	let buttonsContainerElement = document.getElementsByClassName(
		buttonsContainerClassName
	)[0];

	for (let child of buttonsContainerElement.childNodes) {
		toggleClassName(
			shouldDisable,
			child,
			disableModifierClassName
		);
	}
}
