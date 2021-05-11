import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../actions/constants/containerNames";
import {
	retrieveEverythingForAccount,
	setWhichGeneralComponentsDisplay,
	logoutAccount,
} from "../actions";
// Components used by this component
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Home from "./home/Home";
// Allows font awesome icons
import "font-awesome/css/font-awesome.min.css";
// Css file is applied to all components throughout app
import "../CSS/styles.css";

/**
 * React functional component used to run the app. This component has three
 * child components, being <Register>, <Login>, and <Home>. Only one of them
 * will be displayed at any point in time.
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

	// Makes sure this component always only has one child component dispalyed
	useEffect(() => {
		const numberOfChildComponentsBeingDisplayed = [
			reduxState[GENERAL_CONTAINER].componentsDisplay.register,
			reduxState[GENERAL_CONTAINER].componentsDisplay.login,
			reduxState[GENERAL_CONTAINER].componentsDisplay.home,
		].filter(boolean => boolean === true).length;

		if (
			numberOfChildComponentsBeingDisplayed < 1 ||
			numberOfChildComponentsBeingDisplayed > 1
		) {
			dispatch(logoutAccount());
			console.log("Reset app due to incorrect number of <App> child components being displayed");
		}
		// eslint-disable-next-line
	}, [reduxState[GENERAL_CONTAINER].componentsDisplay]);

	// Development mode tool for logging redux state
	function logReduxState(e) {
		if (process.env.NODE_ENV === "development" && e.button === 1) {
			console.log(reduxState);
		}
	}

	return (
		<div onMouseDown={logReduxState} className="app-component">
			{reduxState[GENERAL_CONTAINER].componentsDisplay.register ? (
				<Register />
			) : null}
			{reduxState[GENERAL_CONTAINER].componentsDisplay.login ? <Login /> : null}
			{reduxState[GENERAL_CONTAINER].componentsDisplay.home ? <Home /> : null}
		</div>
	);
}

export default App;
