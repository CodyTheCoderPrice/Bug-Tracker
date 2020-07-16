import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Home from "./home-page/Home";

function App() {
	return (
		<Router>
			<Route path="/" exact component={Home} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
		</Router>
	);
}

export default App;
