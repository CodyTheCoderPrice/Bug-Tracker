/**
 * Returns whether a value is null, undefined, or an empty string
 *
 * @param {Boolean} value - Value of any type
 * @returns {Boolean} Whether the value is null, undefined, or an empty string
 */
export function isEmpty(value) {
	return value === null || value === undefined || value === "";
}

/**
 * If first parameter is true, then ensures element has the passed className. 
 * Otherwise will make sure it doesn't. This does not affect other classNames
 * the element has.
 *
 * @param {Boolean} shouldHaveClassName - Should the element have the className
 * @param {Element} element - The element that will have it's className toggled
 * @param {String} nameOfToggledClass - The className the element either should
 * or shouldn't have
 */
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
		// Regex to find all instances of the className
		const regex = new RegExp("(?:^|\\s)" + nameOfToggledClass + "(?!\\S)", "g");
		// Removes all instances of the className
		element.className = element.className.replace(regex, "");
	}
}
