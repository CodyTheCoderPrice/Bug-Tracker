import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from "./authentication/Register";
import Login from "./authentication/Login";

function App() {
	return (
		<Router>
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
		</Router>
	);
}

export default App;
