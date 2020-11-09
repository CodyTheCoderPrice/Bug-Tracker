import { useState, useEffect } from "react";
import { sizeContainerName } from "../reducers/containerNames";

import { toggleClassName } from "./elementUtils";

import {
	getElementSize,
	getElementStyle,
	stripNonDigits,
} from "./displaySizeUtils";

export function useSearchBarBorderEventListener(
	searchBarAndButtonInnerContainerClassName,
	searchBarAndButtonInnerContainerModifierClassName,
	searchBarClassName
) {
	// Adds event listener to give the searchBarInnerContainer a border
	useEffect(() => {
		const toggleContainerBorder = (shouldDisplay) => {
			toggleClassName(
				shouldDisplay,
				document.getElementsByClassName(
					searchBarAndButtonInnerContainerClassName
				)[0],
				searchBarAndButtonInnerContainerModifierClassName
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
	searchBarButtonClassName,
	searchBarAndButtonInnerContainerClassName,
	searchBarAndButtonInnerContainerModifierClassName,
	createNewButtonContainerClassName,
	sortFilterGroupContainerClassName,
	searchBarAndButtonCenteringContainerClassName
) {
	useSearchBarBorderEventListener(
		searchBarAndButtonInnerContainerClassName,
		searchBarAndButtonInnerContainerModifierClassName,
		searchBarClassName
	);

	// Used for optimization in search-bar resize
	const [
		regularlyUsedSizesAndStyles,
		setRegularlyUsedSizesAndStyles,
	] = useState(null);

	// Resize search-bar to fit search-filter-sort-bar width
	useEffect(() => {
		if (passedReduxState[sizeContainerName].variables.window !== null) {
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

					searchBarButton: getElementSize(
						document.getElementsByClassName(searchBarButtonClassName)[0]
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
				passedReduxState[sizeContainerName].variables.window.width -
				regularlyUsedSizesAndStyles.newProjectsButtonContainer.width -
				// Got 22 by eyeing it to see what made the distances look the same
				regularlyUsedSizesAndStyles.sortAndFilterContainer.width - 22;
			// Because of css centering, this element is given equal empty space
			// ...on both sides equal to the subtracted value divided by 2
			const searchBarInnercontainerWidth =
				remainingSearchFilterSortBarWidth - 40;

			searchBarCenteringContainer.style.width =
				remainingSearchFilterSortBarWidth + "px";
			searchBarInnerContainer.style.width = searchBarInnercontainerWidth + "px";
			// Adjusts for the searchBarButton, borders, and padding
			searchBar.style.width =
				searchBarInnercontainerWidth -
				regularlyUsedSizesAndStyles.searchBarButton.width -
				regularlyUsedSizesAndStyles.searchBar.borderWidthOnOneSide * 2 -
				regularlyUsedSizesAndStyles.searchBar.paddingOnOneSide * 2 +
				"px";
		}
		// eslint-disable-next-line
	}, [
		passedReduxState[sizeContainerName].variables,
		passedReduxState[sizeContainerName].constants,
		regularlyUsedSizesAndStyles,
	]);

	return [];
}
