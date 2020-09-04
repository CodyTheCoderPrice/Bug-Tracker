import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { toggleClassName } from "../../../utils/elementUtils";

export default function AccountBlurredBackground() {
	const reduxState = useSelector((state) => state);

	// Move window to top of screen and disable scrolling for the HTML and body
	useEffect(() => {
		let html = document.getElementsByClassName("js-html")[0];
		let body = document.getElementsByClassName("js-body")[0];

		toggleClassName(true, html, "stop-scrolling");
		toggleClassName(true, body, "stop-scrolling");

		return () => {
			toggleClassName(false, html, "stop-scrolling");
			toggleClassName(false, body, "stop-scrolling");
		};
	}, []);

	return (
		<div className="account-modals-blurred-background" />
	);
}
