import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACCOUNT_CONTAINER } from "../../../actions/constants/containerNames";
// Component uses container names to work with the redux state
import { setWhichAccountComponentsDisplay } from "../../../actions";
import { getBlurredBackgroundBackgroundColorAndOpacityClassNameForLightOrDarkMode } from "../../../utils";


/**
 * React functional component of a blurred background to be paired with 
 * AccountSidebar or AccountModal components. The blurred background is placed
 * between (z-index) these account component(s) and components underneath them.
 * This keeps these account components clickable, while making components 
 * underneath them unclickable. If AccountSidebar is active, then clicking the
 * blurred background will close all account components.
 * 
 * This component should only active if at least one account component 
 * (AccountSidebar or AccountModal components) is also active as a sibling.
 * 
 * @component
 */
export default function AccountBlurredBackground() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	/**
	 * Closes all account components
	 */
	const closeAccountComponents = () => {
		dispatch(setWhichAccountComponentsDisplay({}));
	};

	return (
		<div
			className={
				"account-modals-blurred-background" +
				(reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar
					? " account-modals-blurred-background--below-navbar" +
					  getBlurredBackgroundBackgroundColorAndOpacityClassNameForLightOrDarkMode(
							true,
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					  )
					: getBlurredBackgroundBackgroundColorAndOpacityClassNameForLightOrDarkMode(
							false,
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					  ))
			}
			onClick={
				reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar
					? closeAccountComponents
					: null
			}
		/>
	);
}
