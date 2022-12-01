import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	SIZE_CONTAINER,
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
} from "../../../../actions/constants/containerNames";

import { setWhichGeneralComponentsDisplay } from "../../../../actions";

import {
	getItemViewListSidebarComponentTableRowHeaderElementBoxShadowBackgroundTextColorClassNameForLightOrDarkMode,
	getItemViewListSidebarComponentSidebarContainerElementBorderColorClassNameForLightOrDarkMode,
	getItemViewListSidebarComponentExpandMinimizeButtonElementBorderAndBackgroundColorClassNameForLightOrDarkMode,
	getSearchedFilteredSortedList,
} from "../../../../utils";

// Components
import ItemViewListSidebarRow from "./ItemViewListSidebarItemRow";

export default function ItemViewListSidebar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Resize list-sidebar-component height to fit window when smaller than it
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.window !== null &&
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].constants.itemViewTopBarComponentHeight !==
				null
		) {
			let itemViewListSidebarElement = document.getElementsByClassName(
				"js-list-sidebar-component"
			)[0];

			const adjustedWindowHeight =
				reduxState[SIZE_CONTAINER].variables.window.height -
				reduxState[SIZE_CONTAINER].variables.navbar.height -
				reduxState[SIZE_CONTAINER].constants.itemViewTopBarComponentHeight;

			itemViewListSidebarElement.style.height = adjustedWindowHeight + "px";
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].variables,
		// eslint-disable-next-line
		reduxState[props.reduxContainerName].componentsDisplay
			.itemViewListSidebarComponentContainerElementExpanded,
	]);

	const toggleListSidebarComponentContainerElementExpanded = () => {
		dispatch(
			setWhichGeneralComponentsDisplay({
				...reduxState[GENERAL_CONTAINER].componentsDisplay,
				itemViewListSidebarComponentContainerElementExpanded:
					!reduxState[GENERAL_CONTAINER].componentsDisplay
						.itemViewListSidebarComponentContainerElementExpanded,
				// Set true since the user has manually changed whether
				// ...'list'sidebar-container' (className) element is expanded
				itemViewListSidebarComponentContainerElementExpandedUserSet: true,
			})
		);
	};

	return (
		<div className="item-view-list-sidebar-component js-list-sidebar-component">
			<div
				className={
					"expand-minimize-button" +
					getItemViewListSidebarComponentExpandMinimizeButtonElementBorderAndBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					) +
					(reduxState[GENERAL_CONTAINER].componentsDisplay
						.itemViewListSidebarComponentContainerElementExpanded
						? " expand-minimize-button--expanded"
						: " ")
				}
				alt={
					"Button to open and close the sidebar contianing the list of " +
					(props.reduxContainerName === PROJECT_CONTAINER ? "projects" : "bugs")
				}
				onClick={toggleListSidebarComponentContainerElementExpanded}
			>
				<div className="expand-minimize-button__centering-container">
					<div className="expand-minimize-button__centering-container__icon-container">
						{reduxState[GENERAL_CONTAINER].componentsDisplay
							.itemViewListSidebarComponentContainerElementExpanded ? (
							<i
								className="fa fa-chevron-left"
								aria-hidden="true"
								alt="Icon of an arrow pointing left"
							/>
						) : (
							<i
								className="fa fa-chevron-right"
								aria-hidden="true"
								alt="Icon of an arrow pointing right"
							/>
						)}
					</div>
				</div>
			</div>
			<div
				className={
					"list-sidebar-container" +
					getItemViewListSidebarComponentSidebarContainerElementBorderColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					) +
					(reduxState[GENERAL_CONTAINER].componentsDisplay
						.itemViewListSidebarComponentContainerElementExpanded
						? " list-sidebar-container--expanded"
						: " ")
				}
			>
				<table className="list-sidebar-container__table">
					<thead>
						<tr className="list-sidebar-container__table__row">
							<th
								className={
									"list-sidebar-container__table__row__header" +
									getItemViewListSidebarComponentTableRowHeaderElementBoxShadowBackgroundTextColorClassNameForLightOrDarkMode(
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode
									)
								}
							>
								<span>
									{props.reduxContainerName === PROJECT_CONTAINER
										? "Projects"
										: "Bugs"}
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{getSearchedFilteredSortedList(
							reduxState,
							props.reduxContainerName
						).map((item, idx) => {
							return (
								<ItemViewListSidebarRow
									key={idx}
									item={item}
									reduxContainerName={props.reduxContainerName}
								/>
							);
						})}
						{/*Creates an empty space at the bottom*/}
						<tr className="list-sidebar-container__table__row--empty" />
					</tbody>
				</table>
			</div>
		</div>
	);
}
