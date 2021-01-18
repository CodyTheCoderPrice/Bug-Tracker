import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	SIZE_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	setDisplaySizeConstants,
	setDisplaySizeVariables,
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
	setWhichCommentComponentsDisplay,
} from "../../../actions";

import {
	getWindowSize,
	getElementSize,
	calcScrollbarWidth,
	calcHamburgerCurrentViewTitleStyles,
	calcListViewSearchFilterSortBarHeight,
	calcListViewTableRowHeight,
	calcViewItemTopBarHeight,
	calcItemViewListSidebarWidth,
	calcItemViewOuterDividingContainerMinWidth,
	calcItemViewPaddingContainerPadding,
	getCurrentContainerName,
	getProjectOrBugBackgroundColorClassNameDark,
} from "../../../utils";

// Components
import NavbarBreadcrumb from "./NavbarBreadcrumb";
import NavbarHamburger from "./NavbarHamburger";

export default function Navbar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Makes sure the current size of the window and navbar are stored in redux
	useEffect(() => {
		dispatch(
			setDisplaySizeConstants({
				scrollbarWidth: calcScrollbarWidth(),
				navbarAccountButton: getElementSize(
					document.getElementsByClassName("js-account-button")[0]
				),
				navbarButtonBreadcrumbArrowWidth: getElementSize(
					document.getElementsByClassName("js-project-list-button-arrow")[0]
				).width,
				navbarHamburgerCurrentViewTitleStyles: calcHamburgerCurrentViewTitleStyles(),
				listViewSearchFilterSortBarHeight: calcListViewSearchFilterSortBarHeight(),
				listViewTableRowHeight: calcListViewTableRowHeight(),
				itemViewTopBarHeight: calcViewItemTopBarHeight(),
				itemViewListSidebarWidth: calcItemViewListSidebarWidth(),
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

	/**
	 * Gives the number of buttons that would be present in the breadcrumb menu
	 * when it is displayed
	 *
	 * @returns {Number} - The number of present buttons in the breadcrumb menu
	 */
	const getNumberOfPresentBreadcrumbButtons = () => {
		/*
		The project list button is always present in the breadcrumb menu, so
		the base value is 1. If there is a target project then the project item
		and bug list buttons will also be present meaning at least 2 needs to
		be added, but if there is also a target bug then the bug item button is
		also present and it is insead 3 that needst to be added
		*/
		return (
			1 +
			(reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem === null
				? 0
				: reduxState[BUG_CONTAINER].componentsDisplay.targetItem === null
				? 2
				: 3)
		);
	};

	return (
		<div className="navbar-container">
			<div
				className={
					"navbar-component js-navbar" +
					getProjectOrBugBackgroundColorClassNameDark(
						getCurrentContainerName(reduxState)
					)
				}
			>
				{reduxState[SIZE_CONTAINER].variables.navbar === null ||
				reduxState[SIZE_CONTAINER].variables.navbar.width >
					reduxState[GENERAL_CONTAINER].globalConstants
						.navbarHamburgerMenuBreakingPointMultiplier ? (
					<NavbarBreadcrumb />
				) : (
					<NavbarHamburger />
				)}

				<div className="navbar-button navbar-button--right js-account-button">
					<div
						className={
							"navbar-button__outer-text-container" +
							getProjectOrBugBackgroundColorClassNameDark(
								getCurrentContainerName(reduxState)
							)
						}
						onClick={openAccountSidebar}
					>
						<div className="navbar-button__outer-text-container__inner-text-container navbar-button__outer-text-container__inner-text-container--right">
							<i className="fa fa-fw fa-user" />
							Account
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
