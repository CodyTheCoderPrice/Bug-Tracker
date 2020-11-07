import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generalContainerName } from "../reducers/containerNames";

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
		if (reduxState.accountContainer.auth.isAuthenticated) {
			dispatch(retrieveAccount());
			dispatch(retrieveProjects());
			dispatch(retrieveBugs());
			dispatch(retrieveComments());
			dispatch(retrievePriorityStatusArrays());
		} else {
			// Makes sure unauthenticated users do not see home page
			if (reduxState[generalContainerName].componentsDisplay.home) {
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
			!reduxState[generalContainerName].componentsDisplay.register &&
			!reduxState[generalContainerName].componentsDisplay.login &&
			!reduxState[generalContainerName].componentsDisplay.home
		) {
			dispatch(setWhichGeneralComponentsDisplay({ login: true }));
		}
		// eslint-disable-next-line
	}, [reduxState[generalContainerName].componentsDisplay]);

	return (
		<div className="pageContainer">
			{reduxState[generalContainerName].componentsDisplay.register ? (
				<Register />
			) : null}
			{reduxState[generalContainerName].componentsDisplay.login ? <Login /> : null}
			{reduxState[generalContainerName].componentsDisplay.home ? <Home /> : null}
		</div>
	);
}

export default App;
