import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";

import { setNavbarDropdownComponents } from "../actions";

// Components
import Navbar from "./Navbar";

import "../SCSS/projectsPage.scss";

export default function ProjectsPage() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	/* const openEditInfoModals = () => {
		dispatch(
			setAccountModalComponents({
				editInfoModal: <EditInfoModal />,
				editEmailModal: null,
				editPasswordModal: null,
			})
		);
	}; */

	return (
		<div className="projectsBackgroundDiv">
			<Navbar />
			<div className="projectsConstainerDiv">
				<table className="projectsTable">
					<tbody>
						<th className="projectTableHeaders">
							<td>Name</td>
							<td>Description</td>
							<td>Status</td>
							<td>Priority</td>
							<td>Start-Date</td>
							<td>End-Date</td>
							<td>Completion-Date</td>
						</th>
						{reduxState.projects.map((project, i) => {
							return (
								<tr key={i} className="projectTableRows">
									{/* <td className="editButtonTD">
										<button>Edit</button>
									</td> */}
									<td className="projectNameTD">{project.name}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
