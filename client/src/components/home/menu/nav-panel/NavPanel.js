import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACCOUNT_CONTAINER } from "../../../../actions/constants/containerNames";
import { getCommonStandardBackgroundColorClassNameForTheme } from "../../../../utils";
import bugTrackerLogo from "../../../../images/bug-tracker-logo.svg";

export default function NavPanel() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<div
			className={
				"nav-panel js-nav-panel" +
				getCommonStandardBackgroundColorClassNameForTheme(
					reduxState[ACCOUNT_CONTAINER].settings.theme_color
				)
			}
		>
			<div className="top-container">
				<img
					className="top-container__logo"
					src={bugTrackerLogo}
					alt="LOGO: Bug Tracker created by Cody Price"
				/>
			</div>
		</div>
	);
}
