import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
// used to persist redux state
import { PersistGate } from "redux-persist/integration/react";
// Redux store
import { Provider } from "react-redux";
import { store, persistor } from "./store";

import App from "./components/App";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router>
					<Route path="/" exact component={App} />
				</Router>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
