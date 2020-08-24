import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	logoutAccount,
	setWhichAccountComponentsDisplay,
} from "../../../actions";

import { getElementSize } from "../../../utils/displaySizeUtils";

import { formatDateMMddYYYY } from "../../../utils/dateUtils";

import { truncate } from "../../../utils/displayUtils";

import EditInfoModal from "./EditInfoModal";
import EditEmailModal from "./EditEmailModal";
import EditPasswordModal from "./EditPasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";

import "../../../SCSS/account/accountDropdown.scss";

export default function AccountDropdown() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		let blurredBackgroundElement = document.getElementsByClassName(
			"js-account-modals-blurred-background"
		)[0];

		if (reduxState.accountComponentsDisplay.accountModals) {
			blurredBackgroundElement.style.visibility = "visible";
		} else {
			blurredBackgroundElement.style.visibility = "hidden";
		}
		// Will equal the height of the page
		blurredBackgroundElement.style.height =
			getElementSize("js-home-container").height + "px";
	}, [reduxState.accountComponentsDisplay.accountModals, reduxState.projects]);

	const openEditInfoModals = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountDropdown: true,
				editInfoModal: true,
			})
		);
	};

	const handleLogoutAccount = () => {
		dispatch(logoutAccount());
	};

	const logReduxState = () => {
		console.log(reduxState);
	};

	return (
		<div className="account-dropdown-component">
			<div className="dropdown-container">
				<div className="padded-container">
					<div className="account-info-container">
						<span className="account-info account-info--bold">
							{truncate(
								reduxState.account.firstName +
									" " +
									reduxState.account.lastName,
								40,
								false
							)}
						</span>
						<span className="account-info">{reduxState.account.email}</span>
						<span className="account-info">
							<span className="underlined">Joined:</span>{" "}
							{formatDateMMddYYYY(reduxState.account.joinDate)}
						</span>
					</div>
					<div className="account-link-container">
						<span onClick={openEditInfoModals} className="account-link">
							Edit Account
						</span>
						<span onClick={handleLogoutAccount} className="account-link">
							Logout
						</span>
						<span onClick={logReduxState} className="account-link">
							Console Log Redux State
						</span>
					</div>
				</div>
			</div>
			<div className="edit-account-modals-container">
				<div className="blurred-background js-account-modals-blurred-background" />
				{reduxState.accountComponentsDisplay.editInfoModal ? (
					<EditInfoModal />
				) : null}
				{reduxState.accountComponentsDisplay.editEmailModal ? (
					<EditEmailModal />
				) : null}
				{reduxState.accountComponentsDisplay.editPasswordModal ? (
					<EditPasswordModal />
				) : null}
				{reduxState.accountComponentsDisplay.deleteAccountModal ? (
					<DeleteAccountModal />
				) : null}
			</div>
		</div>
	);
}
