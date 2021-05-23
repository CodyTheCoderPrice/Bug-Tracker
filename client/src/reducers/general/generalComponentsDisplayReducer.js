import { SET_WHICH_GENERAL_COMPONENTS_DISPLAY } from "../../actions/constants/types";

// Initial state for which general components should be displayed by the app
const initialState = {
	// The following four relate to components and if they should be displayed
	register: false,
	login: true,
	home: false,
	// In GENERAL_CONTAINER since value should be same for both project and bug 
	// ...ItemViewListSidebar (as user likely would expect them to be)
	itemViewListSidebar: true,
	// true means user has clicked button to change whether ItemViewListSidebar
	// ...displays during this session; false means it's only been auto-decided
	// ...based on window size. Used to control when auto-decide happens, as it
	// ...will only continue to be auto-decided while false.
	itemViewListSidebarUserSet: false,
};

/**
 * Used to set 'componentsDisplay' Object into GENERAL_CONTAINER of the redux
 * state for which general components should be displayed by the app
 *
 * @param {{
 * 	register: boolean,
 * 	login: boolean,
 * 	home: boolean,
 * 	itemViewListSidebar: boolean,
 * 	itemViewListSidebarUserSet: boolean
 * }} state - Current Object (in the redux state) for which general components 
 * are being displayed by the app
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	register: boolean,
 * 	login: boolean,
 * 	home: boolean,
 * 	itemViewListSidebar: boolean,
 * 	itemViewListSidebarUserSet: boolean
 * }} Object for which general components should display by the app
 */
export default function generalComponentsDisplayReducer(state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_GENERAL_COMPONENTS_DISPLAY:
			return {
				// Ternary operator is used to set undefined components to
				// ...their default, so you only have to pass the components
				// ...you want to set differently, to make using this redux
				// ...action easier
				register:
					action.displays.register !== undefined
						? action.displays.register
						: false,
				login:
					action.displays.login !== undefined ? action.displays.login : false,
				home: action.displays.home !== undefined ? action.displays.home : false,
				// If undefined then true since default is true
				itemViewListSidebar:
					action.displays.itemViewListSidebar !== undefined
						? action.displays.itemViewListSidebar
						: true,
				itemViewListSidebarUserSet:
					action.displays.itemViewListSidebarUserSet !== undefined
						? action.displays.itemViewListSidebarUserSet
						: false,
			};
		default:
			return state;
	}
}
