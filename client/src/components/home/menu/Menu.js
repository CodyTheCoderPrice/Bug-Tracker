import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setDisplaySizeConstants,
	setDisplaySizeVariablesWindowAndMenus,
	setDisplaySizeVariablesBreadcrumbFontSize,
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
	getItemViewListSidebarComponentContainerElementWithExpandedModifierWidth,
	getItemViewComponentPaddingContainerElementLeftPadding,
	getItemViewComponentOuterDividingContainerElementMinWidth,
} from "../../../utils";

// Components
import NavPanel from "./nav-panel/NavPanel";
import Navbar from "./navbar/Navbar";

export default function Menu() {
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
					document.getElementsByClassName("js-navbar-account-button")[0]
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
				itemViewListSidebarComponentContainerElementWithExpandedModifierWidth:
					getItemViewListSidebarComponentContainerElementWithExpandedModifierWidth(),
			})
		);

		// Sets initial
		dispatch(
			setDisplaySizeVariablesWindowAndMenus({
				window: getWindowSize(),
				navPanel: getElementSize(document.getElementsByClassName("js-nav-panel")[0]),
				navbar: getElementSize(document.getElementsByClassName("js-navbar")[0]),
			})
		);

		// Since breadcrumb font resize does not happen until after app start-up
		// or refresh, it's safe to initialize as breadcrumbButtonTextElementBaseFontSize
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
			setDisplaySizeVariablesWindowAndMenus({
				window: getWindowSize(),
				navPanel: getElementSize(document.getElementsByClassName("js-nav-panel")[0]),
				navbar: getElementSize(document.getElementsByClassName("js-navbar")[0]),
			})
		);
	}

	return (
		<div>
			<NavPanel />
			<Navbar />
		</div>
	);
}
