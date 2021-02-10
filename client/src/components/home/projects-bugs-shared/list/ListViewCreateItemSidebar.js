import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	setWhichProjectOrBugComponentsDisplay,
	createProjectOrBug,
	clearBackendErrors,
} from "../../../../actions";

import {
	populateComboBox,
	getCreateItemSidebarBackgroundColorClassNameForLightOrDarkMode,
	getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode,
	getTextColorClassNameForTheme,
	getHomeTextColorClassNameForLightOrDarkMode,
	getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getBaseDisabledLabelClassNameForLightOrDarkMode,
	getBaseDisableInputDateClassNameForLightOrDarkMode,
	getBackgroundColorWithHoverClassNameForTheme,
} from "../../../../utils";

import {
	usePerserveCompletetionDate,
	useSidebarResize,
	useSubmitFormOnEnter,
} from "../../../../utils/hooks";

export default function ListViewCreateItemSidebar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [itemInfo, setItemInfo] = useState({
		name: "",
		description: "",
		// Only used for bugs (backend will ignore this property for projects)
		location: "",
		// Sets default to the first option
		priority_id:
			reduxState[props.reduxContainerName].priorityStatusOptions.priorityList[0]
				.id,
		status_id:
			reduxState[props.reduxContainerName].priorityStatusOptions.statusList[0]
				.id,
		start_date: moment.utc().format("YYYY-MM-DD"),
		due_date: null,
		completion_date: null,
	});

	// Custom hook perserves the completion date whenever it is disabled so it
	// ...can be restored if reactivated
	usePerserveCompletetionDate(
		itemInfo,
		setItemInfo,
		"js-completion-date",
		reduxState[props.reduxContainerName].priorityStatusOptions
			.statusCompletionId
	);

	// Custom hook resizes the sidebar so that the overflow functionality works
	useSidebarResize(reduxState, "js-create-item-sidebar");

	// Custome hook will cause form to submit whenever the enter key is pressed
	useSubmitFormOnEnter("js-create-item-form");

	// clears prior backend errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		populateComboBox(
			document.getElementsByClassName("js-priority-select")[0],
			reduxState[props.reduxContainerName].priorityStatusOptions.priorityList,
			1
		);
		populateComboBox(
			document.getElementsByClassName("js-status-select")[0],
			reduxState[props.reduxContainerName].priorityStatusOptions.statusList,
			1
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
		// Gives bugs (not projects) a project_id for backend table relations
		if (props.reduxContainerName === BUG_CONTAINER) {
			itemInfoDeepCopy["project_id"] =
				reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.id;
		}
		dispatch(
			createProjectOrBug(
				props.reduxContainerName,
				itemInfoDeepCopy,
				reduxState[props.reduxContainerName].componentsDisplay
			)
		);
	};

	const closeCreateItemSidebar = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				listViewCreateItemSidbar: false,
			})
		);
	};

	return (
		<div className="create-item-component">
			<div className="blurred-background" />
			<div
				className={
					"create-item-sidebar js-create-item-sidebar" +
					getCreateItemSidebarBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					) +
					(props.reduxContainerName === BUG_CONTAINER
						? " create-item-sidebar--taller"
						: "")
				}
			>
				<div
					className={
						"x-button" +
						getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
					onClick={closeCreateItemSidebar}
				>
					<i className="fa fa-times" aria-hidden="true" alt="Icon of an X"></i>
				</div>
				<div className="padded-container">
					<h1
						className={
							"title" +
							getTextColorClassNameForTheme(
								reduxState[ACCOUNT_CONTAINER].settings.theme_color
							)
						}
					>
						{props.reduxContainerName === PROJECT_CONTAINER
							? "New Project"
							: "New Bug"}
					</h1>
					<form
						className="form js-create-item-form"
						noValidate
						onSubmit={handleSubmit}
					>
						<label
							htmlFor="create-item-name"
							className={
								"form__label" +
								getHomeTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
						>
							Name:{" "}
						</label>
						<span
							className={
								"form__char-counter" +
								getHomeTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								) +
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
						<input
							type="text"
							name="name"
							onChange={(e) => onChange(e)}
							value={itemInfo.name}
							id="create-item-name"
							className={
								"form__text-input" +
								getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
						/>
						<span className="backend-errors">
							{reduxState[GENERAL_CONTAINER].backendErrors.validationItemName}
						</span>
						<label
							htmlFor="create-item-description"
							className={
								"form__label" +
								getHomeTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
						>
							Description:{" "}
						</label>
						<span
							className={
								"form__char-counter" +
								getHomeTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								) +
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
							id="create-item-description"
							className={
								"form__textarea" +
								getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
						/>
						<span className="backend-errors">
							{
								reduxState[GENERAL_CONTAINER].backendErrors
									.validationItemDescription
							}
						</span>
						{props.reduxContainerName === BUG_CONTAINER ? (
							<div>
								<label
									htmlFor="create-item-location"
									className={
										"form__label" +
										getHomeTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
									Location:{" "}
								</label>
								<span
									className={
										"form__char-counter" +
										getHomeTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										) +
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
									id="create-item-location"
									className={
										"form__text-input" +
										getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								/>
								<span className="backend-errors">
									{
										reduxState[GENERAL_CONTAINER].backendErrors
											.validationItemLocation
									}
								</span>
							</div>
						) : null}
						<div className="form__group-container">
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-item-start-date"
									className={
										"form__group-container__input-container__label" +
										getHomeTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
									Start Date:
								</label>
								<input
									type="date"
									name="start_date"
									value={itemInfo.start_date}
									onChange={(e) => onChange(e)}
									id="create-item-start-date"
									className={
										"form__group-container__input-container__date" +
										getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								/>
							</div>
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-item-due-date"
									className={
										"form__group-container__input-container__label" +
										getHomeTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
									Due Date:
								</label>
								<input
									type="date"
									name="due_date"
									alue={itemInfo.due_date}
									onChange={(e) => onChange(e)}
									id="create-item-due-date"
									className={
										"form__group-container__input-container__date" +
										getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								/>
							</div>
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-item-completion-date"
									className={
										"form__group-container__input-container__label" +
										(itemInfo.status_id !==
										reduxState[props.reduxContainerName].priorityStatusOptions
											.statusCompletionId
											? getBaseDisabledLabelClassNameForLightOrDarkMode(
													reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											  )
											: getHomeTextColorClassNameForLightOrDarkMode(
													reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											  ))
									}
								>
									Completed on:
								</label>
								<input
									type="date"
									name="completion_date"
									value={itemInfo.completion_date}
									onChange={(e) => onChange(e)}
									id="create-item-completion-date"
									className={
										"form__group-container__input-container__date js-completion-date" +
										(itemInfo.status_id !==
										reduxState[props.reduxContainerName].priorityStatusOptions
											.statusCompletionId
											? getBaseDisableInputDateClassNameForLightOrDarkMode(
													reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											  )
											: getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
													reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											  ))
									}
								/>
							</div>
						</div>
						<div className="form__group-container form__group-container--right">
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-item-priority"
									className={
										"form__group-container__input-container__label" +
										getHomeTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
									Priority:
								</label>
								<select
									name="priority_id"
									onChange={(e) => onChange(e)}
									id="create-item-priority"
									className={
										"form__group-container__input-container__select js-priority-select" +
										getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								></select>
							</div>
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-item-status"
									className={
										"form__group-container__input-container__label" +
										getHomeTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
									Status:
								</label>
								<select
									name="status_id"
									onChange={(e) => onChange(e)}
									id="create-item-status"
									className={
										"form__group-container__input-container__select js-status-select" +
										getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										) +
										getSelectTextColorClassName()
									}
								></select>
							</div>
						</div>
						<button
							type="submit"
							className={
								"form__submit" +
								getBackgroundColorWithHoverClassNameForTheme(
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
								)
							}
						>
							{props.reduxContainerName === PROJECT_CONTAINER
								? "Create Project"
								: "Create Bug"}
						</button>
						<span className="backend-errors">
							{reduxState[GENERAL_CONTAINER].backendErrors.validationItem}
							{reduxState[GENERAL_CONTAINER].backendErrors.serverItem}
							{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
						</span>
					</form>
				</div>
			</div>
		</div>
	);
}
