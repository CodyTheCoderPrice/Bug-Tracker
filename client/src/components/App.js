import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	retrievePriorityStatusArrays,
	retrieveAccount,
	retrieveProjects,
	setWhichAuthComponentsDisplay,
} from "../actions";

import { getWindowSize } from "../utils/displaySizeUtils";

import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Home from "./home/Home";

// Allows font awesome icons
import "font-awesome/css/font-awesome.min.css";
import "../SCSS/app.scss";

function App() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Used because of shallow comparison issues with objects
	const accountJsonString = JSON.stringify(reduxState.account);
	
	// Re-fetches user data after a page refresh,
	// ... and makes sure the appropriate components are displayed
	useEffect(() => {
		dispatch(retrievePriorityStatusArrays());

		if (reduxState.auth.isAuthenticated) {
			dispatch(retrieveAccount());
			dispatch(retrieveProjects());
		} else {
			// Makes sure unauthenticated users do not see home page
			if (reduxState.authComponentsDisplay.home) {
				dispatch(setWhichAuthComponentsDisplay({ login: true }));
			} else {
				// Makes sure refreshes keep unauthenticated users on the same authentication page
				dispatch(
					setWhichAuthComponentsDisplay({ ...reduxState.authComponentsDisplay })
				);
			}
		}
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	// Makes sure at least on Auth Component always displays
	// ...Since login is set to display by default, this useEffect
	// ...only needs to run when authComponentsDisplay changes
	useEffect(() => {
		if (
			!reduxState.authComponentsDisplay.register &&
			!reduxState.authComponentsDisplay.login &&
			!reduxState.authComponentsDisplay.home
		) {
			dispatch(setWhichAuthComponentsDisplay({ login: true }));
		}
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, [reduxState.authComponentsDisplay]);

	return (
		<div className="pageContainer">
			{reduxState.authComponentsDisplay.register ? <Register /> : null}
			{reduxState.authComponentsDisplay.login ? <Login /> : null}
			{reduxState.authComponentsDisplay.home ? <Home /> : null}
		</div>
	);
}

export default App;
