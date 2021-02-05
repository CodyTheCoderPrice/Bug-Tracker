import React from "react";

export default function AccountModalChangeSettingsToggleSwitch(props) {

	return (
		<div className="toggle-switch-component">
			{props.on ? (
				<div className="toggle-switch" onClick={props.onChangeFunction}>
					<span className="toggle-switch__text">ON</span>
					<span className="toggle-switch__circle toggle-switch__circle--on" />
				</div>
			) : (
				<div className="toggle-switch toggle-switch--off" onClick={props.onChangeFunction}>
					<span className="toggle-switch__text toggle-switch__text--off">OFF</span>
					<span className="toggle-switch__circle toggle-switch__circle--off" />
				</div>
			)}
		</div>
	);
}
