import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	getNavbarBreadcrumbComponentButtonElementTextColorClassNameForLightOrDarkMode,
	getNavbarBreadcrumbComponentButtonTitleElementOpenedTextColorClassNameForLightOrDarkMode,
	switchToProjectsListView,
	getProjectsText,
	switchToProjectsItemView,
	switchToBugsListView,
	getBugsText,
	switchToBugsItemView,
} from "../../../../utils";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function NavbarBreadcrumb(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const getDividerIcon = () => {
		return (
			<FontAwesomeIcon
				icon={faChevronRight}
				size="xs"
				className="breadcrumb-button__icon"
			/>
		);
	};

	return (
		<div
			className={
				"navbar-breadcrumb-component js-navbar-breadcrumb" +
				(props.visible ? " " : " breadcrumb--invisible")
			}
		>
			<div
				className={
					"breadcrumb-button" +
					getNavbarBreadcrumbComponentButtonElementTextColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				<span
					className={
						"breadcrumb-button__title" +
						(!reduxState[PROJECT_CONTAINER].componentsDisplay
							.listViewComponentShouldDisplay
							? ""
							: " breadcrumb-button__title--opened" +
							  getNavbarBreadcrumbComponentButtonTitleElementOpenedTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							  ))
					}
					aria-label="Projects"
					onClick={() => switchToProjectsListView(reduxState, dispatch)}
				>
					{getProjectsText()}
				</span>
			</div>
			{reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
			null ? null : (
				<div
					className={
						"breadcrumb-button" +
						getNavbarBreadcrumbComponentButtonElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				>
					{getDividerIcon()}
					<span
						className={
							"breadcrumb-button__title" +
							(!reduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewComponentShouldDisplay
								? ""
								: " breadcrumb-button__title--opened" +
								  getNavbarBreadcrumbComponentButtonTitleElementOpenedTextColorClassNameForLightOrDarkMode(
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								  ))
						}
						aria-label={
							reduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewCurrentItem.name
						}
						onClick={() => switchToProjectsItemView(reduxState, dispatch)}
					>
						{
							reduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewCurrentItem.name
						}
					</span>
				</div>
			)}
			{reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
			null ? null : (
				<div
					className={
						"breadcrumb-button" +
						getNavbarBreadcrumbComponentButtonElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				>
					{getDividerIcon()}
					<span
						className={
							"breadcrumb-button__title" +
							(!reduxState[BUG_CONTAINER].componentsDisplay
								.listViewComponentShouldDisplay
								? ""
								: " breadcrumb-button__title--opened" +
								  getNavbarBreadcrumbComponentButtonTitleElementOpenedTextColorClassNameForLightOrDarkMode(
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								  ))
						}
						aria-label="Bugs"
						onClick={() => switchToBugsListView(reduxState, dispatch)}
					>
						{getBugsText()}
					</span>
				</div>
			)}
			{reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
				null ||
			reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem ===
				null ? null : (
				<div
					className={
						"breadcrumb-button" +
						getNavbarBreadcrumbComponentButtonElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				>
					{getDividerIcon()}
					<span
						className={
							"breadcrumb-button__title" +
							(!reduxState[BUG_CONTAINER].componentsDisplay
								.itemViewComponentShouldDisplay
								? ""
								: " breadcrumb-button__title--opened" +
								  getNavbarBreadcrumbComponentButtonTitleElementOpenedTextColorClassNameForLightOrDarkMode(
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								  ))
						}
						aria-label={
							reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem
								.name
						}
						onClick={() => switchToBugsItemView(reduxState, dispatch)}
					>
						{
							reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem
								.name
						}
					</span>
				</div>
			)}
		</div>
	);
}
