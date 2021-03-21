import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PROJECT_CONTAINER } from "../../actions/constants/containerNames";

import { setProjectOrBugSearchFilterSort } from "../../actions";

// Light mode
import sortArrowsBothEmptyModeLight from "../../images/sort-arrows-both-empty-for-mode-light.svg";
import sortArrowsTopFilledModeLight from "../../images/sort-arrows-top-filled-for-mode-light.svg";
import sortArrowsBottomFilledModeLight from "../../images/sort-arrows-bottom-filled-for-mode-light.svg";
// Dark mode
import sortArrowsBothEmptyModeDark from "../../images/sort-arrows-both-empty-for-mode-dark.svg";
import sortArrowsTopFilledModeDark from "../../images/sort-arrows-top-filled-for-mode-dark.svg";
import sortArrowsBottomFilledModeDark from "../../images/sort-arrows-bottom-filled-for-mode-dark.svg";

export default function SortArrowsButton(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const changeSorting = () => {
		if (
			reduxState[props.reduxContainerName].searchFilterSort.sortId !==
			props.sortId
		) {
			dispatch(
				setProjectOrBugSearchFilterSort(props.reduxContainerName, {
					...reduxState[props.reduxContainerName].searchFilterSort,
					sortAscending: true,
					sortId: props.sortId,
				})
			);
		} else {
			dispatch(
				setProjectOrBugSearchFilterSort(props.reduxContainerName, {
					...reduxState[props.reduxContainerName].searchFilterSort,
					sortAscending: !reduxState[props.reduxContainerName].searchFilterSort
						.sortAscending,
				})
			);
		}
	};

	const getSortingArrowImage = () => {
		if (!props.dark_mode) {
			return reduxState[props.reduxContainerName].searchFilterSort.sortId !==
				props.sortId
				? sortArrowsBothEmptyModeLight
				: reduxState[props.reduxContainerName].searchFilterSort.sortAscending
				? sortArrowsTopFilledModeLight
				: sortArrowsBottomFilledModeLight;
		} else {
			return reduxState[props.reduxContainerName].searchFilterSort.sortId !==
				props.sortId
				? sortArrowsBothEmptyModeDark
				: reduxState[props.reduxContainerName].searchFilterSort.sortAscending
				? sortArrowsTopFilledModeDark
				: sortArrowsBottomFilledModeDark;
		}
	};

	return (
		<img
			className="sort-arrow"
			id={props.uniqueId}
			src={getSortingArrowImage()}
			alt={
				(props.reduxContainerName === PROJECT_CONTAINER
					? "Projects "
					: "Bugs ") +
				(reduxState[props.reduxContainerName].searchFilterSort.sortId !==
				props.sortId
					? "not being sorted for "
					: reduxState[props.reduxContainerName].searchFilterSort.sortAscending
					? "being sorted in ascending order for "
					: "being sorted in descending order for ") +
				props.sortFor +
				" column. Click to sort them in " +
				(reduxState[props.reduxContainerName].searchFilterSort.sortAscending !==
				true
					? "ascending"
					: "descending") +
				" order."
			}
			onClick={changeSorting}
		/>
	);
}
