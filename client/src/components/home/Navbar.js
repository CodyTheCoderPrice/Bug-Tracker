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
				home: {
					minWidth: stripNonDigits(
						getElementStyle(
							document.getElementsByClassName("js-home-container")[0]
						).minWidth
					),
				},
				scrollbar: calcScrollbarWidth(),
				accountNavbarButton: getElementSize(
					document.getElementsByClassName("js-account-button")[0]
				),
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

	/* // Sets max-width for navbar buttons depending on navbar width
	useEffect(() => {
		if (
			reduxState.sizeContainer.variables.navbar !== null &&
			reduxState.sizeContainer.constants.accountNavbarButton !== null
		) {
			let buttonMaxWidth =
				reduxState.sizeContainer.variables.navbar.width -
				reduxState.sizeContainer.constants.accountNavbarButton.width;

			// If bug navbar button is present
			if (
				reduxState[projectContainerName].componentsDisplay.targetItem !== null
			) {
				buttonMaxWidth = buttonMaxWidth / 2;

				document.getElementsByClassName("js-bug-button")[0].style.maxWidth =
					buttonMaxWidth + "px";
			}

			document.getElementsByClassName("js-project-button")[0].style.maxWidth =
				buttonMaxWidth + "px";
		}
	}, [
		reduxState.sizeContainer,
		reduxState[projectContainerName].componentsDisplay.targetItem,
	]); */

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
		reduxState.accountContainer.componentsDisplay,
		// eslint-disable-next-line
		reduxState[projectContainerName].componentsDisplay,
		// eslint-disable-next-line
		reduxState[bugContainerName].componentsDisplay,
	]);

	const openAccountSidebar = () => {
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
		dispatch(
			setWhichAccountComponentsDisplay({
				accountSidebar: !reduxState.accountContainer.componentsDisplay
					.accountSidebar,
			})
		);
	};

	const openProjectsTable = () => {
		if (
			reduxState[projectContainerName].componentsDisplay.listContainer !==
				true &&
			reduxState[projectContainerName].componentsDisplay.itemContainer !== true
		) {
			dispatch(
				setWhichBugComponentsDisplay({
					targetItem: reduxState[bugContainerName].componentsDisplay.targetItem,
					previousState:
						reduxState[bugContainerName].componentsDisplay.listContainer ===
							true ||
						reduxState[bugContainerName].componentsDisplay.itemContainer ===
							true
							? reduxState[bugContainerName].componentsDisplay
							: null,
				})
			);
			if (
				reduxState[projectContainerName].componentsDisplay.previousState !==
				null
			) {
				dispatch(
					setWhichProjectComponentsDisplay({
						...reduxState[projectContainerName].componentsDisplay.previousState,
					})
				);
			} else {
				dispatch(
					setWhichProjectComponentsDisplay({
						listContainer: true,
						targetItem:
							reduxState[projectContainerName].componentsDisplay.targetItem,
					})
				);
			}
		}
	};

	const openBugsTable = () => {
		if (
			reduxState[bugContainerName].componentsDisplay.listContainer !== true &&
			reduxState[bugContainerName].componentsDisplay.itemContainer !== true
		) {
			dispatch(
				setWhichProjectComponentsDisplay({
					targetItem:
						reduxState[projectContainerName].componentsDisplay.targetItem,
					previousState:
						reduxState[projectContainerName].componentsDisplay.listContainer ===
							true ||
						reduxState[projectContainerName].componentsDisplay.itemContainer ===
							true
							? reduxState[projectContainerName].componentsDisplay
							: null,
				})
			);
			if (
				reduxState[bugContainerName].componentsDisplay.previousState !== null
			) {
				dispatch(
					setWhichBugComponentsDisplay({
						...reduxState[bugContainerName].componentsDisplay.previousState,
					})
				);
			} else {
				dispatch(
					setWhichBugComponentsDisplay({
						listContainer: true,
					})
				);
			}
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
		dispatch(setWhichBugComponentsDisplay({}));
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
	};

	return (
		<div className="navbar-and-other-components-container">
			<div className="navbar-component js-navbar">
				<div
					className="navbar-button js-project-list-button"
					onClick={openProjectsTable}
				>
					<div className="navbar-button__text-container">
						<i className="fa fa-folder" aria-hidden="true" />{" "}
						{reduxState[projectContainerName].componentsDisplay.targetItem ===
						null ? (
							"Projects"
						) : (
							<span>
								Projects{" "}
								<i className="fa fa-angle-double-right" aria-hidden="true" />
							</span>
						)}
					</div>
				</div>
				{reduxState[projectContainerName].componentsDisplay.targetItem ===
				null ? null : (
					<div
						className="navbar-button js-project-item-button"
						onClick={openProjectsTable}
					>
						<div className="navbar-button__text-container">
							{
								reduxState[projectContainerName].componentsDisplay.targetItem
									.name
							}{" "}
							<i className="fa fa-angle-double-right" aria-hidden="true" />
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
				{reduxState[projectContainerName].componentsDisplay.targetItem ===
				null ? null : (
					<div
						className="navbar-button js-bug-list-button"
						onClick={openBugsTable}
					>
						<div className="navbar-button__text-container js-bug-button-text">
							<i className="fa fa-bug" aria-hidden="true" />{" "}
							{reduxState[bugContainerName].componentsDisplay.targetItem ===
							null ? (
								"Bugs"
							) : (
								<span>
									Bugs{" "}
									<i className="fa fa-angle-double-right" aria-hidden="true" />
								</span>
							)}
						</div>
					</div>
				)}
				{reduxState[bugContainerName].componentsDisplay.targetItem ===
				null ? null : (
					<div
						className="navbar-button js-bug-item-button"
						onClick={openBugsTable}
					>
						<div className="navbar-button__text-container">
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
