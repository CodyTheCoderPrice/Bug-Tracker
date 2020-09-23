import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setProjectOrBugSearchFilterSort } from "../../../../actions";

import sortArrowsBothEmpty from "../../../../images/sort-arrows-both-empty.svg";
import sortArrowsTopFilled from "../../../../images/sort-arrows-top-filled.svg";
import sortArrowsBottomFilled from "../../../../images/sort-arrows-bottom-filled.svg";
import "../../../../SCSS/home/projects-bugs-shared/list/listTableSortArrowsButton.scss";

export default function ListTableSortArrowsButton(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const changeSorting = () => {
		if (
			reduxState[props.reduxContainerName].searchFilterSort.sortByType !== props.sortId
		) {
			dispatch(
				setProjectOrBugSearchFilterSort(props.reduxContainerName, {
					...reduxState[props.reduxContainerName].searchFilterSort,
					sortByAscending: true,
					sortByType: props.sortId,
				})
			);
		} else {
			dispatch(
				setProjectOrBugSearchFilterSort(props.reduxContainerName, {
					...reduxState[props.reduxContainerName].searchFilterSort,
					sortByAscending: !reduxState[props.reduxContainerName].searchFilterSort
						.sortByAscending,
				})
			);
		}
	};

	return (
		<img
			className="sort-arrows"
			src={
				reduxState[props.reduxContainerName].searchFilterSort.sortByType !== props.sortId
					? sortArrowsBothEmpty
					: reduxState[props.reduxContainerName].searchFilterSort.sortByAscending
					? sortArrowsTopFilled
					: sortArrowsBottomFilled
			}
			alt={
				(reduxState[props.reduxContainerName].searchFilterSort.sortByType !==
				props.sortId
					? "No"
					: reduxState[props.reduxContainerName].searchFilterSort.sortByAscending
					? "Ascending"
					: "Descending") +
				" sorting for " +
				props.sortFor + " column."
			}
			onClick={changeSorting}
		/>
	);
}
