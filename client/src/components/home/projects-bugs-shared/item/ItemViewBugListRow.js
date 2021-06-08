import React from "react";
import { useSelector } from "react-redux";

import { ACCOUNT_CONTAINER } from "../../../../actions/constants/containerNames";

import {
	getStatusBackgroundColorClassName,
	getCommonWeakTextColorClassNameForLightOrDarkMode,
} from "../../../../utils";

export default function ItemViewBugListRow(props) {
	const reduxState = useSelector((state) => state);

	const getStatusBoxColorClassName = () => {
		const filteredStatusList = reduxState[
			props.reduxContainerName
		].priorityStatusOptions.statusList.filter(
			(status) => status.id === props.item.status_id
		);

		return getStatusBackgroundColorClassName(
			filteredStatusList.length > 0 ? filteredStatusList[0].color : "problem"
		);
	};

	return (
		<tr
			className={
				"bug-list-table__row" +
				getCommonWeakTextColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				)
			}
		>
			<td
				className={
					"bug-list-table__row__data bug-list-table__row__data--overflow" +
					(props.item.status_id ===
					reduxState[props.reduxContainerName].priorityStatusOptions
						.statusCompletionId
						? " bug-list-table__row__data--completed-color"
						: "")
				}
			>
				<span className="bug-list-table__row__data__info">
					{props.item.status_id !==
					reduxState[props.reduxContainerName].priorityStatusOptions
						.statusCompletionId ? null : (
						<i
							className="fa fa-check bug-list-table__row__data__info__completed-icon"
							aria-hidden="true"
						/>
					)}
					{props.item.name}
				</span>
			</td>
			<td className="bug-list-table__row__data">
				<div className="bug-list-table__row__data__centering-container">
					<div
						className={
							"bug-list-table__row__data__centering-container__status-box" +
							getStatusBoxColorClassName()
						}
					>
						<span className="bug-list-table__row__data__centering-container__status-box__centered-info">
							{props.item.status_option}
						</span>
					</div>
				</div>
			</td>
		</tr>
	);
}
