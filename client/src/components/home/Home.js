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
import ListContainer from "./projects-bugs-shared/list/ListContainer";
import ItemContainer from "./projects-bugs-shared/item/ItemContainer";

import "../../SCSS/home/home.scss";

export default function Home() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Closes itemContainerTopBarOptionsDropdown whenever it is open and user clicks anywhere
	const closeItemContainerTopBarOptionsDropdown = () => {
		// This allows toggleOptionsDropdown to work
		if (
			reduxState[GENERAL_CONTAINER].componentsDisplay
				.itemContainerTopBarOptionsDropdown
		) {
			dispatch(
				setWhichGeneralComponentsDisplay({
					...reduxState[GENERAL_CONTAINER].componentsDisplay,
					itemContainerTopBarOptionsDropdown: false,
				})
			);
		}
	};

	return (
		<div
			className="home-container"
			onClick={closeItemContainerTopBarOptionsDropdown}
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
			{reduxState[PROJECT_CONTAINER].componentsDisplay.listContainer ? (
				<ListContainer reduxContainerName={PROJECT_CONTAINER} />
			) : null}
			{reduxState[PROJECT_CONTAINER].componentsDisplay.itemContainer ? (
				<ItemContainer reduxContainerName={PROJECT_CONTAINER} />
			) : null}
			{/*Bug components*/}
			{reduxState[BUG_CONTAINER].componentsDisplay.listContainer ? (
				<ListContainer reduxContainerName={BUG_CONTAINER} />
			) : null}
			{reduxState[BUG_CONTAINER].componentsDisplay.itemContainer ? (
				<ItemContainer reduxContainerName={BUG_CONTAINER} />
			) : null}
		</div>
	);
}
