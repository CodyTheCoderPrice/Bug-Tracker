import { toggleClassName } from "./elementUtils";

export function toggleDisableButtons(shouldDisable, buttonsContainer) {
	let buttonsContainerElement = document.getElementsByClassName(
		buttonsContainer
	)[0];

	for (let child of buttonsContainerElement.childNodes) {
		toggleClassName(
			shouldDisable,
			child,
			"project-table__header__mass-delete-options__button--disabled"
		);
		child.disabled = shouldDisable;
		console.log(child.disabled);
	}
}
