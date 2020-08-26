import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	storeDisplaySizes,
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
} from "../../actions";

import {
	getWindowSize,
	getElementSize,
	getScrollbarWidth,
} from "../../utils/displaySizeUtils";

import { setNavbarButtonColor, setProjectsIcon } from "../../utils/navbarUtils";

// Components
import CreateProjectSidebar from "./projects/CreateProjectSidebar";
import ViewProjectModal from "./projects/viewProject/ViewProjectModal";
import EditProjectSidebar from "./projects/EditProjectSidebar";
import AccountDropdown from "./account/AccountDropdown";

import "../../SCSS/home/navbar.scss";

export default function Navbar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Makes sure the current size of the window and navbar are stored in redux,
	useEffect(() => {
		// Stores the initial navbar size
		dispatch(
			storeDisplaySizes({
				window: getWindowSize(),
				navbar: getElementSize("js-navbar"),
				scrollbar: getScrollbarWidth(),
			})
		);
		
		// Adds event to update navbar size on a resize
		window.addEventListener("resize", () => {
			dispatch(
				storeDisplaySizes({
					window: getWindowSize(),
					navbar: getElementSize("js-navbar"),
					scrollbar: getScrollbarWidth(),
				})
			);
		});
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setNavbarButtonColor(
			document.getElementsByClassName("js-project-button")[0],
			reduxState.projectComponentsDisplay.projectsTable
		);
		setProjectsIcon(
			document.getElementById("project-button-icon"),
			reduxState.projectComponentsDisplay.projectsTable
		);
		setNavbarButtonColor(
			document.getElementsByClassName("js-account-button")[0],
			reduxState.accountComponentsDisplay.accountDropdown
		);
	}, [
		reduxState.accountComponentsDisplay.accountDropdown,
		reduxState.projectComponentsDisplay.projectsTable,
	]);

	const openAccountDropdown = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				createProjectSidbar: false,
				viewProjectModal: false,
				editProjectSidebar: false,
			})
		);
		dispatch(
			setWhichAccountComponentsDisplay({
				accountDropdown: !reduxState.accountComponentsDisplay.accountDropdown,
			})
		);
	};

	const openProjectsTable = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				projectsTable: true,
			})
		);
	};

	/* 	const closeCreateProjectSidebar = () => {
		dispatch(setWhichProjectComponentsDisplay({}));
	}; */

	return (
		<div className="navbar-and-other-components-container">
			<div
				className="navbar-component js-navbar" /* onClick={closeCreateProjectSidebar} */
			>
				<div
					className="navbar-button js-project-button"
					onClick={openProjectsTable}
				>
					<div className="navbar-button__text-container">
						<i id="project-button-icon" aria-hidden="true" /> Projects
					</div>
				</div>
				<div
					className="navbar-button"
					/* onClick={} */
				>
					<div className="navbar-button__text-container">
						<i className="fa fa-bug" aria-hidden="true" /> Bugs
					</div>
				</div>
				<div
					className="navbar-button navbar-button--right navbar-button--large js-account-button"
					onClick={openAccountDropdown}
				>
					<div className="navbar-button__text-container">
						<i className="fa fa-fw fa-user" />
						Account
					</div>
				</div>
			</div>
			<div className="create-project-component-container">
				{reduxState.projectComponentsDisplay.createProjectSidbar ? (
					<CreateProjectSidebar />
				) : null}
			</div>
			<div className="view-project-component-container">
				{reduxState.projectComponentsDisplay.viewProjectModal ? (
					<ViewProjectModal />
				) : null}
			</div>
			<div className="edit-project-component-container">
				{reduxState.projectComponentsDisplay.editProjectSidebar ? (
					<EditProjectSidebar />
				) : null}
			</div>
			<div className="account-dropdown-component-container">
				{reduxState.accountComponentsDisplay.accountDropdown ? (
					<AccountDropdown />
				) : null}
			</div>
		</div>
	);
}
