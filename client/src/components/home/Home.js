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
import ListTable from "./projects-bugs-shared/list/ListTable";
import CreateItemSidebar from "./projects-bugs-shared/item/CreateItemSidebar";
import ViewItemModal from "./projects-bugs-shared/item/ViewItemModal";
import ListTableMassDeleteItemsModal from "./projects-bugs-shared/list/ListTableMassDeleteItemsModal";

import "../../SCSS/home/home.scss";

export default function Home() {
	const reduxState = useSelector((state) => state);

	return (
		<div className="home-container js-home-container">
			<Navbar />
			{/*Account components*/}
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
			{reduxState[projectContainerName].componentsDisplay.listTable ? (
				<ListTable reduxContainerName={projectContainerName} />
			) : null}
			{reduxState[projectContainerName].componentsDisplay.createItemSidbar ? (
				<CreateItemSidebar reduxContainerName={projectContainerName} />
			) : null}
			{reduxState[projectContainerName].componentsDisplay.viewItemModal ? (
				<ViewItemModal reduxContainerName={projectContainerName} />
			) : null}
			{reduxState[projectContainerName].componentsDisplay.listTableMassDeleteItemsModal ? (
				<ListTableMassDeleteItemsModal reduxContainerName={projectContainerName} />
			) : null}
			{/*Bug components*/}
			{reduxState[bugContainerName].componentsDisplay.listTable ? (
				<ListTable reduxContainerName={bugContainerName} />
			) : null}
			{reduxState[bugContainerName].componentsDisplay.createItemSidbar ? (
				<CreateItemSidebar reduxContainerName={bugContainerName} />
			) : null}
			{reduxState[bugContainerName].componentsDisplay.viewItemModal ? (
				<ViewItemModal reduxContainerName={bugContainerName} />
			) : null}
			{reduxState[bugContainerName].componentsDisplay.listTableMassDeleteItemsModal ? (
				<ListTableMassDeleteItemsModal reduxContainerName={bugContainerName} />
			) : null}
		</div>
	);
}
