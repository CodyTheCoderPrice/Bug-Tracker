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
 * Sets logged in account's authentication info in 'auth' Object in
 * ACCOUNT_CONTAINER of the redux state.
 *
 * Note: The purpose of 'auth' Object is so frontend can tell if an account is
 * logged in, which determins which general components (i.e. Register, Login,
 * Home) can be displayed.
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
 * Sets logged in account's info in 'accountInfo' Object in ACCOUNT_CONTAINER
 * of the redux state.
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
 * Sets logged in account's settings info in 'settings' Object in
 * ACCOUNT_CONTAINER of the redux state.
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
 * retrieves a jwToken to store in localStorage, retrieves all account data from
 * the database and stores each data set in their corresponding containers (e.g.
 * ACCOUNT_CONTAINER, PROJECT_CONTAINER, ect.) of the redux state, and opens
 * the Home component while closing the Login and Register components.
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
 * database and store it in 'accountInfo' Object in ACCOUNT_CONTAINER of the
 * redux state
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
 * from the database and store it in 'settings' Object in ACCOUNT_CONTAINER of
 * the redux state
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
 * Calls api/account/retrieve-everything route to retrieve all account data
 * from the database and store each data set in their corresponding containers
 * (e.g. ACCOUNT_CONTAINER, PROJECT_CONTAINER, ect.) of the redux state
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
 * Calls api/account/update-info route to update the name for the account in
 * the database, and if successful, then stores the updated account info in 
 * 'accountInfo' Object in ACCOUNT_CONTAINER of the redux state, and opens
 * AccountSidebar component while closing all other account components
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
			// Closes the accountModal and re-opens the accountSidebar
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
 * 'accountInfo' Object in ACCOUNT_CONTAINER of the redux state, and opens
 * AccountSidebar component while closing all other account components
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
 * Calls api/account/update-password route to update the password for the
 * account in the database, and if successful, then opens AccountSidebar 
 * component while closing all other account components
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
				// Closes the accountModal and re-opens the accountSidebar
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
 * Calls api/account/delete route to delete the account in the database, and if
 * successful, then log the user out (which resets the redux state and opens the
 * login page)
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
 * Calls api/account/update-settings route to update the account settings in
 * the database, and if successful, then stored the updated account settings in
 * 'settings' Object in ACCOUNT_CONTAINER of the redux state
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
 * Logs account out by removing their jwToken from the localStorage and
 * resetting the redux state (which resets the app and also opens the login
 * page)
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(logoutAccount());
 */
export const logoutAccount = () => (dispatch) => {
	localStorage.removeItem("jwToken");
	dispatch(resetRedux());
};
