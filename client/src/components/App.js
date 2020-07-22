import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { retrieveAccount } from "../actions";

import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Home from "./home-page/Home";

function App() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// used for useEffect optimization because of shallow comparison
	const accountJsonString = JSON.stringify(reduxState.account)

	useEffect(() => {
		if (reduxState.auth.isAuthenticated) {
			console.log(reduxState.account);
			dispatch(retrieveAccount());
		}
	}, [accountJsonString]);
	
	return (
		<Router>
			<Route path="/" exact component={Home} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
		</Router>
	);
}

export default App;
