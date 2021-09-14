import { useEffect } from "react";
import { useDispatch } from "react-redux";
// Util uses container names to work with the redux state
import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../actions/constants/containerNames";
import {
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
} from "../../actions";
import { getStringOfAllArrayValues } from "../index";

/**
 * Custom hook that ensures 'componentsDisplay' Objects in 'PROJECT_CONTAINER'
 * and 'BUG_CONTAINER' of the redux state follow the rule that only one of them
 * should have either 'listViewComponentShouldDisplay' or
 * 'itemViewComponentShouldDisplay' as true at any given point in time.
 *
 * Note: The reason this must be done outside listComponentsDisplayReducer is
 * because that reducer is used separately by both the 'PROJECT_CONTAINER' and
 * 'BUG_CONTAINER' and therefore can't manage the other's 'componentsDisplay'
 * Object.
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 *
 * @example
 * useListComponentsDisplayContainerCrossoverFailSafe(
 * 	reduxState
 * );
 */
export function useListComponentsDisplayContainerCrossoverFailSafe(
	passedReduxState
) {
	const dispatch = useDispatch();

	useEffect(() => {
		let arryOfListViewAndItemViewComponentsSetToTrue = [];

		if (
			passedReduxState[PROJECT_CONTAINER].componentsDisplay
				.listViewComponentShouldDisplay === true
		) {
			arryOfListViewAndItemViewComponentsSetToTrue.push(
				"'listViewComponentShouldDisplay' (for projects)"
			);
		}
		if (
			passedReduxState[PROJECT_CONTAINER].componentsDisplay
				.itemViewComponentShouldDisplay === true
		) {
			arryOfListViewAndItemViewComponentsSetToTrue.push(
				"'itemViewComponentShouldDisplay' (for projects)"
			);
		}
		if (
			passedReduxState[BUG_CONTAINER].componentsDisplay
				.listViewComponentShouldDisplay === true
		) {
			arryOfListViewAndItemViewComponentsSetToTrue.push(
				"'listViewComponentShouldDisplay' (for bugs)"
			);
		}
		if (
			passedReduxState[BUG_CONTAINER].componentsDisplay
				.itemViewComponentShouldDisplay === true
		) {
			arryOfListViewAndItemViewComponentsSetToTrue.push(
				"'itemViewComponentShouldDisplay' (for bugs)"
			);
		}

		// Fail Safe
		if (arryOfListViewAndItemViewComponentsSetToTrue.length !== 1) {
			if (arryOfListViewAndItemViewComponentsSetToTrue.length > 1) {
				console.log(
					"FAIL SAFE: " +
						getStringOfAllArrayValues(
							arryOfListViewAndItemViewComponentsSetToTrue
						) +
						" were attempted to be set to true in the redux state, which goes against their intended use. So 'listViewComponentShouldDisplay' (for projects) will be set to true (since it is the default) while the rest will be set to false."
				);
			} else {
				console.log(
					"FAIL SAFE: Neither 'listViewComponentShouldDisplay' (for projects or bugs) or 'itemViewComponentShouldDisplay' (for projects or bugs) were attempted to be set to true in the redux state, which goes against their intended use. So 'listViewComponentShouldDisplay' (for projects) will be set true (since it is the default)."
				);
			}

			// Keeps itemViewCurrentItem the same, so if it's not null, the
			// user can still switch back to ItemView (for projects) component
			// using the navbar.
			dispatch(
				setWhichProjectComponentsDisplay({
					listViewComponentShouldDisplay: true,
					itemViewCurrentItem:
						passedReduxState[PROJECT_CONTAINER].componentsDisplay
							.itemViewCurrentItem,
				})
			);
			// Keeps itemViewCurrentItem the same, so if it's not null, the
			// user can still switch back to ItemView (for bugs) component
			// using the navbar.
			dispatch(
				setWhichBugComponentsDisplay({
					itemViewCurrentItem:
						passedReduxState[BUG_CONTAINER].componentsDisplay
							.itemViewCurrentItem,
				})
			);
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		passedReduxState[PROJECT_CONTAINER].componentsDisplay,
		// eslint-disable-next-line
		passedReduxState[BUG_CONTAINER].componentsDisplay,
	]);
}