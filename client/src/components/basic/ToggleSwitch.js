import React from "react";
import PropTypes from "prop-types";
import { getToggleSwitchBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode } from "../../utils";

/**
 * React functional component for a toggle switch element with border,
 * background, and text colors specific to the theme + light/dark mode.
 * 
 * Component needs several properties passed in order to work. An example of
 * those properties is below.
 * 
 * @component
 * @example
 * name = "project_sort_ascending"
 * onChangeFunction=(e) => { 
 * 	// Do something (i.e. update redux)
 * }
 * isOn = reduxState[ACCOUNT_CONTAINER].settings.project_sort_ascending
 * uniqueId = "list-priority-filter-for-1"
 * alt = "Click to change between sorting projects by acending or descending"
 * dark_mode = reduxState[ACCOUNT_CONTAINER].settings.dark_mode
 * theme_color = reduxState[ACCOUNT_CONTAINER].settings.theme_color
 */
export default function ToggleSwitch(props) {
	const {
		name,
		onChangeFunction,
		isOn,
		uniqueId,
		alt,
		dark_mode,
		theme_color,
	} = props;

	const clickCheckbox = () => {
		document.getElementById(uniqueId).click();
	};

	return (
		<div
			className={
				"toggle-switch-component" +
				getToggleSwitchBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
					dark_mode,
					theme_color
				)
			}
		>
			{/*ToggleSwitch is really a hidden checkbox that is operated by
			 clicking the toggle-switch div below*/}
			<input
				type="checkbox"
				name={name}
				onChange={(e) => onChangeFunction(e)}
				checked={isOn}
				id={uniqueId}
				className="invisible-checkbox"
			/>
			<div className="toggle-switch" alt={alt} onClick={clickCheckbox}>
				<span className="toggle-switch__text">{isOn ? "ON" : "OFF"}</span>
				<span className="toggle-switch__circle" />
			</div>
		</div>
	);
}

ToggleSwitch.propTypes = {
	// ToggleSwitch input element's name attribute
	name: PropTypes.string.isRequired,
	// ToggleSwitch input element's onChange attribute
	onChangeFunction: PropTypes.func.isRequired,
	// ToggleSwitch input element's checked attribute
	isOn: PropTypes.bool.isRequired,
	// ToggleSwitch input element's id attribute
	uniqueId: PropTypes.string,
	// ToggleSwitch div element's (className toggle-switch) alt attribute
	alt: PropTypes.string,
	// Whether or not the app is in dark mode
	dark_mode: PropTypes.bool.isRequired,
	// Current theme the app is using
	theme_color: PropTypes.string.isRequired,
};
