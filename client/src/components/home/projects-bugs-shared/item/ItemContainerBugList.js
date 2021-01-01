import React from "react";
import { useSelector } from "react-redux";
import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";

// Components
import ItemContainerBugListRow from "./ItemContainerBugListRow";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerBugListTableAndRows.scss";

export default function ItemContainerBugList() {
	const reduxState = useSelector((state) => state);

	return (
		<div className="item-container-bug-list-component">
			<table className="bug-list-table">
				<tbody>
					{/*Spread operator used for deep copy so 
					  ...original list array is unaffected*/}
					{[...reduxState[BUG_CONTAINER].list]
						.filter(
							(item) =>
								item.project_id ===
								reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.id
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
									reduxContainerName={BUG_CONTAINER}
								/>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}
