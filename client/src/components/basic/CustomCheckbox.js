import React from "react";

import { getCustomCheckboxBorderAndBackgroundColorClassNameForLightOrDarkMode } from "../../utils";

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
					getCustomCheckboxBorderAndBackgroundColorClassNameForLightOrDarkMode(
						props.dark_mode
					)
				}
			/>
			{props.checked ? (
				<i className="fa fa-check checkmark" aria-hidden="true" />
			) : null}
		</div>
	);
}
