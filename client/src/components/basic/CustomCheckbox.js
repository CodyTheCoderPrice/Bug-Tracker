import React from "react";

import { getCustomCheckboxBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode } from "../../utils";

export default function CustomCheckbox(props) {
	return (
		<div className="custom-checkbox-component">
			<input
				type="checkbox"
				name={props.name}
				value={props.value}
				onChange={(e) => props.onChangeFunction(e)}
				checked={props.checked}
				id={props.id}
				className={
					"checkbox" +
					getCustomCheckboxBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
						props.dark_mode,
						props.theme_color
					)
				}
			/>
			{props.checked ? (
				<i className="fa fa-check checkmark" aria-hidden="true" />
			) : null}
		</div>
	);
}
