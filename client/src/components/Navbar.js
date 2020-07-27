import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import AccountDropdown from "./account/AccountDropdown";

import { setNavbarDropdownComponents } from "../actions";

import "../SCSS/navbar.scss";
import "font-awesome/css/font-awesome.min.css";

export default function Navbar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const changeBackgroundColor = (elem, component) => {
		if (component !== null) {
			// Standard
			elem.style.backgroundColor = "#50677f";
		} else {
			// When clicked
			elem.style.backgroundColor = "#596f87";
		}
	};

	const openAccountDropdown = () => {
		const elem = document.getElementById("accountClickableDiv");
		changeBackgroundColor(elem, reduxState.navbarDropsdowns.accountDropdown);

		dispatch(
			setNavbarDropdownComponents({
				accountDropdown:
					reduxState.navbarDropsdowns.accountDropdown === null ? (
						<AccountDropdown />
					) : null,
				projectsDropdown: reduxState.navbarDropsdowns.projectsDropdown,
				bugsDropdown: reduxState.navbarDropsdowns.bugsDropdown,
				currentBug: reduxState.navbarDropsdowns.currentBug,
			})
		);
	};

	const openProjectsDropdown = () => {
		const elem = document.getElementById("projectsClickableDiv");
		changeBackgroundColor(elem, reduxState.navbarDropsdowns.projectsDropdown);
	};

	return (
		<div>
			<div className="navBarDiv">
				<div className="projectsDropDownDiv">
					<div
						className="clickableDiv"
						id="projectsClickableDiv"
						onClick={openProjectsDropdown}
					>
						<div className="textDiv">
							<i className="fa fa-folder" aria-hidden="true"></i>
							<label className="choiceLabel"> Projects</label>
						</div>
					</div>
					<div className="componentDiv">
					</div>
				</div>
				<div className="accountDropDownDiv">
					<div
						className="clickableDiv"
						id="accountClickableDiv"
						onClick={openAccountDropdown}
					>
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
			{reduxState.accountModals.editInfoModal}
			{reduxState.accountModals.editEmailModal}
			{reduxState.accountModals.editPasswordModal}
			{reduxState.accountModals.deleteAccountModal}
		</div>
	);
}
