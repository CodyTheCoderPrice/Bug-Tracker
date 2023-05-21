import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
	setDisplaySizeConstants,
	setDisplaySizeVariablesWindowAndMenus,
} from "../../../actions";

import {
	getWindowSize,
	getElementSize,
	getScrollbarWidth,
	getListViewTopBarComponentHeight,
	getListViewTableComponentRowElementHeight,
	getItemViewTopBarComponentHeight,
	getItemViewComponentPaddingContainerElementLeftPadding,
	getItemViewComponentOuterDividingContainerElementMinWidth,
} from "../../../utils";

// Components
import NavPanel from "./nav-panel/NavPanel";
import Navbar from "./navbar/Navbar";

export default function Menu() {
	const dispatch = useDispatch();

	// Makes sure the current size of the window and navbar are stored in redux
	useEffect(() => {
		dispatch(
			setDisplaySizeConstants({
				scrollbarWidth: getScrollbarWidth(),
				listViewTopBarComponentHeight: getListViewTopBarComponentHeight(),
				listViewTableComponentRowElementHeight:
					getListViewTableComponentRowElementHeight(),
				itemViewComponentPaddingContainerElementLeftPadding:
					getItemViewComponentPaddingContainerElementLeftPadding(),
				itemViewComponentOuterDividingContainerElementMinWidth:
					getItemViewComponentOuterDividingContainerElementMinWidth(),
				itemViewTopBarComponentHeight: getItemViewTopBarComponentHeight(),
			})
		);

		// Initializes display sizes
		displaySizeHandler();

		// Adds event to update navbar size on a resize
		window.addEventListener("resize", displaySizeHandler);

		return () => {
			window.removeEventListener("resize", displaySizeHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Declared as an object outside the eventListener so removal works on cleanup
	function displaySizeHandler() {
		dispatch(
			setDisplaySizeVariablesWindowAndMenus({
				window: getWindowSize(),
				navPanel: getElementSize(
					document.getElementsByClassName("js-nav-panel-component")[0]
				),
				navbar: getElementSize(document.getElementsByClassName("js-navbar-component")[0]),
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
