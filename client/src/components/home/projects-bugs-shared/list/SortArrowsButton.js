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
		if (reduxState.projectsSearchFilterSort.sortByType !== props.sortId) {
			dispatch(
				setProjectsSearchFilterSort({
					...reduxState.projectsSearchFilterSort,
					sortByAscending: true,
					sortByType: props.sortId,
				})
			);
		} else {
			dispatch(
				setProjectsSearchFilterSort({
					...reduxState.projectsSearchFilterSort,
					sortByAscending: !reduxState.projectsSearchFilterSort.sortByAscending,
				})
			);
		}
	};

	return (
		<img
			className="sort-arrows"
			src={
				reduxState.projectsSearchFilterSort.sortByType !== props.sortId
					? sortArrowsBothEmpty
					: reduxState.projectsSearchFilterSort.sortByAscending
					? sortArrowsTopFilled
					: sortArrowsBottomFilled
			}
			onClick={changeSorting}
		/>
	);
}
