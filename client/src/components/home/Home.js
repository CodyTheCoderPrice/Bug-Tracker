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
import Navbar from "./Navbar";
// Account
import AccountBlurredBackground from "./account/AccountBlurredBackground";
import AccountSidebar from "./account/AccountSidebar";
import EditAccountModal from "./account/EditAccountModal";
// Projects & Bugs
import ListView from "./projects-bugs-shared/list/ListView";
import ItemView from "./projects-bugs-shared/item/ItemView";

export default function Home() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Closes itemViewTopBarOptionsDropdown whenever it is open and user clicks anywhere
	const closeItemViewTopBarOptionsDropdown = () => {
		// This allows toggleOptionsDropdown to work
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
			onClick={closeItemViewTopBarOptionsDropdown}
		>
			<Navbar />
			{/*Account components*/}
			{/*Displays bullered background when an account component is open*/}
			{Object.values(
				reduxState[ACCOUNT_CONTAINER].componentsDisplay
			).indexOf(true) > -1 ? (
				<AccountBlurredBackground />
			) : null}
			{reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ? (
				<AccountSidebar />
			) : null}
			{Object.values(
				reduxState[ACCOUNT_CONTAINER].componentsDisplay
			).indexOf(true) > -1 &&
			!reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ? (
				<EditAccountModal />
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
