// Util uses actions to edit the redux state
import { setWhichAccountComponentsDisplay } from "../actions";

/**
 * Sets 'accountModalEditInfo' property to true in 'componentsDisplay' Object
 * in ACCOUNT_CONTAINER of the redux state while setting all other properties
 * inside the Object to false.
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
 * Sets 'accountSidebar' property to true in 'componentsDisplay' Object in
 * ACCOUNT_CONTAINER of the redux state while setting all other properties
 * inside the Object to false.
 *
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function setTrueForOnlyAccountSidebar(dispatch) {
	dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
}
