import React from "react";
import { useSelector } from "react-redux";
// Components
import Navbar from "./Navbar";
import ProjectsTable from "./projects/ProjectsTable";
import CreateProjectSidebar from "./projects/CreateProjectSidebar";
import ViewProjectModal from "./projects/view-edit-delete/ViewProjectModal";

import "../../SCSS/home/home.scss";

export default function Home() {
	const reduxState = useSelector((state) => state);

	return (
		<div className="home-container js-home-container">
			<Navbar />
			{reduxState.projectComponentsDisplay.projectsTable ? (
				<ProjectsTable />
			) : null}
			{/*In the navbar for css positioning*/}
			{reduxState.projectComponentsDisplay.createProjectSidbar ? (
				<CreateProjectSidebar />
			) : null}
			{reduxState.projectComponentsDisplay.viewProjectModal ? (
				<ViewProjectModal />
			) : null}
		</div>
	);
}
