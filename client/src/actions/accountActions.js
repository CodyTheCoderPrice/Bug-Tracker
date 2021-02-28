import axios from "axios";
import jwt_decode from "jwt-decode";

// Redux containers
import { ACCOUNT_CONTAINER } from "./constants/containerNames";
// Redux types
import {
	SET_AUTHENTICATION,
	SET_ACCOUNT,
	SET_ACCOUNT_SETTINGS,
	SET_ACCOUNT_SETTING_THEMES,
	SET_ACCOUNT_SETTING_SORT_CATEGORIES,
} from "./constants/types";
// Redux dispatch functions
import {
	createHeader,
	seBackendErrors,
	resetRedux,
	setWhichGeneralComponentsDisplay,
	setWhichAccountComponentsDisplay,
	setPriorityStatus,
	setProjects,
	setBugs,
	setComments,
	clearBackendErrors,
} from "./index";

/**
 * Sets the accounts authentication information inside the account container
 * of the redux state
 *
 * @param {JSON} decodedToken - JSON containing authentication info for account
 */
export const setAuthentication = (decodedToken) => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: SET_AUTHENTICATION,
		decodedToken: decodedToken,
	});
};

/**
 * Sets the account info inside the account container of the redux state
 *
 * @param {JSON} account - JSON containing the account info
 */
export const setAccount = (account) => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: SET_ACCOUNT,
		account: account,
	});
};

/**
 * Sets the account settings inside the account container of the redux state
 *
 * @param {JSON} accountSettings - JSON containing the account settings
 */
export const setAccountSettings = (accountSettings) => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: SET_ACCOUNT_SETTINGS,
		accountSettings: accountSettings,
	});
};

/**
 * Sets account setting themes inside the account container of the redux state
 *
 * @param {JSON} accountSettingThemes - JSON containing the account setting
 * themes
 */
export const setAccountSettingThemes = (accountSettingThemes) => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: SET_ACCOUNT_SETTING_THEMES,
		accountSettingThemes: accountSettingThemes,
	});
};

/**
 * Sets account setting sort categories inside the account container of the
 * redux state
 *
 * @param {JSON} accountSettingSortCategories - JSON containing the account setting
 * sort categories
 */
export const setAccountSettingSortCategories = (accountSettingSortCategories) => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: SET_ACCOUNT_SETTING_SORT_CATEGORIES,
		accountSettingSortCategories: accountSettingSortCategories,
	});
};

/**
 * Calls api/account/register route to register a new account in the database
 * and open the login page
 *
 * @param {JSON} accountInfo - JSON containing the info to create a new account
 */
export const registerAccount = (accountInfo) => (dispatch) => {
	axios
		.post("/api/account/register", accountInfo)
		.then(() => {
			// register was successful, so switching to the login page
			dispatch(setWhichGeneralComponentsDisplay({ login: true }));
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));
		});
};

/**
 * Calls api/account/login route to login into an account, retrieve a jwToken
 * to store in localStorage, retrieve all account data from the database amd
 * store each data set in their corresponding redux state containers, and open
 * the home page
 *
 * @param {JSON} accountInfo - JSON containing the account info for login
 */
export const loginAccount = (accountInfo) => (dispatch) => {
	axios
		.post("/api/account/login", accountInfo)
		.then((res) => {
			const {
				projectPriorityStatus,
				bugPriorityStatus,
				jwToken,
				account,
				accountSettings,
				accountSettingThemes,
				accountSettingSortCategories,
				projects,
				bugs,
				comments,
			} = res.data;

			// stored locally to later be sent in the header of most http calls
			// ...so the server can both decode it get the account_id for the call
			// ...as well as authenticate the call without being sent a password
			localStorage.setItem("jwToken", jwToken);

			// all account data was sent from login route and set here so only
			// ...one http call was needed
			const decodedToken = jwt_decode(jwToken);
			dispatch(setAuthentication(decodedToken));
			dispatch(setPriorityStatus(projectPriorityStatus, bugPriorityStatus));
			dispatch(setAccount(account));
			dispatch(setAccountSettings(accountSettings));
			dispatch(setAccountSettingThemes(accountSettingThemes));
			dispatch(setAccountSettingSortCategories(accountSettingSortCategories));
			dispatch(setProjects(projects));
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));

			// login was successful, so switching to the home page
			dispatch(setWhichGeneralComponentsDisplay({ home: true }));
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));
		});
};

/**
 * Calls api/account/retrieve route to retrieve the account info from the
 * database and store it in the account container of the redux state
 */
