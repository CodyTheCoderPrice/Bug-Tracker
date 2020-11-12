import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	sizeContainerName,
	accountContainerName,
	projectContainerName,
	bugContainerName,
} from "../../reducers/containerNames";

import {
	setDisplaySizeConstants,
	setDisplaySizeVariables,
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
	setWhichCommentComponentsDisplay,
} from "../../actions";

import {
	getWindowSize,
	getElementSize,
	calcScrollbarWidth,
	calcSearchFilterSortBarHeight,
	calcViewItemTopBarHeight,
	calcItemContainerListSidebarWidth,
} from "../../utils/displaySizeUtils";

import { setNavbarButtonColor } from "../../utils/navbarUtils";

import "../../SCSS/home/navbar.scss";

export default function Navbar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Makes sure the current size of the window and navbar are stored in redux
	useEffect(() => {
		dispatch(
			setDisplaySizeConstants({
				scrollbar: calcScrollbarWidth(),
				navbarAccountButton: getElementSize(
					document.getElementsByClassName("js-account-button")[0]
				),
				navbarProjectsButton: getElementSize(
					document.getElementsByClassName("js-project-list-button")[0]
				),
				navbarBugsButton: getElementSize(
					document.getElementsByClassName("js-bug-list-button")[0]
				),
				listcontainerSearchFilterSortBar: calcSearchFilterSortBarHeight(),
				itemContainerTopBar: calcViewItemTopBarHeight(),
				itemContainerListSidebar: calcItemContainerListSidebarWidth(),
			})
		);

		dispatch(
			setDisplaySizeVariables({
				window: getWindowSize(),
				navbar: getElementSize(document.getElementsByClassName("js-navbar")[0]),
			})
		);

		// Adds event to update navbar size on a resize
		window.addEventListener("resize", displaySizeHandler);

		return () => {
			window.removeEventListener("resize", displaySizeHandler);
		};
		// eslint-disable-next-line
	}, []);

	// Declared outside of the eventListener so removing will working on cleanup
	function displaySizeHandler() {
		dispatch(
			setDisplaySizeVariables({
				window: getWindowSize(),
				navbar: getElementSize(document.getElementsByClassName("js-navbar")[0]),
			})
		);
	}

	// Sets max-width for navbar buttons depending on navbar width
	useEffect(() => {
		if (
			reduxState[sizeContainerName].variables.navbar !== null &&
			// If navbarAccountButton is set, then projects and bugs button should also be set
			reduxState[sizeContainerName].constants.navbarAccountButton !== null &&
			reduxState[projectContainerName].componentsDisplay.targetItem !== null
		) {
			let navbarAvailableSpace =
				reduxState[sizeContainerName].variables.navbar.width -
				reduxState[sizeContainerName].constants.navbarAccountButton.width -
				reduxState[sizeContainerName].constants.navbarProjectsButton.width -
				reduxState[sizeContainerName].constants.navbarBugsButton.width;

			const projectButtonElement = document.getElementsByClassName(
				"js-project-item-button"
			)[0];
			// Reset maxWidth so will not interferre with measuring the new width
			projectButtonElement.style.maxWidth = null;

			// If bug navbar button is present
			if (reduxState[bugContainerName].componentsDisplay.targetItem !== null) {
				const bugButtonElement = document.getElementsByClassName(
					"js-bug-item-button"
				)[0];
				// Reset maxWidth so will not interferre with measuring the new width
				bugButtonElement.style.maxWidth = null;

				const bugButtonElementWidth = getElementSize(bugButtonElement).width;
				if (bugButtonElementWidth > navbarAvailableSpace / 2) {
					bugButtonElement.style.maxWidth = navbarAvailableSpace / 2 + "px";
					navbarAvailableSpace = navbarAvailableSpace / 2;
				} else {
					navbarAvailableSpace -= bugButtonElementWidth;
				}
			}

			if (getElementSize(projectButtonElement).width > navbarAvailableSpace) {
				projectButtonElement.style.maxWidth = navbarAvailableSpace + "px";
			}
		}
	}, [
		reduxState[sizeContainerName],
		reduxState[projectContainerName].componentsDisplay.targetItem,
		reduxState[bugContainerName].componentsDisplay.targetItem,
	]);

	useEffect(() => {
		setNavbarButtonColor(
			reduxState[projectContainerName].componentsDisplay.listContainer,
			document.getElementsByClassName("js-project-list-button")[0],
			"navbar-button--selected"
		);
		// Prevents error of js-project-item-button, js-bug-list-button,
		// ...and js-bug-item-button not exisiting
		if (
			reduxState[projectContainerName].componentsDisplay.targetItem !== null
		) {
			setNavbarButtonColor(
				reduxState[projectContainerName].componentsDisplay.itemContainer,
				document.getElementsByClassName("js-project-item-button")[0],
				"navbar-button--selected"
			);
			setNavbarButtonColor(
				reduxState[bugContainerName].componentsDisplay.listContainer,
				document.getElementsByClassName("js-bug-list-button")[0],
				"navbar-button--selected"
			);
			if (reduxState[bugContainerName].componentsDisplay.targetItem !== null) {
				setNavbarButtonColor(
					reduxState[bugContainerName].componentsDisplay.itemContainer,
					document.getElementsByClassName("js-bug-item-button")[0],
					"navbar-button--selected"
				);
			}
		}
		// eslint-disable-next-line
	}, [
		reduxState[accountContainerName].componentsDisplay,
		// eslint-disable-next-line
		reduxState[projectContainerName].componentsDisplay,
		// eslint-disable-next-line
		reduxState[bugContainerName].componentsDisplay,
	]);

	const openAccountSidebar = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountSidebar: !reduxState[accountContainerName].componentsDisplay
					.accountSidebar,
			})
		);
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState[projectContainerName].componentsDisplay,
				listContainerCreateItemSidbar: false,
				itemContainerDeleteModal: false,
				listContainerMassDeleteItemsModal: false,
			})
		);
		dispatch(
			setWhichBugComponentsDisplay({
				...reduxState[bugContainerName].componentsDisplay,
				listContainerCreateItemSidbar: false,
				itemContainerDeleteModal: false,
				listContainerMassDeleteItemsModal: false,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	};

	const openProjectsListContainer = () => {
		if (
			reduxState[projectContainerName].componentsDisplay.listContainer !== true
		) {
			dispatch(
				setWhichProjectComponentsDisplay({
					listContainer: true,
					targetItem:
						reduxState[projectContainerName].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichAccountComponentsDisplay({}));
			dispatch(
				setWhichBugComponentsDisplay({
					targetItem: reduxState[bugContainerName].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichCommentComponentsDisplay({}));
		}
	};

	const openProjectsItemContainer = () => {
		if (
			reduxState[projectContainerName].componentsDisplay.itemsContainer !== true
		) {
			dispatch(
				setWhichProjectComponentsDisplay({
					itemContainer: true,
					targetItem:
						reduxState[projectContainerName].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichAccountComponentsDisplay({}));
			dispatch(
				setWhichBugComponentsDisplay({
					targetItem: reduxState[bugContainerName].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichCommentComponentsDisplay({}));
		}
	};

	const openBugsListContainer = () => {
		if (reduxState[bugContainerName].componentsDisplay.listContainer !== true) {
			dispatch(
				setWhichBugComponentsDisplay({
					listContainer: true,
					targetItem: reduxState[bugContainerName].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichAccountComponentsDisplay({}));
			dispatch(
				setWhichProjectComponentsDisplay({
					targetItem:
						reduxState[projectContainerName].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichCommentComponentsDisplay({}));
		}
	};

	const openBugsItemContainer = () => {
		if (reduxState[bugContainerName].componentsDisplay.itemContainer !== true) {
			dispatch(
				setWhichBugComponentsDisplay({
					itemContainer: true,
					targetItem: reduxState[bugContainerName].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichAccountComponentsDisplay({}));
			dispatch(
				setWhichProjectComponentsDisplay({
					targetItem:
						reduxState[projectContainerName].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichCommentComponentsDisplay({}));
		}
	};

	const closeProjectItemContainer = (e) => {
		e.stopPropagation();
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState[projectContainerName].componentsDisplay,
				listContainer: true,
				itemContainer: false,
				targetItem: null,
			})
		);
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(setWhichBugComponentsDisplay({}));
		dispatch(setWhichCommentComponentsDisplay({}));
	};

	const closeBugItemContainer = (e) => {
		e.stopPropagation();
		dispatch(
			setWhichBugComponentsDisplay({
				...reduxState[bugContainerName].componentsDisplay,
				// Keeps the user on their current tab (since the user can close a bug from the project tab)
				listContainer:
					reduxState[bugContainerName].componentsDisplay.itemContainer === true
						? true
						: false,
				itemContainer: false,
				targetItem: null,
			})
		);
		dispatch(setWhichAccountComponentsDisplay({}));
		// projectComponentsDisplay is not cleared here on purpose
		dispatch(setWhichCommentComponentsDisplay({}));
	};

	return (
		<div className="navbar-and-other-components-container">
			<div className="navbar-component js-navbar">
				<div
					className="navbar-button js-project-list-button"
					onClick={openProjectsListContainer}
				>
					<div className="navbar-button__text-container">
						<i className="fa fa-folder" aria-hidden="true" /> Projects
						{/* Colon is always present (but not always visible) so button always remains the same size*/}
						<span
							className={
								reduxState[projectContainerName].componentsDisplay
									.targetItem === null
									? "navbar-button__text-container--invisible"
									: ""
							}
						>
							:
						</span>
					</div>
				</div>
				{reduxState[projectContainerName].componentsDisplay.targetItem ===
				null ? null : (
					<div
						className="navbar-button js-project-item-button"
						onClick={openProjectsItemContainer}
					>
						<div className="navbar-button__text-container navbar-button__text-container--item">
							{
								reduxState[projectContainerName].componentsDisplay.targetItem
									.name
							}
						</div>
						{reduxState[projectContainerName].componentsDisplay.targetItem ===
						null ? null : (
							<div
								className="navbar-button__close-button"
								onClick={(e) => closeProjectItemContainer(e)}
							>
								<i
									className="fa fa-times navbar-button__close-button__icon"
									aria-hidden="true"
								/>
							</div>
						)}
					</div>
				)}
				<div
					className={
						"navbar-button js-bug-list-button" +
						(reduxState[projectContainerName].componentsDisplay.targetItem ===
						null
							? " navbar-button--invisible"
							: "")
					}
					onClick={openBugsListContainer}
				>
					<div className="navbar-button__text-container">
						<i className="fa fa-bug" aria-hidden="true" /> Bugs
						{/* Colon is always present (but not always visible) so button always remains the same size*/}
						<span
							className={
								reduxState[bugContainerName].componentsDisplay.targetItem ===
								null
									? "navbar-button__text-container--invisible"
									: ""
							}
						>
							:
						</span>
					</div>
				</div>
				{reduxState[bugContainerName].componentsDisplay.targetItem ===
				null ? null : (
					<div
						className="navbar-button js-bug-item-button"
						onClick={openBugsItemContainer}
					>
						<div className="navbar-button__text-container navbar-button__text-container--item">
							{reduxState[bugContainerName].componentsDisplay.targetItem.name}
						</div>
						{reduxState[bugContainerName].componentsDisplay.targetItem ===
						null ? null : (
							<div
								className="navbar-button__close-button"
								onClick={(e) => closeBugItemContainer(e)}
							>
								<i
									className="fa fa-times navbar-button__close-button__icon"
									aria-hidden="true"
								/>
							</div>
						)}
					</div>
				)}
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