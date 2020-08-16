import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { formatDateMMddYYY } from "../../../utils/dateUtils";

import { truncate } from "../../../utils/displayUtils";

import {
	logoutAccount,
	setWhichAccountComponentsDisplay,
} from "../../../actions";

import "../../../SCSS/account/accountDropdown.scss";

export default function AccountDropdown() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		name: reduxState.account.firstName + " " + reduxState.account.lastName,
		email: reduxState.account.email,
		joinDate: formatDateMMddYYY(reduxState.account.joinDate),
	});

	// Keeps the accountInfo in sync with redux state after changes
	useEffect(() => {
		setAccountInfo({
			name: reduxState.account.firstName + " " + reduxState.account.lastName,
			email: reduxState.account.email,
			joinDate: formatDateMMddYYY(reduxState.account.joinDate),
		});
	}, [reduxState.account]);

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
							{truncate(accountInfo.name, 40, false)}
						</span>
						<span className="account-info">{accountInfo.email}</span>
						<span className="account-info"><span className="underlined">Joined:</span> {accountInfo.joinDate}</span>
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
