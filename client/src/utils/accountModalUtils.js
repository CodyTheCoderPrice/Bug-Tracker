// Util uses actions to edit the redux state
import { setWhichAccountComponentsDisplay } from "../actions";

/**
 * Sets 'accountModalEditInfo' property to true, and all other properties to 
 * false, in 'componentsDisplay' property's Object in 'ACCOUNT_CONTAINER' of the
 * redux state.
 * 
 * Note: The purpose of this is to have AccountModalEditInfo be the only account
 * component, that has an associated property in 'componentsDisplay' property's 
 * Object in 'ACCOUNT_CONTAINER', displayed by the app. To clarify, there may 
 * still be intent to have account components without an associated property in
 * that Object be displayed (e.g. AccountBlurredBackground).
 *
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function setTrueForOnlyAccountModalEditInfo(dispatch) {
	dispatch(
		setWhichAccountComponentsDisplay({
			accountModalEditInfo: true,
		})
	);
}

/**
 * Sets 'accountSidebar' property to true, and all other properties to false, in
 * 'componentsDisplay' property's Object in 'ACCOUNT_CONTAINER' of the redux state
 * 
 * Note: The purpose of this is to have AccountSidebar be the only account 
 * component, that has an associated property in 'componentsDisplay' property's 
 * Object in 'ACCOUNT_CONTAINER', displayed by the app. To clarify, there may 
 * still be intent to have account components without an associated property in
 * that Object be displayed (e.g. AccountBlurredBackground). 
 *  
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function setTrueForOnlyAccountSidebar(dispatch) {
	dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
}
