import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { getElementSize } from "../../../../utils";

export default function ItemContainerBugListRow(props) {
	const reduxState = useSelector((state) => state);

	useEffect(() => {
		const tableDataElement = document.getElementsByClassName(
			"js-bug-name-table-data"
		)[0];

		const overflowContainerElement = document.getElementsByClassName(
			"js-bug-name-overflow-container-" + props.item.id
		)[0];

		const myObserver = new ResizeObserver(() => {
			const tableDataWidth = getElementSize(tableDataElement).width;

			// Minus 20 to act as a padding on the left and right side
			overflowContainerElement.style.width = tableDataWidth - 20 + "px";
			overflowContainerElement.style.maxWidth = tableDataWidth - 20 + "px";
		});

		myObserver.observe(tableDataElement);
		// eslint-disable-next-line
	}, []);

	const getStatusBoxColorClassName = () => {
		const filteredStatusList = reduxState[
			props.reduxContainerName
		].priorityStatusOptions.statusList.filter(
			(status) => status.id === props.item.status_id
		);

		return (
			" status-box-background-color-" +
			(filteredStatusList.length > 0 ? filteredStatusList[0].color : "problem")
		);
	};

	return (
		<tr className="bug-list-table__row">
			<td className="bug-list-table__data js-bug-name-table-data">
				<div
					className={
						"bug-list-table__data__overflow-container js-bug-name-overflow-container-" +
						props.item.id +
						(props.item.status_id ===
						reduxState[props.reduxContainerName].priorityStatusOptions
							.statusCompletionId
							? " bug-list-table__data__overflow-container--completed-color"
							: "")
					}
				>
					<span className="bug-list-table__data__overflow-container__info">
						{props.item.status_id !==
						reduxState[props.reduxContainerName].priorityStatusOptions
							.statusCompletionId ? null : (
							<i
								className="fa fa-check bug-list-table__data__overflow-container__info__completed-icon"
								aria-hidden="true"
							/>
						)}
						{props.item.name}
					</span>
				</div>
			</td>
			<td className="bug-list-table__data">
				<div className="bug-list-table__data__centering-container">
					<div
						className={
							"bug-list-table__data__centering-container__status-box" +
							getStatusBoxColorClassName()
						}
					>
						<span className="bug-list-table__data__centering-container__status-box__centered-info">
							{props.item.status_option}
						</span>
					</div>
				</div>
			</td>
		</tr>
	);
}
