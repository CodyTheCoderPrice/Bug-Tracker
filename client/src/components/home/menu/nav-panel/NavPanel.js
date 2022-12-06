import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
	SIZE_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";
import { getCommonStandardBackgroundColorClassNameForTheme } from "../../../../utils";
import bugTrackerLogo from "../../../../images/bug-tracker-logo.svg";

// Components
import NavPanelButtonList from "./NavPanelButtonList";

export default function NavPanel() {
	const reduxState = useSelector((state) => state);

	// Resize button-list-container height to fit window when smaller than it
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.window !== null &&
			reduxState[SIZE_CONTAINER].constants.navPanelTopContainerHeight !== null
		) {
			let tablesConatinerElement = document.getElementsByClassName(
				"js-button-list-container"
			)[0];

			const adjustedWindowHeight =
				reduxState[SIZE_CONTAINER].variables.window.height -
				reduxState[SIZE_CONTAINER].constants.navPanelTopContainerHeight;

			tablesConatinerElement.style.height = adjustedWindowHeight + "px";
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].variables,
	]);

	return (
		<div
			className={
				"nav-panel-component js-nav-panel" +
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
			<div className="button-list-container js-button-list-container">
				<NavPanelButtonList reduxContainerName={PROJECT_CONTAINER} />
				{reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
				null ? null : (
					<NavPanelButtonList reduxContainerName={BUG_CONTAINER} />
				)}
			</div>
		</div>
	);
}
