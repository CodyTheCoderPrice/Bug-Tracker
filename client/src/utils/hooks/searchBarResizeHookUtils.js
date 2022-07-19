import { useState, useEffect } from "react";
// Util uses container names to work with the redux state
import { SIZE_CONTAINER } from "../../actions/constants/containerNames";
import { getElementSize, getElementStyle, stripNonDigits } from "../index";

/**
 * Custom hook that resizes the search-bar (i.e. element with 
 * 'search-centering-container__centered-container__search-bar' className) in 
 * the ListViewTopBar component to fit available space between new item button
 * (i.e. element with 'new-item-centering-container__button' className) and
 * filter button (i.e. element with 'list-view-top-bar-filter-button-component' 
 * className).
 * 
 * Note: The purpose of this custom hook is to be used by the ListViewTopBar
 * component to make the searchbar fit the available space, since if the 
 * searchbar were instead to be of a fixed width, then if a user has a wide
 * screen monitor, it would result in the ListViewTopBar component having an
 * excess of empty space, which would look bad.
 * 
 * Note: Searchbar resizing could not be achieved soley using CSS since it is
 * comprised of multiple elements to allow for it have a button inside it.
 *
 * @param {Object} passedReduxState - Current redux state from 
 * useSelector((state) => state)
 * @param {string} CenteringContainerClassName - Unique className assigned to
 * an element with 'centering-container' className that also has a child element 
 * with 'search-centering-container__centered-container' className (only one of the 
 * elements with 'centering-container' className has this child elmement)
 * @param {string} centeredSearchContainerClassName - Unique className assigned 
 * to the element with 'search-centering-container__centered-container' className
 * @param {string} searchBarClassName - Unique className assigned to element
 * with 'search-centering-container__centered-container__search-bar' className
 * @param {string} searchButtonClassName - Unique className assigned to element
 * with 'search-centering-container__centered-container__search-button' className
 * @param {string} newItemButtonContainerClassName - Unique className assigned
 * to an element with 'centering-container' className that also has a child 
 * element with 'new-item-centering-container__button' className (only one of 
 * the elements with 'centering-container' className has this child elmement)
 * @param {string} filterAreaContainerClassName - Unique className assigned
 * to element with 'filter-components-container' className.
 * 
 * @example
 * seListViewSearchBarResize(
 * 	reduxState,
 * 	"js-list-search-centering-container",
 * 	"js-list-centered-search-container",
 * 	"js-list-search-bar",
 * 	"js-list-search-button",
 * 	"js-new-item-button-centering-container",
 * 	"js-list-filter-components-container"
 * );
 */
export function useListViewSearchBarResize(
	passedReduxState,
	CenteringContainerClassName,
	centeredSearchContainerClassName,
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
				CenteringContainerClassName
			)[0];

			const searchBarInnerContainer = document.getElementsByClassName(
				centeredSearchContainerClassName
			)[0];

			const remainingSearchFilterSortBarWidth =
				passedReduxState[SIZE_CONTAINER].variables.window.width -
				passedReduxState[SIZE_CONTAINER].variables.navPanel.width -
				regularlyUsedSizesAndStyles.newProjectsButtonContainer.width -
				regularlyUsedSizesAndStyles.sortAndFilterContainer.width;
			searchBarCenteringContainer.style.width =
				remainingSearchFilterSortBarWidth + "px";
			// Set to a const since it is used multiple times. Because of CSS 
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
