import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	retrievePriorityStatusArrays,
	retrieveAccount,
	retrieveProjects,
	retrieveBugs,
	retrieveComments,
	setWhichGeneralComponentsDisplay,
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
			dispatch(retrieveBugs());
			dispatch(retrieveComments());
		} else {
			// Makes sure unauthenticated users do not see home page
			if (reduxState.generalContainer.componentsDisplay.home) {
				dispatch(setWhichGeneralComponentsDisplay({ login: true }));
			} 
		}
		// eslint-disable-next-line
	}, []);

	// Makes sure at least on Auth Component always displays
	// ...Since login is set to display by default, this useEffect
	// ...only needs to run when authComponentsDisplay changes
	useEffect(() => {
		if (
			!reduxState.generalContainer.componentsDisplay.register &&
			!reduxState.generalContainer.componentsDisplay.login &&
			!reduxState.generalContainer.componentsDisplay.home
		) {
			dispatch(setWhichGeneralComponentsDisplay({ login: true }));
		}
		// eslint-disable-next-line
	}, [reduxState.generalContainer.componentsDisplay]);

	return (
		<div className="pageContainer">
			{reduxState.generalContainer.componentsDisplay.register ? <Register /> : null}
			{reduxState.generalContainer.componentsDisplay.login ? <Login /> : null}
			{reduxState.generalContainer.componentsDisplay.home ? <Home /> : null}
		</div>
	);
}

export default App;
