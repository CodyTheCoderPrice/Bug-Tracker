import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PROJECT_CONTAINER } from "../../../../actions/constants/containerNames";
import {
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
			<table>
				<thead>
					<tr className="table__row">
						<th className="table__row__header">
							<span
								className="table__row__header__info"
								onClick={
									props.reduxContainerName === PROJECT_CONTAINER
										? () => switchToProjectsListView(reduxState, dispatch)
										: () => switchToBugsListView(reduxState, dispatch)
								}
							>
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
