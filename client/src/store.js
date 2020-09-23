import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
	generalContainerReducer,
	sizeContainerReducer,
	accountContainerReducer,
	projectContainerReducer,
	bugContainerReducer,
} from "./reducers";
import {
	generalContainerName,
	sizeContainerName,
	accountContainerName,
	projectContainerName,
	bugContainerName,
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
		// Persisted despite account info being re-fetched on page refresh
		// ...so it is not null while data is retrieved from server
		"accountContainer",
	],
};

// Following two are used for nested redux persist, one level deeper
const coreComponentsPersistConfig = {
	key: generalContainerName,
	storage: storage,
	whitelist: ["coreComponentsDisplay"],
};

const projectContainerPersistConfig = {
	key: projectContainerName,
	storage: storage,
	// Projects and priorityStatusOptions are persisted despite being re-fetched
	// ...on page refresh so they are not null while data is retrieved from server
	blacklist: ["massDeleteList"],
};

// rootReducer is combined here instead of in the reducer index.js 
// ...so nested persist can be used
const rootReducer = combineReducers({
	[generalContainerName]: persistReducer(coreComponentsPersistConfig, generalContainerReducer),
	[sizeContainerName]: sizeContainerReducer,
	[accountContainerName]: accountContainerReducer,
	[projectContainerName]: persistReducer(projectContainerPersistConfig, projectContainerReducer),
	[bugContainerName]: bugContainerReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = createStore(
	persistedReducer,
	initialState,
	applyMiddleware(...middleware)
);

const persistor = persistStore(store);

export { store, persistor };
