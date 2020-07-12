import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";

ReactDOM.render(
	<React.StrictMode>
		<Provider>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
