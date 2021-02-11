import React from "react";
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

import {
	getListRowBorderColorClassNameForLightOrDarkMode,
	getListRowHoverBackgroundColorClassNameForLightOrDarkMode,
	getListRowSelectedBackgroundColorClassNameForLightOrDarkMode,
	getTextColorClassNameForTheme,
} from "../../../../utils";

export default function ItemViewListSidebarRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const changeTargetItem = () => {
		if (
			reduxState[props.reduxContainerName].componentsDisplay.targetItem ===
				null ||
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.id !==
				props.item.id
		) {
			dispatch(
				setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
					listView: false,
					itemView: true,
					targetItem: props.item,
				})
			);

			// Resets bug components display when a different project is opened
			// ...to prevent erros with bug targetItem not belonging to project
			if (props.reduxContainerName === PROJECT_CONTAINER) {
				dispatch(setWhichBugComponentsDisplay({}));
			}
		}
	};

	const openListViewIfProject = () => {
		if (props.reduxContainerName === PROJECT_CONTAINER) {
			dispatch(
				setWhichProjectComponentsDisplay({
					targetItem: props.item,
				})
			);

			dispatch(
				setWhichBugComponentsDisplay({
					listView: true,
					// If the project targetItem is not changing, then keep the bug targetItem the same
					targetItem:
						props.item.id ===
						reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.id
							? reduxState[BUG_CONTAINER].componentsDisplay.targetItem
							: null,
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
		}
	};

	return (
		<tr
			className={
				"list-sidebar__table__row" +
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
			onClick={changeTargetItem}
			onDoubleClick={openListViewIfProject}
		>
			<td className="list-sidebar__table__data">
				<div
					className={
						"list-sidebar__table__data__overflow-container" +
						(props.item.status_id ===
						reduxState[props.reduxContainerName].priorityStatusOptions
							.statusCompletionId
							? " list-sidebar__table__data__overflow-container--completed-color"
							: getTextColorClassNameForTheme(
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
							  ))
					}
				>
					<span className="list-sidebar__table__data__overflow-container__info">
						{props.item.status_id !==
						reduxState[props.reduxContainerName].priorityStatusOptions
							.statusCompletionId ? null : (
							<i
								className="fa fa-check list-sidebar__table__data__overflow-container__info__completed-icon"
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
