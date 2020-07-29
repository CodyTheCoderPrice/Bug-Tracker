import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import Navbar from "./Navbar";
import ProjectsList from "./projects/ProjectsList";
import EditInfoModal from "./account/EditInfoModal";
import EditEmailModal from "./account/EditEmailModal";
import EditPasswordModal from "./account/EditPasswordModal";
import DeleteAccountModal from "./account/DeleteAccountModal";

import "../../SCSS/home/homePage.scss";
/* import "font-awesome/css/font-awesome.min.css"; */

export default function HomePage() {
	const reduxState = useSelector((state) => state);

	return (
		<div className="homePageBackgroundDiv">
			<Navbar />
			{(reduxState.projectComponentsDisplay.projectsList) ? <ProjectsList /> : null}
			{(reduxState.accountComponentsDisplay.editInfoModal) ? <EditInfoModal /> : null}
			{(reduxState.accountComponentsDisplay.editEmailModal) ? <EditEmailModal /> : null}
			{(reduxState.accountComponentsDisplay.editPasswordModal) ? <EditPasswordModal />: null}
			{(reduxState.accountComponentsDisplay.deleteAccountModal) ? <DeleteAccountModal />: null}
		</div>
	);
}
