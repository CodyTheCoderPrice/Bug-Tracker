import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACCOUNT_CONTAINER } from "../../../../actions/constants/containerNames";
import {
	getCommonBrighterBackgroundColorClassNameForTheme,
	switchToProjectOrBugItemViewAndCurrentItem,
} from "../../../../utils";

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
				{props.item.status_id !==
				reduxState[props.reduxContainerName].priorityStatusOptions
					.statusCompletionId ? null : (
					<i
						className="fa fa-check sub-item__ellipsis-container__completed-icon"
						aria-hidden="true"
					/>
				)}
				{props.item.name}
			</div>
		</div>
	);
}