export const retrieveAccount = () => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/account/retrieve", null, header)
		.then((res) => {
			const { account } = res.data;
			dispatch(setAccount(account));
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

/**
 * Calls api/account/retrieve-settings route to retrieve the account settings
 * from the database and store it in the account container of the redux state
 */
export const retrieveAccountSettings = () => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/account/retrieve-settings", null, header)
		.then((res) => {
			const { accountSettings } = res.data;
			dispatch(setAccountSettings(accountSettings));
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

/**
 * Calls api/account/retrieve-setting-themes route to retrieve the account
 * setting themes from the database and store it in the account container of
 * the redux state
 */
export const retrieveAccountSettingThemes = () => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/account/retrieve-setting-themes", null, header)
		.then((res) => {
			const { accountSettingThemes } = res.data;
			dispatch(setAccountSettingThemes(accountSettingThemes));
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

/**
 * Calls api/account/retrieve-sort-categories route to retrieve the sort
 * categories from the database and store it in the account container of
 * the redux state
 */
export const retrieveSortCategories = () => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/account/retrieve-setting-sort-categories", null, header)
		.then((res) => {
			const { accountSettingSortCategories } = res.data;
			dispatch(setAccountSettingSortCategories(accountSettingSortCategories));
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

/**
 * Calls api/account/retrieve-everything route to retrieve all account data
 * from the database and store each data set in their corresponding redux
 * state containers
 */
export const retrieveEverythingForAccount = () => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/account/retrieve-everything", null, header)
		.then((res) => {
			const {
				projectPriorityStatus,
				bugPriorityStatus,
				account,
				accountSettings,
				accountSettingThemes,
				accountSettingSortCategories,
				projects,
				bugs,
				comments,
			} = res.data;

			dispatch(setPriorityStatus(projectPriorityStatus, bugPriorityStatus));
			dispatch(setAccount(account));
			dispatch(setAccountSettings(accountSettings));
			dispatch(setAccountSettingThemes(accountSettingThemes));
			dispatch(setAccountSettingSortCategories(accountSettingSortCategories));
			dispatch(setProjects(projects));
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

/**
 * Calls api/account/update-info route to update the name for the account in
 * the database, store the updated account info in the account container of the
 * redux state, and re-open to the accountSidebar
 *
 * @param {JSON} accountInfo - JSON containing the new account name
 */
export const updateAccountInfo = (accountInfo) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/account/update-info", accountInfo, header)
		.then((res) => {
			const { account } = res.data;
			// updates the redux state with the new account name
			dispatch(setAccount(account));
			// closes the accountModal and re-opens the accountSidebar
			dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

/**
 * Calls api/account/update-email route to update the email for the account in
 * the database, store the updated account email in the account container of
 * the redux state, and re-open to the accountSidebar
 *
 * @param {JSON} accountInfo - JSON containing the new account email
 */
export const updateAccountEmail = (accountInfo) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/account/update-email", accountInfo, header)
		.then((res) => {
			const { account } = res.data;
			// updates the redux state with the new account email
			dispatch(setAccount(account));
			// closes the accountModal and re-opens the accountSidebar
			dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

/**
 * Calls api/account/update-password route to update the password for the
 * account in the database and re-open to the accountSidebar
 *
 * @param {JSON} accountInfo - JSON containing the new account password
 */
export const updateAccountPassword = (accountInfo) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/account/update-password", accountInfo, header)
		.then((res) => {
			const { account } = res.data;
			// still updates the redux state despite not storing the new
			// ...password since the new account JSON will contained an
			// ...updated last_edited_timestamp
			dispatch(setAccount(account));
			// closes the accountModal and re-opens the accountSidebar
			dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

/**
 * Calls api/account/delete route to delete the account in the database and log
 * the user out (which resets the redux state and opens the login page)
 *
 * @param {JSON} accountInfo - JSON containing the new account password and delete check
 */
export const deleteAccount = (accountInfo) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/account/delete", accountInfo, header)
		.then((res) => {
			dispatch(logoutAccount());
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));
		});
};

/**
 * Calls api/account/update-settings route to update the account settings in
 * the database, store the updated account settings in the account container of
 * the redux state
 *
 * @param {JSON} accountSettings - JSON containing the new account settings
 */
export const updateAccountSettings = (accountSettings) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/account/update-settings", accountSettings, header)
		.then((res) => {
			const { settings } = res.data;
			// updates the redux state with the new account settings
			dispatch(setAccountSettings(settings));
			// Backend errors cleared since setting modal doesn't get closed on
			// ...success, meaning backend errors can remain
			dispatch(clearBackendErrors());
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

/**
 * Logs an account out by removing their jwToken from the localStorage and
 * resetting the redux state (which also opens the login page)
 */
export const logoutAccount = () => (dispatch) => {
	localStorage.removeItem("jwToken");
	dispatch(resetRedux());

	console.log("Message: logged out");
};
