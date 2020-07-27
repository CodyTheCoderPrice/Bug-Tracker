import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";

/* import { setNavbarDropdownComponents } from "../../../actions"; */

// Components
import Navbar from "../Navbar";

import "../../../SCSS/projectBlocks.scss";

export default function ProjectsBlock(props) {
	/* 	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch(); */

	/* const openEditInfoModals = () => {
		dispatch(
			setAccountModalComponents({
				editInfoModal: <EditInfoModal />,
				editEmailModal: null,
				editPasswordModal: null,
			})
		);
	}; */

	const printProject = () => {
		console.log(props);
	}

	return (
		<div className="projectsBlockDiv">
			<div className="projectNameDiv">
				<label className="projectNameLabel">{props.project.name}</label>
				{/* <button onClick={printProject}>Print Info</button> */}
			</div>
			<div className="projectDescriptionDiv">
				<label className="projectDescriptionLabel">{props.project.description}</label>
			</div>
		</div>
	);
}
