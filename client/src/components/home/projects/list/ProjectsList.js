import React from "react";

// Components
import SearchFilterSortBar from "./SearchFilterSortBar"
import ProjectsTable from "./ProjectsTable";

export default function ProjectsList() {
	return (
		<div className="projects-list-component">
			<SearchFilterSortBar />
			<ProjectsTable />
		</div>
	);
}
