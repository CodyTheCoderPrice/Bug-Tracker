import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";
import { updateAccountSettings } from "../../../actions";
import {
	getStandardBackgroundColorClassNameForTheme,
	getCommonBackendErrorsTextColorClassNameForLightOrDarkMode,
} from "../../../utils";
// Other components used by this component
import ToggleSwitch from "../../basic/ToggleSwitch";

/**
 * React functional component for displaying buttons used for changing the 
 * logged in account's settings for theme, as well as a toggle switch for 
 * chaning the settings for light/dark mode. 
 *
 * This component should be used inside the AccountSidebar component. 
 *
 * @component
 */
export default function AccountSidebarEditAppearance() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	/**
	 * Function for onClick handler of div elements with
	 * 'content-container__theme-option' className. Calls
	 * updateAccountSettings action to attempt to update the account setting's
	 * 'theme_id' property to be that of this function's theme_id param
	 *
	 * @param {Event} e - Event created by element's onClick handler
	 * @param {Number} theme_id - id for a theme in 'themes' Object in 
	 * GENERAL_CONTAINER of the redux state
	 */
	const onClickUpdateTheme = (e, theme_id) => {
		e.stopPropagation();
		if (theme_id !== reduxState[ACCOUNT_CONTAINER].settings.theme_id) {
			dispatch(
				updateAccountSettings({
					...reduxState[ACCOUNT_CONTAINER].settings,
					theme_id: theme_id,
				})
			);
		}
	};

	/**
	 * Function for onChangeFunction param of ToggleSwitch component for
	 * changing light/dark mode. Calls updateAccountSettings action to attempt
	 * to toggle the account setting's 'theme_id' property
	 *
	 * @param {Event} e - Event created by element's onChange handler
	 */
	const onChangeDarkMode = (e) => {
		dispatch(
			updateAccountSettings({
				...reduxState[ACCOUNT_CONTAINER].settings,
				dark_mode: e.target.checked,
			})
		);
	};

	/**
	 * Returns a div element of a clickable button used to change the app's
	 * theme to the one that relates to this function's theme_id param
	 *
	 * @param {Number} theme_id - id for a theme in 'themes' Object in
	 * GENERAL_CONTAINER of the redux state
	 * @returns {JSX} div element of a clickable button used to change the
	 * app's theme to the one that relates to this function's theme_id param
	 */
	const getThemeOption = (theme_id) => {
		const theme = reduxState[GENERAL_CONTAINER].themes.filter(
			(theme) => theme.theme_id === theme_id
		)[0];
		return (
			<div
				className={
					"content-container__theme-option" +
					getStandardBackgroundColorClassNameForTheme(theme.color)
				}
				alt={"Button to change the site's color theme to " + theme.color}
				onClick={(e) => onClickUpdateTheme(e, theme_id)}
			>
				{reduxState[ACCOUNT_CONTAINER].settings.theme_id === theme_id ? (
					<i
						className="fa fa-check checkmark content-container__theme-option__selected-checkmark"
						aria-hidden="true"
					/>
				) : null}
			</div>
		);
	};

	return (
		<div className="account-sidebar-change-theme-component">
			<div className="content-container">
				<label className="content-container__label">Theme</label>
				{reduxState[GENERAL_CONTAINER].themes.map((theme, i) => {
					return <span key={i}>{getThemeOption(theme.theme_id)}</span>;
				})}
			</div>
			<div className="content-container content-container--right">
				<label className="content-container__label">Dark mode</label>
				<div className="content-container__toggle-switch-centering-container">
					<ToggleSwitch
						name="light-dark-mode"
						onChangeFunction={onChangeDarkMode}
						isOn={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
						uniqueId="account-settings-light-dark-mode"
						alt="Toggle switch to change between light and dark mode"
						dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
						theme_color={reduxState[ACCOUNT_CONTAINER].settings.theme_color}
					/>
				</div>
			</div>
			<span
				className={
					"backend-errors" +
					getCommonBackendErrorsTextColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				{reduxState[GENERAL_CONTAINER].backendErrors.authorization}
				{reduxState[GENERAL_CONTAINER].backendErrors.serverSettings}
				{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
			</span>
		</div>
	);
}
