import { useState, useEffect } from "react";
import { sizeContainerName } from "../reducers/containerNames";

import { getElementStyle, stripNonDigits } from "./displaySizeUtils";

export function useSidebarResize(passedReduxState, nameOfSidebarClass) {
	// Used to decide when to resize the sidebar, and to reset its size
	const [
		originalSidebarSizeAndStyle,
		setOriginalSidebarSizeAndStyle,
	] = useState(null);

	// Adjusts the height of the sidebar to fit the screen
	useEffect(() => {
		if (
			passedReduxState[sizeContainerName].variables.window !== null &&
			passedReduxState[sizeContainerName].variables.navbar !== null
		) {
			let sidebarElement = document.getElementsByClassName(nameOfSidebarClass)[0];

			// Makes sure originalSidebarSizeAndStyle gets set
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

			const adjustedWindowHeight =
				passedReduxState[sizeContainerName].variables.window.height -
				passedReduxState[sizeContainerName].variables.navbar.height -
				originalSidebarSizeAndStyle.marginBottom -
				originalSidebarSizeAndStyle.borderBottom;

			if (originalSidebarSizeAndStyle.height > adjustedWindowHeight) {
				sidebarElement.style.height = adjustedWindowHeight + "px";
			} else {
				sidebarElement.style.height = originalSidebarSizeAndStyle.height + "px";
			}
		}
		// eslint-disable-next-line
	}, [passedReduxState[sizeContainerName].variables, originalSidebarSizeAndStyle]);

	return [];
}
