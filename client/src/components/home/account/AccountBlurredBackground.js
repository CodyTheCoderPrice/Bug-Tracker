import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setWhichAccountComponentsDisplay } from "../../../actions";
import { ACCOUNT_CONTAINER } from "../../../actions/constants/containerNames";

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
					? " account-modals-blurred-background--account-sidebar"
					: "")
			}
			onClick={
				reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar
					? closeAccountComponents
					: null
			}
		/>
	);
}
