import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { retrieveAccount, retrieveProjects } from "../actions";

import Register from "./authentication/Register";
import Login from "./authentication/Login";
import HomeNavbar from "./home-page/HomeNavbar";

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
			<Route path="/" exact component={HomeNavbar} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
		</Router>
	);
}

export default App;
