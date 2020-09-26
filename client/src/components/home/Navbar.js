import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	projectContainerName,
	bugContainerName,
} from "../../reducers/containerNames";

import {
	setDisplaySizeConstants,
	setDisplaySizeVariables,
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
} from "../../actions";

import {
	getWindowSize,
	getElementSize,
	getElementStyle,
	stripNonDigits,
	calcScrollbarWidth,
} from "../../utils/displaySizeUtils";

import { setNavbarButtonColor, setProjectsIcon } from "../../utils/navbarUtils";

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
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setNavbarButtonColor(
			reduxState[projectContainerName].componentsDisplay.listTable,
			document.getElementsByClassName("js-project-button")[0],
			"navbar-button--selected"
		);
		setProjectsIcon(
			reduxState[projectContainerName].componentsDisplay.listTable,
			document.getElementById("project-button-icon")
		);
		setNavbarButtonColor(
			reduxState[bugContainerName].componentsDisplay.listTable,
			document.getElementsByClassName("js-bug-button")[0],
			"navbar-button--selected"
		);
		// eslint-disable-next-line
	}, [
		reduxState.accountContainer.componentsDisplay.accountSidebar,
		// eslint-disable-next-line
		reduxState[projectContainerName].componentsDisplay.listTable,
		// eslint-disable-next-line
		reduxState[bugContainerName].componentsDisplay.listTable,
	]);

	const openAccountSidebar = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState[projectContainerName].componentsDisplay,
				createItemSidbar: false,
				viewItemModal: false,
			})
		);
		dispatch(
			setWhichAccountComponentsDisplay({
				accountSidebar: !reduxState.accountContainer.componentsDisplay
					.accountSidebar,
			})
		);
	};

	const openProjectsTable = () => {
		dispatch(setWhichBugComponentsDisplay({}));
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState[projectContainerName].componentsDisplay,
				listTable: true,
			})
		);
	};

	const openBugsTable = () => {
		dispatch(setWhichProjectComponentsDisplay({
			targetItem: reduxState[projectContainerName].componentsDisplay.targetItem
		}));
		dispatch(
			setWhichBugComponentsDisplay({
				...reduxState[bugContainerName].componentsDisplay,
				listTable: true,
			})
		);
	};

	return (
		<div className="navbar-and-other-components-container">
			<div
				className="navbar-component js-navbar"
			>
				<div
					className="navbar-button js-project-button"
					onClick={openProjectsTable}
				>
					<div className="navbar-button__text-container">
						<i id="project-button-icon" aria-hidden="true" /> Projects
					</div>
				</div>
				{reduxState[projectContainerName].componentsDisplay.targetItem !==
				null ? (
					<div
						className="navbar-button navbar-button--largest js-bug-button"
						onClick={openBugsTable}
					>
						<div className="navbar-button__text-container">
							<i className="fa fa-bug" aria-hidden="true" />{" "}
							{
								reduxState[projectContainerName].componentsDisplay.targetItem
									.name
							}
						</div>
					</div>
				) : null}
				<div
					className="navbar-button navbar-button--right js-account-button"
					onClick={openAccountSidebar}
				>
					<div className="navbar-button__text-container">
						<i className="fa fa-fw fa-user" />
						Account
					</div>
				</div>
			</div>
		</div>
	);
}
