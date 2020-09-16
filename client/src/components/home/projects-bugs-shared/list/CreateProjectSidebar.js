import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";

import {
	setWhichProjectComponentsDisplay,
	createProject,
	clearInputErrors,
} from "../../../../actions";

import { toggleClassName } from "../../../../utils/elementUtils";

import {
	toggleCharCountColor,
	populateComboBox,
} from "../../../../utils/elementUtils";

import { useToggleableDateInput } from "../../../../utils/formHookUtils";

import { useSidebarResize } from "../../../../utils/sidebarResizeHookUtils";

import "../../../../SCSS/projects/createProjectSidebar.scss";

export default function CreateProjectSidebar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [projectInfo, setProjectInfo] = useState({
		name: "",
		description: "",
		// Sets default to the first option
		priority_id: reduxState.priorityStatusArrays.projectPriority[0].id,
		status_id: reduxState.priorityStatusArrays.projectStatus[0].id,
		start_date: moment().format("YYYY-MM-DD"),
		due_date: null,
		completion_date: null,
	});

	const [descriptionCharLimit] = useState(500);

	// Custom hook toggles the display of the date input for completion date
	// ...based on status and makes sure projectInfo contains accurate
	// ...completion date info after every toggle
	const [preservedCompletionDate] = useToggleableDateInput(
		projectInfo,
		"js-completion-input-container",
		reduxState.priorityStatusArrays.projectStatusCompletionId
	);

	// Custom hook resizes the sidebar so that the overflow functionality works
	const [] = useSidebarResize(
		reduxState,
		"js-create-project-sidebar",
	);

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
		};
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);
	

	// Move window to top of screen and disable scrolling for the body
	useEffect(() => {
		window.scrollTo(0, 0);
		let body = document.getElementsByClassName("js-body")[0];

		toggleClassName(true, body, "stop-x-y-scrolling");

		return () => {
			toggleClassName(false, body, "stop-x-y-scrolling");
		};
	}, []);

	useEffect(() => {
		populateComboBox(
			"js-priority-select",
			reduxState.priorityStatusArrays.projectPriority,
			1
		);
		populateComboBox(
			"js-status-select",
			reduxState.priorityStatusArrays.projectStatus,
			1
		);
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		toggleCharCountColor(
			"js-character-counter",
			projectInfo.description.length,
			descriptionCharLimit
		);
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, [projectInfo.description]);

	useEffect(() => {
		if (
			projectInfo.status_id !==
			reduxState.priorityStatusArrays.projectStatusCompletionId
		) {
			setProjectInfo({ ...projectInfo, completion_date: "" });
		} else {
			setProjectInfo({
				...projectInfo,
				completion_date: preservedCompletionDate,
			});
		}
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, [projectInfo.status_id]);

	const onChange = (e) => {
		// Since select option values are always strings while priority and status take integers
		if (e.target.name === "status_id" || e.target.name === "priority_id") {
			setProjectInfo({
				...projectInfo,
				[e.target.name]: Number(e.target.value),
			});
		} else {
			setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
		}
	};

	const closeCreateProjectSidebar = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				createProjectSidbar: false,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createProject(projectInfo));
	};

	return (
		<div className="create-projects-component">
			<div className="blurred-background" onClick={closeCreateProjectSidebar} />
			<div className="create-project-sidebar js-create-project-sidebar">
				<div className="x-button" onClick={closeCreateProjectSidebar}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<div className="padded-container">
					<h1 className="title">New Project</h1>
					<form className="form" noValidate onSubmit={handleSubmit}>
						<label htmlFor="create-project-name" className="form__label">
							Name:{" "}
						</label>
						<input
							type="text"
							name="name"
							onChange={(e) => onChange(e)}
							value={projectInfo.name}
							id="create-project-name"
							className="form__text-input"
						/>
						<span className="form__errors">{reduxState.inputErrors.name}</span>
						<label htmlFor="create-project-description" className="form__label">
							Description:{" "}
						</label>
						<span className="form__character-counter js-character-counter">
							{projectInfo.description.length + "/" + descriptionCharLimit}
						</span>
						<textarea
							name="description"
							onChange={(e) => onChange(e)}
							value={projectInfo.description}
							id="create-project-description"
							className="form__textarea"
						/>
						<span className="form__errors">
							{reduxState.inputErrors.description}
						</span>
						<div className="form__group-container">
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-project-start-date"
									className="form__group-container__input-container__label"
								>
									Start Date:
								</label>
								<input
									type="date"
									name="start_date"
									value={projectInfo.start_date}
									onChange={(e) => onChange(e)}
									id="create-project-start-date"
									className="form__group-container__input-container__date"
								/>
							</div>
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-project-due-date"
									className="form__group-container__input-container__label"
								>
									Due Date:
								</label>
								<input
									type="date"
									name="due_date"
									onChange={(e) => onChange(e)}
									id="create-project-due-date"
									className="form__group-container__input-container__date"
								/>
							</div>
							<div className="form__group-container__input-container js-completion-input-container">
								<label
									htmlFor="create-project-completion-date"
									className="form__group-container__input-container__label"
								>
									Completed on:
								</label>
								<input
									type="date"
									name="completion_date"
									onChange={(e) => onChange(e)}
									id="create-project-completion-date"
									className="form__group-container__input-container__date"
								/>
							</div>
						</div>
						<div className="form__group-container form__group-container--right">
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-project-priority"
									className="form__group-container__input-container__label"
								>
									Priority:
								</label>
								<select
									name="priority_id"
									onChange={(e) => onChange(e)}
									id="create-project-priority"
									className="form__group-container__input-container__select js-priority-select"
								></select>
							</div>
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-project-status"
									className="form__group-container__input-container__label"
								>
									Status:
								</label>
								<select
									name="status_id"
									onChange={(e) => onChange(e)}
									id="create-project-status"
									className="form__group-container__input-container__select js-status-select"
								></select>
							</div>
						</div>
						<button type="submit" className="form__submit">
							Create Project
						</button>
						<span className="form__errors">
							{reduxState.inputErrors.validation}
							{reduxState.inputErrors.server}
						</span>
					</form>
				</div>
			</div>
		</div>
	);
}
