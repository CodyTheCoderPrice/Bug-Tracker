import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setWhichAccountComponentsDisplay } from "../../../actions";

import { toggleClassName } from "../../../utils/elementUtils";

import "../../../SCSS/account/accountBlurredBackground.scss";

// This blurred background is its own functional component for optimization
// ...reasons so every account modal
export default function AccountBlurredBackground() {
	const dispatch = useDispatch();

	// Disable scrolling for the body
	useEffect(() => {
		let body = document.getElementsByClassName("js-body")[0];

		toggleClassName(true, body, "stop-x-y-scrolling");

		return () => {
			toggleClassName(false, body, "stop-x-y-scrolling");
		};
	}, []);

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
