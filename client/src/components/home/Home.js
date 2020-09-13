import React from "react";
import { useSelector } from "react-redux";

// Components
// Navbar
import Navbar from "./Navbar";
// Account
import AccountDropdown from "./account/AccountDropdown";
import AccountBlurredBackground from "./account/AccountBlurredBackground";
import EditInfoModal from "./account/EditInfoModal";
import EditEmailModal from "./account/EditEmailModal";
import EditPasswordModal from "./account/EditPasswordModal";
import DeleteAccountModal from "./account/DeleteAccountModal";
// Projects
import ProjectsList from "./projects/list/ProjectsList";
import CreateProjectSidebar from "./projects/CreateProjectSidebar";
import ViewProjectModal from "./projects/view-edit-delete/ViewProjectModal";
import MassDeleteProjectsModal from "./projects/list/MassDeleteProjectsModal";

import "../../SCSS/home/home.scss";

export default function Home() {
	const reduxState = useSelector((state) => state);

	return (
		<div className="home-container js-home-container">
			<Navbar />
			{/*Account components*/}
			{Object.values(reduxState.accountComponentsDisplay).indexOf(true) > -1 ? (
				<AccountBlurredBackground />
			) : null}
			{reduxState.accountComponentsDisplay.accountDropdown ? (
				<AccountDropdown />
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
				<ProjectsList />
			) : null}
			{reduxState.projectComponentsDisplay.createProjectSidbar ? (
				<CreateProjectSidebar />
			) : null}
			{reduxState.projectComponentsDisplay.viewProjectModal ? (
				<ViewProjectModal />
			) : null}
			{reduxState.massDeleteComponentsDisplay.massDeleteProjectsModal ? (
				<MassDeleteProjectsModal />
			) : null}
		</div>
	);
}
