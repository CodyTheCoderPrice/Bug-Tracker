import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { projectContainerName } from "../../../../reducers/containerNames";

import { searchFilterSort } from "../../../../utils/searchFilterSortUtils";
import {
	getElementSize,
	getElementStyle,
	stripNonDigits,
} from "../../../../utils/displaySizeUtils";

// Components
import ItemContainerListSidebarRow from "./ItemContainerListSidebarRow";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerSidebarTableAndRows.scss";

export default function ItemContainerListSidebar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [
		originalItemContainerListSidebarHeight,
		setOriginalItemContainerListSidebarHeight,
	] = useState(null);

	// Resize list-sidebar-component height to fit window when smaller than it
	useEffect(() => {
		if (
			reduxState.sizeContainer.variables.window !== null &&
			reduxState.sizeContainer.variables.navbar !== null &&
			reduxState.sizeContainer.constants.itemContainerTopBar !== null
		) {
			let itemContainerListSidebarElement = document.getElementsByClassName(
				"js-list-sidebar-component"
			)[0];

			// Makes sure originalItemContainerListSidebarHeight gets set
			if (originalItemContainerListSidebarHeight === null) {
				setOriginalItemContainerListSidebarHeight({
					height: stripNonDigits(getElementStyle(itemContainerListSidebarElement).height),
				});

				// Prevents crash since originalItemContainerListSidebarHeight will still
				// ...be null for remainder of this useEfffect iteration
				return;
			}

			const adjustedWindowHeight =
				reduxState.sizeContainer.variables.window.height -
				reduxState.sizeContainer.variables.navbar.height -
				reduxState.sizeContainer.constants.itemContainerTopBar.height;

			itemContainerListSidebarElement.style.height = adjustedWindowHeight + "px";
		}
		// eslint-disable-next-line
	}, [reduxState.sizeContainer.variables, originalItemContainerListSidebarHeight]);

	return (
		<div className="list-sidebar-component js-list-sidebar-component">
			<table className="list-sidebar">
				<thead className="">
					<tr className="list-sidebar__row">
						<th className="list-sidebar__header js-list-sidebar__header">
							<span className="list-sidebar__header__span">
								{props.reduxContainerName === projectContainerName
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
						props.reduxContainerName === projectContainerName
							? [...reduxState[props.reduxContainerName].list]
							: [
									...reduxState[props.reduxContainerName].list.filter(
										(item) =>
											item.project_id ===
											reduxState[projectContainerName].componentsDisplay
												.targetItem.id
									),
							  ],
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
					<tr className="list-sidebar__row--empty" />
				</tbody>
			</table>
		</div>
	);
}
