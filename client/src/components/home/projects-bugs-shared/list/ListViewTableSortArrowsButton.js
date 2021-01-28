import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setProjectOrBugSearchFilterSort } from "../../../../actions";

import sortArrowsBothEmpty from "../../../../images/sort-arrows-both-empty.svg";
import sortArrowsTopFilled from "../../../../images/sort-arrows-top-filled.svg";
import sortArrowsBottomFilled from "../../../../images/sort-arrows-bottom-filled.svg";

export default function ListViewTableSortArrowsButton(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const changeSorting = () => {
		if (
			reduxState[props.reduxContainerName].searchFilterSort.sortByTypeId !==
			props.sortTypeId
		) {
			dispatch(
				setProjectOrBugSearchFilterSort(props.reduxContainerName, {
					...reduxState[props.reduxContainerName].searchFilterSort,
					sortByAscending: true,
					sortByTypeId: props.sortTypeId,
				})
			);
		} else {
			dispatch(
				setProjectOrBugSearchFilterSort(props.reduxContainerName, {
					...reduxState[props.reduxContainerName].searchFilterSort,
					sortByAscending: !reduxState[props.reduxContainerName]
						.searchFilterSort.sortByAscending,
				})
			);
		}
	};

	return (
		<img
			className="sort-arrow"
			src={
				reduxState[props.reduxContainerName].searchFilterSort.sortByTypeId !==
				props.sortTypeId
					? sortArrowsBothEmpty
					: reduxState[props.reduxContainerName].searchFilterSort
							.sortByAscending
					? sortArrowsTopFilled
					: sortArrowsBottomFilled
			}
			alt={
				(reduxState[props.reduxContainerName].searchFilterSort.sortByTypeId !==
				props.sortTypeId
					? "No"
					: reduxState[props.reduxContainerName].searchFilterSort
							.sortByAscending
					? "Ascending"
					: "Descending") +
				" sorting for " +
				props.sortFor +
				" column."
			}
			onClick={changeSorting}
		/>
	);
}
