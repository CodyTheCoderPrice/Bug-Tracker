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
	getScrollbarWidth,
	getNavbarBreadcrumbComponentButtonTextElementBaseFontSize,
	getNavbarBreadcrumbComponentButtonArrowElementWidth,
	getNavbarHamburgerComponentCriticalStyles,
	getListViewTopBarComponentHeight,
	getListViewTableComponentRowElementHeight,
	getItemViewTopBarComponentHeight,
	getItemViewListSidebarComponentWidth,
	getItemViewComponentPaddingContainerElementLeftPadding,
	getItemViewComponentOuterDividingContainerElementMinWidth,
	getCommonStandardBackgroundColorClassNameForTheme,
} from "../../../utils";

// Components
import NavbarBreadcrumb from "./NavbarBreadcrumb";
import NavbarHamburger from "./NavbarHamburger";

export default function Navbar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Makes sure the current size of the window and navbar are stored in redux
	useEffect(() => {
		const breadcrumbButtonTextElementBaseFontSize =
			getNavbarBreadcrumbComponentButtonTextElementBaseFontSize();

		dispatch(
			setDisplaySizeConstants({
				scrollbarWidth: getScrollbarWidth(),
				navbarAccountButtonWidth: getElementSize(
					document.getElementsByClassName("js-account-button")[0]
				).width,
				navbarBreadcrumbComponentButtonTextElementBaseFontSize:
					breadcrumbButtonTextElementBaseFontSize,
				navbarBreadcrumbComponentButtonArrowElementWidth:
					getNavbarBreadcrumbComponentButtonArrowElementWidth(),
				navbarHamburgerComponentCriticalStyles:
					getNavbarHamburgerComponentCriticalStyles(),
				listViewTopBarComponentHeight: getListViewTopBarComponentHeight(),
				listViewTableComponentRowElementHeight:
					getListViewTableComponentRowElementHeight(),
				itemViewComponentPaddingContainerElementLeftPadding:
					getItemViewComponentPaddingContainerElementLeftPadding(),
				itemViewComponentOuterDividingContainerElementMinWidth:
					getItemViewComponentOuterDividingContainerElementMinWidth(),
				itemViewTopBarComponentHeight: getItemViewTopBarComponentHeight(),
				itemViewListSidebarComponentWidth:
					getItemViewListSidebarComponentWidth(),
			})
		);

		dispatch(
			setDisplaySizeVariablesWindowAndNavbar({
				window: getWindowSize(),
				navbar: getElementSize(document.getElementsByClassName("js-navbar")[0]),
			})
		);

		// Since breadcrumb font resize does not happen until after app start-up
		// ...or refresh, it's safe to initialize as breadcrumbButtonTextElementBaseFontSize
		dispatch(
			setDisplaySizeVariablesBreadcrumbFontSize(
				breadcrumbButtonTextElementBaseFontSize
			)
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
			setDisplaySizeVariablesWindowAndNavbar({
				window: getWindowSize(),
				navbar: getElementSize(document.getElementsByClassName("js-navbar")[0]),
			})
		);
	}

	const openAccountSidebar = (e) => {
		// Keeps onclick set on the navbar component for closing
		// ...account components from interfering
		e.stopPropagation();

		dispatch(
			setWhichAccountComponentsDisplay({
				accountSidebar:
					!reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar,
			})
		);
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState[PROJECT_CONTAINER].componentsDisplay,
				listViewCreateItemSidbar: false,
				itemViewDeleteModal: false,
				listViewDeleteModal: false,
			})
		);
		dispatch(
			setWhichBugComponentsDisplay({
				...reduxState[BUG_CONTAINER].componentsDisplay,
				listViewCreateItemSidbar: false,
				itemViewDeleteModal: false,
				listViewDeleteModal: false,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	};

	const shouldBreadcrumbBeVisible = () => {
		return (
			reduxState[SIZE_CONTAINER].variables.navbar === null ||
			reduxState[SIZE_CONTAINER].variables
				.navbarBreadcrumbButtonTextFontSize === null ||
			reduxState[GENERAL_CONTAINER].globalConstants
				.navbarBreadcrumbMinimumFontSize === null ||
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
				null ||
			reduxState[SIZE_CONTAINER].variables.navbarBreadcrumbButtonTextFontSize >
				reduxState[GENERAL_CONTAINER].globalConstants
					.navbarBreadcrumbMinimumFontSize
		);
	};

	return (
		<div
			className={
				"navbar-container" +
				(shouldBreadcrumbBeVisible()
					? ""
					: " navbar-container--increased-z-index")
			}
		>
			<div
				className={
					"navbar js-navbar" +
					getCommonStandardBackgroundColorClassNameForTheme(
						reduxState[ACCOUNT_CONTAINER].settings.theme_color
					)
				}
			>
				<NavbarBreadcrumb visible={shouldBreadcrumbBeVisible()} />
				{shouldBreadcrumbBeVisible() ? null : <NavbarHamburger />}

				<div
					className="navbar__account-button js-account-button"
					alt="Navbar button to open account sidebar"
				>
					<div
						className="navbar__account-button__text"
						onClick={openAccountSidebar}
					>
						<i className="fa fa-fw fa-user" alt="Icon of a user" />
						Account
					</div>
				</div>
			</div>
		</div>
	);
}
