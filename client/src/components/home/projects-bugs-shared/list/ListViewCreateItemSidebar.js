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
	getStatusTextColorClassName,
	getCommonBlurredBackdropBackgroundColorAndOpacityClassNameForLightOrDarkMode,
	getCreateItemSidebarBackgroundColorClassNameForLightOrDarkMode,
	getCommonIconButtonTextColorWithHoverClassNameForLightOrDarkMode,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
	getCommonCharCountLimitReachedTextColorClassNameForLightOrDarkMode,
	getCommonFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getCommonBackendErrorsTextColorClassNameForLightOrDarkMode,
	getCreateItemSidebarDisabledLabelClassNameForLightOrDarkMode,
	getCreateItemSidebarDisableInputDateClassNameForLightOrDarkMode,
	getPriorityOptionsForSelect,
	getStatusOptionsForSelectWithStatusColors,
	getformSubmitButtonColorWithHoverAndFocusClassNameForTheme,
} from "../../../../utils";

import {
	usePerserveCompletetionDate,
	useSidebarResize,
	useSubmitFormOnEnterPress,
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
		due_date: "",
		completion_date: "",
	});

	// Custom hook perserves the completion date whenever it is disabled so it
	// ...can be restored if reactivated
	usePerserveCompletetionDate(
		itemInfo,
		setItemInfo,
		"js-completion-date",
		reduxState,
		props.reduxContainerName
	);

	// Custom hook resizes the sidebar so that the overflow functionality works
	useSidebarResize(reduxState, "js-create-item-sidebar-container");

	// Custome hook will cause form to submit whenever the enter key is pressed
	useSubmitFormOnEnterPress("js-create-item-form");

	// Clears current backend errors when closing the component. Otherwise the
	// ...backend errors may presist and appear when component is re-openned.
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	const getSelectTextColorClassName = () => {
		const filteredStatusList = reduxState[
			props.reduxContainerName
		].priorityStatusOptions.statusList.filter(
			(status) => status.id === itemInfo.status_id
		);

		return getStatusTextColorClassName(
			filteredStatusList.length > 0 ? filteredStatusList[0].color : "problem"
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

		if (props.reduxContainerName === PROJECT_CONTAINER) {
			// Removes location property as projects do not need it
			delete itemInfoDeepCopy.location;
		} else if (props.reduxContainerName === BUG_CONTAINER) {
			// Gives bugs a project_id for backend table relations
			itemInfoDeepCopy["project_id"] =
				reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem.id;
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
		<div className="create-item-sidebar-component">
			<div
				className={
					"blurred-backdrop" +
					getCommonBlurredBackdropBackgroundColorAndOpacityClassNameForLightOrDarkMode(
						false,
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			/>
			<div
				className={
					"sidebar-container js-create-item-sidebar-container" +
					getCreateItemSidebarBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					) +
					(props.reduxContainerName === BUG_CONTAINER
						? " sidebar-container--taller"
						: "")
				}
			>
				<div
					className={
						"x-button" +
						getCommonIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
					alt={
						"Button to close the new " +
						(props.reduxContainerName === PROJECT_CONTAINER
							? "project"
							: "bug") +
						" sidebar"
					}
					onClick={closeCreateItemSidebar}
				>
					<i className="fa fa-times" aria-hidden="true" alt="Icon of an X"></i>
				</div>
				<div className="padded-container">
					<h1
						className={
							"title" +
							getCommonTextColorClassNameForThemeWithLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
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
						<label htmlFor="create-item-name" className="form__label">
							Name:{" "}
						</label>
						<span
							className={
								"form__char-counter" +
								(reduxState[GENERAL_CONTAINER].globalConstants.nameCharLimit <
								itemInfo.name.length
									? getCommonCharCountLimitReachedTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
									  )
									: "")
							}
						>
							{itemInfo.name.length +
								"/" +
								reduxState[GENERAL_CONTAINER].globalConstants.nameCharLimit}
						</span>
						<input
							autoFocus
							type="text"
							name="name"
							onChange={onChange}
							value={itemInfo.name}
							id="create-item-name"
							className={
								"form__input-text" +
								getCommonFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
								)
							}
						/>
						<span
							className={
								"backend-errors" +
								getCommonBackendErrorsTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
						>
							{reduxState[GENERAL_CONTAINER].backendErrors.validationItemName}
						</span>
						<label htmlFor="create-item-description" className="form__label">
							Description:{" "}
						</label>
						<span
							className={
								"form__char-counter" +
								(reduxState[GENERAL_CONTAINER].globalConstants
									.descriptionCharLimit < itemInfo.description.length
									? getCommonCharCountLimitReachedTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
									  )
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
							onChange={onChange}
							value={itemInfo.description}
							id="create-item-description"
							className={
								"form__textarea" +
								getCommonFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
								)
							}
						/>
						<span
							className={
								"backend-errors" +
								getCommonBackendErrorsTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
						>
							{
								reduxState[GENERAL_CONTAINER].backendErrors
									.validationItemDescription
							}
						</span>
						{props.reduxContainerName === BUG_CONTAINER ? (
							<div>
								<label htmlFor="create-item-location" className="form__label">
									Location:{" "}
								</label>
								<span
									className={
										"form__char-counter" +
										(reduxState[GENERAL_CONTAINER].globalConstants
											.locationCharLimit < itemInfo.location.length
											? getCommonCharCountLimitReachedTextColorClassNameForLightOrDarkMode(
													reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											  )
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
									onChange={onChange}
									value={itemInfo.location}
									id="create-item-location"
									className={
										"form__input-text" +
										getCommonFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
											reduxState[ACCOUNT_CONTAINER].settings.theme_color
										)
									}
								/>
								<span
									className={
										"backend-errors" +
										getCommonBackendErrorsTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
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
									className="form__group-container__input-container__label"
								>
									Start Date:
								</label>
								<input
									type="date"
									name="start_date"
									value={itemInfo.start_date}
									onChange={onChange}
									id="create-item-start-date"
									className={
										"form__group-container__input-container__date" +
										getCommonFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
											reduxState[ACCOUNT_CONTAINER].settings.theme_color
										)
									}
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
									alue={itemInfo.due_date}
									onChange={onChange}
									id="create-item-due-date"
									className={
										"form__group-container__input-container__date" +
										getCommonFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
											reduxState[ACCOUNT_CONTAINER].settings.theme_color
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
											? getCreateItemSidebarDisabledLabelClassNameForLightOrDarkMode(
													reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											  )
											: "")
									}
								>
									Completed on:
								</label>
								<input
									type="date"
									name="completion_date"
									value={itemInfo.completion_date}
									onChange={onChange}
									id="create-item-completion-date"
									className={
										"form__group-container__input-container__date js-completion-date" +
										getCommonFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
											reduxState[ACCOUNT_CONTAINER].settings.theme_color
										) +
										(itemInfo.status_id !==
										reduxState[props.reduxContainerName].priorityStatusOptions
											.statusCompletionId
											? getCreateItemSidebarDisableInputDateClassNameForLightOrDarkMode(
													reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											  )
											: "")
									}
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
									onChange={onChange}
									id="create-item-priority"
									className={
										"form__group-container__input-container__select js-priority-select" +
										getCommonFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
											reduxState[ACCOUNT_CONTAINER].settings.theme_color
										)
									}
								>
									{getPriorityOptionsForSelect(
										reduxState,
										props.reduxContainerName
									)}
								</select>
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
									onChange={onChange}
									id="create-item-status"
									className={
										"form__group-container__input-container__select js-status-select" +
										getCommonFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
											reduxState[ACCOUNT_CONTAINER].settings.theme_color
										) +
										getSelectTextColorClassName()
									}
								>
									{getStatusOptionsForSelectWithStatusColors(
										reduxState,
										props.reduxContainerName
									)}
								</select>
							</div>
						</div>
						<button
							type="submit"
							className={
								"form__submit" +
								getformSubmitButtonColorWithHoverAndFocusClassNameForTheme(
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
								)
							}
						>
							{props.reduxContainerName === PROJECT_CONTAINER
								? "Create Project"
								: "Create Bug"}
						</button>
						<span
							className={
								"backend-errors" +
								getCommonBackendErrorsTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
						>
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
