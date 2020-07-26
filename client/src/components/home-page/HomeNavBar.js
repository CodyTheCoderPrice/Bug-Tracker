import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import ContractedProjectsDropdown from "./projects/ContractedProjectsDropdown";
import AccountDropdown from "./account/AccountDropdown";

import { setNavbarDropdownComponents } from "../../actions";

import "../../SCSS/homeNavBar.scss";
import "font-awesome/css/font-awesome.min.css";

export default function HomeNavBar() {
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

		dispatch(
			setNavbarDropdownComponents({
				accountDropdown: reduxState.navbarDropsdowns.accountDropdown,
				projectsDropdown:
					reduxState.navbarDropsdowns.projectsDropdown === null ? (
						<ContractedProjectsDropdown />
					) : null,
				bugsDropdown: reduxState.navbarDropsdowns.bugsDropdown,
				currentBug: reduxState.navbarDropsdowns.currentBug,
			})
		);
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
						{reduxState.navbarDropsdowns.projectsDropdown}
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
			{reduxState.editAccountModals.editInfoModal}
			{reduxState.editAccountModals.editEmailModal}
			{reduxState.editAccountModals.editPasswordModal}
			{reduxState.editAccountModals.deleteAccountModal}
		</div>
	);
}
