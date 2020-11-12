import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	generalContainerName,
	accountContainerName,
	projectContainerName,
	bugContainerName,
} from "../../reducers/containerNames";

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
			reduxState[generalContainerName].componentsDisplay
				.itemContainerTopBarOptionsDropdown
		) {
			dispatch(
				setWhichGeneralComponentsDisplay({
					...reduxState[generalContainerName].componentsDisplay,
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
				reduxState[accountContainerName].componentsDisplay
			).indexOf(true) > -1 ? (
				<AccountBlurredBackground />
			) : null}
			{reduxState[accountContainerName].componentsDisplay.accountSidebar ? (
				<AccountSidebar />
			) : null}
			{Object.values(
				reduxState[accountContainerName].componentsDisplay
			).indexOf(true) > -1 &&
			!reduxState[accountContainerName].componentsDisplay.accountSidebar ? (
				<EditAccountModal />
			) : null}
			{/*Project components*/}
			{reduxState[projectContainerName].componentsDisplay.listContainer ? (
				<ListContainer reduxContainerName={projectContainerName} />
			) : null}
			{reduxState[projectContainerName].componentsDisplay.itemContainer ? (
				<ItemContainer reduxContainerName={projectContainerName} />
			) : null}
			{/*Bug components*/}
			{reduxState[bugContainerName].componentsDisplay.listContainer ? (
				<ListContainer reduxContainerName={bugContainerName} />
			) : null}
			{reduxState[bugContainerName].componentsDisplay.itemContainer ? (
				<ItemContainer reduxContainerName={bugContainerName} />
			) : null}
		</div>
	);
}
