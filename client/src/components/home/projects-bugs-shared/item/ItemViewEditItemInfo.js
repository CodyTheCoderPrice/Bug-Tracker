import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	SIZE_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	setWhichProjectOrBugComponentsDisplay,
	updateProjectOrBug,
	clearBackendErrors,
} from "../../../../actions";

import {
	formatDateMMddYYYY,
	formatDateYYYYmmDD,
	manageSizeOfItemBoxsInPairContainer,
	populateComboBox,
	getTextColorClassNameForTheme,
	getBackgroundColorWithHoverClassNameForTheme,
} from "../../../../utils";

import {
	useToggleableDateInput,
	useSubmitFormOnEnter,
} from "../../../../utils/hooks";

export default function ItemViewEditItemInfo(props) {
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
			props.reduxContainerName === BUG_CONTAINER
				? reduxState[props.reduxContainerName].componentsDisplay.targetItem
						.location
				: "",
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

	// Custom hook toggles the display of the date input for completion date
	// ...based on status and makes sure itemInfo contains accurate
	// ...completion date info after every toggle
	const [preservedCompletionDate] = useToggleableDateInput(
		itemInfo,
		"js-completion-date-container",
		reduxState[props.reduxContainerName].priorityStatusOptions
			.statusCompletionId
	);

	// Update completion_Date with the preservedCompletionDate
	useEffect(() => {
		if (
			itemInfo.status_id !==
			reduxState[props.reduxContainerName].priorityStatusOptions
				.statusCompletionId
		) {
			setItemInfo({ ...itemInfo, completion_date: "" });
		} else {
			setItemInfo({
				...itemInfo,
				completion_date: preservedCompletionDate,
			});
		}
		// eslint-disable-next-line
	}, [itemInfo.status_id]);

	// Custome hook will cause form to submit whenever the enter key is pressed
	useSubmitFormOnEnter("js-edit-item-form");

	// clears prior backend errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		populateComboBox(
			document.getElementsByClassName("js-item-priority-select")[0],
			reduxState[props.reduxContainerName].priorityStatusOptions.priorityList,
			itemInfo.priority_id
		);
		populateComboBox(
			document.getElementsByClassName("js-item-status-select")[0],
			reduxState[props.reduxContainerName].priorityStatusOptions.statusList,
			itemInfo.status_id
		);
		// eslint-disable-next-line
	}, []);

	const getSelectTextColorClassName = () => {
		const filteredStatusList = reduxState[
			props.reduxContainerName
		].priorityStatusOptions.statusList.filter(
			(status) => status.id === itemInfo.status_id
		);

		return (
			" js-set-status-box-text-color-" +
			(filteredStatusList.length > 0 ? filteredStatusList[0].color : "problem")
		);
	};

	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].constants
				.itemViewOuterDividingContainerMinWidth !== null
		) {
			manageSizeOfItemBoxsInPairContainer(
				document.getElementsByClassName("js-description-info-pair")[0],
				"outer-dividing-container--half-width",
				reduxState[SIZE_CONTAINER].constants
					.itemViewOuterDividingContainerMinWidth
			);
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants.itemViewOuterDividingContainerMinWidth,
	]);

	const switchToDisplayItemInfo = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				itemViewEditItemInfo: false,
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
		// Adds project_id when updating a bug
		if (props.reduxContainerName === BUG_CONTAINER) {
			itemInfoDeepCopy["project_id"] =
				reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.id;
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
		<form className="js-edit-item-form" noValidate onSubmit={handleSubmit}>
			<div className="outer-dividing-container">
				<div className="name-centering-container">
					{reduxState[props.reduxContainerName].componentsDisplay.targetItem
						.status_id !==
					reduxState[props.reduxContainerName].priorityStatusOptions
						.statusCompletionId ? null : (
						<div className="name-centering-container__completed-icon-centering-container">
							<i
								className="fa fa-check name-centering-container__completed-icon-centering-container__icon"
								aria-hidden="true"
							/>
						</div>
					)}
					<input
						type="text"
						name="name"
						onChange={(e) => onChange(e)}
						value={itemInfo.name}
						id="edit-item-name"
						className={
							"name-centering-container__form-name-input" +
							(reduxState[props.reduxContainerName].componentsDisplay.targetItem
								.status_id ===
							reduxState[props.reduxContainerName].priorityStatusOptions
								.statusCompletionId
								? " name-completed-color"
								: getTextColorClassNameForTheme(reduxState[ACCOUNT_CONTAINER].settings.theme_color))
						}
					/>
					<div className="name-centering-container__char-count-centering-container">
						<span
							className={
								"name-centering-container__char-count-centering-container__name-char-counter" +
								(reduxState[GENERAL_CONTAINER].globalConstants.nameCharLimit <
								itemInfo.name.length
									? " text-red"
									: "")
							}
						>
							{itemInfo.name.length +
								"/" +
								reduxState[GENERAL_CONTAINER].globalConstants.nameCharLimit}
						</span>
					</div>
				</div>
				<span className="form-errors form-errors--item-name">
					{reduxState[GENERAL_CONTAINER].backendErrors.validationItemName}
				</span>
				<div className="item-creation-date">
					Created on: {itemInfo.creation_date}
				</div>
			</div>
			<div className="pair-container js-description-info-pair">
				<div className="outer-dividing-container">
					<div className="item-box item-box--desciption-info-height">
						<label htmlFor="edit-item-description">
							<h2
								className={
									"item-box__title item-box__title--no-bottom-margin" +
									getTextColorClassNameForTheme(reduxState[ACCOUNT_CONTAINER].settings.theme_color)
								}
							>
								Description
							</h2>
						</label>
						<span
							className={
								"item-box__form-char-counter" +
								(reduxState[GENERAL_CONTAINER].globalConstants
									.descriptionCharLimit < itemInfo.description.length
									? " text-red"
									: "")
							}
						>
							{itemInfo.description.length +
								"/" +
								reduxState[GENERAL_CONTAINER].globalConstants
									.descriptionCharLimit}
						</span>
						<textarea
							name="description"
							onChange={(e) => onChange(e)}
							value={itemInfo.description}
							id="edit-item-description"
							className="item-box__form-textarea"
						/>
						<span className="form-errors">
							{
								reduxState[GENERAL_CONTAINER].backendErrors
									.validationItemDescription
							}
						</span>
					</div>
				</div>
				<div className="outer-dividing-container outer-dividing-container--fixed-width-for-info">
					<div className="item-box item-box--desciption-info-height">
						<h2
							className={
								"item-box__title" +
								getTextColorClassNameForTheme(reduxState[ACCOUNT_CONTAINER].settings.theme_color)
							}
						>
							Info
						</h2>
						{props.reduxContainerName === BUG_CONTAINER ? (
							<div className="item-box__group__field">
								<label
									htmlFor="edit-item-location"
									className="item-box__group__field__form-label item-box__group__field__form-label--medium-width item-box__group__field__form-label--top-bottom-margin"
								>
									Location:
								</label>
								<span
									className={
										"item-box__form-char-counter" +
										(reduxState[GENERAL_CONTAINER].globalConstants
											.locationCharLimit < itemInfo.location.length
											? " text-red"
											: "")
									}
								>
									{itemInfo.location.length +
										"/" +
										reduxState[GENERAL_CONTAINER].globalConstants
											.locationCharLimit}
								</span>
								<input
									type="text"
									name="location"
									onChange={(e) => onChange(e)}
									value={itemInfo.location}
									id="edit-item-location"
									className="item-box__group__field__form-text"
								/>
								<span className="form-errors">
									{
										reduxState[GENERAL_CONTAINER].backendErrors
											.validationItemLocation
									}
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
									className={
										"item-box__group__field__form-select js-item-status-select" +
										getSelectTextColorClassName()
									}
								></select>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* reduxState[GENERAL_CONTAINER].backendErrors.validationItem ===
				undefined &&
			reduxState[GENERAL_CONTAINER].backendErrors.serverItem === undefined &&
			reduxState[GENERAL_CONTAINER].backendErrors.serverConnection ===
				undefined ? null : (
				<span className="form-errors form-errors--edit-item">
					{reduxState[GENERAL_CONTAINER].backendErrors.validationItem}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverItem}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
				</span>
			) */}
			<span className="form-errors form-errors--edit-item">
				{reduxState[GENERAL_CONTAINER].backendErrors.validationItem}
				{reduxState[GENERAL_CONTAINER].backendErrors.serverItem}
				{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
			</span>
			<div className="outer-dividing-container">
				<div className="form-buttons-outer-container">
					<div className="form-buttons-centered-container">
						<button
							type="submit"
							className={
								"form-buttons-centered-container__submit-button" +
								getBackgroundColorWithHoverClassNameForTheme(
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
								)
							}
						>
							{props.reduxContainerName === PROJECT_CONTAINER
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
			</div>
		</form>
	);
}
