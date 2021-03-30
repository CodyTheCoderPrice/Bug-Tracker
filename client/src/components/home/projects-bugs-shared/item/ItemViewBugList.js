import React from "react";
import { useSelector } from "react-redux";
import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";

// Components
import ItemViewBugListRow from "./ItemViewBugListRow";

export default function ItemViewBugList() {
	const reduxState = useSelector((state) => state);

	return (
		<div className="item-view-bug-list-component">
			<table className="bug-list-table">
				<tbody>
					{/*Spread operator used for deep copy so 
					  ...original list array is unaffected*/}
					{[...reduxState[BUG_CONTAINER].list]
						.filter(
							(item) =>
								item.project_id ===
								reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem.id
						)
						.sort((a, b) => {
							return b.last_edited_timestamp - a.last_edited_timestamp;
						})
						.slice(0, 5)
						.map((item, idx) => {
							return (
								<ItemViewBugListRow
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
