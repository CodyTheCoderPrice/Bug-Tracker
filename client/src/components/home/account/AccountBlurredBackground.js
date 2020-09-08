import React, { useEffect } from "react";

import { toggleClassName } from "../../../utils/elementUtils";

export default function AccountBlurredBackground() {

	// Move window to top of screen and disable scrolling for the HTML and body
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
