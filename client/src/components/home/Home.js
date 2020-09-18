import React from "react";
import { useSelector } from "react-redux";

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
// Projects
import ProjectsList from "./projects-bugs-shared/list/ProjectsList";
import CreateProjectSidebar from "./projects-bugs-shared/list/CreateProjectSidebar";
import ViewProjectModal from "./projects-bugs-shared/view-edit-delete/ViewProjectModal";
import MassDeleteProjectsModal from "./projects-bugs-shared/list/MassDeleteProjectsModal";

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
			{reduxState.projectContainer.componentsDisplay.projectsTable ? (
				<ProjectsList />
			) : null}
			{reduxState.projectContainer.componentsDisplay.createProjectSidbar ? (
				<CreateProjectSidebar />
			) : null}
			{reduxState.projectContainer.componentsDisplay.viewProjectModal ? (
				<ViewProjectModal />
			) : null}
			{reduxState.projectContainer.componentsDisplay.massDeleteProjectsModal ? (
				<MassDeleteProjectsModal />
			) : null}
		</div>
	);
}
