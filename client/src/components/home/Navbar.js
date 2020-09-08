import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setDisplaySizeConstants,
	setDisplaySizeVariables,
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
} from "../../actions";

import {
	getWindowSize,
	getElementSize,
	getElementStyle,
	stripNonDigits,
	calcScrollbarWidth,
} from "../../utils/displaySizeUtils";

import { setNavbarButtonColor, setProjectsIcon } from "../../utils/navbarUtils";

// Components
import AccountDropdown from "./account/AccountDropdown";

import "../../SCSS/home/navbar.scss";

export default function Navbar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Makes sure the current size of the window and navbar are stored in redux,
	useEffect(() => {
		dispatch(
			setDisplaySizeConstants({
				home: {
					minWidth: stripNonDigits(
						getElementStyle(
							document.getElementsByClassName("js-home-container")[0]
						).minWidth
					),
				},
				scrollbar: calcScrollbarWidth(),
			})
		);

		dispatch(
			setDisplaySizeVariables({
				window: getWindowSize(),
				navbar: getElementSize(document.getElementsByClassName("js-navbar")[0]),
			})
		);

		// Adds event to update navbar size on a resize
		window.addEventListener("resize", () => {
			dispatch(
				setDisplaySizeVariables({
					window: getWindowSize(),
					navbar: getElementSize(
						document.getElementsByClassName("js-navbar")[0]
					),
				})
			);
		});

		return () => {
			window.removeEventListener("resize", () => {
				dispatch(
					setDisplaySizeVariables({
						window: getWindowSize(),
						navbar: getElementSize(
							document.getElementsByClassName("js-navbar")[0]
						),
					})
				);
			});
		};
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setNavbarButtonColor(
			reduxState.projectComponentsDisplay.projectsTable,
			document.getElementsByClassName("js-project-button")[0],
			"navbar-button--selected"
		);
		setProjectsIcon(
			reduxState.projectComponentsDisplay.projectsTable,
			document.getElementById("project-button-icon")
		);
		setNavbarButtonColor(
			reduxState.accountComponentsDisplay.accountDropdown,
			document.getElementsByClassName("js-account-button")[0],
			"navbar-button--selected"
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
			<div className="account-dropdown-component-container">
				{reduxState.accountComponentsDisplay.accountDropdown ? (
					<AccountDropdown />
				) : null}
			</div>
		</div>
	);
}
