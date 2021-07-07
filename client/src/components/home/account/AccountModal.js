import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import { ACCOUNT_CONTAINER } from "../../../actions/constants/containerNames";
import {
	getAccountModalComponentModalElementBackgroundColorClassNameForLightOrDarkMode,
	getCommonIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode,
	setTrueForOnlyAccountModalEditInfo,
	setTrueForOnlyAccountSidebar,
} from "../../../utils";
// Other components used by this component
import AccountModalEditInfo from "./AccountModalEditInfo";
import AccountModalEditEmail from "./AccountModalEditEmail";
import AccountModalEditPassword from "./AccountModalEditPassword";
import AccountModalDeleteAccount from "./AccountModalDeleteAccount";
import AccountModalEditSettings from "./AccountModalEditSettings";

/**
 * React functional component for shared HTML/CSS between all five account 
 * modals. Shared HTML/CSS abstract here consists of the modal background and
 * the top buttons used for navigating between modals and closing the modals to
 * return to AccountSidebar component (as user would have used AccountSidebar 
 * to navigate to this component).
 *
 * There is no single flag inside 'componentsDisplay' Object in 
 * ACCOUNT_CONTAINER of the redux state designated for if this component should 
 * display. Instead, this component should display if any of the flags 
 * beginning with accountModal are true (e.g. accountModalEditInfo).
 *
 * @component
 */
export default function AccountModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<div className="account-modal-component">
			<div
				className={
					"account-modal" +
					getAccountModalComponentModalElementBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				{/*accountModalEditInfo doesn't have back-icon-button since it 
				would go back to AccountSidebar, which is same as exit-icon-button*/}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalEditEmail === true ||
				reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalEditPassword === true ||
				reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalDeleteAccount === true ? (
					<div
						className={
							"back-icon-button" +
							getCommonIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
						alt="Button to return to editing account info"
						onClick={() => setTrueForOnlyAccountModalEditInfo(dispatch)}
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
						"exit-icon-button" +
						getCommonIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
					alt="Button to close the account modal"
					onClick={() => setTrueForOnlyAccountSidebar(dispatch)}
				>
					<i className="fa fa-times" aria-hidden="true" alt="icon of an X"></i>
				</div>
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalEditInfo ? (
					<AccountModalEditInfo />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalEditEmail ? (
					<AccountModalEditEmail />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalEditPassword ? (
					<AccountModalEditPassword />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalDeleteAccount ? (
					<AccountModalDeleteAccount />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalEditSettings ? (
					<AccountModalEditSettings />
				) : null}
			</div>
		</div>
	);
}
