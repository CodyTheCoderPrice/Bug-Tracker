import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setProjectOrBugSearchFilterSort } from "../../../actions";

// Light mode
import sortArrowsBothEmptyThemeLight from "../../../images/sort-arrows-both-empty-theme-light.svg";
import sortArrowsTopFilledThemeLight from "../../../images/sort-arrows-top-filled-theme-light.svg";
import sortArrowsBottomFilledThemeLight from "../../../images/sort-arrows-bottom-filled-theme-light.svg";
// Dark mode
import sortArrowsBothEmptyThemeDark from "../../../images/sort-arrows-both-empty-theme-dark.svg";
import sortArrowsTopFilledThemeDark from "../../../images/sort-arrows-top-filled-theme-dark.svg";
import sortArrowsBottomFilledThemeDark from "../../../images/sort-arrows-bottom-filled-theme-dark.svg";

export default function SortArrowsButton(props) {
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

	const getSortingArrowImage = () => {
		if (!props.dark_mode) {
			return reduxState[props.reduxContainerName].searchFilterSort
				.sortByTypeId !== props.sortTypeId
				? sortArrowsBothEmptyThemeLight
				: reduxState[props.reduxContainerName].searchFilterSort.sortByAscending
				? sortArrowsTopFilledThemeLight
				: sortArrowsBottomFilledThemeLight;
		} else {
			return reduxState[props.reduxContainerName].searchFilterSort
				.sortByTypeId !== props.sortTypeId
				? sortArrowsBothEmptyThemeDark
				: reduxState[props.reduxContainerName].searchFilterSort.sortByAscending
				? sortArrowsTopFilledThemeDark
				: sortArrowsBottomFilledThemeDark;
		}
	};

	return (
		<img
			className="sort-arrow"
			src={getSortingArrowImage()}
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
