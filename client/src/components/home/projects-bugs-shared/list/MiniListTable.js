import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { projectContainerName } from "../../../../reducers/containerNames";

import {
	setWhichProjectOrBugComponentsDisplay,
} from "../../../../actions";

import { searchFilterSort } from "../../../../utils/searchFilterSortUtils";

// Components
import MiniListTableRow from "./MiniListTableRow";

import "../../../../SCSS/home/projects-bugs-shared/list/miniListTableAndRows.scss";

export default function MiniListTable(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<div className="mini-list-table-component js-mini-list-table-component">
			<table className="mini-list-table">
				<thead className="">
					<tr className="mini-list-table__row">
						<th className="mini-list-table__header js-mini-list-table__header">
							<span className="mini-list-table__header__span">Name</span>
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
