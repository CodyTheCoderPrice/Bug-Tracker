export function toggleOptionsDropdownDisplay(shouldDisplay, buttonElem, dropdownElem) {
	if (shouldDisplay) {
		if (!buttonElem.className.includes("project-options-container__button--selected")) {
			// Space is needed before class to keep it from merging with others
			buttonElem.className = buttonElem.className + " project-options-container__button--selected";
		}
		dropdownElem.style.visibility = "visible";
	} else {
		buttonElem.className = buttonElem.className.replace(
			/(?:^|\s)project-options-container__button--selected(?!\S)/g,
			""
		);
		dropdownElem.style.visibility = "hidden";
	}
}
