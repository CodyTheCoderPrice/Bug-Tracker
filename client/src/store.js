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
	GENERAL_CONTAINER,
	SIZE_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	COMMENT_CONTAINER,
} from "./actions/constants/containerNames";
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
		ACCOUNT_CONTAINER,
		COMMENT_CONTAINER,
	],
};

//==============================================================================
// Following persistConfigs are used for nested redux persist, one level deeper
//==============================================================================
const generalComponentsPersistConfig = {
	key: GENERAL_CONTAINER,
	storage: storage,
	whitelist: ["componentsDisplay"],
};

const projectContainerPersistConfig = {
	key: PROJECT_CONTAINER,
	storage: storage,
	// Projects and priorityStatusOptions are persisted despite being re-fetched
	// ...on page refresh so they are not null while data is retrieved from server
	blacklist: ["searchFilterSort"],
};

const bugContainerPersistConfig = {
	key: BUG_CONTAINER,
	storage: storage,
	// Projects and priorityStatusOptions are persisted despite being re-fetched
	// ...on page refresh so they are not null while data is retrieved from server
	blacklist: ["searchFilterSort"],
};

// rootReducer is created here instead of in the reducer index.js
// ...so nested persist can be used
const rootReducer = combineReducers({
	[GENERAL_CONTAINER]: persistReducer(
		generalComponentsPersistConfig,
		generalContainerReducer
	),
	[SIZE_CONTAINER]: sizeContainerReducer,
	[ACCOUNT_CONTAINER]: accountContainerReducer,
	[COMMENT_CONTAINER]: commentContainerReducer,
	[PROJECT_CONTAINER]: persistReducer(
		projectContainerPersistConfig,
		projectContainerReducer
	),
	[BUG_CONTAINER]: persistReducer(
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
