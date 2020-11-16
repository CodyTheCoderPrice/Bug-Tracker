import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	sizeContainerName,
	generalContainerName,
	projectContainerName,
	bugContainerName,
} from "../../../../reducers/containerNames";

import { setWhichGeneralComponentsDisplay } from "../../../../actions";

import { dateToInt } from "../../../../utils/dateUtils";

// Components
import ItemContainerBugListRow from "./ItemContainerBugListRow";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerBugListTableAndRows.scss";

export default function ItemContainerBugList() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<div className="item-container-bug-list-component">
			<table className="bug-list-table">
				<tbody>
					{/*Spread operator used for deep copy so 
					  ...original list array is unaffected*/}
					{[...reduxState[bugContainerName].list]
						.filter(
							(item) =>
								item.project_id ===
								reduxState[projectContainerName].componentsDisplay.targetItem.id
						)
						.sort((a, b) => {
							return b.last_edited_timestamp - a.last_edited_timestamp;
						})
						.slice(0, 5)
						.map((item, idx) => {
							return (
								<ItemContainerBugListRow
									key={idx}
									idx={idx}
									item={item}
									reduxContainerName={bugContainerName}
								/>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}
