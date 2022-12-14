import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";
import {
	getCommonBrighterBackgroundColorClassNameForTheme,
	switchToProjectsListView,
	switchToBugsListView,
	getSearchedFilteredSortedList,
} from "../../../../utils";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSuitcase,
	faBug,
} from "@fortawesome/free-solid-svg-icons";
// Components
import NavPanelButtonListSubItem from "./NavPanelButtonListSubItem";

export default function NavPanelButtonList() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<div className="nav-panel-button-list-component">
			<div
				className={
					"item" +
					(reduxState[PROJECT_CONTAINER].componentsDisplay
						.listViewComponentShouldDisplay === false
						? ""
						: " item--selected" +
						  getCommonBrighterBackgroundColorClassNameForTheme(
								reduxState[ACCOUNT_CONTAINER].settings.theme_color
						  ))
				}
				onClick={() => switchToProjectsListView(reduxState, dispatch)}
			>
				<FontAwesomeIcon
					icon={faSuitcase}
					className="item__icon"
					aria-hidden="true"
				/>
				Projects
			</div>
			{reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
			null ? null : (
				<div>
					<NavPanelButtonListSubItem
						item={
							reduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewCurrentItem
						}
						reduxContainerName={PROJECT_CONTAINER}
					/>
					<div
						className={
							"item" +
							(reduxState[BUG_CONTAINER].componentsDisplay
								.listViewComponentShouldDisplay === false
								? ""
								: " item--selected" +
								  getCommonBrighterBackgroundColorClassNameForTheme(
										reduxState[ACCOUNT_CONTAINER].settings.theme_color
								  ))
						}
						onClick={() => switchToBugsListView(reduxState, dispatch)}
					>
						<span>
							<FontAwesomeIcon
								icon={faBug}
								className="item__icon"
								aria-hidden="true"
							/>
							Bugs
						</span>
					</div>
					{getSearchedFilteredSortedList(reduxState, BUG_CONTAINER).map(
						(item, idx) => {
							return (
								<NavPanelButtonListSubItem
									key={idx}
									item={item}
									reduxContainerName={BUG_CONTAINER}
								/>
							);
						}
					)}
				</div>
			)}
		</div>
	);
}
