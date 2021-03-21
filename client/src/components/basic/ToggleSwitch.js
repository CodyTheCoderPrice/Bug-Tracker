import React from "react";

import { getToggleSwitchBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode } from "../../utils";

export default function ToggleSwitch(props) {
	const clickCheckbox = () => {
		document.getElementById(props.id).click();
	};

	return (
		<div
			className={
				"toggle-switch-component" +
				getToggleSwitchBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
					props.dark_mode,
					props.theme_color
				)
			}
		>
			<input
				type="checkbox"
				name={props.name}
				onChange={(e) => props.onChangeFunction(e)}
				checked={props.isOn}
				id={props.id}
				className="invisible-checkbox"
			/>
			<div className="toggle-switch" alt={props.alt} onClick={clickCheckbox}>
				<span className="toggle-switch__text">{props.isOn ? "ON" : "OFF"}</span>
				<span className="toggle-switch__circle" />
			</div>
		</div>
	);
}
