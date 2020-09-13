import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	logoutAccount,
	setWhichAccountComponentsDisplay,
} from "../../../actions";

import { formatDateMMddYYYY } from "../../../utils/dateUtils";

import { truncate } from "../../../utils/displayUtils";

import "../../../SCSS/account/accountDropdown.scss";

export default function AccountDropdown() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const openEditInfoModals = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
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
						<span className="account-info account-info--large-bold">
							{truncate(
								reduxState.account.first_name +
									" " +
									reduxState.account.last_name,
								40,
								false
							)}
						</span>
						<span className="account-info">{reduxState.account.email}</span>
						<span className="account-info">
							Joined: {formatDateMMddYYYY(reduxState.account.joinDate)}
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
		</div>
	);
}
