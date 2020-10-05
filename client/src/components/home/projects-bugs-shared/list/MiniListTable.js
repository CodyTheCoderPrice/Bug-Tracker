import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { projectContainerName } from "../../../../reducers/containerNames";

import { searchFilterSort } from "../../../../utils/searchFilterSortUtils";
import { getElementSize, getElementStyle, stripNonDigits } from "../../../../utils/displaySizeUtils";

// Components
import MiniListTableRow from "./MiniListTableRow";

import "../../../../SCSS/home/projects-bugs-shared/list/miniListTableAndRows.scss";

export default function MiniListTable(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [
		originalMiniListTableHeight,
		setOriginalMiniListTableHeight,
	] = useState(null);

	// Resize mini-list-table-component height to fit window when smaller than it
	useEffect(() => {
		if (
			reduxState.sizeContainer.variables.window !== null &&
			reduxState.sizeContainer.variables.navbar !== null
		) {
			let miniListTableElement = document.getElementsByClassName(
				"js-mini-list-table-component"
			)[0];

			// Makes sure originalMiniListTableHeight gets set
			if (originalMiniListTableHeight === null) {
				const sidebarStyle = getElementStyle(miniListTableElement);
				setOriginalMiniListTableHeight({
					height: stripNonDigits(sidebarStyle.height),
				});

				// Prevents crash since originalMiniListTableHeight will still
				// ...be null for remainder of this useEfffect iteration
				return;
			}

			const topBarHeight = getElementSize(document.getElementsByClassName("js-top-bar")[0]).height;

			const adjustedWindowHeight =
				reduxState.sizeContainer.variables.window.height -
				reduxState.sizeContainer.variables.navbar.height -
				topBarHeight;

			if (originalMiniListTableHeight.height < adjustedWindowHeight) {
				miniListTableElement.style.height = adjustedWindowHeight + "px";
			} else {
				miniListTableElement.style.height = originalMiniListTableHeight.height + "px";
			}
		}
		// eslint-disable-next-line
	}, [reduxState.sizeContainer.variables, originalMiniListTableHeight]);

	return (
		<div className="mini-list-table-component js-mini-list-table-component">
			<table className="mini-list-table">
				<thead className="">
					<tr className="mini-list-table__row">
						<th className="mini-list-table__header js-mini-list-table__header">
							<span className="mini-list-table__header__span">
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
							<MiniListTableRow
								key={idx}
								item={item}
								reduxContainerName={props.reduxContainerName}
							/>
						);
					})}
					{/*Creates an empty space at the bottom*/}
					<tr className="mini-list-table__row--empty" />
				</tbody>
			</table>
		</div>
	);
}
