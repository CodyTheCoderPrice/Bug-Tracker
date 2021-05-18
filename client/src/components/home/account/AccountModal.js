import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACCOUNT_CONTAINER } from "../../../actions/constants/containerNames";
// Component uses container names to work with the redux state
import { setWhichAccountComponentsDisplay } from "../../../actions";
import {
	getAccountSidebarAndModalBackgroundColorClassNameForLightOrDarkMode,
	getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode,
	openOnlyEditInfoModal,
	openOnlyAccountSidebar,
	filterObject,
	getStringOfAllArrayValues,
} from "../../../utils";
// Other components used by this component
import AccountModalChangeInfo from "./AccountModalChangeInfo";
import AccountModalChangeEmail from "./AccountModalChangeEmail";
import AccountModalChangePassword from "./AccountModalChangePassword";
import AccountModalDeleteAccount from "./AccountModalDeleteAccount";
import AccountModalChangeSettings from "./AccountModalChangeSettings";

/**
 * React functional component for everything shared between all five account 
 * modals. This consists of the modal background, and the top buttons used for
 * navigating between modals and closing the modals to return AccountSidebar
 * component.
 *
 * This component should only be active if an account modal is set to true in 
 * the componentsDisplay of the account container of the redux state. Only one
 * account modal should be set to true at one time.
 *
 * @component
 */
export default function AccountModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Prevents multiple account modals from displaying as it messes with CSS
	useEffect(() => {
		let accountModalsSetToTrue = filterObject(
			reduxState[ACCOUNT_CONTAINER].componentsDisplay,
			(boolean) => boolean === true
		);
		// Removes accountSidebar (if present) as it's not a modal
		delete accountModalsSetToTrue.accountSidebar;

		const keysOfAccountModalsSetToTrue = Object.keys(accountModalsSetToTrue);

		if (keysOfAccountModalsSetToTrue.length > 1) {
			// Choosing key is arbitrary, but first key is easiest
			dispatch(
				setWhichAccountComponentsDisplay({
					[keysOfAccountModalsSetToTrue[0]]:
						accountModalsSetToTrue[keysOfAccountModalsSetToTrue[0]],
				})
			);
			console.log(
				"Warning: " +
					getStringOfAllArrayValues(keysOfAccountModalsSetToTrue) +
					" were all set to true in the account container of redux state. To avoid CSS issues with AccountModal component, redux was updated so only " +
					keysOfAccountModalsSetToTrue[0] +
					" is true."
			);
		}
		// eslint-disable-next-line
	}, [reduxState[ACCOUNT_CONTAINER].componentsDisplay]);

	return (
		<div className="edit-account-modal-component">
			<div
				className={
					"edit-account-modal" +
					getAccountSidebarAndModalBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				{/*accountModalChangeInfo doesn't have back-button since it 
				would go back to AccountSidebar, which is same as exit-button*/}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalChangeEmail === true ||
				reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalChangePassword === true ||
				reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalDeleteAccount === true ? (
					<div
						className={
							"back-button" +
							getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
						alt="Button to return to editing account info"
						onClick={() => openOnlyEditInfoModal(dispatch)}
					>
						<i
							className="fa fa-arrow-left"
							aria-hidden="true"
							alt="Icon of an arrow pointing to the left"
						/>
					</div>
				) : null}
				<div
					className={
						"exit-button" +
						getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
					alt="Button to close the account modal"
					onClick={() => openOnlyAccountSidebar(dispatch)}
				>
					<i className="fa fa-times" aria-hidden="true" alt="icon of an X"></i>
				</div>
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalChangeInfo ? (
					<AccountModalChangeInfo />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalChangeEmail ? (
					<AccountModalChangeEmail />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalChangePassword ? (
					<AccountModalChangePassword />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalDeleteAccount ? (
					<AccountModalDeleteAccount />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalChangeSettings ? (
					<AccountModalChangeSettings />
				) : null}
			</div>
		</div>
	);
}
