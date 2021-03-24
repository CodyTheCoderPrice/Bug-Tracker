// Default state for global constants (set here and never changed)
const initialState = {
	nameCharLimit: 35,
	passwordCharMin: 6,
	passwordCharLimit: 30,
	descriptionCharLimit: 500,
	locationCharLimit: 100,
	navbarBreadcrumbMinimumFontSize: 12,
};

/**
 * Used to set JSON for global constants in the general container of the redux
 * state
 *
 * @param {JSON} state - JSON for the global constants currently being stored
 * in the redux state
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {JSON} - JSON for the global constants currently being stored
 * in the general container of the redux state
 */
export default function () {
	/*
	Since this reducer is for constants that are set in the inital state and
	never changed, simply just return the state and do nothing else
	*/
	return initialState;
}
