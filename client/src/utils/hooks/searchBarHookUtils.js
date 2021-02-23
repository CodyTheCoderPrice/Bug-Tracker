import { useState, useEffect } from "react";
import { SIZE_CONTAINER } from "../../actions/constants/containerNames";

import {
	getElementSize,
	getElementStyle,
	stripNonDigits,
} from "../index";

export function useSearchBarResize(
	passedReduxState,
	BarButtonCenteringContainerClassName,
	centeredBarButtonContainerClassName,
	searchBarClassName,
	searchButtonClassName,
	newItemButtonContainerClassName,
	filterAreaContainerClassName
) {
	// Used for optimization in search-bar resize
	const [
		regularlyUsedSizesAndStyles,
		setRegularlyUsedSizesAndStyles,
	] = useState(null);

	// Resize search-bar to fit search-filter-sort-bar width
	useEffect(() => {
		if (passedReduxState[SIZE_CONTAINER].variables.window !== null) {
			const searchBar = document.getElementsByClassName(searchBarClassName)[0];

			// Makes sure regularlyUsedSizesAndStyles gets set
			if (regularlyUsedSizesAndStyles === null) {
				const searchBarStyle = getElementStyle(searchBar);
				setRegularlyUsedSizesAndStyles({
					newProjectsButtonContainer: getElementSize(
						document.getElementsByClassName(
							newItemButtonContainerClassName
						)[0]
					),
					sortAndFilterContainer: getElementSize(
						document.getElementsByClassName(
							filterAreaContainerClassName
						)[0]
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
				// ...be null for remainder of this useEfffect iteration
				return;
			}

			const searchBarCenteringContainer = document.getElementsByClassName(
				BarButtonCenteringContainerClassName
			)[0];

			const searchBarInnerContainer = document.getElementsByClassName(
				centeredBarButtonContainerClassName
			)[0];

			// Used to make the searchBar take up remaining space
			const remainingSearchFilterSortBarWidth =
				passedReduxState[SIZE_CONTAINER].variables.window.width -
				regularlyUsedSizesAndStyles.newProjectsButtonContainer.width -
				// Got 22 by eyeing it to see what made the distances look the same
				regularlyUsedSizesAndStyles.sortAndFilterContainer.width -
				22;
			// Because of css centering, this element is given equal empty space
			// ...on both sides equal to the subtracted value divided by 2
			const searchBarInnercontainerWidth =
				remainingSearchFilterSortBarWidth - 40;

			searchBarCenteringContainer.style.width =
				remainingSearchFilterSortBarWidth + "px";
			// Minus 1 since button needed to have a margin-left of -1px for chrome
			searchBarInnerContainer.style.width =
				searchBarInnercontainerWidth - 1 + "px";
			// Adjusts for the searchButton, borders, and padding
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

	return [];
}
