import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../actions/constants/containerNames";
import {
	retrieveEverythingForAccount,
	setWhichGeneralComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
} from "../actions";
import { getStringOfAllArrayValues } from "../utils";
// Other components used by this component
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Home from "./home/Home";
// Allows font awesome icons
import "font-awesome/css/font-awesome.min.css";
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
		// eslint-disable-next-line
	}, []);

	// FAIL SAFE: When an account is logged into the app, ensures that the Home
	// ...component always has exactly one of ListView (for projects), ItemView
	// ...(for projects), ListView (for bugs), or ItemView (for bugs) being
	// ...displayed. This must be done outside listComponentsDisplayReducer as
	// ...it can not manage both project and bug container simutaneously.
	useEffect(() => {
		if (reduxState[ACCOUNT_CONTAINER].auth.isAuthenticated) {
			let arryOfListAndItemViewComponentsSetToTrue = [];

			if (reduxState[PROJECT_CONTAINER].componentsDisplay.listView === true) {
				arryOfListAndItemViewComponentsSetToTrue.push("listView for projects");
			}
			if (reduxState[PROJECT_CONTAINER].componentsDisplay.itemView === true) {
				arryOfListAndItemViewComponentsSetToTrue.push("itemView for projects");
			}
			if (reduxState[BUG_CONTAINER].componentsDisplay.listView === true) {
				arryOfListAndItemViewComponentsSetToTrue.push("listView for bugs");
			}
			if (reduxState[BUG_CONTAINER].componentsDisplay.itemView === true) {
				arryOfListAndItemViewComponentsSetToTrue.push("itemView for bugs");
			}

			if (arryOfListAndItemViewComponentsSetToTrue.length !== 1) {
				if (arryOfListAndItemViewComponentsSetToTrue.length > 1) {
					console.log(
						"FAIL SAFE: " +
							getStringOfAllArrayValues(
								arryOfListAndItemViewComponentsSetToTrue
							) +
							" were attempted to be set to true in the redux state which goes against their intended use. To ensure no issues with CSS -- 'listView' (for projects) will be set true and the rest set to false."
					);
				} else {
					console.log(
						"FAIL SAFE: Neither 'listView' (for projects and bugs) properties or 'itemView' (for projects and bugs) properties were attempted to be set to true in the redux state which goes against their intended use. So 'listView' (for projects) will be set true."
					);
				}

				// Keeps same itemViewCurrentItem, so if it's not null, the user can
				// ...switch back to project ItemView using navbar.
				dispatch(
					setWhichProjectComponentsDisplay({
						listView: true,
						itemViewCurrentItem:
							reduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewCurrentItem,
					})
				);
				// Keeps itemViewCurrentItem the same, so if it's not null, the user
				// ...can switch back to bug ItemView using navbar.
				dispatch(
					setWhichBugComponentsDisplay({
						itemViewCurrentItem:
							reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
					})
				);
			}
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].componentsDisplay,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].componentsDisplay,
	]);

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
	function logReduxState(e) {
		if (process.env.NODE_ENV === "development" && e.button === 1) {
			console.log(reduxState);
		}
	}

	return (
		<div
			onMouseDown={logReduxState}
			// app-component className is critical for a lot of css throughout
			className="app-component"
		>
			{reduxState[GENERAL_CONTAINER].componentsDisplay
				.registerComponentShouldDisplay ? (
				<Register />
			) : null}
			{reduxState[GENERAL_CONTAINER].componentsDisplay
				.loginComponentShouldDisplay ? (
				<Login />
			) : null}
			{reduxState[GENERAL_CONTAINER].componentsDisplay
				.homeComponentShouldDisplay ? (
				<Home />
			) : null}
		</div>
	);
}

export default App;
