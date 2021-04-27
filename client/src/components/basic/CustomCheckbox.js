import React from "react";
import PropTypes from "prop-types";
import { getCustomCheckboxBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode } from "../../utils";

/**
 * React functional component for a custom checkbox element with border,
 * background, and text colors specific to the theme + light/dark mode.
 *
 * @component
 * @example
 * name = "statusFilter"
 * value = reduxState[props.reduxContainerName].priorityStatusOptions
 * 		.statusList[0].id
 * onChangeFunction=(e) => {
 *		dispatch(
 *			setProjectOrBugSearchFilterSort(props.reduxContainerName, {
 *				...reduxState[props.reduxContainerName].searchFilterSort,
 *				[e.target.name]: getUpdatedDeepCopyFilterArray(
 *					reduxState,
 *					props.reduxContainerName,
 *					e.target.name,
 *					e.target.value
 *				),
 *			})
 *		);
 * id = "list-status-filter-" + reduxState[props.reduxContainerName]
 * 			.priorityStatusOptions.statusList[0].id
 * isChecked = !reduxState[props.reduxContainerName].searchFilterSort
 * 		.statusFilter.includes(reduxState[props.reduxContainerName]
 * 			.priorityStatusOptions.statusList[0].id)
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
	// Value for checkbox input element's name attribute
	name: PropTypes.string.isRequired,
	// Value for checkbox input element's value attribute
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	// Value for checkbox input element's onChange attribute
	onChangeFunction: PropTypes.func.isRequired,
	// Value for checkbox input element's checked attribute
	isChecked: PropTypes.bool.isRequired,
	// Value for checkbox input element's id attribute
	id: PropTypes.string,
	// Whether or not the app is in dark mode
	dark_mode: PropTypes.bool.isRequired,
	// Current theme the app is using
	theme_color: PropTypes.string.isRequired,
};
