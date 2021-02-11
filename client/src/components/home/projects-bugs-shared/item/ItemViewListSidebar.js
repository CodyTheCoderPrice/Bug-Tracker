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
	getHomeBackgroundColorClassNameForLightOrDarkMode,
	getSearchFilterSortList,
} from "../../../../utils";

// Components
import ItemViewListSidebarRow from "./ItemViewListSidebarRow";

export default function ItemViewListSidebar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Resize list-sidebar-component height to fit window when smaller than it
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.window !== null &&
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].constants.itemViewTopBarHeight !== null
		) {
			let itemViewListSidebarElement = document.getElementsByClassName(
				"js-list-sidebar-component"
			)[0];

			const adjustedWindowHeight =
				reduxState[SIZE_CONTAINER].variables.window.height -
				reduxState[SIZE_CONTAINER].variables.navbar.height -
				reduxState[SIZE_CONTAINER].constants.itemViewTopBarHeight;

			itemViewListSidebarElement.style.height = adjustedWindowHeight + "px";
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].variables,
		// eslint-disable-next-line
		reduxState[props.reduxContainerName].componentsDisplay.itemViewListSidebar,
	]);

	const toggleListSidebar = () => {
		dispatch(
			setWhichGeneralComponentsDisplay({
				...reduxState[GENERAL_CONTAINER].componentsDisplay,
				itemViewListSidebar: !reduxState[GENERAL_CONTAINER].componentsDisplay
					.itemViewListSidebar,
				itemViewListSidebarUserSet: true,
			})
		);
	};

	return (
		<div className="item-container-list-sidebar-component js-list-sidebar-component">
			<div
				className={
					"expand-minimize-button js-expand-minimize-button" +
					(reduxState[GENERAL_CONTAINER].componentsDisplay.itemViewListSidebar
						? " "
						: " expand-minimize-button--minimized")
				}
				onClick={toggleListSidebar}
			>
				<div className="expand-minimize-button__centering-container">
					<div className="expand-minimize-button__centering-container__icon-container">
						{reduxState[GENERAL_CONTAINER].componentsDisplay
							.itemViewListSidebar ? (
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
					"list-sidebar js-list-sidebar" +
					(reduxState[GENERAL_CONTAINER].componentsDisplay.itemViewListSidebar
						? " "
						: " list-sidebar--minimized")
				}
			>
				<table className="list-sidebar__table">
					<thead className="">
						<tr className="list-sidebar__table__row">
							<th
								className={
									"list-sidebar__table__header js-list-sidebar__table__header" +
									getHomeBackgroundColorClassNameForLightOrDarkMode(
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode
									)
								}
							>
								<span className="list-sidebar__table__header__span">
									{props.reduxContainerName === PROJECT_CONTAINER
										? "Projects"
										: "Bugs"}
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{getSearchFilterSortList(reduxState, props.reduxContainerName).map((item, idx) => {
							return (
								<ItemViewListSidebarRow
									key={idx}
									item={item}
									reduxContainerName={props.reduxContainerName}
								/>
							);
						})}
						{/*Creates an empty space at the bottom*/}
						<tr className="list-sidebar__table__row--empty" />
					</tbody>
				</table>
			</div>
		</div>
	);
}
