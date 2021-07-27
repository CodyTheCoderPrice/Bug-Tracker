import axios from "axios";
import jwt_decode from "jwt-decode";
// Container names used to work with the redux state
import { ACCOUNT_CONTAINER } from "./constants/containerNames";
import {
	SET_AUTHENTICATION,
	SET_ACCOUNT,
	SET_ACCOUNT_SETTINGS,
} from "./constants/types";
// Dispatch functions
import {
	createHeader,
	seBackendErrors,
	resetRedux,
	setWhichGeneralComponentsDisplay,
	setWhichAccountComponentsDisplay,
	setThemes,
	setSortCategories,
	setPriorityStatus,
	setProjects,
	setBugs,
	setComments,
	clearBackendErrors,
} from "./index";

/**
 * Sets 'isAuthenticated' property to true (indicating an account is currently
 * logged into the app), as well as the logged in account's authentication info
 * in 'auth' property in ACCOUNT_CONTAINER of the redux state.
 *
 * Note: The purpose of the 'isAuthenticated' property is to be another way of
 * telling if an account is currently logged into the app (can also tell by
 * checking if jwToken is present in localStorage). The purpose of the 'auth'
 * property is to be used to know if the account's current authentication
 * is expired, and to loggout the account when it does.
 *
 * @param {{
 *	account_id: number,
 * 	iat: number,
 * 	exp: number
 * }} decodedToken - Object containing JWT authentication info for account
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	setAuthentication({
 * 		account_id: 80,
 * 		iat: 1619803038,
 * 		exp: 1619889438
 * 	})
 * );
 */
export const setAuthentication = (decodedToken) => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: SET_AUTHENTICATION,
		decodedToken: decodedToken,
	});
};

/**
 * Sets logged in account's info in 'accountInfo' property in ACCOUNT_CONTAINER
 * of the redux state.
 *
 * Note: The purpose of the 'accountInfo' property is to be used to display
 * (e.g. displays account name in AccountSidebar component) and use (e.g.
 * populate text input with current account email in AccountModalEditEmail
 * component) the logged in account's info without constantly needing to
 * refetch it from the database.
 *
 * @param {{
 * 	account_id: number,
 * 	email: string,
 * 	first_name: string,
 * 	last_name: string,
 * 	join_date: string,
 * 	last_edited_timestamp: string
 * }} account - Object containing the account info
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	setAccount({
 * 		account_id: 80,
 * 		email: "JohnSmith@gmail.com",
 * 		first_name: "John",
 * 		last_name: "Smith",
 * 		join_date: "2021-04-30T04:00:00.000Z",
 * 		last_edited_timestamp: "1619802932"
 * 	})
 * );
 */
export const setAccount = (account) => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: SET_ACCOUNT,
		account: account,
	});
};

/**
 * Sets logged in account's settings info in 'settings' property in
 * ACCOUNT_CONTAINER of the redux state.
 *
 * Note: The purpose of the 'settings' property is to be used to display (e.g.
 * displays current settings in AccountModalEditSettings component) and use
 * (e.g. functions in colorUtils use dark_mode property) the logged in account's
 * settings without constantly needing to refetch it from the database.
 *
 * @param {{
 * 	setting_id: number,
 * 	filter_completed_projects_by_default: boolean,
 * 	filter_completed_bugs_by_default: boolean,
 * 	dark_mode: boolean,
 * 	theme_id: number,
 * 	theme_color: string,
 * 	project_sort_id: number,
 * 	project_sort_ascending: boolean,
 * 	bug_sort_id: number,
 * 	bug_sort_ascending: boolean,
 * 	last_edited_timestamp: string
 * }} accountSettings - Object containing the account settings
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	setAccountSettings({
 * 		setting_id: 4,
 * 		filter_completed_projects_by_default: false,
 * 		filter_completed_bugs_by_default: true,
 * 		dark_mode: false,
 * 		theme_id: 1,
 * 		theme_color: "blue-turkish",
 * 		project_sort_id: 2,
 * 		project_sort_ascending: true,
 * 		bug_sort_id: 2,
 * 		bug_sort_ascending: true,
 * 		last_edited_timestamp: "1619803044"
 * 	})
 * );
 */
