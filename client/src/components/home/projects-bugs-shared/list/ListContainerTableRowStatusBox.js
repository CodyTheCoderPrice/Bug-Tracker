import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { projectContainerName } from "../../../../reducers/containerNames";

import { displayNoneIfEmpty } from "../../../../utils/elementUtils";
import { isEmpty } from "../../../../utils/basicUtils";

import "../../../../SCSS/home/projects-bugs-shared/list/listContainerTableRowStatusBox.scss";

export default function ListContainerTableRowStatusBox(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const getStatusBoxColorClassName = () => {
		if (props.reduxContainerName === projectContainerName) {
			switch (props.item.status_id) {
				// Starts at 2 since 1 means status was left empty
				case 2:
					return " list-table__data__centering-container__status-box--purple";
				case 3:
					return " list-table__data__centering-container__status-box--blue";
				case 4:
					return " list-table__data__centering-container__status-box--orange";
				case 5:
					return " list-table__data__centering-container__status-box--green";
				case 6:
					return " list-table__data__centering-container__status-box--red";
				default:
					return "";
			}
		} else {
			switch (props.item.status_id) {
				case 1:
					return " list-table__data__centering-container__status-box--purple";
				case 2:
					return " list-table__data__centering-container__status-box--blue";
				case 3:
					return " list-table__data__centering-container__status-box--orange";
				case 4:
					return " list-table__data__centering-container__status-box--green";
				default:
					return "";
			}
		}
	};

	return (
		<div>
			<div className="list-table__data__centering-container">
				<div
					className={
						"list-table__data__centering-container__status-box" +
						getStatusBoxColorClassName()
					}
				>
					<span className="list-table__data__centering-container__status-box__centered-info">
						{isEmpty(props.item.status_option)
							? "None"
							: props.item.status_option}
					</span>
				</div>
			</div>
		</div>
	);
}
