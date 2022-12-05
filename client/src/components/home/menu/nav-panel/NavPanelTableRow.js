import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACCOUNT_CONTAINER } from "../../../../actions/constants/containerNames";
import {
	getCommonBrighterBackgroundColorClassNameForTheme,
	switchToProjectOrBugItemViewAndCurrentItem,
} from "../../../../utils";

export default function NavPanelTableRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<tr
			className={
				"nav-panel-table-row-component" +
				(reduxState[props.reduxContainerName].componentsDisplay
					.itemViewComponentShouldDisplay === true &&
				reduxState[props.reduxContainerName].componentsDisplay
					.itemViewCurrentItem !== null &&
				reduxState[props.reduxContainerName].componentsDisplay
					.itemViewCurrentItem.id === props.item.id
					? getCommonBrighterBackgroundColorClassNameForTheme(
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
					  )
					: "")
			}
			onClick={() =>
				switchToProjectOrBugItemViewAndCurrentItem(
					reduxState,
					dispatch,
					props.reduxContainerName,
					props.item
				)
			}
		>
			<td className="table__row__data">
				<div className="table__row__data__overflow-container">
					<span className="table__row__data__overflow-container__info">
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
