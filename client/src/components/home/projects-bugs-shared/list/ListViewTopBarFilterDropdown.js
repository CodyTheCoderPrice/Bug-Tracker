import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACCOUNT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	setProjectOrBugSearchFilterSort,
} from "../../../../actions";

import {
	getUpdatedFilterArray,
	getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
} from "../../../../utils";

// Other components used by this component
import CustomCheckbox from "../../../basic/CustomCheckbox";

export default function ListViewTopBarFilterDropdown(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const onChangeFilter = (e) => {
		dispatch(
			setProjectOrBugSearchFilterSort(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].searchFilterSort,
				[e.target.name]: getUpdatedFilterArray(
					reduxState,
					props.reduxContainerName,
					e.target.name,
					e.target.value
				),
			})
		);
	};

	return (
		<div
			className={
				"filter-dropdown-component" +
				getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				) +
				(props.reduxContainerName === BUG_CONTAINER
					? " filter-dropdown-component--shorter"
					: "")
			}
			onClick={
				// keeps clicking dropdown from closing itself
				(e) => {
					e.stopPropagation();
				}
			}
		>
			<div className="filter-dropdown-component__content">
				<span className="filter-dropdown-component__content__title">
					Priority
				</span>
				{reduxState[
					props.reduxContainerName
				].priorityStatusOptions.priorityList.map((obj, i) => {
					return (
						<div
							key={i}
							className="filter-dropdown-component__content__block"
						>
							<div className="filter-dropdown-component__content__block__checkbox-container">
								<CustomCheckbox
									name="priorityFilter"
									value={obj.id}
									onChangeFunction={onChangeFilter}
									isChecked={
										!reduxState[
											props.reduxContainerName
										].searchFilterSort.priorityFilter.includes(obj.id)
									}
									uniqueId={"list-priority-filter-" + obj.id}
									dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
									theme_color={
										reduxState[ACCOUNT_CONTAINER].settings.theme_color
									}
								/>
							</div>
							<label
								htmlFor={"list-priority-filter-" + obj.id}
								className={
									"filter-dropdown-component__content__block__label" +
									(reduxState[
										props.reduxContainerName
									].searchFilterSort.priorityFilter.includes(obj.id)
										? " filter-dropdown-component__content__block__label--active" +
										  getCommonTextColorClassNameForThemeWithLightOrDarkMode(
												reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
												reduxState[ACCOUNT_CONTAINER].settings.theme_color
										  )
										: "")
								}
							>
								{obj.option !== "" ? obj.option : "Not Assigned"}
							</label>
						</div>
					);
				})}
			</div>
			<div className="filter-dropdown-component__content filter-dropdown-component__content--right">
				<span className="filter-dropdown-component__content__title">
					Status
				</span>
				{reduxState[
					props.reduxContainerName
				].priorityStatusOptions.statusList.map((obj, i) => {
					return (
						<div
							key={i}
							className="filter-dropdown-component__content__block"
						>
							<div className="filter-dropdown-component__content__block__checkbox-container">
								<CustomCheckbox
									name="statusFilter"
									value={obj.id}
									onChangeFunction={onChangeFilter}
									isChecked={
										!reduxState[
											props.reduxContainerName
										].searchFilterSort.statusFilter.includes(obj.id)
									}
									uniqueId={"list-status-filter-" + obj.id}
									dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
									theme_color={
										reduxState[ACCOUNT_CONTAINER].settings.theme_color
									}
								/>
							</div>
							<label
								htmlFor={"list-status-filter-" + obj.id}
								className={
									"filter-dropdown-component__content__block__label" +
									(reduxState[
										props.reduxContainerName
									].searchFilterSort.statusFilter.includes(obj.id)
										? " filter-dropdown-component__content__block__label--active" +
										  getCommonTextColorClassNameForThemeWithLightOrDarkMode(
												reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
												reduxState[ACCOUNT_CONTAINER].settings.theme_color
										  )
										: "")
								}
							>
								{obj.option !== "" ? obj.option : "Not Assigned"}
							</label>
						</div>
					);
				})}
			</div>
		</div>
	);
}
