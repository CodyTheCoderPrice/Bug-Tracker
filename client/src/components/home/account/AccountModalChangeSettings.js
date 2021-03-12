import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	clearBackendErrors,
	setWhichAccountComponentsDisplay,
	updateAccountSettings,
} from "../../../actions";

import {
	getAccountModalChangeSettingsCategoryContainerBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getTextColorClassNameForThemeWithLightOrDarkMode,
	getBaseFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getBackendErrorsTextColorClassNameForLightOrDarkMode,
} from "../../../utils";

// Components
import ToggleSwitch from "../../basic/ToggleSwitch";

export default function AccountModalChangeSettings() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// clears prior backend errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	const onChangeSettings = (e) => {
		dispatch(
			updateAccountSettings({
				...reduxState[ACCOUNT_CONTAINER].settings,
				[e.target.name]:
					e.target.tagName === "SELECT" ? e.target.value : e.target.checked,
			})
		);
	};

	const backToAccountSidebar = () => {
		dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
	};

	const getSortSelectOptions = () => {
		return reduxState[ACCOUNT_CONTAINER].settingSortCategories.map(
			(obj, idx) => {
				return (
					<option key={idx} value={obj.sort_id}>
						{obj.category + (obj.marks_default ? " (default)" : "")}
					</option>
				);
			}
		);
	};

	return (
		<div>
			<h1 className="title">Account Settings</h1>
			<div
				className={
					"category-container" +
					getAccountModalChangeSettingsCategoryContainerBorderBackgroundTextColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				<h2
					className={
						"category-container__heading" +
						getTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				>
					<i
						className="fa fa-filter"
						aria-hidden="true"
						alt="Icon of a filter"
					/>{" "}
					Filter
				</h2>
				<div className="category-container__content-container category-container__content-container--smaller-top-margin">
					<label className="category-container__content-container__label">
						Filter out completed projects
					</label>
					<div className="category-container__content-container__toggle-switch-container">
						<ToggleSwitch
							name="filter_completed_projects_by_default"
							onChangeFunction={onChangeSettings}
							isOn={
								reduxState[ACCOUNT_CONTAINER].settings
									.filter_completed_projects_by_default
							}
							id="account-settings-filter-completed-projects"
							dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
							theme_color={reduxState[ACCOUNT_CONTAINER].settings.theme_color}
						/>
					</div>
				</div>
				<div className="category-container__content-container">
					<label className="category-container__content-container__label">
						Filter out completed bugs
					</label>
					<div className="category-container__content-container__toggle-switch-container">
						<ToggleSwitch
							name="filter_completed_bugs_by_default"
							onChangeFunction={onChangeSettings}
							isOn={
								reduxState[ACCOUNT_CONTAINER].settings
									.filter_completed_bugs_by_default
							}
							id="account-settings-filter-completed-bugs"
							dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
							theme_color={reduxState[ACCOUNT_CONTAINER].settings.theme_color}
						/>
					</div>
				</div>
			</div>

			<div
				className={
					"category-container" +
					getAccountModalChangeSettingsCategoryContainerBorderBackgroundTextColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				<h2
					className={
						"category-container__heading" +
						getTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				>
					<i
						className="fa fa fa-sort"
						aria-hidden="true"
						alt="Icon of a filter"
					/>{" "}
					Sort
				</h2>
				<div className="category-container__content-container category-container__content-container--smaller-top-margin">
					<label className="category-container__content-container__label">
						Sort projects by
					</label>
					<select
						name="project_sort_id"
						value={reduxState[ACCOUNT_CONTAINER].settings.project_sort_id}
						onChange={(e) => onChangeSettings(e)}
						id="account-settings-sort-projects-category"
						className={
							"category-container__content-container__sort-select" +
							getBaseFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
								reduxState[ACCOUNT_CONTAINER].settings.theme_color
							)
						}
					>
						{getSortSelectOptions()}
					</select>
					<div className="sort-ascending-float-right-container">
						<label className="category-container__content-container__label">
							Sort ascending
						</label>
						<div className="category-container__content-container__toggle-switch-container">
							<ToggleSwitch
								name="project_sort_ascending"
								onChangeFunction={onChangeSettings}
								isOn={
									reduxState[ACCOUNT_CONTAINER].settings.project_sort_ascending
								}
								id="account-settings-sort-projects-ascending"
								dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
								theme_color={reduxState[ACCOUNT_CONTAINER].settings.theme_color}
							/>
						</div>
					</div>
				</div>
				<div className="category-container__content-container">
					<label className="category-container__content-container__label category-container__content-container__label-sort-bug-margin-right">
						Sort bugs by
					</label>
					<select
						name="bug_sort_id"
						value={reduxState[ACCOUNT_CONTAINER].settings.bug_sort_id}
						onChange={(e) => onChangeSettings(e)}
						id="account-settings-sort-bugs-category"
						className={
							"category-container__content-container__sort-select" +
							getBaseFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
								reduxState[ACCOUNT_CONTAINER].settings.theme_color
							)
						}
					>
						{getSortSelectOptions()}
					</select>
					<div className="sort-ascending-float-right-container">
						<label className="category-container__content-container__label">
							Sort ascending
						</label>
						<div className="category-container__content-container__toggle-switch-container">
							<ToggleSwitch
								name="bug_sort_ascending"
								onChangeFunction={onChangeSettings}
								isOn={reduxState[ACCOUNT_CONTAINER].settings.bug_sort_ascending}
								id="account-settings-sort-bugs-ascending"
								dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
								theme_color={reduxState[ACCOUNT_CONTAINER].settings.theme_color}
							/>
						</div>
					</div>
				</div>
			</div>
			<span
				className={
					"backend-errors" +
					getBackendErrorsTextColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				{reduxState[GENERAL_CONTAINER].backendErrors.authorization}
				{reduxState[GENERAL_CONTAINER].backendErrors.serverSettings}
				{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
			</span>
			<div className="modal-links-container">
				<span
					onClick={backToAccountSidebar}
					className={
						"modal-link" +
						getTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				>
					Close
				</span>
			</div>
		</div>
	);
}
