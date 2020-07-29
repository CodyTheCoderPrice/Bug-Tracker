import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import CreateProjectSidebar from "./projects/CreateProjectSidebar";
import AccountSidebar from "./account/AccountSidebar";

import {
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
} from "../../actions";

import "../../SCSS/home/navbar.scss";
import "font-awesome/css/font-awesome.min.css";

export default function Navbar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const setNavbarClickableDivColor = (elem, component) => {
		if (!component) {
			// When inactive
			elem.style.backgroundColor = "#50677f";
		} else {
			// When active
			elem.style.backgroundColor = "#596f87";
		}
	};

	const setProjectsClickableDivColor = (component) => {
		if (!component) {
			// When inactive
			document.getElementById("projectsIcon").className = "fa fa-folder";
		} else {
			// When active
			document.getElementById("projectsIcon").className = "fa fa-folder-open";
		}
	};

	useEffect(() => {
		const accountNavbarElem = document.getElementById("accountClickableDiv");
		const projectsNavbarElem = document.getElementById("projectsClickableDiv");

		// Account
		setNavbarClickableDivColor(
			accountNavbarElem,
			reduxState.accountComponentsDisplay.accountSidebar
		);

		// Projects
		setNavbarClickableDivColor(
			projectsNavbarElem,
			reduxState.projectComponentsDisplay.projectsList
		);
		setProjectsClickableDivColor(
			reduxState.projectComponentsDisplay.projectsList
		);
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
	};

	const openProjectsList = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				projectsList: true,
				createProjectSidbar: reduxState.projectComponentsDisplay.createProjectSidbar,
				viewProjectModal: reduxState.projectComponentsDisplay.viewProjectModal,
				editProjectModal: reduxState.projectComponentsDisplay.editProjectModal,
				targetProject: reduxState.projectComponentsDisplay.targetProject,
			})
		);
	};

/* 	const closeCreateProjectSidebar = () => {
		dispatch(setWhichProjectComponentsDisplay({}));
	}; */

	return (
		<div>
			<div className="navBarDiv" /* onClick={closeCreateProjectSidebar} */>
				<div
					className="clickableDiv"
					id="projectsClickableDiv"
					onClick={openProjectsList}
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
						onClick={openAccountSidebar}
					>
						<div className="textDiv">
							<i className="fa fa-fw fa-user"></i>
							<label className="choiceLabel">Account</label>
						</div>
					</div>
					<div className="componentDiv">
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
