import React from "react";

import { getToggleSwitchBorderBackgroundTextColorClassNameForLightOrDarkMode } from "../../utils";

export default function ToggleSwitch(props) {
	return (
		<div className="toggle-switch-component">
			{props.isOn ? (
				<div
					className={
						"toggle-switch" +
						getToggleSwitchBorderBackgroundTextColorClassNameForLightOrDarkMode(
							props.isOn,
							props.dark_mode
						)
					}
					onClick={props.onChangeFunction}
				>
					<span className="toggle-switch__text">ON</span>
					<span className="toggle-switch__circle toggle-switch__circle--on" />
				</div>
			) : (
				<div
					className={
						"toggle-switch toggle-switch--off" +
						getToggleSwitchBorderBackgroundTextColorClassNameForLightOrDarkMode(
							props.isOn,
							props.dark_mode
						)
					}
					onClick={props.onChangeFunction}
				>
					<span className="toggle-switch__text toggle-switch__text--off">
						OFF
					</span>
					<span className="toggle-switch__circle toggle-switch__circle--off" />
				</div>
			)}
		</div>
	);
}
