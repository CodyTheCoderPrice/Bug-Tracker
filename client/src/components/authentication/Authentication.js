import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Component uses container names to work with the redux state
import { GENERAL_CONTAINER } from "../../actions/constants/containerNames";
import {
	getAuthenticationComponentModalElementWithExpandedModifierWidth,
	getWindowSize,
} from "../../utils";
import bugTrackerLogo from "../../images/bug-tracker-logo.svg";
// Other components used by this component
import Register from "./AuthenticationRegister";
import Login from "./AuthenticationLogin";

/**
 * React functional component used to run the app. This component should have
 * only three child components -- Register, Login, and Home. Only one of
 * them should be displayed at any point in time.
 *
 * This is the highest level component of this app, meaning it should not be
 * the child of any other components.
 *
 * @component
 */
function Authentication() {
	const reduxState = useSelector((state) => state);

	const [windowWidth, setWindowWidth] = useState();

	const [
		loginComponentBreakingPointWidth,
		setLoginComponentBreakingPointWidth,
	] = useState();

	const [
		shouldIntroContainerHaveVisibility,
		setShouldIntroContainerHaveVisibility,
	] = useState(false);

	const modalShouldBeExpand =
		reduxState[GENERAL_CONTAINER].componentsDisplay
			.loginComponentShouldDisplay &&
		windowWidth > loginComponentBreakingPointWidth;

	useEffect(() => {
		setLoginComponentBreakingPointWidth(
			// 30 is added to simulate a margin around the modal
			getAuthenticationComponentModalElementWithExpandedModifierWidth() + 30
		);

		// Initializes windowWidth
		windowSizeHandler();

		window.addEventListener("resize", windowSizeHandler);

		return () => {
			window.removeEventListener("resize", windowSizeHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Declared as an object outside the eventListener so removal works on cleanup
	function windowSizeHandler() {
		setWindowWidth(getWindowSize().width);
	}

	useEffect(() => {
		if (
			!reduxState[GENERAL_CONTAINER].componentsDisplay
				.loginComponentShouldDisplay
		) {
			setShouldIntroContainerHaveVisibility(false);
		} else if (!shouldIntroContainerHaveVisibility) {
			setShouldIntroContainerHaveVisibility(
				shouldIntroContainerHaveVisibility || modalShouldBeExpand
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		// eslint-disable-next-line react-hooks/exhaustive-deps
		reduxState[GENERAL_CONTAINER].componentsDisplay.loginComponentShouldDisplay,
		windowWidth,
	]);

	return (
		<div className="authentication-component">
			<div className="background" />
			<div className="background-cover" />
			<div
				className={"modal" + (modalShouldBeExpand ? " modal--expanded" : "")}
			>
				<div
					className={
						"modal__intro-container" +
						(shouldIntroContainerHaveVisibility
							? ""
							: " modal__intro-container--invisible")
					}
				>
					<img
						className="modal__intro-container__logo"
						src={bugTrackerLogo}
						title="Bug Tracker created by Cody Price"
						alt="LOGO: Bug Tracker created by Cody Price"
					/>
					<h1 className="modal__intro-container__description">
						Free online bug tracking system <br /> for your software project
						needs
					</h1>
				</div>
				{reduxState[GENERAL_CONTAINER].componentsDisplay
					.loginComponentShouldDisplay ? (
					<Login />
				) : null}
				{reduxState[GENERAL_CONTAINER].componentsDisplay
					.registerComponentShouldDisplay ? (
					<Register />
				) : null}
			</div>
		</div>
	);
}

export default Authentication;
