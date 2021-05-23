import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";
import {
	clearBackendErrors,
	updateAccountSettings,
} from "../../../actions";
import {
	getAccountModalEditSettingsCategoryContainerBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getTextColorClassNameForThemeWithLightOrDarkMode,
	getBaseFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getBackendErrorsTextColorClassNameForLightOrDarkMode,
	openOnlyAccountSidebar,
} from "../../../utils";
// Other components used by this component
import ToggleSwitch from "../../basic/ToggleSwitch";

/**
 * React functional component for updating the logged in account's settings by 
 * selecting how they want projects/bugs to be filtered/sorted. Server issues 
 * will display error messages to explain what went wrong. Component includes 
 * link to return back to AccountSidebar component (as user would have used 
 * that component to navigate to this one).
 *
 * The flag for displaying this component is 'accountModalEditSettings' 
 * property of 'componentsDisplay' Object in ACCOUNT_CONTAINER of the redux 
 * state. This component should be the child of the AccountModal component. 
 * This component should not be displayed along side any sibling components 
 * whose name also begins with AccountModal (e.g. AccountModalEditInfo).
 *
 * @component
 */
export default function AccountModalEditSettings() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Clears current backend errors when closing the component. Otherwise the
	// ...backend errors may presist and appear when component is re-openned.
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	/**
	 * Function for onChange handler of input elements. Calls 
	 * updateAccountSettings action to attempt to update the account setting's
	 * property (that of input element's name attribute) to have the value 
	 * selected through the input element.
	 *
	 * @param {Event} e - Event created by element's onChange handler
	 */
	const onChangeSettings = (e) => {
		dispatch(
			updateAccountSettings({
				...reduxState[ACCOUNT_CONTAINER].settings,
				[e.target.name]:
					e.target.tagName === "SELECT" ? e.target.value : e.target.checked,
			})
		);
	};

	/**
	 * To be called inside of select elements for sorting -- this function 
	 * populates them by returning an option element for each category in
	 * 'settingSortCategories' Object of ACCOUNT_CONTAINER of the redux state
	 * 
	 * @returns {JSX} returns an option element for each category in
	 * 'settingSortCategories' Object of ACCOUNT_CONTAINER of the redux state
	 */
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
					getAccountModalEditSettingsCategoryContainerBorderBackgroundTextColorClassNameForLightOrDarkMode(
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
							uniqueId="account-settings-filter-completed-projects"
							alt="Toggle switch to change between whether or not to filter out completed projects"
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
							uniqueId="account-settings-filter-completed-bugs"
							alt="Toggle switch to change between whether or not to filter out completed bugs"
							dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
							theme_color={reduxState[ACCOUNT_CONTAINER].settings.theme_color}
						/>
					</div>
				</div>
			</div>

			<div
				className={
					"category-container" +
					getAccountModalEditSettingsCategoryContainerBorderBackgroundTextColorClassNameForLightOrDarkMode(
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
						onChange={onChangeSettings}
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
								uniqueId="account-settings-sort-projects-ascending"
								alt="Toggle switch to change between sorting projects by acending or descending"
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
						onChange={onChangeSettings}
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
								uniqueId="account-settings-sort-bugs-ascending"
								alt="Toggle switch to change between sorting bugs by acending or descending"
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
					onClick={() => openOnlyAccountSidebar(dispatch)}
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