export const setAccountSettings = (accountSettings) => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: SET_ACCOUNT_SETTINGS,
		accountSettings: accountSettings,
	});
};

/**
 * Calls api/account/register route to register a new account in the database,
 * and if successful, then open Login component while closing all other general
 * components.
 *
 * Note: The purpose of this dispatch function is to be used by the Register
 * component to allow users to register new accounts in the database.
 *
 * @param {{
 * 	first_name: string,
 * 	last_name: string,
 * 	email: string,
 * 	password: string
 * }} accountInfo - Object containing the info to create a new account
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	registerAccount({
 * 		first_name: "John",
 * 		last_name: "Smith",
 * 		email: "JohnSmith@gmail.com",
 * 		password: "PleaseDontGuessMyPassword"
 * 	})
 * );
 */
export const registerAccount = (accountInfo) => (dispatch) => {
	axios
		.post("/api/account/register", accountInfo)
		.then(() => {
			// Register was successful, so switching to the login page
			dispatch(setWhichGeneralComponentsDisplay({ login: true }));
		})
		.catch((err) => {
			// Sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));
		});
};

/**
 * Calls api/account/login route to login into an account. If successful, then
 * retrieves a jwToken to store in localStorage, retrieves all data for the
 * account from the database and stores each data set in their corresponding
 * containers (e.g. ACCOUNT_CONTAINER, PROJECT_CONTAINER, ect.) of the redux
 * state, and opens the Home component while closing the Login and Register
 * components.
 *
 * Note: The purpose of this dispatch function is to be used by the Login
 * component to allow users to login to their account and access the Home
 * component (which requires having all data for the account in the redux state
 * to function properly). Also, the reason jwToken is stored in localStorage is
 * becasue it's used by the createHeader function in actions/index.js.
 *
 * @param {{
 * 	email: string,
 * 	password: string
 * }} accountInfo - Object containing the account info for login
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	loginAccount({
 * 		email: "JohnSmith@gmail.com",
 * 		password: "PleaseDontGuessMyPassword"
 * 	})
 * );
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
				themes,
				sortCategories,
				projects,
				bugs,
				comments,
			} = res.data;

			// Stored locally to later be sent in the header of most HTTP calls
			// ...so the server can decode it to get the account_id for the call
			// ...as well as authenticate the call without being sent a password
			localStorage.setItem("jwToken", jwToken);

			// All data for the account was sent from the login route, and set
			// ...into redux from here so only one HTTP call is needed
			const decodedToken = jwt_decode(jwToken);
			dispatch(setAuthentication(decodedToken));
			dispatch(setPriorityStatus(projectPriorityStatus, bugPriorityStatus));
			dispatch(setAccount(account));
			dispatch(setAccountSettings(accountSettings));
			dispatch(setThemes(themes));
			dispatch(setSortCategories(sortCategories));
			dispatch(setProjects(projects));
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));

			// Login was successful, so switching to the home page
			dispatch(setWhichGeneralComponentsDisplay({ home: true }));
		})
		.catch((err) => {
			// Sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));
		});
};

/**
 * Calls api/account/retrieve route to retrieve the account info from the
 * database and store it in 'accountInfo' property in ACCOUNT_CONTAINER of the
 * redux state.
 *
 * Note: The purpose of this dispatch function is to have a way of retrieving
 * only the currently logged in account's info and nothing else from the
 * database. This dispatch function may go unused by the app, which is ok, as it
 * primarily exists to have the option.
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(retrieveAccount());
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
			// Sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls api/account/retrieve-settings route to retrieve the account settings
 * from the database and store it in 'settings' property in ACCOUNT_CONTAINER of
 * the redux state.
 *
 * Note: The purpose of this dispatch function is to have a way of retrieving
 * only the currently logged in account's settings and nothing else from the
 * database. This dispatch function may go unused by the app, which is ok, as it
 * primarily exists to have the option.
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(retrieveAccountSettings());
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
			// Sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls api/account/retrieve-everything route to retrieve all all data for the
 * account from the database and store each data set in their corresponding
 * containers (e.g. ACCOUNT_CONTAINER, PROJECT_CONTAINER, ect.) of the redux
 * state.
 *
 * Note: The purpose of this function is to have a more convenient and effecient
 * way of retrieving all data for the account. This is achieved by allowing all
 * data for the account to be retrieved from a single HTTP call.
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(retrieveEverythingForAccount());
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
				themes,
				sortCategories,
				projects,
				bugs,
				comments,
			} = res.data;

			dispatch(setPriorityStatus(projectPriorityStatus, bugPriorityStatus));
			dispatch(setAccount(account));
			dispatch(setAccountSettings(accountSettings));
			dispatch(setThemes(themes));
			dispatch(setSortCategories(sortCategories));
			dispatch(setProjects(projects));
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));
		})
		.catch((err) => {
			// Sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls api/account/update-info route to update the changeable info (i.e. first
 * and last name) for the account in the database, and if successful, then
 * stores the updated account info in 'accountInfo' property in ACCOUNT_CONTAINER
 * of the redux state, and opens AccountSidebar component while closing all other
 * account components.
 *
 * Note: The purpose of this function is to be used by the AccountModalEditInfo
 * component to allow the user to update their changeable account info (i.e.
 * first and last name) in the database (also the app by extension).
 *
 * @param {{
 * 	first_name: string,
 * 	last_name: string
 * }} newAccountNames - Object containing new account names (first and last)
 *
 * @example
 * // Updates account name to Jane Doe. The dispatch function is from
 * // ...useDispatch() imported from react-redux.
 * dispatch(
 * 	updateAccountInfo({
 * 		first_name: "Jane",
 * 		last_name: "Doe",
 * 	})
 * );
 */
