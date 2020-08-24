import React from "react";
import { useSelector } from "react-redux";
// Components
import Navbar from "./Navbar";
import ProjectsTable from "./projects/ProjectsTable";

import "../../SCSS/home/home.scss";

export default function Home() {
	const reduxState = useSelector((state) => state);

	return (
		<div className="home-container js-home-container">
			<Navbar />
			{(reduxState.projectComponentsDisplay.projectsTable) ? <ProjectsTable /> : null}
		</div>
	);
}
