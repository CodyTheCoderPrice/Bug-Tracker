import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACCOUNT_CONTAINER,
} from "../../../../actions/constants/containerNames";
import {
	getCommonBrighterBackgroundColorClassNameForTheme,
	switchToProjectOrBugItemViewAndCurrentItem,
	getCommonStatusTextColorClassName,
	getCommonElementToolTipBackgroundTextColorClassNameForLocationWithLightOrDarkMode,
} from "../../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFolderOpen,
	faCircle,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function NavPanelButtonListSubItem(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const getStatusBoxColorClassName = () => {
		const filteredStatusList = reduxState[
			props.reduxContainerName
		].priorityStatusOptions.statusList.filter(
			(status) => status.id === props.item.status_id
		);

		return getCommonStatusTextColorClassName(
			filteredStatusList.length > 0 ? filteredStatusList[0].color : "problem"
		);
	};

	return (
		<div
			className={
				"nav-panel-button-list-sub-item-component" +
				(reduxState[props.reduxContainerName].componentsDisplay
					.itemViewComponentShouldDisplay === true &&
				reduxState[props.reduxContainerName].componentsDisplay
					.itemViewCurrentItem !== null &&
				reduxState[props.reduxContainerName].componentsDisplay
					.itemViewCurrentItem.id === props.item.id
					? " sub-item-button--selected" +
					  getCommonBrighterBackgroundColorClassNameForTheme(
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
					  )
					: "")
			}
			aria-label={props.item.name}
			onClick={() =>
				switchToProjectOrBugItemViewAndCurrentItem(
					reduxState,
					dispatch,
					props.reduxContainerName,
					props.item
				)
			}
		>
			{props.soloProject ? (
				<FontAwesomeIcon
					icon={faFolderOpen}
					className="sub-item-button__icon"
					aria-hidden="true"
				/>
			) : (
				<span
					className={
						"sub-item-button__tooltip-container" +
						getCommonElementToolTipBackgroundTextColorClassNameForLocationWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							"right"
						)
					}
					data-tooltip={props.item.status_option + " (status)"}
				>
					{props.item.status_id !==
					reduxState[props.reduxContainerName].priorityStatusOptions
						.statusCompletionId ? (
						<FontAwesomeIcon
							icon={faCircle}
							className={
								"sub-item-button__tooltip-container__icon" +
								getStatusBoxColorClassName()
							}
							aria-hidden="true"
						/>
					) : (
						<FontAwesomeIcon
							icon={faCheck}
							className={
								"sub-item-button__tooltip-container__icon" +
								getStatusBoxColorClassName()
							}
							aria-hidden="true"
						/>
					)}
				</span>
			)}
			<div className="sub-item-button__ellipsis-container">
				{props.item.name}
			</div>
		</div>
	);
}