export const updateAccountInfo = (newAccountNames) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/account/update-info", newAccountNames, header)
		.then((res) => {
			const { account } = res.data;
			// Updates the redux state with the new account name
			dispatch(setAccount(account));
			// Closes the accountModal and re-opens the accountSidebar (so the
			// ...user can see their updated name)
			dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
		})
		.catch((err) => {
			// Sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls api/account/update-email route to update the email for the account in
 * the database, and if successful, then stores the updated account email in
 * 'accountInfo' property in ACCOUNT_CONTAINER of the redux state, and opens
 * AccountSidebar component while closing all other account components.
 *
 * Note: The purpose of this function is to be used by the AccountModalEditEmail
 * component to allow the user to update their email in the database (also the
 * app by extension).
 *
 * @param {{
 * 	email: string,
 * 	currentPassword: string
 * }} newEmailCurrentPassword - Object containing the new account email, along
 * with current account password (correct password required to update)
 *
 * @example
 * // Updates account email to "JohnSmithSecondEmail@gmail.com". The dispatch
 * // ...function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	updateAccountEmail({
 * 		email: "JohnSmithSecondEmail@gmail.com",
 * 		currentPassword: "PleaseDontGuessMyPassword",
 * 	})
 * );
 */
export const updateAccountEmail = (newEmailCurrentPassword) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/account/update-email", newEmailCurrentPassword, header)
		.then((res) => {
			const { account } = res.data;
			// Updates the redux state with the new account email
			dispatch(setAccount(account));
			// Closes the accountModal and re-opens the accountSidebar
			dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
		})
		.catch((err) => {
			// Closes the accountModal and re-opens the accountSidebar (so the
			// ...user can see their updated email)
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls api/account/update-password route to update the password for the
 * account in the database, and if successful, then opens AccountSidebar
 * component while closing all other account components.
 *
 * Note: The purpose of this function is to be used by the AccountModalEditPassword
 * component to allow the user to update their password in the database.
 *
 * @param {{
 * 	newPassword: string,
 * 	currentPassword: string
 * }} newPasswordCurrentPassword - Object containing the new account password
 * and current account password (correct password required to update)
 *
 * @example
 * // Updates account password to "OhNoSomeoneGuessedMyPassword". The dispatch
 * // ...function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	updateAccountPassword({
 * 		newPassword: "OhNoSomeoneGuessedMyPassword",
 * 		currentPassword: "PleaseDontGuessMyPassword"
 * 	})
 * );
 */
