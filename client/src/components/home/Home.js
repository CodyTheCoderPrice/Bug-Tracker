import React from "react";
import { useSelector } from "react-redux";
// Components
import Navbar from "./Navbar";
import ProjectsTable from "./projects/ProjectsTable";
import EditInfoModal from "./account/EditInfoModal";
import EditEmailModal from "./account/EditEmailModal";
import EditPasswordModal from "./account/EditPasswordModal";
import DeleteAccountModal from "./account/DeleteAccountModal";

import "../../SCSS/home/home.scss";
/* import "font-awesome/css/font-awesome.min.css"; */

export default function Home() {
	const reduxState = useSelector((state) => state);

	return (
		<div className="home-page-background">
			<Navbar />
			{(reduxState.projectComponentsDisplay.projectsList) ? <ProjectsTable /> : null}
			{(reduxState.accountComponentsDisplay.editInfoModal) ? <EditInfoModal /> : null}
			{(reduxState.accountComponentsDisplay.editEmailModal) ? <EditEmailModal /> : null}
			{(reduxState.accountComponentsDisplay.editPasswordModal) ? <EditPasswordModal />: null}
			{(reduxState.accountComponentsDisplay.deleteAccountModal) ? <DeleteAccountModal />: null}
		</div>
	);
}
