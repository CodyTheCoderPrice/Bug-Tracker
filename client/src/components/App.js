import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../actions/constants/containerNames";

import {
	retrieveEverythingForAccount,
	setWhichGeneralComponentsDisplay,
	setProjectOrBugSearchFilterSort,
} from "../actions";

import { getUpdatedDeepCopyFilterArray } from "../utils";

import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Home from "./home/Home";

// Allows font awesome icons
import "font-awesome/css/font-awesome.min.css";
import "../CSS/styles.css";

function App() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Re-fetches user data after a page refresh,
	// ... and makes sure the appropriate components are displayed
	useEffect(() => {
		if (reduxState[ACCOUNT_CONTAINER].auth.isAuthenticated) {
			// This also serves to logout a user if their jwToken has expired
			// ...since the server will catch the expired token and throw an
			// ...error to which the frontend will log the user out
			dispatch(retrieveEverythingForAccount());
		} else {
			// Makes sure unauthenticated users do not see home page
			if (reduxState[GENERAL_CONTAINER].componentsDisplay.home) {
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
			!reduxState[GENERAL_CONTAINER].componentsDisplay.register &&
			!reduxState[GENERAL_CONTAINER].componentsDisplay.login &&
			!reduxState[GENERAL_CONTAINER].componentsDisplay.home
		) {
			dispatch(setWhichGeneralComponentsDisplay({ login: true }));
		}
		// eslint-disable-next-line
	}, [reduxState[GENERAL_CONTAINER].componentsDisplay]);

	function logReduxState(e) {
		if (process.env.NODE_ENV === "development" && e.button === 1) {
			console.log(reduxState);
		}
	}

	// Updates list filters to match the account settings
	useEffect(() => {
		if (
			reduxState[ACCOUNT_CONTAINER].settings.filter_completed_projects !==
			reduxState[PROJECT_CONTAINER].searchFilterSort.statusFilter.includes(
				reduxState[PROJECT_CONTAINER].priorityStatusOptions.statusCompletionId
			)
		) {
			dispatch(
				setProjectOrBugSearchFilterSort(PROJECT_CONTAINER, {
					...reduxState[PROJECT_CONTAINER].searchFilterSort,
					statusFilter: getUpdatedDeepCopyFilterArray(
						reduxState,
						PROJECT_CONTAINER,
						"statusFilter",
						reduxState[PROJECT_CONTAINER].priorityStatusOptions
							.statusCompletionId
					),
				})
			);
		}

		if (
			reduxState[ACCOUNT_CONTAINER].settings.filter_completed_bugs !==
			reduxState[BUG_CONTAINER].searchFilterSort.statusFilter.includes(
				reduxState[BUG_CONTAINER].priorityStatusOptions.statusCompletionId
			)
		) {
			dispatch(
				setProjectOrBugSearchFilterSort(BUG_CONTAINER, {
					...reduxState[BUG_CONTAINER].searchFilterSort,
					statusFilter: getUpdatedDeepCopyFilterArray(
						reduxState,
						BUG_CONTAINER,
						"statusFilter",
						reduxState[BUG_CONTAINER].priorityStatusOptions.statusCompletionId
					),
				})
			);
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[ACCOUNT_CONTAINER].settings.filter_completed_projects,
		// eslint-disable-next-line
		reduxState[ACCOUNT_CONTAINER].settings.filter_completed_bugs,
	]);

	return (
		<div onMouseDown={logReduxState} className="pageContainer">
			{reduxState[GENERAL_CONTAINER].componentsDisplay.register ? (
				<Register />
			) : null}
			{reduxState[GENERAL_CONTAINER].componentsDisplay.login ? <Login /> : null}
			{reduxState[GENERAL_CONTAINER].componentsDisplay.home ? <Home /> : null}
		</div>
	);
}

export default App;