export const updateAccountPassword =
	(newPasswordCurrentPassword) => (dispatch) => {
		const header = createHeader();
		axios
			.post("/api/account/update-password", newPasswordCurrentPassword, header)
			.then((res) => {
				const { account } = res.data;
				// Still updates the redux state despite not storing the new
				// ...password since the new account Object will contained an
				// ...updated last_edited_timestamp
				dispatch(setAccount(account));
				// Closes the accountModal and re-opens the accountSidebar (even
				// ...though the user won't see their updated password, this is
				// ...still done for consistency with similar routes)
				dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
			})
			.catch((err) => {
				// Sets backend errors for what went wrong to be displayed to user
				dispatch(seBackendErrors(err.response.data.backendErrors));

				if (err.response.data.backendErrors.jwToken !== undefined) {
					// jwToken was invalid (likely expired), so user is logged out
					dispatch(logoutAccount());
					console.log("Logged out user due to invalid/expired jwToken");
				}
			});
	};

/**
 * Calls api/account/update-settings route to update the account settings in
 * the database, and if successful, then stored the updated account settings in
 * 'settings' property in ACCOUNT_CONTAINER of the redux state.
 *
 * Note: The purpose of this function is to be used by the AccountModalEditSettings
 * and AccountSidebarEditAppearance components to allow the user to update their
 * settings in the database.
 *
 * @param {{
 * 	setting_id: number,
 * 	filter_completed_projects_by_default: boolean,
 * 	filter_completed_bugs_by_default: boolean,
 * 	dark_mode: boolean,
 * 	theme_id: number,
 * 	theme_color: string,
 * 	project_sort_id: number,
 * 	project_sort_ascending: boolean,
 * 	bug_sort_id: number,
 * 	bug_sort_ascending: boolean,
 * 	last_edited_timestamp: string
 * }} accountSettings - Object containing the new account settings
 *
 * @example
 * // Updates filter_completed_bugs_by_default to false (assuming it was true
 * // ...beforehand). The dispatch function is from useDispatch() imported from
 * // ...react-redux.
 * dispatch(
 * 	updateAccountSettings({
 * 		setting_id: 4,
 * 		filter_completed_projects_by_default: false,
 * 		filter_completed_bugs_by_default: false,
 * 		dark_mode: false,
 * 		theme_id: 1,
 * 		theme_color: "blue-turkish",
 * 		project_sort_id: 2,
 * 		project_sort_ascending: true,
 * 		bug_sort_id: 2,
 * 		bug_sort_ascending: true,
 * 		last_edited_timestamp: "1619803044"
 * 	})
 * );
 */
export const updateAccountSettings = (accountSettings) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/account/update-settings", accountSettings, header)
		.then((res) => {
			const { settings } = res.data;
			// Updates the redux state with the new account settings
			dispatch(setAccountSettings(settings));
			// Backend errors cleared since setting modal doesn't get closed on
			// ...success, meaning backend errors can remain
			dispatch(clearBackendErrors());
		})
		.catch((err) => {
			// Sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls api/account/delete route to delete the account in the database, and if
 * successful, then log the user out (which resets the redux state and opens the
 * Login component).
 *
 * Note: The purpose of this function is to be used by the AccountModalDeleteAccount
 * component to allow the user to delete their account in the database.
 *
 * @param {{
 *  capitalizedDeleteTypedOut: string,
 * 	currentPassword: string
 * }} deleteCheckAndCurrentPassword - Object containing the delete check and
 * current account password (correct password required to update)
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	deleteAccount({
 * 		capitalizedDeleteTypedOut: "DELETE",
 * 		currentPassword: "PleaseDontGuessMyPassword"
 * 	})
 * );
 */
export const deleteAccount = (deleteCheckAndCurrentPassword) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/account/delete", deleteCheckAndCurrentPassword, header)
		.then((res) => {
			dispatch(logoutAccount());
		})
		.catch((err) => {
			// Sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));
		});
};

/**
 * Logs out the currently logged in account by removing their jwToken from
 * localStorage and resetting the redux state (which resets the app and also 
 * opens the Login component).
 * 
 * Note: The purpose of this dispatch function is to be used by the AccountSidebar
 * component to allow the user to willfully logout of their account. It's also
 * used by other dispatch functions to logout the currently logged in account if
 * an error is returned from the backend during an HTTP request saying their 
 * jwToken has expired.
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(logoutAccount());
 */
export const logoutAccount = () => (dispatch) => {
	localStorage.removeItem("jwToken");
	dispatch(resetRedux());
};
