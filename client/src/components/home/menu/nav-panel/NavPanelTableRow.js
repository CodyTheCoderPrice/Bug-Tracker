import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { switchToProjectOrBugItemViewAndCurrentItem } from "../../../../utils";

export default function NavPanelTableRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<tr className="nav-panel-table-row-component">
			<td className="table__row__data">
				<div className="table__row__data__overflow-container">
					<span
						className="table__row__data__overflow-container__info"
						onClick={() =>
							switchToProjectOrBugItemViewAndCurrentItem(
								reduxState,
								dispatch,
								props.reduxContainerName,
								props.item
							)
						}
					>
						{props.item.status_id !==
						reduxState[props.reduxContainerName].priorityStatusOptions
							.statusCompletionId ? null : (
							<i
								className="fa fa-check table__row__data__overflow-container__info__completed-icon"
								aria-hidden="true"
							/>
						)}
						{props.item.name}
					</span>
				</div>
			</td>
		</tr>
	);
}
