// Util uses actions to edit the redux state
import { setWhichAccountComponentsDisplay } from "../actions";

/**
 * Opens AccountModalEditInfo component while closing all other account 
 * components (other than AccountModal as AccountModalEditInfo depends on it)
 *
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function openOnlyEditInfoModal(dispatch) {
	dispatch(
		setWhichAccountComponentsDisplay({
			accountModalEditInfo: true,
		})
	);
}

/**
 * Opens AccountSidebar component while closing all other account
 * components
 *
 * @param {Function} dispatch - Redux store's dispatch function from
 * useDispatch()
 */
export function openOnlyAccountSidebar(dispatch) {
	dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
}
