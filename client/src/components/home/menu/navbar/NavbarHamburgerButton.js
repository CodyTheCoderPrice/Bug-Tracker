import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleHamburgerDropdown } from "../../../../utils";

export default function NavbarHamburgerButton() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<div
			className="hamburger-button-container"
			alt="Navbar hamburger button to open dropdown for different pages"
			onClick={(e) => toggleHamburgerDropdown(e, reduxState, dispatch)}
		>
			<i
				className="fa fa-bars hamburger-button-container__icon"
				aria-hidden="true"
			/>
		</div>
	);
}
