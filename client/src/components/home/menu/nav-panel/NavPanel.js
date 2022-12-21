import React from "react";
import { useSelector } from "react-redux";
import { ACCOUNT_CONTAINER } from "../../../../actions/constants/containerNames";
import { getCommonStandardBackgroundColorClassNameForTheme } from "../../../../utils";
import bugTrackerLogo from "../../../../images/bug-tracker-logo.svg";

// Components
import NavPanelButtonList from "./NavPanelButtonList";

export default function NavPanel() {
	const reduxState = useSelector((state) => state);

	return (
		<div
			className={
				"nav-panel-component js-nav-panel-component" +
				getCommonStandardBackgroundColorClassNameForTheme(
					reduxState[ACCOUNT_CONTAINER].settings.theme_color
				)
			}
		>
			<div className="top-container js-nav-panel-top-container">
				<img
					className="top-container__logo"
					src={bugTrackerLogo}
					alt="LOGO: Bug Tracker created by Cody Price"
				/>
			</div>
			<NavPanelButtonList />
		</div>
	);
}
