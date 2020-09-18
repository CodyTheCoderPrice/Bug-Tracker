import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setProjectsSearchFilterSort } from "../../../../actions";

import sortArrowsBothEmpty from "../../../../images/sort-arrows-both-empty.svg";
import sortArrowsTopFilled from "../../../../images/sort-arrows-top-filled.svg";
import sortArrowsBottomFilled from "../../../../images/sort-arrows-bottom-filled.svg";
import "../../../../SCSS/projects-bugs-shared/sortArrowsButton.scss";

export default function SortArrowsButton(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const changeSorting = () => {
		if (
			reduxState.projectContainer.searchFilterSort.sortByType !== props.sortId
		) {
			dispatch(
				setProjectsSearchFilterSort({
					...reduxState.projectContainer.searchFilterSort,
					sortByAscending: true,
					sortByType: props.sortId,
				})
			);
		} else {
			dispatch(
				setProjectsSearchFilterSort({
					...reduxState.projectContainer.searchFilterSort,
					sortByAscending: !reduxState.projectContainer.searchFilterSort
						.sortByAscending,
				})
			);
		}
	};

	return (
		<img
			className="sort-arrows"
			src={
				reduxState.projectContainer.searchFilterSort.sortByType !== props.sortId
					? sortArrowsBothEmpty
					: reduxState.projectContainer.searchFilterSort.sortByAscending
					? sortArrowsTopFilled
					: sortArrowsBottomFilled
			}
			alt={
				(reduxState.projectContainer.searchFilterSort.sortByType !==
				props.sortId
					? "No"
					: reduxState.projectContainer.searchFilterSort.sortByAscending
					? "Ascending"
					: "Descending") +
				" sorting for " +
				props.sortFor + " column."
			}
			onClick={changeSorting}
		/>
	);
}
