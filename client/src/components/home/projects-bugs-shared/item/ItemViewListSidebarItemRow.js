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
	getItemViewListSidebarItemRowComponentBorderAndTextColorClassNameForLightOrDarkMode,
	getItemViewListSidebarItemRowComponentHoverBackgroundColorClassNameForLightOrDarkMode,
	getItemViewListSidebarItemRowComponentSelectedBackgroundColorClassNameForLightOrDarkMode,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
} from "../../../../utils";

export default function ItemViewListSidebarItemRow(props) {
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
			// ...to prevent errors with bug itemViewCurrentItem not belonging to project
			if (props.reduxContainerName === PROJECT_CONTAINER) {
				dispatch(setWhichBugComponentsDisplay({}));
			}
		}
	};

	const openListViewIfProject = () => {
		if (props.reduxContainerName === PROJECT_CONTAINER) {
			dispatch(
				setWhichProjectComponentsDisplay({
					itemViewCurrentItem: props.item,
				})
			);

			dispatch(
				setWhichBugComponentsDisplay({
					listViewComponentShouldDisplay: true,
					// If the project itemViewCurrentItem is not changing, then keep the bug itemViewCurrentItem the same
					itemViewCurrentItem:
						props.item.id ===
						reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem
							.id
							? reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem
							: null,
				})
			);

			// Resets bug components display when a different project is opened
			// ...to prevent erros with bug itemViewCurrentItem not belonging to project
			if (
				props.reduxContainerName === PROJECT_CONTAINER &&
				reduxState[props.reduxContainerName].componentsDisplay
					.itemViewCurrentItem !== null &&
				reduxState[props.reduxContainerName].componentsDisplay
					.itemViewCurrentItem.id !== props.item.id
			) {
				dispatch(setWhichBugComponentsDisplay({}));
			}
		}
	};

	return (
		<tr
			className={
				"item-view-list-sidebar-item-row-component" +
				getItemViewListSidebarItemRowComponentBorderAndTextColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				) +
				// Hover is else case since rows should only have hover if not selected
				(reduxState[props.reduxContainerName].componentsDisplay
					.itemViewCurrentItem !== null &&
				reduxState[props.reduxContainerName].componentsDisplay
					.itemViewCurrentItem.id === props.item.id
					? getItemViewListSidebarItemRowComponentSelectedBackgroundColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					  )
					: getItemViewListSidebarItemRowComponentHoverBackgroundColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					  ))
			}
			onClick={changeTargetItem}
			onDoubleClick={openListViewIfProject}
		>
			<td className="list-sidebar-container__table__row__data">
				<div
					className={
						"list-sidebar-container__table__row__data__overflow-container" +
						(props.item.status_id ===
						reduxState[props.reduxContainerName].priorityStatusOptions
							.statusCompletionId
							? " list-sidebar-container__table__row__data__overflow-container--completed-color"
							: getCommonTextColorClassNameForThemeWithLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
							  ))
					}
				>
					<span className="list-sidebar-container__table__row__data__overflow-container__info">
						{props.item.status_id !==
						reduxState[props.reduxContainerName].priorityStatusOptions
							.statusCompletionId ? null : (
							<i
								className="fa fa-check list-sidebar-container__table__row__data__overflow-container__info__completed-icon"
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
