import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import CreateProjectSidebar from "./projects/CreateProjectSidebar";
import AccountSidebar from "./account/AccountSidebar";

import {
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
} from "../../actions";

import { setNavbarButtonColor, setProjectsIcon } from "../../utils/navbarUtils";

import "../../SCSS/home/navbar.scss";
import "font-awesome/css/font-awesome.min.css";

export default function Navbar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		setNavbarButtonColor(
			document.getElementsByClassName("js-account-button")[0],
			reduxState.accountComponentsDisplay.accountSidebar
		);

		setNavbarButtonColor(
			document.getElementsByClassName("js-project-button")[0],
			reduxState.projectComponentsDisplay.projectsList
		);
		setProjectsIcon(reduxState.projectComponentsDisplay.projectsList);
	}, [
		reduxState.accountComponentsDisplay.accountSidebar,
		reduxState.projectComponentsDisplay.projectsList,
	]);

	const openAccountSidebar = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountSidebar: !reduxState.accountComponentsDisplay.accountSidebar,
			})
		);
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				createProjectSidbar: false,
				viewProjectModal: false,
				editProjectModal: false,
			})
		);
	};

	const openProjectsList = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				projectsList: true,
			})
		);
	};

	/* 	const closeCreateProjectSidebar = () => {
		dispatch(setWhichProjectComponentsDisplay({}));
	}; */

	return (
		<div>
			<div
				className="navbar-component" /* onClick={closeCreateProjectSidebar} */
			>
				<div
					className="navbar-button js-project-button"
					onClick={openProjectsList}
				>
					<div className="navbar-button__text-container">
						<i id="projectsIcon" aria-hidden="true"></i> Projects
					</div>
				</div>
				<div
					className="navbar-button"
					/* onClick={} */
				>
					<div className="navbar-button__text-container">
						<i className="fa fa-bug" aria-hidden="true"></i>
						<label className="choiceLabel"> Bugs</label>
					</div>
				</div>
				<div className="account-dropdown">
					<div
						className="navbar-button js-account-button"
						onClick={openAccountSidebar}
					>
						<div className="navbar-button__text-container">
							<i className="fa fa-fw fa-user"></i>
							<label className="choiceLabel">Account</label>
						</div>
					</div>
					<div className="account-dropdown-component">
						{reduxState.accountComponentsDisplay.accountSidebar ? (
							<AccountSidebar />
						) : null}
					</div>
				</div>
			</div>
			{reduxState.projectComponentsDisplay.createProjectSidbar ? (
				<CreateProjectSidebar />
			) : null}
		</div>
	);
}
