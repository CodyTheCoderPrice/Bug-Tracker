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

export function toggleEditProjectDisplay(shouldDisplay, editOptionElem) {
	if (shouldDisplay) {
		if (!editOptionElem.className.includes("project-options-container__dropdown__option--no-display")) {
			// Space is needed before class to keep it from merging with others
			editOptionElem.className = editOptionElem.className + " project-options-container__dropdown__option--no-display";
			console.log(editOptionElem.className);
		}
	} else {
		editOptionElem.className = editOptionElem.className.replace(
			/(?:^|\s)project-options-container__dropdown__option--no-display(?!\S)/g,
			""
		);
	}
}
