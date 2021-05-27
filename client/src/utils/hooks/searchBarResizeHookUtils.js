import { useState, useEffect } from "react";
// Util uses container names to work with the redux state
import { SIZE_CONTAINER } from "../../actions/constants/containerNames";
import { getElementSize, getElementStyle, stripNonDigits } from "../index";

/**
 * Custom hook that resizes the search-bar (element with 
 * 'centering-container__bar-and-button-container__search-bar' className) in 
 * the ListViewTopBar component to fit available space between the new item 
 * button (element with 'centering-container__new-item-button' className) and 
 * the filter button (element with 'filter-area-container__button' className).
 *
 * @param {Object} passedReduxState - Current redux state from 
 * useSelector((state) => state)
 * @param {string} searchBarAndButtonCenteringContainerClassName - Unique
 * className assigned to an element (with 'centering-container' className) used 
 * for centering element with 'centering-container__bar-and-button-container'
 * className
 * @param {string} centeredSearchBarAndButtonContainerClassName - Unique
 * className assigned to the element with 
 * 'centering-container__bar-and-button-container' className
 * @param {string} searchBarClassName - Unique className assigned to element
 * with 'centering-container__bar-and-button-container__search-bar' className
 * @param {string} searchButtonClassName - Unique className assigned to element
 * with 'centering-container__bar-and-button-container__search-button' className
 * @param {string} newItemButtonContainerClassName - Unique className assigned
 * to an element (with 'centering-container' className) used for centering 
 * element with 'centering-container__new-item-button' className.
 * @param {string} filterAreaContainerClassName - Unique className assigned
 * to element with 'filter-area-container' className.
 * 
 * @example
 * seListViewSearchBarResize(
 * 	reduxState,
 * 	"js-list-search-bar-and-button-centering-container",
 * 	"js-list-centered-search-bar-and-button-container",
 * 	"js-list-search-bar",
 * 	"js-list-search-button",
 * 	"js-new-item-button-centering-container",
 * 	"js-list-filter-area-container"
 * );
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
