import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
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
	formatDateMMddYYYY,
	getAlternativeWhenValueIsEmpty,
	getCommonStatusBackgroundColorClassName,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
	getListViewTableItemRowComponentBorderAndTextColorClassNameForLightOrDarkMode,
	getListViewTableItemRowComponentHoverBackgroundColorClassNameForLightOrDarkMode,
	getListViewTableItemRowComponentSelectedBackgroundColorClassNameForLightOrDarkMode,
	getNumberOfBugsForStatus,
	getBugsInProjectList,
} from "../../../../utils";

// Components
import CustomCheckbox from "../../../basic/CustomCheckbox";

export default function ListViewTableItemRow(props) {
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
				listViewComponentShouldDisplay: false,
				itemViewComponentShouldDisplay: true,
				itemViewCurrentItem: props.item,
			})
		);

		// Resets bug components display when a different project is opened
		// ...to prevent erros with bug itemViewCurrentItem not belonging to project
		if (
			props.reduxContainerName === PROJECT_CONTAINER &&
			reduxState[props.reduxContainerName].componentsDisplay
				.itemViewCurrentItem !== null &&
			reduxState[props.reduxContainerName].componentsDisplay.itemViewCurrentItem
				.id !== props.item.id
		) {
			dispatch(setWhichBugComponentsDisplay({}));
		}
	};

	const getTableDataClassName = () => {
		return (
			"list-table__row__data list-table__row__data--overflow" +
			(props.item.status_id ===
			reduxState[props.reduxContainerName].priorityStatusOptions
				.statusCompletionId
				? " list-table__row__data--completed-color"
				: "")
		);
	};

	const getStatusBoxColorClassName = () => {
		const filteredStatusList = reduxState[
			props.reduxContainerName
		].priorityStatusOptions.statusList.filter(
			(status) => status.id === props.item.status_id
		);

		return getCommonStatusBackgroundColorClassName(
			filteredStatusList.length > 0 ? filteredStatusList[0].color : "problem"
		);
	};

	const getTableDataForCategory = (sort_id, key) => {
		switch (sort_id) {
			case 1:
				return (
					<td
						key={key}
						className={
							"list-table__row__data list-table__row__data--name-overflow" +
							(props.item.status_id ===
							reduxState[props.reduxContainerName].priorityStatusOptions
								.statusCompletionId
								? " list-table__row__data--completed-color"
								: getCommonTextColorClassNameForThemeWithLightOrDarkMode(
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
										reduxState[ACCOUNT_CONTAINER].settings.theme_color
								  ))
						}
					>
						<span className="list-table__row__data__info">
							{props.item.status_id !==
							reduxState[props.reduxContainerName].priorityStatusOptions
								.statusCompletionId ? null : (
								<i
									className="fa fa-check list-table__row__data__info__completed-icon"
									aria-hidden="true"
								/>
							)}
							{props.item.name}
						</span>
					</td>
				);
			case 2:
				return (
					<td key={key} className="list-table__row__data">
						<div className="list-table__row__data__centering-container">
							<div
								className={
									"list-table__row__data__centering-container__status-box" +
									getStatusBoxColorClassName()
								}
							>
								<span className="list-table__row__data__centering-container__status-box__centered-info">
									{props.item.status_option}
								</span>
							</div>
						</div>
					</td>
				);
			case 3:
				return (
					<td key={key} className={getTableDataClassName()}>
						<span className={"list-table__row__data__info"}>
							{props.item.priority_option}
						</span>
					</td>
				);
			case 4:
				return (
					<td key={key} className={getTableDataClassName()}>
						<span className="list-table__row__data__info">
							{getAlternativeWhenValueIsEmpty(
								formatDateMMddYYYY(props.item.creation_date),
								"-"
							)}
						</span>
					</td>
				);
			case 5:
				return (
					<td key={key} className={getTableDataClassName()}>
						<span className="list-table__row__data__info">
							{getAlternativeWhenValueIsEmpty(
								formatDateMMddYYYY(props.item.start_date),
								"-"
							)}
						</span>
					</td>
				);
			case 6:
				return (
					<td key={key} className={getTableDataClassName()}>
						<span className="list-table__row__data__info">
							{getAlternativeWhenValueIsEmpty(
								formatDateMMddYYYY(props.item.due_date),
								"-"
							)}
						</span>
					</td>
				);
			default:
				return <span key={key}>No matching sort_id</span>;
		}
	};

	return (
		<tr
			className={
				"list-view-table-item-row-component" +
				getListViewTableItemRowComponentBorderAndTextColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				) +
				// Hover is else case since rows should only have hover if not selected
				(reduxState[props.reduxContainerName].componentsDisplay
					.itemViewCurrentItem !== null &&
				reduxState[props.reduxContainerName].componentsDisplay
					.itemViewCurrentItem.id === props.item.id
					? getListViewTableItemRowComponentSelectedBackgroundColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					  )
					: getListViewTableItemRowComponentHoverBackgroundColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					  ))
			}
			onClick={openItemView}
		>
			<td
				className="list-table__row__data"
				onClick={dontPropogateParentOnclick}
				onDoubleClick={dontPropogateParentOnclick}
			>
				<div className="list-table__row__data__custom-checkbox-centered-container ">
					<CustomCheckbox
						name="item"
						value={props.item.id}
						onChangeFunction={onChangeMassDeleteCheckbox}
						isChecked={reduxState[
							props.reduxContainerName
						].massDeleteList.includes(props.item.id)}
						uniqueId={null}
						dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
						theme_color={reduxState[ACCOUNT_CONTAINER].settings.theme_color}
					/>
				</div>
			</td>
			{reduxState[GENERAL_CONTAINER].sortCategories.map(
				(categoryObject, idx) => {
					return getTableDataForCategory(categoryObject.sort_id, idx);
				}
			)}
			<td className={getTableDataClassName()}>
				<span className="list-table__row__data__info">
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
			<td className={"list-table__row__data"}></td>
		</tr>
	);
}
