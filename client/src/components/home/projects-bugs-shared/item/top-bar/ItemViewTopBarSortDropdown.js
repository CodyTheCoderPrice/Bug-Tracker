import React from "react";
import { useSelector } from "react-redux";
import { ACCOUNT_CONTAINER } from "../../../../../actions/constants/containerNames";

import { getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode } from "../../../../../utils";

// Components
import SortArrowsButton from "../../../../basic/SortArrowsButton";

export default function ItemViewTopBar(props) {
	const reduxState = useSelector((state) => state);

	const fireSortArrowOnClick = (sortArrowButtonId) => {
		document.getElementById(sortArrowButtonId).click();
	};

	return (
		<div
			className={
				"item-view-top-bar-sort-dropdown-component item-view-top-bar-filter-dropdown-component--sort-width" +
				getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				)
			}
			onClick={
				/*Keeps clicking dropdown from closing itself*/
				(e) => {
					e.stopPropagation();
				}
			}
		>
			<div className="item-view-top-bar-sort-dropdown-component__sort-content-block">
				<span className="item-view-top-bar-sort-dropdown-component__sort-content-block__sort-arrows-container">
					<SortArrowsButton
						reduxContainerName={props.reduxContainerName}
						sortId={1}
						sortFor="Name"
						uniqueId="item-view-sort-arrow-name"
						dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
					/>
				</span>
				<span
					className="item-view-top-bar-sort-dropdown-component__sort-content-block__title"
					onClick={() => fireSortArrowOnClick("item-view-sort-arrow-name")}
				>
					Name
				</span>
			</div>
			<div className="item-view-top-bar-sort-dropdown-component__sort-content-block">
				<span className="item-view-top-bar-sort-dropdown-component__sort-content-block__sort-arrows-container">
					<SortArrowsButton
						reduxContainerName={props.reduxContainerName}
						sortId={2}
						sortFor="Status"
						uniqueId="item-view-sort-arrow-status"
						dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
					/>
				</span>
				<span
					className="item-view-top-bar-sort-dropdown-component__sort-content-block__title"
					onClick={() => fireSortArrowOnClick("item-view-sort-arrow-status")}
				>
					Status
				</span>
			</div>
			<div className="item-view-top-bar-sort-dropdown-component__sort-content-block">
				<span className="item-view-top-bar-sort-dropdown-component__sort-content-block__sort-arrows-container">
					<SortArrowsButton
						reduxContainerName={props.reduxContainerName}
						sortId={3}
						sortFor="Priority"
						uniqueId="item-view-sort-arrow-priority"
						dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
					/>
				</span>
				<span
					className="item-view-top-bar-sort-dropdown-component__sort-content-block__title"
					onClick={() => fireSortArrowOnClick("item-view-sort-arrow-priority")}
				>
					Priority
				</span>
			</div>
			<div className="item-view-top-bar-sort-dropdown-component__sort-content-block">
				<span className="item-view-top-bar-sort-dropdown-component__sort-content-block__sort-arrows-container">
					<SortArrowsButton
						reduxContainerName={props.reduxContainerName}
						sortId={4}
						sortFor="Created on"
						uniqueId="item-view-sort-arrow-created-on"
						dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
					/>
				</span>
				<span
					className="item-view-top-bar-sort-dropdown-component__sort-content-block__title"
					onClick={() =>
						fireSortArrowOnClick("item-view-sort-arrow-created-on")
					}
				>
					Created on
				</span>
			</div>
			<div className="item-view-top-bar-sort-dropdown-component__sort-content-block">
				<span className="item-view-top-bar-sort-dropdown-component__sort-content-block__sort-arrows-container">
					<SortArrowsButton
						reduxContainerName={props.reduxContainerName}
						sortId={5}
						sortFor="Start Date"
						uniqueId="item-view-sort-arrow-start-date"
						dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
					/>
				</span>
				<span
					className="item-view-top-bar-sort-dropdown-component__sort-content-block__title"
					onClick={() =>
						fireSortArrowOnClick("item-view-sort-arrow-start-date")
					}
				>
					Start Date
				</span>
			</div>
			<div className="item-view-top-bar-sort-dropdown-component__sort-content-block">
				<span className="item-view-top-bar-sort-dropdown-component__sort-content-block__sort-arrows-container">
					<SortArrowsButton
						reduxContainerName={props.reduxContainerName}
						sortId={6}
						sortFor="Due Date"
						uniqueId="item-view-sort-arrow-due-date"
						dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
					/>
				</span>
				<span
					className="item-view-top-bar-sort-dropdown-component__sort-content-block__title"
					onClick={() => fireSortArrowOnClick("item-view-sort-arrow-due-date")}
				>
					Due Date
				</span>
			</div>
		</div>
	);
}
