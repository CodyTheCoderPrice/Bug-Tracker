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
	setDisplaySizeVariablesWindowAndNavbar,
	setDisplaySizeVariablesBreadcrumbFontSize,
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
	setWhichCommentComponentsDisplay,
} from "../../../actions";

import {
	getWindowSize,
	getElementSize,
	calcScrollbarWidth,
	calcBreadcrumbBaseFontSize,
	calcHamburgerStyles,
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
		const breadcrumbBaseFontSize = calcBreadcrumbBaseFontSize();

		dispatch(
			setDisplaySizeConstants({
				scrollbarWidth: calcScrollbarWidth(),
				navbarAccountButtonWidth: getElementSize(
					document.getElementsByClassName("js-account-button")[0]
				).width,
				navbarBreadcrumbArrowWidth: getElementSize(
					document.getElementsByClassName(
						"js-breadcrumb-project-list-button-arrow"
					)[0]
				).width,
				navbarBreadcrumbButtonTextBaseFontSize: breadcrumbBaseFontSize,
				navbarHamburgerStyles: calcHamburgerStyles(),
				listViewSearchFilterSortBarHeight: calcListViewSearchFilterSortBarHeight(),
				listViewTableRowHeight: calcListViewTableRowHeight(),
				itemViewTopBarHeight: calcViewItemTopBarHeight(),
				itemViewListSidebarWidth: calcItemViewListSidebarWidth(),
				itemViewOuterDividingContainerMinWidth: calcItemViewOuterDividingContainerMinWidth(),
				itemViewPaddingContainerPadding: calcItemViewPaddingContainerPadding(),
			})
		);

		dispatch(
			setDisplaySizeVariablesWindowAndNavbar({
				window: getWindowSize(),
				navbar: getElementSize(document.getElementsByClassName("js-navbar")[0]),
			})
		);

		dispatch(setDisplaySizeVariablesBreadcrumbFontSize(breadcrumbBaseFontSize));

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
			setDisplaySizeVariablesWindowAndNavbar({
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

	return (
		<div
			className={
				"navbar-container" +
				(reduxState[SIZE_CONTAINER].variables.navbar === null ||
					reduxState[SIZE_CONTAINER].variables
						.navbarBreadcrumbButtonTextFontSize === null ||
					reduxState[GENERAL_CONTAINER].globalConstants
						.navbarBreadcrumbMinimumFontSize === null ||
					reduxState[SIZE_CONTAINER].variables
						.navbarBreadcrumbButtonTextFontSize >
						reduxState[GENERAL_CONTAINER].globalConstants
							.navbarBreadcrumbMinimumFontSize
					? ""
					: " navbar-container--increased-z-index")
			}
		>
			<div
				className={
					"navbar js-navbar" +
					getProjectOrBugBackgroundColorClassNameDark(
						getCurrentContainerName(reduxState)
					)
				}
			>
				<NavbarBreadcrumb
					visible={
						reduxState[SIZE_CONTAINER].variables.navbar === null ||
						reduxState[SIZE_CONTAINER].variables
							.navbarBreadcrumbButtonTextFontSize === null ||
						reduxState[GENERAL_CONTAINER].globalConstants
							.navbarBreadcrumbMinimumFontSize === null ||
						reduxState[SIZE_CONTAINER].variables
							.navbarBreadcrumbButtonTextFontSize >
							reduxState[GENERAL_CONTAINER].globalConstants
								.navbarBreadcrumbMinimumFontSize
					}
				/>

				{reduxState[SIZE_CONTAINER].variables.navbar === null ||
				reduxState[SIZE_CONTAINER].variables
					.navbarBreadcrumbButtonTextFontSize === null ||
				reduxState[GENERAL_CONTAINER].globalConstants
					.navbarBreadcrumbMinimumFontSize === null ||
				reduxState[SIZE_CONTAINER].variables
					.navbarBreadcrumbButtonTextFontSize >
					reduxState[GENERAL_CONTAINER].globalConstants
						.navbarBreadcrumbMinimumFontSize ? null : (
					<NavbarHamburger />
				)}

				<div className="navbar__button navbar__button--right js-account-button">
					<div
						className={
							"navbar__button__outer-text-container" +
							getProjectOrBugBackgroundColorClassNameDark(
								getCurrentContainerName(reduxState)
							)
						}
						onClick={openAccountSidebar}
					>
						<div className="navbar__button__outer-text-container__inner-text-container navbar__button__outer-text-container__inner-text-container--right">
							<i className="fa fa-fw fa-user" />
							Account
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
