import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	retrievePriorityStatusArrays,
	retrieveAccount,
	retrieveProjects,
	setWhichCoreComponentsDisplay,
} from "../actions";

import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Home from "./home/Home";

// Allows font awesome icons
import "font-awesome/css/font-awesome.min.css";
import "../SCSS/app.scss";

function App() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();
	
	// Re-fetches user data after a page refresh,
	// ... and makes sure the appropriate components are displayed
	useEffect(() => {
		dispatch(retrievePriorityStatusArrays());

		if (reduxState.accountContainer.auth.isAuthenticated) {
			dispatch(retrieveAccount());
			dispatch(retrieveProjects());
		} else {
			// Makes sure unauthenticated users do not see home page
			if (reduxState.generalContainer.coreComponentsDisplay.home) {
				dispatch(setWhichCoreComponentsDisplay({ login: true }));
			} else {
				// Makes sure refreshes keep unauthenticated users on the same authentication page
				dispatch(
					setWhichCoreComponentsDisplay({ ...reduxState.generalContainer.coreComponentsDisplay })
				);
			}
		}
		// eslint-disable-next-line
	}, []);

	// Makes sure at least on Auth Component always displays
	// ...Since login is set to display by default, this useEffect
	// ...only needs to run when authComponentsDisplay changes
	useEffect(() => {
		if (
			!reduxState.generalContainer.coreComponentsDisplay.register &&
			!reduxState.generalContainer.coreComponentsDisplay.login &&
			!reduxState.generalContainer.coreComponentsDisplay.home
		) {
			dispatch(setWhichCoreComponentsDisplay({ login: true }));
		}
		// eslint-disable-next-line
	}, [reduxState.generalContainer.coreComponentsDisplay]);

	return (
		<div className="pageContainer">
			{reduxState.generalContainer.coreComponentsDisplay.register ? <Register /> : null}
			{reduxState.generalContainer.coreComponentsDisplay.login ? <Login /> : null}
			{reduxState.generalContainer.coreComponentsDisplay.home ? <Home /> : null}
		</div>
	);
}

export default App;
