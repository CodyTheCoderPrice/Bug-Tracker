import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	clearBackendErrors,
	updateAccountSettings,
	setWhichAccountComponentsDisplay,
} from "../../../actions";

import {
	getCurrentContainerName,
	getProjectOrBugTextColorClassName,
} from "../../../utils";

// Components
import AccountModalChangeSettingsToggleSwitch from "./AccountModalChangeSettingsToggleSwitch";

export default function AccountModalChangeSettings() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [showThemetDropdown, setShowThemetDropdown] = useState(false);

	// clears prior backend errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	const onChangeTheme = (e, theme_id) => {
		e.stopPropagation();

		if (theme_id !== reduxState[ACCOUNT_CONTAINER].settings.theme_id) {
			dispatch(
				updateAccountSettings({
					...reduxState[ACCOUNT_CONTAINER].settings,
					theme_id: theme_id,
				})
			);
		}

		setShowThemetDropdown(false);
	};

	const onChangeDarkMode = () => {
		dispatch(
			updateAccountSettings({
				...reduxState[ACCOUNT_CONTAINER].settings,
				dark_mode: !reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
			})
		);
	};

	const onChangeFilterCompletedProjects = () => {
		dispatch(
			updateAccountSettings({
				...reduxState[ACCOUNT_CONTAINER].settings,
				filter_completed_projects: !reduxState[ACCOUNT_CONTAINER].settings
					.filter_completed_projects,
			})
		);
	};

	const onChangeFilterCompletedBugs = () => {
		dispatch(
			updateAccountSettings({
				...reduxState[ACCOUNT_CONTAINER].settings,
				filter_completed_bugs: !reduxState[ACCOUNT_CONTAINER].settings
					.filter_completed_bugs,
			})
		);
	};

	const getThemeColorOption = (theme_id, onClickFunction) => {
		const theme = reduxState[ACCOUNT_CONTAINER].settingThemes.filter((theme) =>
			theme_id !== null
				? theme.theme_id === theme_id
				: theme.marks_default === true
		)[0];

		return (
			<div
				className={
					"category-container__border-container__content-container__theme-button__option" +
					(onClickFunction !== null
						? " category-container__border-container__content-container__theme-button__option--larger" +
						  (reduxState[ACCOUNT_CONTAINER].settings.theme_id === theme_id
								? " category-container__border-container__content-container__theme-button__option--selected"
								: "")
						: "")
				}
				onClick={onClickFunction !== null ? onClickFunction : null}
			>
				<div className="category-container__border-container__content-container__theme-button__option__centering-container">
					<span
						className={
							"category-container__border-container__content-container__theme-button__option__centering-container__circle" +
							" js-set-dark-background-color-theme-" +
							theme.color.toLowerCase()
						}
					/>
				</div>
				<div className="category-container__border-container__content-container__theme-button__option__centering-container">
					<span className="category-container__border-container__content-container__theme-button__option__centering-container__text">
						{theme.color}
					</span>
				</div>
			</div>
		);
	};

	const backToAccountSidebar = () => {
		dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
	};

	return (
		<div>
			<h1 className="title">Account Settings</h1>
			<div className="category-container">
				<h2
					className={
						"category-container__heading" +
						getProjectOrBugTextColorClassName(
							getCurrentContainerName(reduxState)
						)
					}
				>
					Appearance
				</h2>
				<div className="category-container__border-container category-container__border-container__content-container--smaller-top-margin">
					<div className="category-container__border-container__content-container">
						<label className="category-container__border-container__content-container__label">
							Color Theme
						</label>
						<div
							className="category-container__border-container__content-container__theme-button"
							onClick={() => setShowThemetDropdown(!showThemetDropdown)}
						>
							<div className="category-container__border-container__content-container__theme-button__selected-container">
								{getThemeColorOption(
									reduxState[ACCOUNT_CONTAINER].settings.theme_id,
									null,
									null
								)}
							</div>
							<div className="category-container__border-container__content-container__theme-button__arrow-container">
								<i
									className="fa fa-caret-down category-container__border-container__content-container__theme-button__arrow-container__icon"
									aria-hidden="true"
								/>
							</div>
							{showThemetDropdown === false ? null : (
								<div className="category-container__border-container__content-container__theme-button__options-container">
									{reduxState[ACCOUNT_CONTAINER].settingThemes.map(
										(theme, i) => {
											return (
												<span key={i}>
													{getThemeColorOption(theme.theme_id, (e) =>
														onChangeTheme(e, theme.theme_id)
													)}
												</span>
											);
										}
									)}
								</div>
							)}
						</div>
					</div>
					<div className="category-container__border-container__content-container">
						<label className="category-container__border-container__content-container__label">
							Dark mode
						</label>
						<AccountModalChangeSettingsToggleSwitch
							on={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
							onChangeFunction={onChangeDarkMode}
						/>
					</div>
				</div>
			</div>
			<div className="category-container category-container--larger-top-margin">
				<h2
					className={
						"category-container__heading" +
						getProjectOrBugTextColorClassName(
							getCurrentContainerName(reduxState)
						)
					}
				>
					Filter
				</h2>
				<div className="category-container__border-container">
					<div className="category-container__border-container__content-container category-container__border-container__content-container--smaller-top-margin">
						<label className="category-container__border-container__content-container__label">
							Filter out completed projects
						</label>
						<AccountModalChangeSettingsToggleSwitch
							on={
								reduxState[ACCOUNT_CONTAINER].settings.filter_completed_projects
							}
							onChangeFunction={onChangeFilterCompletedProjects}
						/>
					</div>
					<div className="category-container__border-container__content-container">
						<label className="category-container__border-container__content-container__label">
							Filter out completed bugs
						</label>
						<AccountModalChangeSettingsToggleSwitch
							on={reduxState[ACCOUNT_CONTAINER].settings.filter_completed_bugs}
							onChangeFunction={onChangeFilterCompletedBugs}
						/>
					</div>
				</div>
			</div>
			<span className="form__errors">
				{reduxState[GENERAL_CONTAINER].backendErrors.authorization}
				{reduxState[GENERAL_CONTAINER].backendErrors.serverSettings}
				{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
			</span>
			<div className="modal-links-container">
				<span
					onClick={backToAccountSidebar}
					className={
						"modal-link" +
						getProjectOrBugTextColorClassName(
							getCurrentContainerName(reduxState)
						)
					}
				>
					close
				</span>
			</div>
		</div>
	);
}
