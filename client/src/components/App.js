import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../actions/constants/containerNames";
import {
	retrieveEverythingForAccount,
	setWhichGeneralComponentsDisplay,
} from "../actions";
import { removeAllInstancesOfClassName } from "../utils";
// Other components used by this component
import Authentication from "./authentication/Authentication";
import Home from "./home/Home";
// Css file is applied to all components throughout app
import "../CSS/styles.css";

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
function App() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [
		appLoadingContainerElementIsNotDisplaying,
		setAppLoadingContainerElementIsNotDisplaying,
	] = useState(false);

	// Stops the loading spinner now that the app has rendered
	useEffect(() => {
		const appLoadingContainerElement = document.getElementsByClassName(
			"js-app-loading-container"
		)[0];

		if (appLoadingContainerElement !== undefined) {
			removeAllInstancesOfClassName(
				appLoadingContainerElement,
				"app-loading-container--display"
			);
		}

		setAppLoadingContainerElementIsNotDisplaying(true);
	}, []);

	// Re-fetches user data after a page refresh, and makes sure the
	// ...appropriate child component is displayed
	useEffect(() => {
		if (reduxState[ACCOUNT_CONTAINER].auth.isAuthenticated) {
			// This function will also logout the user if their jwToken has
			// ...expired, as the server catches expired tokens and throws a
			// ...specifc error that makes action functions logout the user
			dispatch(retrieveEverythingForAccount());
		} else {
			// Makes sure unauthenticated users do not have acces to Home component
			if (
				reduxState[GENERAL_CONTAINER].componentsDisplay
					.homeComponentShouldDisplay
			) {
				dispatch(
					setWhichGeneralComponentsDisplay({
						loginComponentShouldDisplay: true,
					})
				);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Prints notes in the console that may be helpful to users/developers
	useEffect(() => {
		console.log(
			"PLEASE READ: If page is blank or seems broken in any way, then please try clearing cookies for this website before refreshing the page."
		);

		if (process.env.NODE_ENV === "development") {
			console.log(
				"DEV NOTE: Pressing the third mouse button (while in development mode) will log the redux state."
			);
		}
	}, []);

	/**
	 * If app is in development mode, function will log redux state
	 *
	 * @param {Event} e - Event created by element's onMouseDown handler
	 */
	const logReduxState = (e) => {
		if (process.env.NODE_ENV === "development" && e.button === 1) {
			console.log(reduxState);
		}
	};

	return (
		<div
			onMouseDown={logReduxState}
			// app-component className is critical for a lot of css throughout
			className="app-component"
		>
			{(appLoadingContainerElementIsNotDisplaying &&
				reduxState[GENERAL_CONTAINER].componentsDisplay
					.registerComponentShouldDisplay) ||
			reduxState[GENERAL_CONTAINER].componentsDisplay
				.loginComponentShouldDisplay ? (
				<Authentication />
			) : null}
			{appLoadingContainerElementIsNotDisplaying &&
			reduxState[GENERAL_CONTAINER].componentsDisplay
				.homeComponentShouldDisplay ? (
				<Home />
			) : null}
		</div>
	);
}

export default App;
