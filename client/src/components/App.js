import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { retrieveAccount, retrieveProjects } from "../actions";

import RegisterPage from "./authentication/RegisterPage";
import LoginPage from "./authentication/LoginPage";
import HomePage from "./home/HomePage";

function App() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// used because of shallow comparison issues with objects
	const accountJsonString = JSON.stringify(reduxState.account)

	useEffect(() => {
		if (reduxState.auth.isAuthenticated && accountJsonString === "{}") {
			dispatch(retrieveAccount());
			dispatch(retrieveProjects());
		}
	}, [accountJsonString]);
	
	return (
		<Router>
			<Route path="/" exact component={HomePage} />
			<Route exact path="/register" component={RegisterPage} />
			<Route exact path="/login" component={LoginPage} />
		</Router>
	);
}

export default App;
