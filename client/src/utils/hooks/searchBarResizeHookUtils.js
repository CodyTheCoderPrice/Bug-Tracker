import { useState, useEffect } from "react";

// Util uses container names to work with the redux state
import { SIZE_CONTAINER } from "../../actions/constants/containerNames";

import { getElementSize, getElementStyle, stripNonDigits } from "../index";

/**
 * Custom hook that resizes the search-bar on the ListView component to fit
 * available space in the top bar between the new item button and filter
 * button
 *
 * @param {JSON} passedReduxState - Current redux state from useSelector
 * @param {string} searchBarAndButtonCenteringContainerClassName - Unique
 * className assigned to the element used for centering the element (next
 * parameter) that contains both search-bar and search-button elements
 * @param {string} centeredSearchBarAndButtonContainerClassName - Unique
 * className assigned to the element that contains both search-bar and
 * search-button elements (following 2 parameters)
 * @param {string} searchBarClassName - Unique className assigned to the
 * search-bar element
 * @param {string} searchButtonClassName - Unique className assigned to the
 * search-button element
 * @param {string} newItemButtonContainerClassName - Unique className assigned
 * to the element used for centering the new-item-button element
 * @param {string} filterAreaContainerClassName - Unique className assigned
 * to the element used for positioning the filter-button and filter-dropdown
 * elements
 */
export function useListViewSearchBarResize(
	passedReduxState,
	searchBarAndButtonCenteringContainerClassName,
	centeredSearchBarAndButtonContainerClassName,
	searchBarClassName,
	searchButtonClassName,
	newItemButtonContainerClassName,
	filterAreaContainerClassName
) {
	// Optimizes hook by storing constant element sizes and styles
	const [
		regularlyUsedSizesAndStyles,
		setRegularlyUsedSizesAndStyles,
	] = useState(null);

	useEffect(() => {
		if (passedReduxState[SIZE_CONTAINER].variables.window !== null) {
			const searchBar = document.getElementsByClassName(searchBarClassName)[0];

			if (regularlyUsedSizesAndStyles === null) {
				const searchBarStyle = getElementStyle(searchBar);
				setRegularlyUsedSizesAndStyles({
					newProjectsButtonContainer: getElementSize(
						document.getElementsByClassName(newItemButtonContainerClassName)[0]
					),
					sortAndFilterContainer: getElementSize(
						document.getElementsByClassName(filterAreaContainerClassName)[0]
					),
					searchBar: {
						borderWidthOnOneSide: stripNonDigits(
							searchBarStyle.borderLeftWidth
						),
						paddingOnOneSide: stripNonDigits(searchBarStyle.paddingLeft),
					},

					searchButton: getElementSize(
						document.getElementsByClassName(searchButtonClassName)[0]
					),
				});

				// Prevents crash since regularlyUsedSizesAndStyles will still
				// ...be null for remainder of this useEfffect iteration.
				return;
			}

			const searchBarCenteringContainer = document.getElementsByClassName(
				searchBarAndButtonCenteringContainerClassName
			)[0];

			const searchBarInnerContainer = document.getElementsByClassName(
				centeredSearchBarAndButtonContainerClassName
			)[0];

			const remainingSearchFilterSortBarWidth =
				passedReduxState[SIZE_CONTAINER].variables.window.width -
				regularlyUsedSizesAndStyles.newProjectsButtonContainer.width -
				// Got 22 by eyeing it to see what made the distances look the same
				regularlyUsedSizesAndStyles.sortAndFilterContainer.width -
				22;
			searchBarCenteringContainer.style.width =
				remainingSearchFilterSortBarWidth + "px";
			// Made a variable as it is used multiple times. Because of css 
			// ...centering, this element is given equal empty space on both 
			// ...sides equal to subtracted value (40) divided by 2.
			const searchBarInnercontainerWidth =
				remainingSearchFilterSortBarWidth - 40;
			// Minus 1 since button needed to have a margin-left of -1px for chrome
			searchBarInnerContainer.style.width =
				searchBarInnercontainerWidth - 1 + "px";
			searchBar.style.width =
				searchBarInnercontainerWidth -
				regularlyUsedSizesAndStyles.searchButton.width +
				"px";
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		passedReduxState[SIZE_CONTAINER].variables,
		// eslint-disable-next-line
		passedReduxState[SIZE_CONTAINER].constants,
		regularlyUsedSizesAndStyles,
	]);
}
