export function isEmpty(value) {
	return (value === '' || value === null || value === undefined);
}

export function toggleClassName(
	shouldHaveClassName,
	element,
	nameOfToggledClass
) {
	if (shouldHaveClassName) {
		if (!element.className.includes(nameOfToggledClass)) {
			// Space is needed for nameOfToggledClass
			// ...to keep it from merging with other classNames
			element.className = element.className + " " + nameOfToggledClass;
		}
	} else {
		const regex = new RegExp("(?:^|\\s)" + nameOfToggledClass + "(?!\\S)", "g");
		element.className = element.className.replace(regex, "");
	}
}