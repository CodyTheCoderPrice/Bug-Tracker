import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";
import {
	projectContainerName,
	bugContainerName,
} from "../../../../reducers/containerNames";

import {
	setWhichProjectOrBugComponentsDisplay,
	createProjectOrBug,
	clearInputErrors,
} from "../../../../actions";

import { toggleClassName } from "../../../../utils/elementUtils";

import {
	toggleCharCountColor,
	populateComboBox,
} from "../../../../utils/elementUtils";

import { useToggleableDateInput } from "../../../../utils/formHookUtils";

import { useSidebarResize } from "../../../../utils/sidebarResizeHookUtils";

import "../../../../SCSS/home/projects-bugs-shared/list/listContainerCreateItemSidebar.scss";

export default function ListContainerCreateItemSidebar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [itemInfo, setItemInfo] = useState({
		name: "",
		description: "",
		// Only used for bugs (backend will ignore this property for projects)
		location: "",
		// Sets default to the first option
		priority_id:
			reduxState[props.reduxContainerName].priorityStatusOptions
				.priorityOptions[0].id,
		status_id:
			reduxState[props.reduxContainerName].priorityStatusOptions
				.statusOptions[0].id,
		start_date: moment().format("YYYY-MM-DD"),
		due_date: null,
		completion_date: null,
	});

	const [descriptionCharLimit] = useState(500);

	// Custom hook toggles the display of the date input for completion date
	// ...based on status and makes sure itemInfo contains accurate
	// ...completion date info after every toggle
	const [preservedCompletionDate] = useToggleableDateInput(
		itemInfo,
		"js-completion-input-container",
		reduxState[props.reduxContainerName].priorityStatusOptions
			.statusCompletionId
	);

	// Update completion_date with the preservedCompletionDate
	useEffect(() => {
		if (
			itemInfo.status_id !==
			reduxState[props.reduxContainerName].priorityStatusOptions
				.statusCompletionId
		) {
			setItemInfo({ ...itemInfo, completion_date: null });
		} else {
			setItemInfo({
				...itemInfo,
				completion_date: preservedCompletionDate,
			});
		}
		// eslint-disable-next-line
	}, [itemInfo.status_id]);

	// Custom hook resizes the sidebar so that the overflow functionality works
	useSidebarResize(reduxState, "js-create-item-sidebar");

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
		};
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
			reduxState[props.reduxContainerName].priorityStatusOptions
				.priorityOptions,
			1
		);
		populateComboBox(
			"js-status-select",
			reduxState[props.reduxContainerName].priorityStatusOptions.statusOptions,
			1
		);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		toggleCharCountColor(
			"js-character-counter",
			itemInfo.description.length,
			descriptionCharLimit
		);
		// eslint-disable-next-line
	}, [itemInfo.description]);

	const onChange = (e) => {
		// Since select option values are always strings while priority and status take integers
		if (e.target.name === "status_id" || e.target.name === "priority_id") {
			setItemInfo({
				...itemInfo,
				[e.target.name]: Number(e.target.value),
			});
		} else {
			setItemInfo({ ...itemInfo, [e.target.name]: e.target.value });
		}
	};

	const closeCreateItemSidebar = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				listContainerCreateItemSidbar: false,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let itemInfoDeepCopy = { ...itemInfo };
		// Gives bugs (not projects) a project_id for backend table relations
		if (props.reduxContainerName === bugContainerName) {
			itemInfoDeepCopy["project_id"] =
				reduxState[projectContainerName].componentsDisplay.targetItem.id;
		}
		dispatch(createProjectOrBug(props.reduxContainerName, itemInfoDeepCopy));
	};

	return (
		<div className="create-item-component">
			<div className="blurred-background" onClick={closeCreateItemSidebar} />
			<div
				className={
					"create-item-sidebar js-create-item-sidebar" +
					(props.reduxContainerName === bugContainerName
						? " create-item-sidebar--taller"
						: "")
				}
			>
				<div className="x-button" onClick={closeCreateItemSidebar}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<div className="padded-container">
					<h1 className="title">
						{props.reduxContainerName === projectContainerName
							? "New Project"
							: "New Bug"}
					</h1>
					<form className="form" noValidate onSubmit={handleSubmit}>
						<label htmlFor="create-item-name" className="form__label">
							Name:{" "}
						</label>
						<input
							type="text"
							name="name"
							onChange={(e) => onChange(e)}
							value={itemInfo.name}
							id="create-item-name"
							className="form__text-input"
						/>
						<span className="form__errors">
							{reduxState.generalContainer.inputErrors.name}
						</span>
						<label htmlFor="create-item-description" className="form__label">
							Description:{" "}
						</label>
						<span className="form__character-counter js-character-counter">
							{itemInfo.description.length + "/" + descriptionCharLimit}
						</span>
						<textarea
							name="description"
							onChange={(e) => onChange(e)}
							value={itemInfo.description}
							id="create-item-description"
							className="form__textarea"
						/>
						<span className="form__errors">
							{reduxState.generalContainer.inputErrors.description}
						</span>
						{props.reduxContainerName === bugContainerName ? (
							<div>
								<label htmlFor="create-item-location" className="form__label">
									Location:{" "}
								</label>
								<input
									type="text"
									name="location"
									onChange={(e) => onChange(e)}
									value={itemInfo.location}
									id="create-item-location"
									className="form__text-input"
								/>
								<span className="form__errors">
									{reduxState.generalContainer.inputErrors.location}
								</span>
							</div>
						) : null}
						<div className="form__group-container">
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-item-start-date"
									className="form__group-container__input-container__label"
								>
									Start Date:
								</label>
								<input
									type="date"
									name="start_date"
									value={itemInfo.start_date}
									onChange={(e) => onChange(e)}
									id="create-item-start-date"
									className="form__group-container__input-container__date"
								/>
							</div>
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-item-due-date"
									className="form__group-container__input-container__label"
								>
									Due Date:
								</label>
								<input
									type="date"
									name="due_date"
									onChange={(e) => onChange(e)}
									id="create-item-due-date"
									className="form__group-container__input-container__date"
								/>
							</div>
							<div className="form__group-container__input-container js-completion-input-container">
								<label
									htmlFor="create-item-completion-date"
									className="form__group-container__input-container__label"
								>
									Completed on:
								</label>
								<input
									type="date"
									name="completion_date"
									onChange={(e) => onChange(e)}
									id="create-item-completion-date"
									className="form__group-container__input-container__date"
								/>
							</div>
						</div>
						<div className="form__group-container form__group-container--right">
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-item-priority"
									className="form__group-container__input-container__label"
								>
									Priority:
								</label>
								<select
									name="priority_id"
									onChange={(e) => onChange(e)}
									id="create-item-priority"
									className="form__group-container__input-container__select js-priority-select"
								></select>
							</div>
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-item-status"
									className="form__group-container__input-container__label"
								>
									Status:
								</label>
								<select
									name="status_id"
									onChange={(e) => onChange(e)}
									id="create-item-status"
									className="form__group-container__input-container__select js-status-select"
								></select>
							</div>
						</div>
						<button type="submit" className="form__submit">
							{props.reduxContainerName === projectContainerName
								? "Create Project"
								: "Create Bug"}
						</button>
						<span className="form__errors">
							{reduxState.generalContainer.inputErrors.validation}
							{reduxState.generalContainer.inputErrors.server}
						</span>
					</form>
				</div>
			</div>
		</div>
	);
}
