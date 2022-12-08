import React from "react";
import PropTypes from "prop-types";
import { getCustomCheckboxComponentBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode } from "../../utils";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

/**
 * React functional component for a custom checkbox element with border,
 * background, and text colors specific to the theme + light/dark mode.
 *
 * Component needs several properties passed in order to work. An example of
 * those properties is below.
 *
 * @component
 * @example
 * name = "priorityFilter"
 * value = 1
 * onChangeFunction=(e) => {
 * 	// Do something (i.e. update redux)
 * }
 * isChecked = !reduxState["PROJECT_CONTAINER"].searchFilterSort.priorityFilter
 * uniqueId = "list-priority-filter-for-1"
 * 		.includes(1)
 * dark_mode = reduxState["ACCOUNT_CONTAINER"].settings.dark_mode
 * theme_color = reduxState["ACCOUNT_CONTAINER"].settings.theme_color
 */
export default function CustomCheckbox(props) {
	const {
		name,
		value,
		onChangeFunction,
		isChecked,
		uniqueId,
		dark_mode,
		theme_color,
	} = props;

	return (
		<div className="custom-checkbox-component">
			<input
				type="checkbox"
				name={name}
				value={value}
				onChange={onChangeFunction}
				checked={isChecked}
				id={uniqueId}
				className={
					"checkbox" +
					getCustomCheckboxComponentBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
						dark_mode,
						theme_color
					)
				}
			/>
			{isChecked ? (
				<FontAwesomeIcon icon={faCheck} className="checkmark" alt="Icon of a checkmark"/>
			) : null}
		</div>
	);
}

CustomCheckbox.propTypes = {
	// CustomCheckbox input element's name attribute
	name: PropTypes.string.isRequired,
	// CustomCheckboxinput element's value attribute
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	// CustomCheckbox input element's onChange attribute
	onChangeFunction: PropTypes.func.isRequired,
	// CustomCheckbox input element's checked attribute
	isChecked: PropTypes.bool.isRequired,
	// CustomCheckbox input element's id attribute
	uniqueId: PropTypes.string,
	// Whether or not the app is in dark mode
	dark_mode: PropTypes.bool.isRequired,
	// Current theme the app is using
	theme_color: PropTypes.string.isRequired,
};
