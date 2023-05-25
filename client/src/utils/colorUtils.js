import {
	getAppComponentClassName,
	getCommonStatusBackgroundColorClassName,
	getElementStyle,
} from "./index";

/**
 * Converts red, blue, or green of a rbg color value to its equivalent hex
 * section
 *
 * @param {number} rbgSection - Either red, blue, or green for rbg color value
 * @returns {string} rbgSection param converted into its equivalent hex section
 *
 * @example
 * // Returns "8d"
 * rbgSectionToHexSection(141);
 */
function rbgSectionToHexSection(rbgSection) {
	let hexSection = rbgSection.toString(16);
	// if length is 1, then concatinates 0 to the front
	return hexSection.length === 1 ? "0" + hexSection : hexSection;
}

/**
 * Takes red, blue, and green of rbg color value as params to be convert to the
 * equivalent hex color value
 *
 * @param {number} r - Red value for rbg color value
 * @param {number} g - Green value for rbg color value
 * @param {number} b - Blue value for rbg color value
 * @returns {string} Equivalent hex color value for r, g, and b params
 * (combined after converted)
 *
 * @example
 * // Returns "#568dd5"
 * rgbToHex(86, 141, 213);
 */
function rgbToHex(r, g, b) {
	return (
		"#" +
		rbgSectionToHexSection(r) +
		rbgSectionToHexSection(g) +
		rbgSectionToHexSection(b)
	);
}

/**
 * Takes rbg color value (as string) and returns equivalent hex color value (as
 * string)
 *
 * @param {string} rbgColorValue - rbg color value
 * @returns {string} rbg color value converted to hex color value
 *
 * @example
 * // Returns "#568dd5"
 * convertRbgColorStringToHexString("rgb(86, 141, 213)");
 */
function convertRbgColorStringToHexString(rbgColorValue) {
	// Seperates the r, b, and g sections into an array
	const rbgValues = rbgColorValue.match(/\d+/g);
	return rbgValues.length >= 3
		? rgbToHex(Number(rbgValues[0]), Number(rbgValues[1]), Number(rbgValues[2]))
		: null;
}

/**
 * Appends to each status Object in 'statusList' property's Array a 'colorHex' 
 * property for the hex color value of that status's CSS bakcground color.
 * 
 * Note: The purpose of appending the 'colorHex' property is so it can be used
 * to apply the status colors to the ItemViewBugPieChart component.
 *
 * @param {{
 * 	id: number,
 * 	option: string,
 * 	color: string
 * }[]} statusList - 'statusList' Object in 'priorityStatusOptions' property in 
 * either 'PROJECT_CONTAINER' or 'BUG_CONTAINER' of the redux state
 * @returns {{
 * 	id: number,
 * 	option: string,
 * 	color: string,
 * 	colorHex: string
 * }[]} statusList param with each status Object having 'colorHex' property
 * appended for the hex color value of that status's CSS bakcground color
 *
 * @example
 * appendHexValueForColorsToStatusList([
 * 	{
 * 		id: 1,
 * 		option: "Open",
 * 		color: "blue"
 * 	}, {
 * 		id: 2,
 * 		option: "In Progress",
 * 		color: "purple"
 * 	}, {
 * 		id: 3,
 * 		option: "Testing",
 * 		color: "orange"
 * 	}, {
 * 		id: 4,
 * 		option: "Closed",
 * 		color: "green"
 * 	}
 * ]);
 */
export function appendHexValueForColorsToStatusList(statusList) {
	// Creating "mimic" element for App component to later append child "mimic"
	// ...elements to so CSS can work properly. Creating "mimic" elements allows
	// ...this function to be called regardless of real elements being in the 
	// ...DOM. This also ensures the real elements are unaffected.
	const mimicAppElement = document.createElement("div");
	mimicAppElement.className = getAppComponentClassName();
	mimicAppElement.visibility = "hidden";
	document.body.appendChild(mimicAppElement);

	for (let i = 0; i < statusList.length; i++) {
		const mimicStatusColorDiv = document.createElement("div");
		mimicStatusColorDiv.className = getCommonStatusBackgroundColorClassName(statusList[i].color);
		// CSS requires being child of APP component
		mimicAppElement.appendChild(mimicStatusColorDiv);

		const hex = convertRbgColorStringToHexString(
			getElementStyle(mimicStatusColorDiv).getPropertyValue("background-color")
		);

		// Appends hex color value to the status
		statusList[i]["colorHex"] = hex;
	}

	mimicAppElement.parentNode.removeChild(mimicAppElement);

	return statusList;
}
