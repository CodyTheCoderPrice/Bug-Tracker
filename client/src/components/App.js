import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { retrieveAccount } from "../actions";

import Register from "./authentication/Register";
import Login from "./authentication/Login";
import HomeNavBar from "./home-page/HomeNavBar";

function App() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// used because of shallow comparison issues with objects
	const accountJsonString = JSON.stringify(reduxState.account)

	useEffect(() => {
		if (reduxState.auth.isAuthenticated && accountJsonString === "{}") {
			dispatch(retrieveAccount());
		}
	}, [accountJsonString]);
	
	return (
		<Router>
			<Route path="/" exact component={HomeNavBar} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
		</Router>
	);
}

export default App;
