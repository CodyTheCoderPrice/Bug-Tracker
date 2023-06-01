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

// Root level persistConfig
const rootPersistConfig = {
	key: "root",
	storage: storage,
	whitelist: [
		// Persisted despite account info and comments being re-fetched on page
		// ...refresh, so they're not null while data is re-fetched from server
		ACCOUNT_CONTAINER,
		COMMENT_CONTAINER,
	],
};

// Nested persistConfigs (one level deeper than root)
const generalComponentsPersistConfig = {
	key: GENERAL_CONTAINER,
	storage: storage,
	// themes and sortCategories are persisted despite being re-fetched on page
	// ...refresh, so they're not null while data is re-fetched from server
	whitelist: ["componentsDisplay", "themes", "sortCategories"],
};

// Nested persistConfigs (one level deeper than root)
const projectContainerPersistConfig = {
	key: PROJECT_CONTAINER,
	storage: storage,
	// list and priorityStatusOptions are persisted despite being re-fetched on
	// ...page refresh, so they're not null while data is re-fetched from server
	blacklist: ["searchFilterSort"],
};

// Nested persistConfigs (one level deeper than root)
const bugContainerPersistConfig = {
	key: BUG_CONTAINER,
	storage: storage,
	// list and priorityStatusOptions are persisted despite being re-fetched on
	// ...page refresh, so they're not null while data is re-fetched from server
	blacklist: ["searchFilterSort"],
};

// rootReducer is created here instead of in the reducers/index.js so nested
// ...persist can be used
const rootReducer = combineReducers({
	[GENERAL_CONTAINER]: persistReducer(
		generalComponentsPersistConfig,
		generalContainerReducer
	),
	// SIZE_CONTAINER not persisted as variables always need to be recalculated
	// ...and constants may have changed since last refresh from a website update
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

const initialState = {};

const middleware = [thunk];

const store = createStore(
	persistedReducer,
	initialState,
	applyMiddleware(...middleware)
);

const persistor = persistStore(store);

export { store, persistor };
