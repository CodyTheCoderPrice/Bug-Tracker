import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// Used to persist the redux state
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {};

const middleware = [thunk];

// Used by redux-persist to persist the redux state
const rootPersistConfig = {
	key: "root",
	storage: storage,
	whitelist: [
		"generalContainer",
		 // Theses are persisted despite being re-fetched on page refresh
		 // ...so they are not null while their data is being retrieved
		"accountContainer",
		"projectContainer",
	],
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = createStore(
	persistedReducer,
	initialState,
	applyMiddleware(...middleware)
);

const persistor = persistStore(store);

export { store, persistor };
