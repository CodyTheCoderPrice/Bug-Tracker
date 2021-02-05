import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	clearBackendErrors,
	setWhichGeneralDropdownsDisplay,
	updateAccountSettings,
} from "../../../actions";

// Components
import ToggleSwitch from "../../basic/toggleSwitch";

export default function AccountSidebarChangeTheme() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [highlightedOptionThemeId, setHighlightedOptionThemeId] = useState(
		reduxState[ACCOUNT_CONTAINER].settings.theme_id
	);

	// clears prior backend errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	const toggleThemeDropdown = (e) => {
		e.stopPropagation();

		if (
			!reduxState[GENERAL_CONTAINER].dropdownsDisplay
				.accountModalChangeSettingsThemeDropdown
		) {
			setHighlightedOptionThemeId(
				reduxState[ACCOUNT_CONTAINER].settings.theme_id
			);
		}

		dispatch(
			setWhichGeneralDropdownsDisplay({
				accountModalChangeSettingsThemeDropdown: !reduxState[GENERAL_CONTAINER]
					.dropdownsDisplay.accountModalChangeSettingsThemeDropdown,
			})
		);
	};

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

		dispatch(
			setWhichGeneralDropdownsDisplay({
				accountModalChangeSettingsThemeDropdown: !reduxState[GENERAL_CONTAINER]
					.dropdownsDisplay.accountModalChangeSettingsThemeDropdown,
			})
		);
	};

	const onChangeDarkMode = () => {
		dispatch(
			updateAccountSettings({
				...reduxState[ACCOUNT_CONTAINER].settings,
				dark_mode: !reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
			})
		);
	};

	const getThemeColorOption = (
		theme_id,
		onClickFunction,
		onMouseEnterFunction
	) => {
		const theme = reduxState[ACCOUNT_CONTAINER].settingThemes.filter((theme) =>
			theme_id !== null
				? theme.theme_id === theme_id
				: theme.marks_default === true
		)[0];

		return (
			<div
				className={
					"content-container__theme-button__option" +
					(onClickFunction !== null
						? " content-container__theme-button__option--larger" +
						  (highlightedOptionThemeId === theme_id
								? " content-container__theme-button__option--selected"
								: "")
						: "")
				}
				onClick={onClickFunction !== null ? onClickFunction : null}
				onMouseEnter={
					onMouseEnterFunction !== null ? onMouseEnterFunction : null
				}
			>
				<div className="content-container__theme-button__option__centering-container">
					<span
						className={
							"content-container__theme-button__option__centering-container__circle" +
							" js-set-dark-background-color-theme-" +
							theme.color.toLowerCase()
						}
					/>
				</div>
				<div className="content-container__theme-button__option__centering-container">
					<span className="content-container__theme-button__option__centering-container__text">
						{theme.color}
					</span>
				</div>
			</div>
		);
	};

	return (
		<div className="account-sidebar-change-theme-component">
			<div className="content-container">
				<label className="content-container__label">
					Dark mode
				</label>
				<ToggleSwitch
					on={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
					onChangeFunction={onChangeDarkMode}
					special={"dark-mode"}
				/>
			</div>
			<div className="content-container content-container--right">
				<label className="content-container__label">
					Theme
				</label>
				<div
					className="content-container__theme-button"
					onClick={(e) => toggleThemeDropdown(e)}
				>
					<div
						className={
							"content-container__theme-button__selected-container" +
							(reduxState[GENERAL_CONTAINER].dropdownsDisplay
								.accountModalChangeSettingsThemeDropdown
								? " content-container__theme-button__selected-container--dropdown-present"
								: "")
						}
					>
						{getThemeColorOption(
							reduxState[ACCOUNT_CONTAINER].settings.theme_id,
							null,
							null
						)}
					</div>
					<div
						className={
							"content-container__theme-button__arrow-container" +
							(reduxState[GENERAL_CONTAINER].dropdownsDisplay
								.accountModalChangeSettingsThemeDropdown
								? " content-container__theme-button__arrow-container--dropdown-present"
								: "")
						}
					>
						<i
							className={
								"fa content-container__theme-button__arrow-container__icon" +
								(reduxState[GENERAL_CONTAINER].dropdownsDisplay
									.accountModalChangeSettingsThemeDropdown
									? " fa-caret-up"
									: " fa-caret-down")
							}
							aria-hidden="true"
						/>
					</div>
					{reduxState[GENERAL_CONTAINER].dropdownsDisplay
						.accountModalChangeSettingsThemeDropdown === false ? null : (
						<div
							className="content-container__theme-button__dropdown-container"
							onClick={
								/*Keeps clicking dropdown from closing itself*/
								(e) => {
									e.stopPropagation();
								}
							}
						>
							{reduxState[ACCOUNT_CONTAINER].settingThemes.map((theme, i) => {
								return (
									<span key={i}>
										{getThemeColorOption(
											theme.theme_id,
											(e) => onChangeTheme(e, theme.theme_id),
											() => setHighlightedOptionThemeId(theme.theme_id)
										)}
									</span>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
