import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";

import { setWhichProjectModalsDisplay } from "../../../actions";

import "../../../SCSS/createProjectSidebar.scss";

export default function CreateProjectSidebar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [projectInfo, setProjectInfo] = useState({
		name: "",
		description: "",
		status: 0,
		priority: 0,
		startDate: null,
		dueDate: "",
		completionDate: "",
	});

	const [shouldShowAnyErrors, setShouldShowAnyErrors] = useState(false);

	const onChange = (e) => {
		setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
	};

	const closeCreateProjectSidebar = () => {
		dispatch(setWhichProjectModalsDisplay({}));
	};

	/* const handleSubmit = (e) => {
		e.preventDefault();
		// clears any prior input errors
		dispatch(clearInputErrors());
		dispatch(registerAccount(accountInfo));
		setShouldShowAnyErrors(true);
	}; */

	return (
		<div>
			<div className="createProjectBlurredBackgroundClickableDiv" onClick={closeCreateProjectSidebar} />
			<div className="createProjectSidebarContainerDiv">
				<label>Here I am</label>
			</div>
		</div>
	);
}
