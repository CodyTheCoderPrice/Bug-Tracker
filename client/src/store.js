import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// using redux-persist to persist the redux state
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {};

const middleware = [thunk];

// used to persist redux state
const persistConfig = {
	key: "root",
	storage,
	whitelist: [
		"authComponentsDisplay",
		"projectComponentsDisplay",
		"priorityStatusArrays",
		"auth",
		 // Theses are persisted despite being updated on page refresh
		 // ...so they are not null while their data is being re-fetched
		"account",
		"projects",
	],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
	persistedReducer,
	initialState,
	applyMiddleware(...middleware)
);

const persistor = persistStore(store);

export { store, persistor };
