import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import AccountDropdown from "./account/AccountDropdown";

import { setWhichNavbarComponentsDisplay } from "../../actions";

import "../../SCSS/navbar.scss";
import "font-awesome/css/font-awesome.min.css";

export default function Navbar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const setNavbarButtonColor = (elem, component) => {
		if (!component) {
			// When inactive
			elem.style.backgroundColor = "#50677f";
		} else {
			// When active
			elem.style.backgroundColor = "#596f87";
		}
	};

	const setProjectsNavbarButtonIcon = (component) => {
		if (!component) {
			// When inactive
			document.getElementById("projectsIcon").className = "fa fa-folder";
		} else {
			// When active
			document.getElementById("projectsIcon").className = "fa fa-folder-open";
		}
	};

	useEffect(() => {
		const projectsNavbarElem = document.getElementById("projectsClickableDiv");
		const accountNavbarElem = document.getElementById("accountClickableDiv");

		// Projects
		setNavbarButtonColor(
			projectsNavbarElem,
			reduxState.navbarComponentsDisplay.projectsList
		);
		setProjectsNavbarButtonIcon(
			reduxState.navbarComponentsDisplay.projectsList
		);

		// Account
		setNavbarButtonColor(
			accountNavbarElem,
			reduxState.navbarComponentsDisplay.accountDropdown
		);
	}, [reduxState.navbarComponentsDisplay]);

	const handleProjectsList = () => {
		dispatch(
			setWhichNavbarComponentsDisplay({
				projectsList:
					reduxState.navbarComponentsDisplay.projectsList === false
						? true
						: false,
				accountDropdown: reduxState.navbarComponentsDisplay.accountDropdown,
			})
		);
	};

	const handleAccountDropdown = () => {
		dispatch(
			setWhichNavbarComponentsDisplay({
				projectsList: reduxState.navbarComponentsDisplay.projectsList,
				accountDropdown:
					reduxState.navbarComponentsDisplay.accountDropdown === false
						? true
						: false,
			})
		);
	};

	return (
		<div>
			<div className="navBarDiv">
				<div
					className="clickableDiv"
					id="projectsClickableDiv"
					onClick={handleProjectsList}
				>
					<div className="textDiv">
						<i id="projectsIcon" aria-hidden="true"></i>
						<label className="choiceLabel"> Projects</label>
					</div>
				</div>
				<div
					className="clickableDiv"
					id="bugsClickableDiv"
					/* onClick={} */
				>
					<div className="textDiv">
						<i className="fa fa-bug" aria-hidden="true"></i>
						<label className="choiceLabel"> Bugs</label>
					</div>
				</div>
				<div className="accountDropDownDiv">
					<div
						className="clickableDiv"
						id="accountClickableDiv"
						onClick={handleAccountDropdown}
					>
						<div className="textDiv">
							<i className="fa fa-fw fa-user"></i>
							<label className="choiceLabel">Account</label>
						</div>
					</div>
					<div className="componentDiv">
						{reduxState.navbarComponentsDisplay.accountDropdown ? (
							<AccountDropdown />
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
