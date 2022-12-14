import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
} from "../../../../actions/constants/containerNames";
import {
	getCommonBrighterBackgroundColorClassNameForTheme,
	switchToProjectOrBugItemViewAndCurrentItem,
} from "../../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFolderOpen,
	faMinus,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function NavPanelButtonListSubItem(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

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
					? " sub-item--selected" +
					  getCommonBrighterBackgroundColorClassNameForTheme(
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
					  )
					: "")
			}
			onClick={() =>
				switchToProjectOrBugItemViewAndCurrentItem(
					reduxState,
					dispatch,
					props.reduxContainerName,
					props.item
				)
			}
		>
			<div className="sub-item__ellipsis-container">
				{props.reduxContainerName === PROJECT_CONTAINER ? (
					<FontAwesomeIcon
						icon={faFolderOpen}
						className="sub-item__ellipsis-container__icon"
					/>
				) : props.item.status_id !==
				  reduxState[props.reduxContainerName].priorityStatusOptions
						.statusCompletionId ? (
					<FontAwesomeIcon
						icon={faMinus}
						className="sub-item__ellipsis-container__icon"
					/>
				) : (
					<FontAwesomeIcon
						icon={faCheck}
						className="sub-item__ellipsis-container__icon"
					/>
				)}
				{props.item.name}
			</div>
		</div>
	);
}
