import React from "react";
import PropTypes from "prop-types";
import { getCustomCheckboxBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode } from "../../utils";

/**
 * React functional component for a custom checkbox element with border,
 * background, and text colors specific to the theme + light/dark mode.
 * Component needs several properties passed in order to work. An example of
 * those properties is below.
 * 
 * @component
 * @example
 * name = "nameHere"
 * value = 1
 * onChangeFunction=(e) => { 
 * 	// Do something
 * }
 * id = "idHere"
 * isChecked = booleanVariable
 * dark_mode = reduxState[ACCOUNT_CONTAINER].settings.dark_mode
 * theme_color = reduxState[ACCOUNT_CONTAINER].settings.theme_color
 */
export default function CustomCheckbox(props) {
	const {
		name,
		value,
		onChangeFunction,
		isChecked,
		id,
		dark_mode,
		theme_color,
	} = props;

	return (
		<div className="custom-checkbox-component">
			<input
				type="checkbox"
				name={name}
				value={value}
				onChange={(e) => onChangeFunction(e)}
				checked={isChecked}
				id={id}
				className={
					"checkbox" +
					getCustomCheckboxBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
						dark_mode,
						theme_color
					)
				}
			/>
			{isChecked ? (
				<i className="fa fa-check checkmark" aria-hidden="true" />
			) : null}
		</div>
	);
}

CustomCheckbox.propTypes = {
	// Checkbox input element's name attribute
	name: PropTypes.string.isRequired,
	// Checkbox input element's value attribute
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	// Checkbox input element's onChange attribute
	onChangeFunction: PropTypes.func.isRequired,
	// Checkbox input element's checked attribute
	isChecked: PropTypes.bool.isRequired,
	// Checkbox input element's id attribute
	id: PropTypes.string,
	// Whether or not the app is in dark mode
	dark_mode: PropTypes.bool.isRequired,
	// Current theme the app is using
	theme_color: PropTypes.string.isRequired,
};
