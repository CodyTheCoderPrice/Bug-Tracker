import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AccountDropdown from "./account/AccountDropdown";

import { setNavbarDropdownComponents } from "../../actions";

import "../../SCSS/homeNavBar.scss";
import "font-awesome/css/font-awesome.min.css";

export default function HomeNavBar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const openAccountDropdown = () => {
		const elem = document.getElementById("accountClickableDiv");
		if (reduxState.navbarDropsdowns.accountDropdown === null) {
			elem.style.backgroundColor = "#596f87";
		}
		else {
			elem.style.backgroundColor = "#50677f";
		}

		dispatch(
			setNavbarDropdownComponents({
				accountDropdown: (reduxState.navbarDropsdowns.accountDropdown === null ) ? <AccountDropdown /> : null,
				projectsDropdown: reduxState.navbarDropsdowns.projectsDropdown,
				bugsDropdown: reduxState.navbarDropsdowns.bugsDropdown,
				currentBug: reduxState.navbarDropsdowns.currentBug,
			})
		);
	};

	return (
		<div>
			<div className="navBarDiv">
				{/*Add project dropdown here*/}
				<div className="accountDropDownDiv">
					<div className="clickableDiv" id="accountClickableDiv" onClick={openAccountDropdown}>
						<div className="textDiv">
							<i className="fa fa-fw fa-user"></i>
							<label className="choiceLabel">Account</label>
						</div>
					</div>
					<div className="componentDiv">
						{reduxState.navbarDropsdowns.accountDropdown}
					</div>
				</div>
			</div>
			{reduxState.editAccountModals.editInfoModal}
			{reduxState.editAccountModals.editEmailModal}
			{reduxState.editAccountModals.editPasswordModal}
			{reduxState.editAccountModals.deleteAccountModal}
		</div>
	);
}
