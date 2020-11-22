import React, { useEffect } from "react";
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
	calcListContainerSearchFilterSortBarHeight,
	calcListContainerTableRowHeight,
	calcViewItemTopBarHeight,
	calcItemContainerListSidebarWidth,
	calcItemContainerOuterDividingContainerMinWidth,
	calcItemContainerPaddingContainerPadding,
} from "../../utils/displaySizeUtils";

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
				listContainerSearchFilterSortBar: calcListContainerSearchFilterSortBarHeight(),
				listContainerTableRowHeight: calcListContainerTableRowHeight(),
				itemContainerTopBar: calcViewItemTopBarHeight(),
				itemContainerListSidebar: calcItemContainerListSidebarWidth(),
				itemContainerOuterDividingContainerMinWidth: calcItemContainerOuterDividingContainerMinWidth(),
				itemContainerPaddingContainerPadding: calcItemContainerPaddingContainerPadding(),
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
				reduxState[sizeContainerName].constants.navbarAccountButton.width;

			const projectButtonElement = document.getElementsByClassName(
				"js-project-button"
			)[0];
			// Reset maxWidth so will not interferre with measuring the new width
			projectButtonElement.style.maxWidth = null;

			// If bug navbar button is present
			if (reduxState[bugContainerName].componentsDisplay.targetItem !== null) {
				const bugButtonElement = document.getElementsByClassName(
					"js-bug-button"
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
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[sizeContainerName],
		// eslint-disable-next-line
		reduxState[projectContainerName].componentsDisplay.targetItem,
		// eslint-disable-next-line
		reduxState[bugContainerName].componentsDisplay.targetItem,
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

	const openProjects = () => {
		if (
			reduxState[projectContainerName].componentsDisplay.listContainer !==
				true &&
			reduxState[projectContainerName].componentsDisplay.itemsContainer !== true
		) {
			dispatch(
				setWhichProjectComponentsDisplay({
					listContainer:
						reduxState[projectContainerName].componentsDisplay.targetItem ===
						null
							? true
							: false,
					itemContainer:
						reduxState[projectContainerName].componentsDisplay.targetItem ===
						null
							? false
							: true,
					targetItem:
						reduxState[projectContainerName].componentsDisplay.targetItem,
				})
			);
			dispatch(
				setWhichBugComponentsDisplay({
					targetItem: reduxState[bugContainerName].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichAccountComponentsDisplay({}));
			dispatch(setWhichCommentComponentsDisplay({}));
		}
	};

	const openBugs = () => {
		if (
			reduxState[bugContainerName].componentsDisplay.listContainer !== true &&
			reduxState[bugContainerName].componentsDisplay.itemContainer !== true
		) {
			dispatch(
				setWhichBugComponentsDisplay({
					listContainer: reduxState[bugContainerName].componentsDisplay.targetItem ===
					null ? true : false,
					itemContainer: reduxState[bugContainerName].componentsDisplay.targetItem ===
					null ? false : true,
					targetItem: reduxState[bugContainerName].componentsDisplay.targetItem,
				})
			);
			dispatch(
				setWhichProjectComponentsDisplay({
					targetItem:
						reduxState[projectContainerName].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichAccountComponentsDisplay({}));
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
					reduxState[bugContainerName].componentsDisplay.listContainer ===
						true ||
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
					className={
						"navbar-button js-project-button" +
						(reduxState[projectContainerName].componentsDisplay.listContainer ||
						reduxState[projectContainerName].componentsDisplay.itemContainer
							? " navbar-button--selected"
							: "")
					}
					onClick={openProjects}
				>
					<div className="navbar-button__text-container">
						<i className="fa fa-folder" aria-hidden="true" /> Project
						{reduxState[projectContainerName].componentsDisplay.targetItem ===
						null ? (
							<span>s</span>
						) : (
							<span>
								:{" "}
								<span className="navbar-button__text-container navbar-button__text-container__item-name">
									{
										reduxState[projectContainerName].componentsDisplay
											.targetItem.name
									}
								</span>
								<div
									className="navbar-button__close-button__text-container"
									onClick={(e) => closeProjectItemContainer(e)}
								>
									<i
										className="fa fa-times navbar-button__close-button__text-container__icon"
										aria-hidden="true"
									/>
								</div>
							</span>
						)}
					</div>
				</div>
				{reduxState[projectContainerName].componentsDisplay.targetItem ===
				null ? null : (
					<div
						className={
							"navbar-button js-bug-button" +
							(reduxState[projectContainerName].componentsDisplay.targetItem !==
								null &&
							(reduxState[bugContainerName].componentsDisplay.listContainer ||
								reduxState[bugContainerName].componentsDisplay.itemContainer)
								? " navbar-button--selected"
								: "")
						}
						onClick={openBugs}
					>
						<div className="navbar-button__text-container">
							<i className="fa fa-bug" aria-hidden="true" /> Bug
							{reduxState[bugContainerName].componentsDisplay.targetItem ===
							null ? (
								<span>s</span>
							) : (
								<span>
									:{" "}
									<span className="navbar-button__text-container navbar-button__text-container__item-name">
										{
											reduxState[bugContainerName].componentsDisplay.targetItem
												.name
										}
									</span>
									<div
										className="navbar-button__close-button__text-container"
										onClick={(e) => closeBugItemContainer(e)}
									>
										<i
											className="fa fa-times navbar-button__close-button__text-container__icon"
											aria-hidden="true"
										/>
									</div>
								</span>
							)}
						</div>
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
