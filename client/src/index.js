import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// used to persist redux state
import { PersistGate } from "redux-persist/integration/react";

// Redux store
import { Provider } from "react-redux";
import { store, persistor } from "./store";

import "./SCSS/index.scss";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
