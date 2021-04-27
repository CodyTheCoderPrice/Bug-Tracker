import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import { PROJECT_CONTAINER } from "../../actions/constants/containerNames";
import { setProjectOrBugSearchFilterSort } from "../../actions";

// Light mode arrows svgs
import sortArrowsBothEmptyModeLight from "../../images/sort-arrows-both-empty-for-mode-light.svg";
import sortArrowsTopFilledModeLight from "../../images/sort-arrows-top-filled-for-mode-light.svg";
import sortArrowsBottomFilledModeLight from "../../images/sort-arrows-bottom-filled-for-mode-light.svg";
// Dark mode arrows svgs
import sortArrowsBothEmptyModeDark from "../../images/sort-arrows-both-empty-for-mode-dark.svg";
import sortArrowsTopFilledModeDark from "../../images/sort-arrows-top-filled-for-mode-dark.svg";
import sortArrowsBottomFilledModeDark from "../../images/sort-arrows-bottom-filled-for-mode-dark.svg";

/**
 * React functional component for a button (that displays sorting arrows) used to
 * change how a list (projects or bugs) is being sorted. Button only changes
 * sorting to be either ascending or descending for a specific option (based
 * on what is passed in the props).
 *
 * Component needs several properties passed in order to work. An example of
 * those properties is below.
 *
 * @component
 * @example
 * reduxContainerName = PROJECT_CONTAINER
 * sortId = 1
 * sortFor = "Name"
 * uniqueId = "item-view-sort-arrow-name"
 * dark_mode = reduxState[ACCOUNT_CONTAINER].settings.dark_mode
 */
export default function SortArrowsButton(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const { reduxContainerName, sortId, sortFor, uniqueId, dark_mode } = props;

	const changeSorting = () => {
		if (reduxState[reduxContainerName].searchFilterSort.sortId !== sortId) {
			dispatch(
				setProjectOrBugSearchFilterSort(reduxContainerName, {
					...reduxState[reduxContainerName].searchFilterSort,
					sortAscending: true,
					sortId: sortId,
				})
			);
		} else {
			dispatch(
				setProjectOrBugSearchFilterSort(reduxContainerName, {
					...reduxState[reduxContainerName].searchFilterSort,
					sortAscending: !reduxState[reduxContainerName].searchFilterSort
						.sortAscending,
				})
			);
		}
	};

	const getSortingArrowImage = () => {
		// Light and dark mode have different sort arrow svgs
		if (!dark_mode) {
			return reduxState[reduxContainerName].searchFilterSort.sortId !== sortId
				? sortArrowsBothEmptyModeLight
				: reduxState[reduxContainerName].searchFilterSort.sortAscending
				? sortArrowsTopFilledModeLight
				: sortArrowsBottomFilledModeLight;
		} else {
			return reduxState[reduxContainerName].searchFilterSort.sortId !== sortId
				? sortArrowsBothEmptyModeDark
				: reduxState[reduxContainerName].searchFilterSort.sortAscending
				? sortArrowsTopFilledModeDark
				: sortArrowsBottomFilledModeDark;
		}
	};

	const getAltText = () => {
		return (
			(reduxContainerName === PROJECT_CONTAINER ? "Projects " : "Bugs ") +
			(reduxState[reduxContainerName].searchFilterSort.sortId !== sortId
				? "not being sorted for "
				: reduxState[reduxContainerName].searchFilterSort.sortAscending
				? "being sorted in ascending order for "
				: "being sorted in descending order for ") +
			sortFor +
			" column. Click to sort them in " +
			(reduxState[reduxContainerName].searchFilterSort.sortAscending !== true
				? "ascending"
				: "descending") +
			" order."
		);
	};

	return (
		<img
			className="sort-arrow"
			id={uniqueId}
			src={getSortingArrowImage()}
			alt={getAltText()}
			onClick={changeSorting}
		/>
	);
}

SortArrowsButton.propTypes = {
	// Redux container name for which list (projects or bugs) the
	// ...SortArrowsButton changes sorting for
	reduxContainerName: PropTypes.string.isRequired,
	// id for the sort option the SortArrowsButton belongs to
	sortId: PropTypes.number.isRequired,
	// Title of the sort option the SortArrowsButton belongs to
	sortFor: PropTypes.string.isRequired,
	// SortArrowsButton img element's id attribute
	uniqueId: PropTypes.string,
	// Whether or not the app is in dark mode
	dark_mode: PropTypes.bool.isRequired,
};
