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
	getCommonStatusTextColorClassName,
	manageSizeOfItemBoxsElementInPairContainerElement,
	getItemViewEditItemInfoComponentFormNameInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
	getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode,
	getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode,
	getCommonWeakElementTextColorClassNameForLightOrDarkMode,
	getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getCommonItemViewComponentItemBoxElementBackgroundColorClassNameForLightOrDarkMode,
	getItemViewEditItemInfoComponentCompletedDateLabelElementDisabledClassNameForLightOrDarkMode,
	getItemViewEditItemInfoComponentInputCompletedDateElementDisabledClassNameForLightOrDarkMode,
	getPriorityOptionsForSelect,
	getStatusOptionsForSelectWithStatusColors,
	getCommonFormSubmitButtonElementBackgroundColorWithHoverAndFocusClassNameForTheme,
	getCommonItemViewComponentFormCancelButtonElementBackgroundColorClassNameForLightOrDarkMode,
} from "../../../../utils";

import {
	usePerserveCompletetionDate,
	useSubmitFormOnEnterPress,
} from "../../../../utils/hooks";

export default function ItemViewEditItemInfo(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [itemInfo, setItemInfo] = useState({
		id: reduxState[props.reduxContainerName].componentsDisplay
			.itemViewCurrentItem.id,
		name: reduxState[props.reduxContainerName].componentsDisplay
			.itemViewCurrentItem.name,
		description:
			reduxState[props.reduxContainerName].componentsDisplay.itemViewCurrentItem
				.description,
		// Only used for bugs (backend will ignore this property for projects)
		location:
			props.reduxContainerName === BUG_CONTAINER
				? reduxState[props.reduxContainerName].componentsDisplay
						.itemViewCurrentItem.location
				: "",
		priority_id:
			reduxState[props.reduxContainerName].componentsDisplay.itemViewCurrentItem
				.priority_id,
		priorityOption:
			reduxState[props.reduxContainerName].componentsDisplay.itemViewCurrentItem
				.priority_option,
		status_id:
			reduxState[props.reduxContainerName].componentsDisplay.itemViewCurrentItem
				.status_id,
		statusOption:
			reduxState[props.reduxContainerName].componentsDisplay.itemViewCurrentItem
				.status_option,
		creation_date: formatDateMMddYYYY(
			reduxState[props.reduxContainerName].componentsDisplay.itemViewCurrentItem
				.creation_date
		),
		start_date: formatDateYYYYmmDD(
			reduxState[props.reduxContainerName].componentsDisplay.itemViewCurrentItem
				.start_date
		),
		due_date: formatDateYYYYmmDD(
			reduxState[props.reduxContainerName].componentsDisplay.itemViewCurrentItem
				.due_date
		),
		completion_date: formatDateYYYYmmDD(
			reduxState[props.reduxContainerName].componentsDisplay.itemViewCurrentItem
				.completion_date
		),
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

	// Custome hook will cause form to submit whenever the enter key is pressed
	useSubmitFormOnEnterPress("js-edit-item-form");

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

		return getCommonStatusTextColorClassName(
			filteredStatusList.length > 0 ? filteredStatusList[0].color : "problem"
		);
	};

	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].constants
				.itemViewComponentOuterDividingContainerElementMinWidth !== null
		) {
			// Since ItemViewDisplayItemInfo and ItemViewEditItemInfo create
			// ...their own js-description-info-pair-container element, this
			// ...function needs to be re-run in each component
			manageSizeOfItemBoxsElementInPairContainerElement(
				document.getElementsByClassName(
					"js-description-info-pair-container"
				)[0],
				reduxState[SIZE_CONTAINER].constants
					.itemViewComponentOuterDividingContainerElementMinWidth
			);
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants
			.itemViewComponentOuterDividingContainerElementMinWidth,
	]);

	const switchToDisplayItemInfo = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				itemViewEditItemInfoComponentShouldDisplay: false,
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

		if (props.reduxContainerName === PROJECT_CONTAINER) {
			// Removes location property as projects do not need it
			delete itemInfoDeepCopy.location;
		} else if (props.reduxContainerName === BUG_CONTAINER) {
			// Gives bugs a project_id for backend table relations
			itemInfoDeepCopy["project_id"] =
				reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem.id;
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
					{reduxState[props.reduxContainerName].componentsDisplay
						.itemViewCurrentItem.status_id !==
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
						autoFocus
						type="text"
						name="name"
						onChange={onChange}
						value={itemInfo.name}
						id="edit-item-name"
						className={
							"name-centering-container__form-name-input" +
							getItemViewEditItemInfoComponentFormNameInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
								reduxState[ACCOUNT_CONTAINER].settings.theme_color
							) +
							(reduxState[props.reduxContainerName].componentsDisplay
								.itemViewCurrentItem.status_id ===
							reduxState[props.reduxContainerName].priorityStatusOptions
								.statusCompletionId
								? " name-completed-color"
								: getCommonTextColorClassNameForThemeWithLightOrDarkMode(
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
										reduxState[ACCOUNT_CONTAINER].settings.theme_color
								  ))
						}
					/>
					<div className="name-centering-container__char-count-centering-container">
						<span
							className={
								"name-centering-container__char-count-centering-container__name-char-counter" +
								(reduxState[GENERAL_CONTAINER].globalConstants.nameCharLimit <
								itemInfo.name.length
									? getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
									  )
									: "")
							}
						>
							{itemInfo.name.length +
								"/" +
								reduxState[GENERAL_CONTAINER].globalConstants.nameCharLimit}
						</span>
					</div>
				</div>
				<span
					className={
						"backend-errors backend-errors--item-name" +
						getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				>
					{reduxState[GENERAL_CONTAINER].backendErrors.validationItemName}
				</span>
				<div
					className={
						"item-creation-date" +
						getCommonWeakElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				>
					Created on: {itemInfo.creation_date}
				</div>
			</div>
			<div className="pair-container js-description-info-pair-container">
				<div className="outer-dividing-container">
					<div
						className={
							"item-box item-box--desciption-info-height" +
							getCommonItemViewComponentItemBoxElementBackgroundColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
					>
						<label htmlFor="edit-item-description">
							<h2
								className={
									"item-box__title item-box__title--no-bottom-margin" /* +
									getCommonTextColorClassNameForThemeWithLightOrDarkMode(reduxState[ACCOUNT_CONTAINER].settings.dark_mode, 
										reduxState[ACCOUNT_CONTAINER].settings.theme_color
									) */
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
									? getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode(
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
							id="edit-item-description"
							className={
								"item-box__form-textarea" +
								getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
								)
							}
						/>
						<span
							className={
								"backend-errors" +
								getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
						>
							{
								reduxState[GENERAL_CONTAINER].backendErrors
									.validationItemDescription
							}
						</span>
					</div>
				</div>
				<div className="outer-dividing-container outer-dividing-container--fixed-width-for-info">
					<div
						className={
							"item-box item-box--desciption-info-height" +
							getCommonItemViewComponentItemBoxElementBackgroundColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
					>
						<h2
							className={
								"item-box__title" /* +
								getCommonTextColorClassNameForThemeWithLightOrDarkMode(reduxState[ACCOUNT_CONTAINER].settings.dark_mode, 
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
								) */
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
											? getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode(
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
									id="edit-item-location"
									className={
										"item-box__group__field__form-text" +
										getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
											reduxState[ACCOUNT_CONTAINER].settings.theme_color
										)
									}
								/>
								<span
									className={
										"backend-errors" +
										getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode(
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
									onChange={onChange}
									id="edit-item-start-date"
									className={
										"item-box__group__field__form-date" +
										getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
											reduxState[ACCOUNT_CONTAINER].settings.theme_color
										)
									}
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
									onChange={onChange}
									id="edit-item-due-date"
									className={
										"item-box__group__field__form-date" +
										getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
											reduxState[ACCOUNT_CONTAINER].settings.theme_color
										)
									}
								/>
							</div>
							<div className="item-box__group__field item-box__group__field--no-bottom-margin item-box__group__field--inline-flex">
								<label
									htmlFor="edit-item-completion-date"
									className={
										"item-box__group__field__form-label item-box__group__field__form-label--long-width" +
										(itemInfo.status_id !==
										reduxState[props.reduxContainerName].priorityStatusOptions
											.statusCompletionId
											? getItemViewEditItemInfoComponentCompletedDateLabelElementDisabledClassNameForLightOrDarkMode(
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
									id="edit-item-completion-date"
									className={
										"item-box__group__field__form-completed-date  js-completion-date" +
										getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
											reduxState[ACCOUNT_CONTAINER].settings.theme_color
										) +
										(itemInfo.status_id !==
										reduxState[props.reduxContainerName].priorityStatusOptions
											.statusCompletionId
											? getItemViewEditItemInfoComponentInputCompletedDateElementDisabledClassNameForLightOrDarkMode(
													reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											  )
											: "")
									}
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
									value={itemInfo.priority_id}
									onChange={onChange}
									id="edit-item-priority"
									className={
										"item-box__group__field__form-select" +
										getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
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
							<div className="item-box__group__field">
								<label
									htmlFor="edit-item-status"
									className="item-box__group__field__form-label"
								>
									Status:
								</label>
								<select
									name="status_id"
									value={itemInfo.status_id}
									onChange={onChange}
									id="edit-item-status"
									className={
										"item-box__group__field__form-select js-item-status-select" +
										getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
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
					</div>
				</div>
			</div>
			<span
				className={
					"backend-errors backend-errors--edit-item" +
					getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
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
								getCommonFormSubmitButtonElementBackgroundColorWithHoverAndFocusClassNameForTheme(
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
								)
							}
						>
							{props.reduxContainerName === PROJECT_CONTAINER
								? "Edit Project"
								: "Edit Bug"}
						</button>
						<div
							className={
								"form-buttons-centered-container__cancel-button" +
								getCommonItemViewComponentFormCancelButtonElementBackgroundColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
							alt={
								"Button to cancel editing the " +
								(props.reduxContainerName === PROJECT_CONTAINER
									? "project"
									: "bug")
							}
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
