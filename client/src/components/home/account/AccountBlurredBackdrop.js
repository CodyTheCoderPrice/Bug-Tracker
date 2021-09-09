import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACCOUNT_CONTAINER } from "../../../actions/constants/containerNames";
// Component uses container names to work with the redux state
import { setWhichAccountComponentsDisplay } from "../../../actions";
import { getCommonBlurredBackdropElementBackgroundColorAndOpacityClassNameForLightOrDarkMode } from "../../../utils";


/**
 * React functional component of a blurred backdrop to be paired (as a 
 * sibling) with AccountSidebar and AccountModal components. The blurred 
 * backdrop is placed under (z-index) account components, but above the 
 * components underneath account components. This keeps account components 
 * clickable, while making components underneath them unclickable. If 
 * AccountSidebar is displayed, then clicking the blurred backdrop will close
 * all account components.
 * 
 * Note: There is no single flag inside 'componentsDisplay' Object in 
 * 'ACCOUNT_CONTAINER' of the redux state designated for when this component 
 * should display. Instead, this component should display if any flags inside
 * that Object are true.
 * 
 * @component
 */
export default function AccountBlurredBackdrop() {
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
				"account-modals-blurred-backdrop-component" +
				// Lowers blurred backdrop bellow Navbar so it can still be used 
				// while AccountSidebar is open.
				(reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebarComponentShouldDisplay
					? " account-modals-blurred-backdrop-component--below-navbar" +
					  getCommonBlurredBackdropElementBackgroundColorAndOpacityClassNameForLightOrDarkMode(
							true,
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					  )
					: getCommonBlurredBackdropElementBackgroundColorAndOpacityClassNameForLightOrDarkMode(
							false,
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					  ))
			}
			onClick={
				// Blurred backdrop for AccountSidebar will close all account 
				// components if clicked since users likely would expect it to.
				// Also since no account components with forms will be open while
				// AccountSidebar is, means there is no risk of a user losing data 
				// they are entering by accidentally clicking the blurred backdrop.
				reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebarComponentShouldDisplay
					? closeAccountComponents
					: null
			}
		/>
	);
}
