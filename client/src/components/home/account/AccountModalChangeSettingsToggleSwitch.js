import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	getCurrentContainerName,
} from "../../../utils";

export default function AccountModalChangeSettingsToggleSwitch(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

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
