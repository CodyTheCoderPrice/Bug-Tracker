// Initial state for global constants (set here and never changed)
const initialState = {
	// The following five relate to char restraints for input fields
	nameCharLimit: 35,
	passwordCharMin: 6,
	passwordCharLimit: 30,
	descriptionCharLimit: 500,
	locationCharLimit: 100,
	// Min font size when resizing breadcrumb text. USed to know ehn to switch
	// ...to the NavbarHamburger menu
	navbarBreadcrumbMinimumFontSize: 12,
};

/**
 * Used to set 'globalConstants' property containing constant data used globally 
 * by the app into GENERAL_CONTAINER of the redux state
 *
 * @param {{
 * 	nameCharLimit: number,
 * 	passwordCharMin: number,
 * 	passwordCharLimit: number,
 * 	descriptionCharLimit: number,
 * 	locationCharLimit: number,
 * 	navbarBreadcrumbMinimumFontSize: number,
 * }} state - Current Object (in the redux state) containing constant data used 
 * globally by the app
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	nameCharLimit: number,
 * 	passwordCharMin: number,
 * 	passwordCharLimit: number,
 * 	descriptionCharLimit: number,
 * 	locationCharLimit: number,
 * 	navbarBreadcrumbMinimumFontSize: number,
 * }} Object containing constant data used globally by the app
 */
export default function globalConstantsReducer() {
	// Since this reducer is for constant data that is set in inital state, it
	// ...only needs to return the initial state
	return initialState;
}
