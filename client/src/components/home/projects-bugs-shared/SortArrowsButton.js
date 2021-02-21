import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setProjectOrBugSearchFilterSort } from "../../../actions";

// Light mode
import sortArrowsBothEmptyModeLight from "../../../images/sort-arrows-both-empty-for-mode-light.svg";
import sortArrowsTopFilledModeLight from "../../../images/sort-arrows-top-filled-for-mode-light.svg";
import sortArrowsBottomFilledModeLight from "../../../images/sort-arrows-bottom-filled-for-mode-light.svg";
// Dark mode
import sortArrowsBothEmptyModeDark from "../../../images/sort-arrows-both-empty-for-mode-dark.svg";
import sortArrowsTopFilledModeDark from "../../../images/sort-arrows-top-filled-for-mode-dark.svg";
import sortArrowsBottomFilledModeDark from "../../../images/sort-arrows-bottom-filled-for-mode-dark.svg";

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
				? sortArrowsBothEmptyModeLight
				: reduxState[props.reduxContainerName].searchFilterSort.sortByAscending
				? sortArrowsTopFilledModeLight
				: sortArrowsBottomFilledModeLight;
		} else {
			return reduxState[props.reduxContainerName].searchFilterSort
				.sortByTypeId !== props.sortTypeId
				? sortArrowsBothEmptyModeDark
				: reduxState[props.reduxContainerName].searchFilterSort.sortByAscending
				? sortArrowsTopFilledModeDark
				: sortArrowsBottomFilledModeDark;
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
