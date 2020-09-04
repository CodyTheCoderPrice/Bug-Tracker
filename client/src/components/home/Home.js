import React from "react";
import { useSelector } from "react-redux";
// Components
import Navbar from "./Navbar";
import ProjectsTable from "./projects/ProjectsTable";
import CreateProjectSidebar from "./projects/CreateProjectSidebar";
import ViewProjectModal from "./projects/view-edit-delete/ViewProjectModal";

import AccountBlurredBackground from "./account/AccountBlurredBackground";
import EditInfoModal from "./account/EditInfoModal";
import EditEmailModal from "./account/EditEmailModal";
import EditPasswordModal from "./account/EditPasswordModal";
import DeleteAccountModal from "./account/DeleteAccountModal";

import "../../SCSS/home/home.scss";

export default function Home() {
	const reduxState = useSelector((state) => state);

	return (
		<div className="home-container js-home-container">
			<Navbar />
			{/*Account components*/}
			{reduxState.accountComponentsDisplay.editInfoModal ||
			reduxState.accountComponentsDisplay.editEmailModal ||
			reduxState.accountComponentsDisplay.editPasswordModal ||
			reduxState.accountComponentsDisplay.deleteAccountModal ? (
				<AccountBlurredBackground />
			) : null}
			{reduxState.accountComponentsDisplay.editInfoModal ? (
				<EditInfoModal />
			) : null}
			{reduxState.accountComponentsDisplay.editEmailModal ? (
				<EditEmailModal />
			) : null}
			{reduxState.accountComponentsDisplay.editPasswordModal ? (
				<EditPasswordModal />
			) : null}
			{reduxState.accountComponentsDisplay.deleteAccountModal ? (
				<DeleteAccountModal />
			) : null}
			{/*Project components*/}
			{reduxState.projectComponentsDisplay.projectsTable ? (
				<ProjectsTable />
			) : null}
			{reduxState.projectComponentsDisplay.createProjectSidbar ? (
				<CreateProjectSidebar />
			) : null}
			{reduxState.projectComponentsDisplay.viewProjectModal ? (
				<ViewProjectModal />
			) : null}
		</div>
	);
}
