import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PROJECT_CONTAINER } from "../../../../actions/constants/containerNames";
import {
	switchToProjectsListView,
	switchToBugsListView,
	getSearchedFilteredSortedList,
} from "../../../../utils";
// Components
import NavPanelTableRow from "./NavPanelTableRow";

export default function NavPanelTable(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<div className="nav-panel-table-component">
			<table>
				<thead>
					<tr className="table__row">
						<th className="table__row__header">
							<span className="table__row__header__info"
								onClick={
									props.reduxContainerName === PROJECT_CONTAINER
										? () => switchToProjectsListView(reduxState, dispatch)
										: () => switchToBugsListView(reduxState, dispatch)
								}
							>
								{props.reduxContainerName === PROJECT_CONTAINER
									? "Projects"
									: "Bugs"}
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
					<tr className="table__row--empty" />
				</tbody>
			</table>
		</div>
	);
}
