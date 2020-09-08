import { useState, useEffect } from "react";

import { toggleClassName } from "./elementUtils";

import {
	getElementSize,
	getElementStyle,
	stripNonDigits,
} from "./displaySizeUtils";

export function useSearchBarResizeAndBorderEventListener(
	state,
	searchBarClassName,
	searchBarButtonClassName,
	searchBarAndButtonInnerContainerClassName,
	searchBarAndButtonInnerContainerModifierClassName,
	createNewButtonContainerClassName,
	sortFilterGroupContainerClassName,
	searchBarAndButtonCenteringContainerClassName
) {
	// Used for optimization in search-bar resize
	const [
		regularlyUsedSizesAndStyles,
		setRegularlyUsedSizesAndStyles,
	] = useState(null);

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

		let searchBar = document.getElementsByClassName(searchBarClassName)[0];

		let searchBarButton = document.getElementsByClassName(
			searchBarButtonClassName
		)[0];

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
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	// Resize search-bar to fit search-filter-sort-bar width
	useEffect(() => {
		if (
			state.displaySizeVariables.window !== null &&
			state.displaySizeConstants.home !== null
		) {
			let searchBar = document.getElementsByClassName(searchBarClassName)[0];

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

			let searchBarCenteringContainer = document.getElementsByClassName(
				searchBarAndButtonCenteringContainerClassName
			)[0];

			let searchBarInnerContainer = document.getElementsByClassName(
				searchBarAndButtonInnerContainerClassName
			)[0];

			const windowWidth =
				state.displaySizeVariables.window.width -
				state.displaySizeConstants.scrollbar.width;

			// Used to make the searchBar take up remaining space
			const remainingSearchFilterSortBarWidth =
				(windowWidth > state.displaySizeConstants.home.minWidth
					? windowWidth
					: state.displaySizeConstants.home.minWidth) -
				regularlyUsedSizesAndStyles.newProjectsButtonContainer.width -
				regularlyUsedSizesAndStyles.sortAndFilterContainer.width;
			// Because of css centering, this element is given equal empty space
			// ...on both sides equal to the subtracted value divided by 2
			const searchBarInnercontainerWidth =
				remainingSearchFilterSortBarWidth - 60;

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
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, [
		state.displaySizeVariables,
		state.displaySizeConstants,
		regularlyUsedSizesAndStyles,
	]);

	return [];
}
