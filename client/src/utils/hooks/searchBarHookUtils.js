import { useState, useEffect } from "react";
import { SIZE_CONTAINER } from "../../actions/constants/containerNames";

import {
	toggleClassName,
	getElementSize,
	getElementStyle,
	stripNonDigits,
} from "../index";

export function useSearchBarBorderEventListener(
	searchBarClassName,
	searchButtonClassName,
	searchBarAndButtonModifierClassName,
) {
	// Adds event listener to give the searchBarInnerContainer a border
	useEffect(() => {
		const toggleContainerBorder = (shouldDisplay) => {
			toggleClassName(
				shouldDisplay,
				document.getElementsByClassName(
					searchBarClassName
				)[0],
				searchBarAndButtonModifierClassName
			);

			toggleClassName(
				shouldDisplay,
				document.getElementsByClassName(
					searchButtonClassName
				)[0],
				searchBarAndButtonModifierClassName
			);
		};

		const searchBar = document.getElementsByClassName(searchBarClassName)[0];

		searchBar.addEventListener("focus", () => {
			toggleContainerBorder(true);
		});

		searchBar.addEventListener("blur", () => {
			toggleContainerBorder(false);
		});

		return () => {
			searchBar.removeEventListener("focus", () => {
				toggleContainerBorder(true);
			});

			searchBar.removeEventListener("blur", () => {
				toggleContainerBorder(false);
			});
		};
		// eslint-disable-next-line
	}, []);
}

export function useSearchBarResizeAndBorderEventListener(
	passedReduxState,
	searchBarClassName,
	searchButtonClassName,
	searchBarAndButtonInnerContainerClassName,
	searchBarAndButtonModifierClassName,
	createNewButtonContainerClassName,
	sortFilterGroupContainerClassName,
	searchBarAndButtonCenteringContainerClassName
) {
	useSearchBarBorderEventListener(
		searchBarClassName,
		searchButtonClassName,
		searchBarAndButtonModifierClassName,
	);

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
							createNewButtonContainerClassName
						)[0]
					),
					sortAndFilterContainer: getElementSize(
						document.getElementsByClassName(
							sortFilterGroupContainerClassName
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
				searchBarAndButtonCenteringContainerClassName
			)[0];

			const searchBarInnerContainer = document.getElementsByClassName(
				searchBarAndButtonInnerContainerClassName
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
