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
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
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
 * 'ACCOUNT_CONTAINER' of the redux state designated for if this component should
 * display. Instead, this component should display if any of the flags
 * beginning with 'accountModal...' are true (e.g.
 * accountModalEditInfoComponentShouldDisplay).
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
				{/*AccountModalEditInfo doesn't have back-icon-button since it 
				would go back to AccountSidebar, which is same as exit-icon-button*/}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalEditEmailComponentShouldDisplay === true ||
				reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalEditPasswordComponentShouldDisplay === true ||
				reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalDeleteAccountComponentShouldDisplay === true ? (
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
						<FontAwesomeIcon icon={faArrowLeft} alt="Icon of an arrow pointing to the left"/>
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
					<FontAwesomeIcon icon={faXmark} alt="icon of an X"/>
				</div>
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalEditInfoComponentShouldDisplay ? (
					<AccountModalEditInfo />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalEditEmailComponentShouldDisplay ? (
					<AccountModalEditEmail />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalEditPasswordComponentShouldDisplay ? (
					<AccountModalEditPassword />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalDeleteAccountComponentShouldDisplay ? (
					<AccountModalDeleteAccount />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalEditSettingsComponentShouldDisplay ? (
					<AccountModalEditSettings />
				) : null}
			</div>
		</div>
	);
}
