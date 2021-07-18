import { SET_WHICH_GENERAL_COMPONENTS_DISPLAY } from "../../actions/constants/types";
import { filterObject, getStringOfAllArrayValues } from "../../utils";

// Initial state for which general components should be displayed by the app
const initialState = {
	// The following four relate to components and if they should be displayed.
	// ...Exactly one of the following three components should be true at any
	// ...given point in time, as they will cause CSS issues with one another
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
 * Used to set 'componentsDisplay' property into GENERAL_CONTAINER of the redux
 * state for which general components should be displayed by the app. Exactly
 * one of actions.displays register, login, and home properties should set to 
 * true at any given point in time. If an account is logged into the app (i.e.
 * there is a jwToken in localStoreage), then home component will be set to true
 * while register and login components set to false in the redux state, even if
 * home was not attempted to be set to true. If more or less than one of these 
 * components is true in actions.displays but no account is logged into the
 * app, then either login or register will be set to true in the redux state, 
 * with login taking prioirty over register. If any expected properties in 
 * actions.displays (e.g. resgister, login, ect.) are undefined, then they will
 * be set to false in the redux state (except for itemViewListSidebar, which 
 * will be set to true).
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
export default function generalComponentsDisplayReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case SET_WHICH_GENERAL_COMPONENTS_DISPLAY:
			let registerLoginHomeComponentsSetToTrue = filterObject(
				{
					register: action.displays.register,
					login: action.displays.login,
					home: action.displays.home,
				},
				(boolean) => boolean === true
			);	

			const keysOfRegisterLoginHomeComponentsSetToTrue = Object.keys(
				registerLoginHomeComponentsSetToTrue
			);
		
			// Makes sure if an account is logged into the app (i.e. there is a 
			// ...jwToken in localStoreage) then home component displays instead
			// ...of register or login
			if (localStorage.getItem("jwToken") !== null) {
				if (action.displays.home !== true) {
					console.log(
						"Error: An account is logged into the app, but home was not attempted to be set to true in in generalComponentsDisplayReducer, which goes against its intended use, so home component was set to true."
					);
				} else if (
					keysOfRegisterLoginHomeComponentsSetToTrue.length > 1
				) {
					console.log(
						"Error: " +
							getStringOfAllArrayValues(keysOfRegisterLoginHomeComponentsSetToTrue) +
							" were all attempted to be set to true in generalComponentsDisplayReducer, which goes against their intended use. Since an account is logged into the app, home component was set to true, while login and register components were set to false."
					);
				}

				action.displays["register"] = false;
				action.displays["login"] = false;
				action.displays["home"] = true;
			}
			// Since an account is not logged into the app (i.e. there is no 
			// ...jwToken in localStoreage), makes sure either login or resiger
			// ...components display instead of home
			else if (keysOfRegisterLoginHomeComponentsSetToTrue.length > 1)
			{
				if (action.displays.login === true) {
					console.log(
						"Error: " +
							getStringOfAllArrayValues(keysOfRegisterLoginHomeComponentsSetToTrue) +
							" were all attempted to be set to true in generalComponentsDisplayReducer, which goes against their intended use. Since no account is authenticaed as logged in, login component was set to true, while register and home components were set to false."
					);

					action.displays["register"] = false;
					action.displays["login"] = true;
					action.displays["home"] = false;
				} else {
					console.log(
						"Error: " +
							getStringOfAllArrayValues(keysOfRegisterLoginHomeComponentsSetToTrue) +
							" were all attempted to be set to true in generalComponentsDisplayReducer, which goes against their intended use. Since no account is authenticaed as logged in, register component was set to true, while login and home components were set to false."
					);

					action.displays["register"] = true;
					action.displays["login"] = false;
					action.displays["home"] = false;
				}
			}

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
