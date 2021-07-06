import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
	SIZE_CONTAINER,
	ACCOUNT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	manageSizeOfItemBoxsElementInPairContainerElement,
	getCommonStatusBackgroundColorClassName,
	getCommonItemViewComponentItemBoxElementBackgroundColorClassNameForLightOrDarkMode,
	getCommonWeakElementTextColorClassNameForLightOrDarkMode,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
	displayGrayedOutAlternativeWhenValueIsEmpty,
	formatDateMMddYYYY,
} from "../../../../utils";

export default function ItemViewDisplayItemInfo(props) {
	const reduxState = useSelector((state) => state);

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

	const getStatusBoxColorClassName = () => {
		const filteredStatusList = reduxState[
			props.reduxContainerName
		].priorityStatusOptions.statusList.filter(
			(status) =>
				status.id ===
				reduxState[props.reduxContainerName].componentsDisplay
					.itemViewCurrentItem.status_id
		);

		return getCommonStatusBackgroundColorClassName(
			filteredStatusList.length > 0 ? filteredStatusList[0].color : "problem"
		);
	};

	return (
		<div>
			<div className="outer-dividing-container outer-dividing-container--full">
				<h1
					className={
						"item-name" +
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
				>
					{reduxState[props.reduxContainerName].componentsDisplay
						.itemViewCurrentItem.status_id !==
					reduxState[props.reduxContainerName].priorityStatusOptions
						.statusCompletionId ? null : (
						<i
							className="fa fa-check name-completed-icon"
							aria-hidden="true"
							alt="Icon of a check mark"
						/>
					)}
					{
						reduxState[props.reduxContainerName].componentsDisplay
							.itemViewCurrentItem.name
					}
				</h1>
				<div
					className={
						"item-creation-date" +
						getCommonWeakElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				>
					Created on:{" "}
					{formatDateMMddYYYY(
						reduxState[props.reduxContainerName].componentsDisplay
							.itemViewCurrentItem.creation_date
					)}
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
						<h2 className={"item-box__title"}>Description</h2>
						<span
							className={
								"item-box__description" +
								getCommonWeakElementTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
						>
							{displayGrayedOutAlternativeWhenValueIsEmpty(
								reduxState[props.reduxContainerName].componentsDisplay
									.itemViewCurrentItem.description,
								"Description Is Empty.",
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)}
						</span>
					</div>
				</div>
				<div className="outer-dividing-container">
					<div
						className={
							"item-box item-box--desciption-info-height" +
							getCommonItemViewComponentItemBoxElementBackgroundColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
					>
						<h2 className={"item-box__title"}>Info</h2>
						{props.reduxContainerName === BUG_CONTAINER ? (
							<div className="item-box__group__field">
								<span className="item-box__group__field__category">
									Location:
								</span>
								<span
									className={
										"item-box__group__field_content" +
										getCommonWeakElementTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
									{displayGrayedOutAlternativeWhenValueIsEmpty(
										reduxState[props.reduxContainerName].componentsDisplay
											.itemViewCurrentItem.location,
										"none",
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode
									)}
								</span>
							</div>
						) : null}
						<div className="item-box__group">
							<div className="item-box__group__field">
								<span className="item-box__group__field__category">
									Start Date:
								</span>
								<span
									className={
										"item-box__group__field_content" +
										getCommonWeakElementTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
									{displayGrayedOutAlternativeWhenValueIsEmpty(
										formatDateMMddYYYY(
											reduxState[props.reduxContainerName].componentsDisplay
												.itemViewCurrentItem.start_date
										),
										"none",
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode
									)}
								</span>
							</div>
							<div className="item-box__group__field">
								<span className="item-box__group__field__category">
									Due Date:
								</span>
								<span
									className={
										"item-box__group__field_content" +
										getCommonWeakElementTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
									{displayGrayedOutAlternativeWhenValueIsEmpty(
										formatDateMMddYYYY(
											reduxState[props.reduxContainerName].componentsDisplay
												.itemViewCurrentItem.due_date
										),
										"none",
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode
									)}
								</span>
							</div>
							<div className="item-box__group__field">
								<span className="item-box__group__field__category">
									Completed on:
								</span>
								<span
									className={
										"item-box__group__field_content" +
										getCommonWeakElementTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
									{displayGrayedOutAlternativeWhenValueIsEmpty(
										formatDateMMddYYYY(
											reduxState[props.reduxContainerName].componentsDisplay
												.itemViewCurrentItem.completion_date
										),
										"none",
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode
									)}
								</span>
							</div>
						</div>
						<div className="item-box__group item-box__group--right">
							<div className="item-box__group__field">
								<span className="item-box__group__field__category">
									Priority:
								</span>
								<span
									className={
										"item-box__group__field_content" +
										getCommonWeakElementTextColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
									{
										reduxState[props.reduxContainerName].componentsDisplay
											.itemViewCurrentItem.priority_option
									}
								</span>
							</div>
							<div className="item-box__group__field">
								<div className="item-box__group__field__centering-container">
									<span className="item-box__group__field__centering-container__category">
										Status:
									</span>
								</div>
								<div
									className={
										"item-box__group__field__status-box" +
										getStatusBoxColorClassName()
									}
								>
									<span className="item-box__group__field__status-box__centered-content">
										{
											reduxState[props.reduxContainerName].componentsDisplay
												.itemViewCurrentItem.status_option
										}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
