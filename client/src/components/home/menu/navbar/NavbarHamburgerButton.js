import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleHamburgerDropdown } from "../../../../utils";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function NavbarHamburgerButton() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<div
			className="hamburger-button-container"
			alt="Navbar hamburger button to open dropdown for different pages"
			onClick={(e) => toggleHamburgerDropdown(e, reduxState, dispatch)}
		>
			<FontAwesomeIcon
				icon={faBars}
				className="hamburger-button-container__icon"
				aria-hidden="true"
			/>
		</div>
	);
}
