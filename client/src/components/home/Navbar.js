import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	SIZE_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../actions/constants/containerNames";

import {
	setDisplaySizeConstants,
	setDisplaySizeVariables,
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
	setWhichCommentComponentsDisplay,
} from "../../actions";

import {
	getWindowSize,
	getElementSize,
	calcScrollbarWidth,
	calcListViewSearchFilterSortBarHeight,
	calcListViewTableRowHeight,
	calcViewItemTopBarHeight,
	calcItemViewListSidebarWidth,
	calcItemViewOuterDividingContainerMinWidth,
	calcItemViewPaddingContainerPadding,
	getCurrentContainerName,
	getProjectOrBugBackgroundColorClassNameDark,
	getProjectOrBugBackgroundColorClassNameLight,
} from "../../utils";

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
				listViewSearchFilterSortBar: calcListViewSearchFilterSortBarHeight(),
				listViewTableRowHeight: calcListViewTableRowHeight(),
				itemViewTopBar: calcViewItemTopBarHeight(),
				itemViewListSidebar: calcItemViewListSidebarWidth(),
				itemViewOuterDividingContainerMinWidth: calcItemViewOuterDividingContainerMinWidth(),
				itemViewPaddingContainerPadding: calcItemViewPaddingContainerPadding(),
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
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			// If navbarAccountButton is set, then projects and bugs button should also be set
			reduxState[SIZE_CONTAINER].constants.navbarAccountButton !== null &&
			reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem !== null
		) {
			let navbarAvailableSpace =
				reduxState[SIZE_CONTAINER].variables.navbar.width -
				reduxState[SIZE_CONTAINER].constants.navbarAccountButton.width;

			const projectButtonElement = document.getElementsByClassName(
				"js-project-button"
			)[0];
			// Reset maxWidth so will not interferre with measuring the new width
			projectButtonElement.style.maxWidth = null;

			// If bug navbar button is present
			if (reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem !== null) {
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
		reduxState[SIZE_CONTAINER],
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].componentsDisplay.targetItem,
	]);

	const openAccountSidebar = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountSidebar: !reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountSidebar,
			})
		);
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState[PROJECT_CONTAINER].componentsDisplay,
				listViewCreateItemSidbar: false,
				itemViewDeleteModal: false,
				listViewMassDeleteItemsModal: false,
			})
		);
		dispatch(
			setWhichBugComponentsDisplay({
				...reduxState[BUG_CONTAINER].componentsDisplay,
				listViewCreateItemSidbar: false,
				itemViewDeleteModal: false,
				listViewMassDeleteItemsModal: false,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	};

	const openProjects = () => {
		if (
			reduxState[PROJECT_CONTAINER].componentsDisplay.listView !== true &&
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemsContainer !== true
		) {
			dispatch(
				setWhichProjectComponentsDisplay({
					listView:
						reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem === null
							? true
							: false,
					itemView:
						reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem === null
							? false
							: true,
					targetItem:
						reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem,
				})
			);
			dispatch(
				setWhichBugComponentsDisplay({
					targetItem: reduxState[BUG_CONTAINER].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichAccountComponentsDisplay({}));
			dispatch(setWhichCommentComponentsDisplay({}));
		}
	};

	const openBugs = () => {
		if (
			reduxState[BUG_CONTAINER].componentsDisplay.listView !== true &&
			reduxState[BUG_CONTAINER].componentsDisplay.itemView !== true
		) {
			dispatch(
				setWhichBugComponentsDisplay({
					listView:
						reduxState[BUG_CONTAINER].componentsDisplay.targetItem === null
							? true
							: false,
					itemView:
						reduxState[BUG_CONTAINER].componentsDisplay.targetItem === null
							? false
							: true,
					targetItem: reduxState[BUG_CONTAINER].componentsDisplay.targetItem,
				})
			);
			dispatch(
				setWhichProjectComponentsDisplay({
					targetItem:
						reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichAccountComponentsDisplay({}));
			dispatch(setWhichCommentComponentsDisplay({}));
		}
	};

	const closeProjectItemView = (e) => {
		e.stopPropagation();
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState[PROJECT_CONTAINER].componentsDisplay,
				listView: true,
				itemView: false,
				targetItem: null,
			})
		);
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(setWhichBugComponentsDisplay({}));
		dispatch(setProjectOrBugMassDeleteList(BUG_CONTAINER));
		dispatch(setWhichCommentComponentsDisplay({}));
	};

	const closeBugItemView = (e) => {
		e.stopPropagation();
		dispatch(
			setWhichBugComponentsDisplay({
				...reduxState[BUG_CONTAINER].componentsDisplay,
				// Keeps the user on their current tab (since the user can close a bug from the project tab)
				listView:
					reduxState[BUG_CONTAINER].componentsDisplay.listView === true ||
					reduxState[BUG_CONTAINER].componentsDisplay.itemView === true
						? true
						: false,
				itemView: false,
				targetItem: null,
			})
		);
		dispatch(setWhichAccountComponentsDisplay({}));
		// projectComponentsDisplay is not cleared here on purpose
		dispatch(setWhichCommentComponentsDisplay({}));
	};

	return (
		<div className="navbar-and-other-components-container">
			<div
				className={
					"navbar-component js-navbar" +
					getProjectOrBugBackgroundColorClassNameDark(
						getCurrentContainerName(reduxState)
					)
				}
			>
				<div
					className={
						"navbar-button js-project-button" +
						getProjectOrBugBackgroundColorClassNameDark(
							getCurrentContainerName(reduxState)
						) +
						(reduxState[PROJECT_CONTAINER].componentsDisplay.listView ||
						reduxState[PROJECT_CONTAINER].componentsDisplay.itemView
							? getProjectOrBugBackgroundColorClassNameLight(
									getCurrentContainerName(reduxState)
							  )
							: "")
					}
					onClick={openProjects}
				>
					<div className="navbar-button__text-container">
						<i className="fa fa-folder" aria-hidden="true" /> Project
						{reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem ===
						null ? (
							<span>s</span>
						) : (
							<span>
								:{" "}
								<span className="navbar-button__text-container navbar-button__text-container__item-name">
									{
										reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem
											.name
									}
								</span>
								<div
									className="navbar-button__close-button__text-container"
									onClick={(e) => closeProjectItemView(e)}
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
				{reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem ===
				null ? null : (
					<div
						className={
							"navbar-button js-bug-button" +
							getProjectOrBugBackgroundColorClassNameDark(
								getCurrentContainerName(reduxState)
							) +
							(reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem !==
								null &&
							(reduxState[BUG_CONTAINER].componentsDisplay.listView ||
								reduxState[BUG_CONTAINER].componentsDisplay.itemView)
								? getProjectOrBugBackgroundColorClassNameLight(
										getCurrentContainerName(reduxState)
								  )
								: "")
						}
						onClick={openBugs}
					>
						<div className="navbar-button__text-container">
							<i className="fa fa-bug" aria-hidden="true" /> Bug
							{reduxState[BUG_CONTAINER].componentsDisplay.targetItem ===
							null ? (
								<span>s</span>
							) : (
								<span>
									:{" "}
									<span className="navbar-button__text-container navbar-button__text-container__item-name">
										{
											reduxState[BUG_CONTAINER].componentsDisplay.targetItem
												.name
										}
									</span>
									<div
										className="navbar-button__close-button__text-container"
										onClick={(e) => closeBugItemView(e)}
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
					className={
						"navbar-button navbar-button--right js-account-button" +
						getProjectOrBugBackgroundColorClassNameDark(
							getCurrentContainerName(reduxState)
						)
					}
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
