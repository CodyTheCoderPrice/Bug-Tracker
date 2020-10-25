import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	projectContainerName,
	bugContainerName,
} from "../../../../reducers/containerNames";

import {
	setWhichProjectOrBugComponentsDisplay,
	updateProjectOrBug,
	clearInputErrors,
} from "../../../../actions";

import {
	formatDateMMddYYYY,
	formatDateYYYYmmDD,
} from "../../../../utils/dateUtils";

import { manageSizeOfItemBoxsInPairContainer } from "../../../../utils/itemContainerUtils";

import {
	toggleCharCountColor,
	populateComboBox,
} from "../../../../utils/elementUtils";

import { useToggleableDateInput } from "../../../../utils/formHookUtils";
import { useDescriptionTextAreaResize } from "../../../../utils/descriptionTextAreaHookUtils";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerEditInfo.scss";

export default function ItemContainerEditInfo(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [itemInfo, setItemInfo] = useState({
		id: reduxState[props.reduxContainerName].componentsDisplay.targetItem.id,
		name:
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.name,
		description:
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.description,
		// Only used for bugs (backend will ignore this property for projects)
		location:
			props.reduxContainerName === bugContainerName
				? reduxState[props.reduxContainerName].componentsDisplay.targetItem
						.location
				: null,
		priority_id:
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.priority_id,
		priorityOption:
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.priority_option,
		status_id:
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.status_id,
		statusOption:
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.status_option,
		creation_date: formatDateMMddYYYY(
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.creation_date
		),
		start_date: formatDateYYYYmmDD(
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.start_date
		),
		due_date: formatDateYYYYmmDD(
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.due_date
		),
		completion_date: formatDateYYYYmmDD(
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.completion_date
		),
	});

	const [descriptionCharLimit] = useState(500);

	// Custom hook toggles the display of the date input for completion date
	// ...based on status and makes sure itemInfo contains accurate
	// ...completion date info after every toggle
	const [preservedCompletionDate] = useToggleableDateInput(
		itemInfo,
		"js-completion-date-container",
		reduxState[props.reduxContainerName].priorityStatusOptions
			.statusCompletionId
	);

	// Custome hook resizes the textArea for description size to match the size
	// ...of its content (though will not exceed max-height).
	useDescriptionTextAreaResize(
		"js-item-description-text-area",
		"js-item-description-item-box",
		itemInfo
	);

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		manageSizeOfItemBoxsInPairContainer(
			document.getElementsByClassName("js-description-info-pair")[0],
			"outer-dividing-container--full-height",
			"outer-dividing-container--half-width"
		);
		if (props.reduxContainerName === projectContainerName) {
			manageSizeOfItemBoxsInPairContainer(
				document.getElementsByClassName("js-bug-info-pair")[0],
				"outer-dividing-container--full-height",
				"outer-dividing-container--half-width"
			);
		}
	}, []);

	useEffect(() => {
		populateComboBox(
			"js-item-priority-select",
			reduxState[props.reduxContainerName].priorityStatusOptions
				.priorityOptions,
			itemInfo.priority_id
		);
		populateComboBox(
			"js-item-status-select",
			reduxState[props.reduxContainerName].priorityStatusOptions.statusOptions,
			itemInfo.status_id
		);
		// eslint-disable-next-line
	}, []);

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

	const switchToDisplayItemInfo = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				itemContainerEditInfo: false,
			})
		);
	};

	const onChange = (e) => {
		// Since select option values are always strings while priority and status take integers
		if (e.target.name === "status_id" || e.target.name === "priority_id") {
			setItemInfo({
				...itemInfo,
				[e.target.name]: Number(e.target.value),
			});
		} else if (e.target.name === "description") {
			// Doesn't allow line breaks
			setItemInfo({
				...itemInfo,
				[e.target.name]: e.target.value.replace(/(\r\n|\n|\r)/gm, ""),
			});
		} else {
			setItemInfo({ ...itemInfo, [e.target.name]: e.target.value });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let itemInfoDeepCopy = { ...itemInfo };
		// Adds project_id when updating bugs
		if (props.reduxContainerName === bugContainerName) {
			itemInfoDeepCopy["project_id"] =
				reduxState[projectContainerName].componentsDisplay.targetItem.id;
		}
		dispatch(
			updateProjectOrBug(
				props.reduxContainerName,
				itemInfoDeepCopy,
				reduxState[props.reduxContainerName].componentsDisplay
			)
		);
	};

	return (
		<form noValidate onSubmit={handleSubmit} className="js-edit-item-form">
			<div className="outer-dividing-container">
				<div className="centering-container">
					<input
						type="text"
						name="name"
						onChange={(e) => onChange(e)}
						value={itemInfo.name}
						id="edit-item-name"
						className="centering-container__form-name-input"
					/>
					<span className="form-errors form-errors--test">
						{reduxState.generalContainer.inputErrors.name}
					</span>
				</div>
				<div className="item-creation-date">
					Created on: {itemInfo.creation_date}
				</div>
			</div>
			<div className="pair-container js-description-info-pair">
				<div className="outer-dividing-container">
					<div className="item-box js-item-description-item-box">
						<label htmlFor="edit-item-description">
							<h2 className="item-box__title item-box__title--no-bottom-margin">
								Description
							</h2>
						</label>
						<span className="item-box__form-character-counter js-item-character-counter">
							{itemInfo.description.length + "/" + descriptionCharLimit}
						</span>
						<textarea
							name="description"
							onChange={(e) => onChange(e)}
							value={itemInfo.description}
							id="edit-item-description"
							className="item-box__form-textarea js-item-description-text-area"
						/>
						<span className="form-errors">
							{reduxState.generalContainer.inputErrors.description}
						</span>
					</div>
				</div>
				<div className="outer-dividing-container outer-dividing-container--fixed-width-for-info">
					<div className="item-box">
						<h2 className="item-box__title">Info</h2>
						{props.reduxContainerName === bugContainerName ? (
							<div className="item-box__group__field">
								<label
									htmlFor="edit-item-location"
									className="item-box__group__field__form-label item-box__group__field__form-label--medium-width"
								>
									Location:{" "}
								</label>
								<input
									type="text"
									name="location"
									onChange={(e) => onChange(e)}
									value={itemInfo.location}
									id="edit-item-location"
									className="item-box__group__field__form-text"
								/>
								<span className="form__errors">
									{reduxState.generalContainer.inputErrors.location}
								</span>
							</div>
						) : null}
						<div className="item-box__group">
							<div className="item-box__group__field">
								<label
									htmlFor="edit-item-start-date"
									className="item-box__group__field__form-label item-box__group__field__form-label--medium-width"
								>
									Start Date:
								</label>
								<input
									type="date"
									name="start_date"
									value={itemInfo.start_date}
									onChange={(e) => onChange(e)}
									id="edit-item-start-date"
									className="item-box__group__field__form-date"
								/>
							</div>
							<div className="item-box__group__field">
								<label
									htmlFor="edit-item-due-date"
									className="item-box__group__field__form-label item-box__group__field__form-label--medium-width"
								>
									Due Date:
								</label>
								<input
									type="date"
									name="due_date"
									value={itemInfo.due_date}
									onChange={(e) => onChange(e)}
									id="edit-item-due-date"
									className="item-box__group__field__form-date"
								/>
							</div>
							<div className="item-box__group__field item-box__group__field--no-bottom-margin item-box__group__field--inline-flex js-completion-date-container">
								<label
									htmlFor="edit-item-completion-date"
									className="item-box__group__field__form-label item-box__group__field__form-label--long-width"
								>
									Completed on:
								</label>
								<input
									type="date"
									name="completion_date"
									value={itemInfo.completion_date}
									onChange={(e) => onChange(e)}
									id="edit-item-completion-date"
									className="item-box__group__field__form-date"
								/>
							</div>
						</div>
						<div className="item-box__group item-box__group--right">
							<div className="item-box__group__field">
								<label
									htmlFor="edit-item-priority"
									className="item-box__group__field__form-label"
								>
									Priority:
								</label>
								<select
									name="priority_id"
									onChange={(e) => onChange(e)}
									id="edit-item-priority"
									className="item-box__group__field__form-select js-item-priority-select"
								></select>
							</div>
							<div className="item-box__group__field">
								<label
									htmlFor="edit-item-status"
									className="item-box__group__field__form-label"
								>
									Status:
								</label>
								<select
									name="status_id"
									onChange={(e) => onChange(e)}
									id="edit-item-status"
									className="item-box__group__field__form-select js-item-status-select"
								></select>
							</div>
						</div>
					</div>
				</div>
			</div>
			{props.reduxContainerName === projectContainerName ? (
				<div className="pair-container js-bug-info-pair">
					<div className="outer-dividing-container outer-dividing-container--one-third">
						<div className="item-box">
							<h2 className="item-box__title">Status of Bugs</h2>
							<span>Comming soon!</span>
						</div>
					</div>
					<div className="outer-dividing-container outer-dividing-container--one-third">
						<div className="item-box">
							<h2 className="item-box__title">Last Five Bugs</h2>
							<span>Comming soon!</span>
						</div>
					</div>
				</div>
			) : (
				<div>
					<div className="outer-dividing-container">
						<div className="item-box">
							<h2 className="item-box__title">Comments</h2>
							<span>Comming soon!</span>
						</div>
					</div>
				</div>
			)}
			<div className="outer-dividing-container">
				<div className="form-buttons-outer-container">
					<div className="form-buttons-centered-container">
						<button
							type="submit"
							className="form-buttons-centered-container__submit-button"
						>
							{props.reduxContainerName === projectContainerName
								? "Edit Project"
								: "Edit Bug"}
						</button>
						<div
							className="form-buttons-centered-container__cancel-button"
							onClick={switchToDisplayItemInfo}
						>
							Cancel
						</div>
					</div>
				</div>
				<div className="bottom-form-errors-container">
					<span className="form-errors">
						{reduxState.generalContainer.inputErrors.validation}
						{reduxState.generalContainer.inputErrors.server}
					</span>
				</div>
			</div>
		</form>
	);
}
