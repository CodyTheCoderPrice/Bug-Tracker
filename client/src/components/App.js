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
			// Makes sure unauthenticated users do not have acces to home page
			if (reduxState[GENERAL_CONTAINER].componentsDisplay.home) {
				dispatch(setWhichGeneralComponentsDisplay({ login: true }));
			}
		}
		// eslint-disable-next-line
	}, []);

	// When an account is logged into the app, ensures that the Home component
	// ...always has exactly one of ListView (for projects), ItemView (for
	// ...projects), ListView (for bugs), or ItemView (for bugs) being displayed.
	// ...This must be done outside listComponentsDisplayReducer as it can not
	// ...manage both project and bug container simutaneously.
	useEffect(() => {
		if (reduxState[ACCOUNT_CONTAINER].auth.isAuthenticated) {
			let arryOfListAndItemViewComponentsSetToTrue = [];

			if (reduxState[PROJECT_CONTAINER].componentsDisplay.listView === true) {
				arryOfListAndItemViewComponentsSetToTrue.push("ListView for projects");
			}
			if (reduxState[PROJECT_CONTAINER].componentsDisplay.itemView === true) {
				arryOfListAndItemViewComponentsSetToTrue.push("ItemView for projects");
			}
			if (reduxState[BUG_CONTAINER].componentsDisplay.listView === true) {
				arryOfListAndItemViewComponentsSetToTrue.push("ListView for bugs");
			}
			if (reduxState[BUG_CONTAINER].componentsDisplay.itemView === true) {
				arryOfListAndItemViewComponentsSetToTrue.push("ItemView for bugs");
			}

			if (arryOfListAndItemViewComponentsSetToTrue.length > 1) {
				console.log(
					"Error: " +
						getStringOfAllArrayValues(
							arryOfListAndItemViewComponentsSetToTrue
						) +
						" were attempted to be set to true in the redux state, which goes against their intended use. To ensure no issues with CSS -- ListView for projects will be set true and the rest set to false."
				);

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
			"NOTE: If page is empty or seems broken, then please try clearing cookies before refreshing."
		);

		if (process.env.NODE_ENV === "development") {
			console.log(
				"NOTE: Pressing the third mouse button (while in development mode) will log the redux state."
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
			{reduxState[GENERAL_CONTAINER].componentsDisplay.register ? (
				<Register />
			) : null}
			{reduxState[GENERAL_CONTAINER].componentsDisplay.login ? <Login /> : null}
			{reduxState[GENERAL_CONTAINER].componentsDisplay.home ? <Home /> : null}
		</div>
	);
}

export default App;
