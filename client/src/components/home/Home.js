import React from "react";
import { useSelector } from "react-redux";
import {
	projectContainerName,
	bugContainerName,
} from "../../reducers/containerNames";

// Components
// Navbar
import Navbar from "./Navbar";
// Account
import AccountSidebar from "./account/AccountSidebar";
import AccountBlurredBackground from "./account/AccountBlurredBackground";
import EditInfoModal from "./account/EditInfoModal";
import EditEmailModal from "./account/EditEmailModal";
import EditPasswordModal from "./account/EditPasswordModal";
import DeleteAccountModal from "./account/DeleteAccountModal";
// Projects & Bugs
import ListContainer from "./projects-bugs-shared/list/ListContainer";
import ItemContainer from "./projects-bugs-shared/item/ItemContainer";

import "../../SCSS/home/home.scss";

export default function Home() {
	const reduxState = useSelector((state) => state);

	return (
		<div className="home-container js-home-container">
			<Navbar />
			{/*Account components*/}
			{/*Displays bullered background when an account component is open*/}
			{Object.values(reduxState.accountContainer.componentsDisplay).indexOf(true) > -1 ? (
				<AccountBlurredBackground />
			) : null}
			{reduxState.accountContainer.componentsDisplay.accountSidebar ? (
				<AccountSidebar />
			) : null}
			{reduxState.accountContainer.componentsDisplay.editInfoModal ? (
				<EditInfoModal />
			) : null}
			{reduxState.accountContainer.componentsDisplay.editEmailModal ? (
				<EditEmailModal />
			) : null}
			{reduxState.accountContainer.componentsDisplay.editPasswordModal ? (
				<EditPasswordModal />
			) : null}
			{reduxState.accountContainer.componentsDisplay.deleteAccountModal ? (
				<DeleteAccountModal />
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
