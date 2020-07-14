import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from "./authentication/Register";

function App() {
	return (
		<Router>
			<Route exact path="/register" component={Register} />
		</Router>
	);
}

export default App;
