import React, { useEffect } from "react";

import { toggleClassName } from "../../../utils/elementUtils";

// This blurred background is its own functional component for optimization
// ...reasons so every account modal
export default function AccountBlurredBackground() {

	// Disable scrolling for the HTML and body
	useEffect(() => {
		let body = document.getElementsByClassName("js-body")[0];

		toggleClassName(true, body, "stop-scrolling");

		return () => {
			toggleClassName(false, body, "stop-scrolling");
		};
	}, []);

	return (
		<div className="account-modals-blurred-background" />
	);
}
