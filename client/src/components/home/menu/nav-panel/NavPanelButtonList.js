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
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faBug } from "@fortawesome/free-solid-svg-icons";
// Components
import NavPanelButtonListSubItem from "./NavPanelButtonListSubItem";

const getProjectsButtonText = () => {
	return (
		<span>
			<FontAwesomeIcon
				icon={faFolder}
				className="item__icon"
				aria-hidden="true"
			/>
			Projects
		</span>
	);
};

const getBugsButtonText = () => {
	return (
		<span>
			<FontAwesomeIcon icon={faBug} className="item__icon" aria-hidden="true" />
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
