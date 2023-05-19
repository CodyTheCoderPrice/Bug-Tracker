import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Component uses container names to work with the redux state
import { GENERAL_CONTAINER } from "../../actions/constants/containerNames";
import {
	getAuthenticationComponentModalElementWithLoginStandardModifierWidth,
	getWindowSize,
} from "../../utils";
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

	useEffect(() => {
		setLoginComponentBreakingPointWidth(
			// 30 is added to simulate a margin around the modal
			getAuthenticationComponentModalElementWithLoginStandardModifierWidth() + 30
		);

		// Initializes windowWidth
		windowSizeHandler();

		window.addEventListener("resize", windowSizeHandler);

		return () => {
			window.removeEventListener("resize", windowSizeHandler);
		};
		// eslint-disable-next-line
	}, []);

	// Declared as an object outside the eventListener so removal works on cleanup
	function windowSizeHandler() {
		setWindowWidth(getWindowSize().width);
	}

	return (
		<div className="authentication-component">
			<div className="background" />
			<div className="background-cover" />
			<div
				className={
					"modal" +
					(reduxState[GENERAL_CONTAINER].componentsDisplay
						.registerComponentShouldDisplay
						? " modal--register"
						: reduxState[GENERAL_CONTAINER].componentsDisplay
								.loginComponentShouldDisplay
						? windowWidth > loginComponentBreakingPointWidth
							? " modal--login-standard"
							: " modal--login-condensed"
						: "")
				}
			>
				{reduxState[GENERAL_CONTAINER].componentsDisplay
					.registerComponentShouldDisplay ? (
					<Register />
				) : null}
				{reduxState[GENERAL_CONTAINER].componentsDisplay
					.loginComponentShouldDisplay ? (
					<Login />
				) : null}
			</div>
		</div>
	);
}

export default Authentication;
