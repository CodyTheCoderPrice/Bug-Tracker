import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
} from "../../../../actions/constants/containerNames";
import {
	getCommonBrighterBackgroundColorClassNameForTheme,
	switchToProjectsListView,
	switchToBugsListView,
	getSearchedFilteredSortedList,
} from "../../../../utils";
// Components
import NavPanelButtonListSubItem from "./NavPanelButtonListSubItem";

const getProjectsButtonText = () => {
	return (
		<span>
			<i
				className="fa fa-folder item__icon"
				aria-hidden="true"
				alt="Icon of a folder"
			/>
			All Projects
		</span>
	);
};

const getBugsButtonText = () => {
	return (
		<span>
			<i
				className="fa fa-bug item__icon "
				aria-hidden="true"
				alt="Icon of a bug"
			/>
			Bugs
		</span>
	);
};

export default function NavPanelButtonList(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<div className="nav-panel-button-list-component">
			<div
				className={
					"item" +
					(reduxState[props.reduxContainerName].componentsDisplay
						.listViewComponentShouldDisplay === false
						? ""
						: " item--selected" +
						  getCommonBrighterBackgroundColorClassNameForTheme(
								reduxState[ACCOUNT_CONTAINER].settings.theme_color
						  ))
				}
				onClick={
					props.reduxContainerName === PROJECT_CONTAINER
						? () => switchToProjectsListView(reduxState, dispatch)
						: () => switchToBugsListView(reduxState, dispatch)
				}
			>
				{props.reduxContainerName === PROJECT_CONTAINER
					? getProjectsButtonText()
					: getBugsButtonText()}
			</div>
			{getSearchedFilteredSortedList(reduxState, props.reduxContainerName).map(
				(item, idx) => {
					return (
						<NavPanelButtonListSubItem
							key={idx}
							item={item}
							reduxContainerName={props.reduxContainerName}
						/>
					);
				}
			)}
		</div>
	);
}
