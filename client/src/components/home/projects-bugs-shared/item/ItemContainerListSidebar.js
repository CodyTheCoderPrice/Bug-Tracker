import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	SIZE_CONTAINER,
	GENERAL_CONTAINER,
	PROJECT_CONTAINER,
} from "../../../../reducers/containerNames";

import { setWhichGeneralComponentsDisplay } from "../../../../actions";

import { searchFilterSort } from "../../../../utils/searchFilterSortUtils";

// Components
import ItemContainerListSidebarRow from "./ItemContainerListSidebarRow";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerSidebarTableAndRows.scss";

export default function ItemContainerListSidebar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Resize list-sidebar-component height to fit window when smaller than it
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.window !== null &&
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].constants.itemContainerTopBar !== null
		) {
			let itemContainerListSidebarElement = document.getElementsByClassName(
				"js-list-sidebar-component"
			)[0];

			const adjustedWindowHeight =
				reduxState[SIZE_CONTAINER].variables.window.height -
				reduxState[SIZE_CONTAINER].variables.navbar.height -
				reduxState[SIZE_CONTAINER].constants.itemContainerTopBar.height;

			itemContainerListSidebarElement.style.height =
				adjustedWindowHeight + "px";
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].variables,
		// eslint-disable-next-line
		reduxState[props.reduxContainerName].componentsDisplay
			.itemContainerListSidebar,
	]);

	const toggleListSidebar = () => {
		dispatch(
			setWhichGeneralComponentsDisplay({
				...reduxState[GENERAL_CONTAINER].componentsDisplay,
				itemContainerListSidebar: !reduxState[GENERAL_CONTAINER]
					.componentsDisplay.itemContainerListSidebar,
				itemContainerListSidebarUserSet: true,
			})
		);
	};

	return (
		<div className="item-container-list-sidebar-component js-list-sidebar-component">
			<div
				className={
					"expand-minimize-button js-expand-minimize-button" +
					(reduxState[GENERAL_CONTAINER].componentsDisplay
						.itemContainerListSidebar
						? " "
						: " expand-minimize-button--minimized")
				}
				onClick={toggleListSidebar}
			>
				<div className="expand-minimize-button__centering-container">
					<div className="expand-minimize-button__centering-container__icon-container">
						{reduxState[GENERAL_CONTAINER].componentsDisplay
							.itemContainerListSidebar ? (
							<i className="fa fa-chevron-left" aria-hidden="true" />
						) : (
							<i className="fa fa-chevron-right" aria-hidden="true" />
						)}
					</div>
				</div>
			</div>
			<div
				className={
					"list-sidebar js-list-sidebar" +
					(reduxState[GENERAL_CONTAINER].componentsDisplay
						.itemContainerListSidebar
						? " "
						: " list-sidebar--minimized")
				}
			>
				<table className="list-sidebar__table">
					<thead className="">
						<tr className="list-sidebar__table__row">
							<th className="list-sidebar__table__header js-list-sidebar__table__header">
								<span className="list-sidebar__table__header__span">
									{props.reduxContainerName === PROJECT_CONTAINER
										? "Projects"
										: "Bugs"}
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{/*Spread operator used for deep copy so 
					  ...original list array is unaffected*/}
						{searchFilterSort(
							props.reduxContainerName === PROJECT_CONTAINER
								? [...reduxState[props.reduxContainerName].list]
								: [...reduxState[props.reduxContainerName].list].filter(
										(item) =>
											item.project_id ===
											reduxState[PROJECT_CONTAINER].componentsDisplay
												.targetItem.id
								  ),
							reduxState[props.reduxContainerName].searchFilterSort
						).map((item, idx) => {
							return (
								<ItemContainerListSidebarRow
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
