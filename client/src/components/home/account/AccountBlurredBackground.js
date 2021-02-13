import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACCOUNT_CONTAINER } from "../../../actions/constants/containerNames";

import { setWhichAccountComponentsDisplay } from "../../../actions";

import { getBlurredBackgroundBackgroundColorAndOpacityClassNameForLightOrDarkMode } from "../../../utils";

// This blurred background is its own functional component for optimization
// ...reasons so every account modal
export default function AccountBlurredBackground() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const closeAccountComponents = () => {
		dispatch(setWhichAccountComponentsDisplay({}));
	};

	return (
		<div
			className={
				"account-modals-blurred-background" +
				(reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar
					? " account-modals-blurred-background--account-sidebar" +
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
