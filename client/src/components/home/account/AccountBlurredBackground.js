import React from "react";
import { useDispatch } from "react-redux";

import { setWhichAccountComponentsDisplay } from "../../../actions";

import "../../../SCSS/home/account/accountBlurredBackground.scss";

// This blurred background is its own functional component for optimization
// ...reasons so every account modal
export default function AccountBlurredBackground() {
	const dispatch = useDispatch();

	const closeAccountComponents = () => {
		dispatch(setWhichAccountComponentsDisplay({}));
	};

	return (
		<div
			className="account-modals-blurred-background"
			onClick={closeAccountComponents}
		/>
	);
}
