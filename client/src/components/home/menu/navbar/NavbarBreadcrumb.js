import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
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
			<div className="breadcrumb-button">
				<span
					className={
						"breadcrumb-button__text" +
						(!reduxState[PROJECT_CONTAINER].componentsDisplay
							.listViewComponentShouldDisplay
							? ""
							: " breadcrumb-button__text--active")
					}
					aria-label="Projects"
					onClick={() => switchToProjectsListView(reduxState, dispatch)}
				>
					{getProjectsText()}
				</span>
			</div>
			{reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
			null ? null : (
				<div className="breadcrumb-button">
					{getDividerIcon()}
					<span
						className={
							"breadcrumb-button__text" +
							(!reduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewComponentShouldDisplay
								? ""
								: " breadcrumb-button__text--active")
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
				<div className="breadcrumb-button">
					{getDividerIcon()}
					<span
						className={
							"breadcrumb-button__text" +
							(!reduxState[BUG_CONTAINER].componentsDisplay
								.listViewComponentShouldDisplay
								? ""
								: " breadcrumb-button__text--active")
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
				<div className="breadcrumb-button">
					{getDividerIcon()}
					<span
						className={
							"breadcrumb-button__text" +
							(!reduxState[BUG_CONTAINER].componentsDisplay
								.itemViewComponentShouldDisplay
								? ""
								: " breadcrumb-button__text--active")
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
