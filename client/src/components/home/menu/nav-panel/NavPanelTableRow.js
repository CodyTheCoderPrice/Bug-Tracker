import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACCOUNT_CONTAINER,
	BUG_CONTAINER,
	PROJECT_CONTAINER,
} from "../../../../actions/constants/containerNames";
import {
	setWhichProjectOrBugComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
} from "../../../../actions";

export default function NavPanelTableRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const changeTargetItem = () => {
		if (
			reduxState[props.reduxContainerName].componentsDisplay
				.itemViewCurrentItem === null ||
			reduxState[props.reduxContainerName].componentsDisplay.itemViewCurrentItem
				.id !== props.item.id
		) {
			dispatch(
				setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
					listViewComponentShouldDisplay: false,
					itemViewComponentShouldDisplay: true,
					itemViewCurrentItem: props.item,
				})
			);

			// Resets bug components display when a different project is opened
			// ...to prevent erros with bug itemViewCurrentItem not belonging to project
			if (props.reduxContainerName === PROJECT_CONTAINER) {
				dispatch(setWhichBugComponentsDisplay({}));
			}
		}
	};

	return (
		<tr className="nav-panel-table-row-component">
			<td className="table__row__data">
				<div
					className={
						"table__row__data__overflow-container" +
						(props.item.status_id !==
						reduxState[props.reduxContainerName].priorityStatusOptions
							.statusCompletionId
							? ""
							: " table__row__data__overflow-container--completed-color")
					}
				>
					<span
						className="table__row__data__overflow-container__info"
						onClick={changeTargetItem}
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
