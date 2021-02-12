import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	COMMENT_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	setWhichProjectOrBugComponentsDisplay,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "../../../../actions";

import {
	getListRowBorderColorClassNameForLightOrDarkMode,
	getListRowHoverBackgroundColorClassNameForLightOrDarkMode,
	getListRowSelectedBackgroundColorClassNameForLightOrDarkMode,
	getUniversalTextGrayedOutTextColorClassNameForLightOrDarkMode,
	formatDateMMddYYYY,
	displayGrayedOutMessageIfEmpty,
	getTextColorClassNameForTheme,
	getListTdTextColorClassNameForLightOrDarkMode,
	getBugsInProjectList,
	getNumberOfBugsForStatus,
} from "../../../../utils";

// Components
import CustomCheckbox from "../../../basic/CustomCheckbox";

export default function ListViewTableRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const onChangeMassDeleteCheckbox = (e) => {
		const value = Number(e.target.value);
		let deepCopyMassDeleteArray = [
			...reduxState[props.reduxContainerName].massDeleteList,
		];
		const index = deepCopyMassDeleteArray.indexOf(value);

		if (index === -1) {
			deepCopyMassDeleteArray.push(value);
		} else {
			deepCopyMassDeleteArray.splice(index, 1);
		}

		dispatch(
			setProjectOrBugMassDeleteList(
				props.reduxContainerName,
				deepCopyMassDeleteArray
			)
		);
	};

	// Stops the clicking of a checkbox from propogating parent elements onclick
	const dontPropogateParentOnclick = (e) => {
		e.stopPropagation();
	};

	const openItemView = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				listView: false,
				itemView: true,
				targetItem: props.item,
			})
		);

		// Resets bug components display when a different project is opened
		// ...to prevent erros with bug targetItem not belonging to project
		if (
			props.reduxContainerName === PROJECT_CONTAINER &&
			reduxState[props.reduxContainerName].componentsDisplay.targetItem !==
				null &&
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.id !==
				props.item.id
		) {
			dispatch(setWhichBugComponentsDisplay({}));
		}
	};

	const getTableDataClassName = () => {
		return (
			"list-table__data list-table__data--overflow" +
			(props.item.status_id ===
			reduxState[props.reduxContainerName].priorityStatusOptions
				.statusCompletionId
				? " list-table__data--completed-color"
				: getListTdTextColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				  ))
		);
	};

	const getStatusBoxColorClassName = () => {
		const filteredStatusList = reduxState[
			props.reduxContainerName
		].priorityStatusOptions.statusList.filter(
			(status) => status.id === props.item.status_id
		);

		return (
			" js-set-status-box-background-color-" +
			(filteredStatusList.length > 0 ? filteredStatusList[0].color : "problem")
		);
	};

	return (
		<tr
			className={
				"list-table__row" +
				getListRowBorderColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				) +
				(reduxState[props.reduxContainerName]?.componentsDisplay.targetItem !==
					null &&
				reduxState[props.reduxContainerName]?.componentsDisplay.targetItem
					.id === props.item.id
					? getListRowSelectedBackgroundColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					  )
					: getListRowHoverBackgroundColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					  ))
			}
			onClick={openItemView}
		>
			<td
				className="list-table__data"
				onClick={(e) => dontPropogateParentOnclick(e)}
				onDoubleClick={(e) => dontPropogateParentOnclick(e)}
			>
				<div className="list-table__data__custom-checkbox-centered-container ">
					<CustomCheckbox
						centered={true}
						value={props.item.id}
						onChangeFunction={onChangeMassDeleteCheckbox}
						checked={reduxState[
							props.reduxContainerName
						].massDeleteList.includes(props.item.id)}
						dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
					/>
				</div>
			</td>
			<td
				className={
					"list-table__data list-table__data--overflow" +
					(props.item.status_id ===
					reduxState[props.reduxContainerName].priorityStatusOptions
						.statusCompletionId
						? " list-table__data--completed-color"
						: getTextColorClassNameForTheme(
								reduxState[ACCOUNT_CONTAINER].settings.theme_color
						  ))
				}
			>
				<span className="list-table__data__info">
					{props.item.status_id !==
					reduxState[props.reduxContainerName].priorityStatusOptions
						.statusCompletionId ? null : (
						<i
							className="fa fa-check list-table__data__info__completed-icon"
							aria-hidden="true"
						/>
					)}
					{props.item.name}
				</span>
			</td>
			<td className="list-table__data">
				<div className="list-table__data__centering-container">
					<div
						className={
							"list-table__data__centering-container__status-box" +
							getStatusBoxColorClassName()
						}
					>
						<span className="list-table__data__centering-container__status-box__centered-info">
							{props.item.status_option}
						</span>
					</div>
				</div>
			</td>
			<td className={getTableDataClassName()}>
				<span
					className={
						"list-table__data__info" +
						(reduxState[props.reduxContainerName].priorityStatusOptions
							.priorityEmptyId === props.item.priority_id
							? " universal-text-grayed-out" +
							  getUniversalTextGrayedOutTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							  )
							: "")
					}
				>
					{props.item.priority_option}
				</span>
			</td>
			<td className={getTableDataClassName()}>
				<span className="list-table__data__info">
					{displayGrayedOutMessageIfEmpty(
						formatDateMMddYYYY(props.item.creation_date),
						"None",
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)}
				</span>
			</td>
			<td className={getTableDataClassName()}>
				<span className="list-table__data__info">
					{displayGrayedOutMessageIfEmpty(
						formatDateMMddYYYY(props.item.start_date),
						"None",
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)}
				</span>
			</td>
			<td className={getTableDataClassName()}>
				<span className="list-table__data__info">
					{displayGrayedOutMessageIfEmpty(
						formatDateMMddYYYY(props.item.due_date),
						"None",
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)}
				</span>
			</td>
			<td className={getTableDataClassName()}>
				<span className="list-table__data__info">
					{props.reduxContainerName === PROJECT_CONTAINER
						? getNumberOfBugsForStatus(
								reduxState,
								props.item.id,
								reduxState[BUG_CONTAINER].priorityStatusOptions
									.statusCompletionId
						  ) +
						  " / " +
						  getBugsInProjectList(reduxState, props.item.id).length
						: [...reduxState[COMMENT_CONTAINER].list].filter(
								(item) => item.bug_id === props.item.id
						  ).length}
				</span>
			</td>
			{/*Used to fill the remaining space of the screen (if needed)*/}
			<td className={"list-table__data"}></td>
		</tr>
	);
}
