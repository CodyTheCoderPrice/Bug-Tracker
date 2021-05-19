import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACCOUNT_CONTAINER } from "../../../actions/constants/containerNames";
// Component uses container names to work with the redux state
import { setWhichAccountComponentsDisplay } from "../../../actions";
import { getBlurredBackgroundBackgroundColorAndOpacityClassNameForLightOrDarkMode } from "../../../utils";


/**
 * React functional component of a blurred background to be paired (as a 
 * sibling) with AccountSidebar and AccountModal components. The blurred 
 * background is placed under (z-index) account components, but above the 
 * components underneath account components. This keeps account components 
 * clickable, while making components underneath them unclickable. If 
 * AccountSidebar is displayed, then clicking the blurred background will close
 * all account components.
 * 
 * There is no single flag inside 'componentsDisplay' Object in 
 * ACCOUNT_CONTAINER of the redux state designated for if this component should 
 * display. Instead, this component should display if any flags inside that 
 * Object are true (e.g. accountSidebar, accountModalEditInfo, ect.)
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
