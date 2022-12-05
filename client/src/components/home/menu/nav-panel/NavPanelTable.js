import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
} from "../../../../actions/constants/containerNames";
import {
	getCommonBrighterBackgroundColorClassNameForTheme,
	switchToProjectsListView,
	switchToBugsListView,
	getSearchedFilteredSortedList,
} from "../../../../utils";
// Components
import NavPanelTableRow from "./NavPanelTableRow";

const getProjectsButtonText = () => {
	return (
		<span>
			<i className="fa fa-folder" aria-hidden="true" alt="Icon of a folder" />
			Projects
		</span>
	);
};

const getBugsButtonText = () => {
	return (
		<span>
			<i className="fa fa-bug" aria-hidden="true" alt="Icon of a bug" />
			Bugs
		</span>
	);
};

export default function NavPanelTable(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<div className="nav-panel-table-component">
			<table className="table">
				<thead className="table__head">
					<tr
						className={
							"table__row" +
							(reduxState[props.reduxContainerName].componentsDisplay
								.listViewComponentShouldDisplay === false
								? ""
								: getCommonBrighterBackgroundColorClassNameForTheme(
										reduxState[ACCOUNT_CONTAINER].settings.theme_color
								  ))
						}
						onClick={
							props.reduxContainerName === PROJECT_CONTAINER
								? () => switchToProjectsListView(reduxState, dispatch)
								: () => switchToBugsListView(reduxState, dispatch)
						}
					>
						<th className="table__row__header">
							<span className="table__row__header__info">
								{props.reduxContainerName === PROJECT_CONTAINER
									? getProjectsButtonText()
									: getBugsButtonText()}
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{getSearchedFilteredSortedList(
						reduxState,
						props.reduxContainerName
					).map((item, idx) => {
						return (
							<NavPanelTableRow
								key={idx}
								item={item}
								reduxContainerName={props.reduxContainerName}
							/>
						);
					})}
					{/*Creates an empty space at the bottom*/}
					<tr className="table__empty-row" />
				</tbody>
			</table>
		</div>
	);
}
