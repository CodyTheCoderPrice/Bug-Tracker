import { useState, useEffect } from "react";
// Util uses container names to work with the redux state
import { SIZE_CONTAINER } from "../../actions/constants/containerNames";
import { getElementStyle, stripNonDigits } from "../index";

/**
 * Custom hook that resizes a sidebar element's (i.e. with 'sidebar-container' 
 * className) height to fit within the available vertical space between the 
 * Navbar component and the bottom of the window.
 * 
 * Note: The purpose of this custom hook is to be used by the AccountSidebar and
 * ListViewCreateItemSidebar components to verticlally resize them to fit the 
 * window whenever it becomes smaller than their base sizes, so thier overflow
 * scrollbar can activate, allowing the user to still use them properly.
 * 
 * @param {Object} passedReduxState - Current redux state from 
 * useSelector((state) => state)
 * @param {string} sidebarContainerClassName - Unique className assigned to the
 * element with 'sidebar-container' className
 * 
 * @example
 * useSidebarResize(reduxState, "js-account-sidebar-container");
 */
export function useSidebarResize(passedReduxState, sidebarContainerClassName) {
	// Optimizes hook by storing constant element sizes and styles
	const [
		originalSidebarSizeAndStyle,
		setOriginalSidebarSizeAndStyle,
	] = useState(null);

	useEffect(() => {
		if (
			passedReduxState[SIZE_CONTAINER].variables.window !== null &&
			passedReduxState[SIZE_CONTAINER].variables.navbar !== null
		) {
			let sidebarElement = document.getElementsByClassName(
				sidebarContainerClassName
			)[0];

			if (originalSidebarSizeAndStyle === null) {
				const sidebarStyle = getElementStyle(sidebarElement);
				setOriginalSidebarSizeAndStyle({
					height: stripNonDigits(sidebarStyle.height),
					marginBottom: stripNonDigits(sidebarStyle.marginBottom),
					borderBottom: stripNonDigits(sidebarStyle.borderBottomWidth),
				});

				// Prevents crash since originalSidebarSizeAndStyle will still
				// ...be null for remainder of this useEfffect iteration
				return;
			}

			// Margin used to keep gap between bottom of sidebar and window
			const availableHeight =
				passedReduxState[SIZE_CONTAINER].variables.window.height -
				passedReduxState[SIZE_CONTAINER].variables.navbar.height -
				originalSidebarSizeAndStyle.marginBottom -
				originalSidebarSizeAndStyle.borderBottom;

			if (originalSidebarSizeAndStyle.height > availableHeight) {
				sidebarElement.style.height = availableHeight + "px";
			} else {
				sidebarElement.style.height = originalSidebarSizeAndStyle.height + "px";
			}
		}
		// eslint-disable-next-line
	}, [passedReduxState[SIZE_CONTAINER].variables, originalSidebarSizeAndStyle]);
}
