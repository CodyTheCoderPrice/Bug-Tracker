import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
	generalContainerReducer,
	sizeContainerReducer,
	accountContainerReducer,
	projectContainerReducer,
	bugContainerReducer,
	commentContainerReducer,
} from "./reducers";
import {
	generalContainerName,
	sizeContainerName,
	accountContainerName,
	projectContainerName,
	bugContainerName,
	commentContainerName,
} from "./reducers/containerNames";
// Used to persist the redux state
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {};

const middleware = [thunk];

// Used to persist redux at the root level
const rootPersistConfig = {
	key: "root",
	storage: storage,
	whitelist: [
		// Persisted despite account info and comments being re-fetched on
		// ...page refresh so it is not null while data is retrieved from server
		"accountContainer",
		"commentContainer"
	],
};

//==============================================================================
// Following persistConfigs are used for nested redux persist, one level deeper
//==============================================================================
const generalComponentsPersistConfig = {
	key: generalContainerName,
	storage: storage,
	whitelist: ["componentsDisplay"],
};

const projectContainerPersistConfig = {
	key: projectContainerName,
	storage: storage,
	// Projects and priorityStatusOptions are persisted despite being re-fetched
	// ...on page refresh so they are not null while data is retrieved from server
	blacklist: ["massDeleteList", "searchFilterSort"],
};

const bugContainerPersistConfig = {
	key: bugContainerName,
	storage: storage,
	// Projects and priorityStatusOptions are persisted despite being re-fetched
	// ...on page refresh so they are not null while data is retrieved from server
	blacklist: ["massDeleteList", "searchFilterSort"],
};

// rootReducer is created here instead of in the reducer index.js
// ...so nested persist can be used
const rootReducer = combineReducers({
	[generalContainerName]: persistReducer(
		generalComponentsPersistConfig,
		generalContainerReducer
	),
	[sizeContainerName]: sizeContainerReducer,
	[accountContainerName]: accountContainerReducer,
	[commentContainerName]: commentContainerReducer,
	[projectContainerName]: persistReducer(
		projectContainerPersistConfig,
		projectContainerReducer
	),
	[bugContainerName]: persistReducer(
		bugContainerPersistConfig,
		bugContainerReducer
	),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = createStore(
	persistedReducer,
	initialState,
	applyMiddleware(...middleware)
);

const persistor = persistStore(store);

export { store, persistor };
