import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	SIZE_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	getElementSize,
	switchToProjectsListView,
	switchToProjectsItemView,
	switchToBugsListView,
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
		<div className="navbar-breadcrumb-component">
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
					Projects
				</span>
			</div>
			{reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
			null ? null : (
				<div>
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
					</div>{" "}
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
							Bugs
						</span>
					</div>
					{reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem ===
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
									reduxState[BUG_CONTAINER].componentsDisplay
										.itemViewCurrentItem.name
								}
								onClick={() => switchToBugsItemView(reduxState, dispatch)}
							>
								{
									reduxState[BUG_CONTAINER].componentsDisplay
										.itemViewCurrentItem.name
								}
							</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
