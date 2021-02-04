import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../actions/constants/containerNames";

import { setWhichGeneralComponentsDisplay } from "../../actions";

// Components
// Navbar
import Navbar from "./menu/Navbar";
// Account
import AccountBlurredBackground from "./account/AccountBlurredBackground";
import AccountSidebar from "./account/AccountSidebar";
import AccountModal from "./account/AccountModal";
// Projects & Bugs
import ListView from "./projects-bugs-shared/list/ListView";
import ItemView from "./projects-bugs-shared/item/ItemView";

export default function Home() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Closes the hamburger dropdown and the item-view dropdown whenever they are
	// ...open and user anywhere (including the dropdown containers)
	const closeDropdownsWhenOpen = () => {
		if (
			reduxState[GENERAL_CONTAINER].componentsDisplay.navbarHamburherDropdown
		) {
			dispatch(
				setWhichGeneralComponentsDisplay({
					...reduxState[GENERAL_CONTAINER].componentsDisplay,
					navbarHamburherDropdown: false,
				})
			);
		}

		if (
			reduxState[GENERAL_CONTAINER].componentsDisplay
				.itemViewTopBarOptionsDropdown
		) {
			dispatch(
				setWhichGeneralComponentsDisplay({
					...reduxState[GENERAL_CONTAINER].componentsDisplay,
					itemViewTopBarOptionsDropdown: false,
				})
			);
		}
	};

	return (
		<div
			className="home-container"
			onClick={closeDropdownsWhenOpen}
		>
			<Navbar />
			{/*Account components*/}
			{/*Displays blurred background when an account component is open*/}
			{Object.values(reduxState[ACCOUNT_CONTAINER].componentsDisplay).indexOf(
				true
			) > -1 ? (
				<AccountBlurredBackground />
			) : null}
			{reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ? (
				<AccountSidebar />
			) : null}
			{/*If any account component other than accountSidebar is true, display modal*/}
			{Object.values(reduxState[ACCOUNT_CONTAINER].componentsDisplay).indexOf(
				true
			) > -1 &&
			!reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ? (
				<AccountModal />
			) : null}
			{/*Project components*/}
			{reduxState[PROJECT_CONTAINER].componentsDisplay.listView ? (
				<ListView reduxContainerName={PROJECT_CONTAINER} />
			) : null}
			{reduxState[PROJECT_CONTAINER].componentsDisplay.itemView ? (
				<ItemView reduxContainerName={PROJECT_CONTAINER} />
			) : null}
			{/*Bug components*/}
			{reduxState[BUG_CONTAINER].componentsDisplay.listView ? (
				<ListView reduxContainerName={BUG_CONTAINER} />
			) : null}
			{reduxState[BUG_CONTAINER].componentsDisplay.itemView ? (
				<ItemView reduxContainerName={BUG_CONTAINER} />
			) : null}
		</div>
	);
}
