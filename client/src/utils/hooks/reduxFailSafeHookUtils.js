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
import { filterObject, getStringOfAllArrayValues } from "../index";

/**
 * Custom hook that ensures 'componentsDisplay' Objects in 'PROJECT_CONTAINER'
 * and 'BUG_CONTAINER' of the redux state follow the rules that only one of
 * them at a time should have booleans as true. Also that exactly one of 
 * 'listViewComponentShouldDisplay' and 'itemViewComponentShouldDisplay'
 * booleans at a time in either 'componentsDisplay' should be true.
 * 
 * Note: The reason this is done outside listAndItemComponentsDisplayReducer is
 * because that reducer is used separately by both the 'PROJECT_CONTAINER' and
 * 'BUG_CONTAINER'. Therefore, neither container can manage the other's 
 * 'componentsDisplay' Object, as a dispatch function would need to be called,
 * 	which can't be done within the reducer.
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 *
 * @example
 * useListAndItemComponentsDisplayContainerCrossoverFailSafe(
 * 	reduxState
 * );
 */
export function useListAndItemComponentsDisplayContainerCrossoverFailSafe(
	passedReduxState
) {
	const dispatch = useDispatch();

	useEffect(() => {
		const keysOfProjectContainerListAndItemComponentsSetToTrue = Object.keys(
			filterObject(
				{
					listViewComponentShouldDisplay:
						passedReduxState[PROJECT_CONTAINER].componentsDisplay
							.listViewComponentShouldDisplay,
					deleteModalComponentForListViewShouldDisplay:
						passedReduxState[PROJECT_CONTAINER].componentsDisplay
							.deleteModalComponentForListViewShouldDisplay,
					listViewCreateItemSidbarComponentShouldDisplay:
						passedReduxState[PROJECT_CONTAINER].componentsDisplay
							.listViewCreateItemSidbarComponentShouldDisplay,
					itemViewComponentShouldDisplay:
						passedReduxState[PROJECT_CONTAINER].componentsDisplay
							.itemViewComponentShouldDisplay,
					deleteModalComponentForItemViewShouldDisplay:
						passedReduxState[PROJECT_CONTAINER].componentsDisplay
							.deleteModalComponentForItemViewShouldDisplay,
					itemViewEditItemInfoComponentShouldDisplay:
						passedReduxState[PROJECT_CONTAINER].componentsDisplay
							.itemViewEditItemInfoComponentShouldDisplay,
				},
				(boolean) => boolean === true
			)
		);

		const keysOfBugContainerListAndItemComponentsSetToTrue = Object.keys(
			filterObject(
				{
					listViewComponentShouldDisplay:
						passedReduxState[BUG_CONTAINER].componentsDisplay
							.listViewComponentShouldDisplay,
					deleteModalComponentForListViewShouldDisplay:
						passedReduxState[BUG_CONTAINER].componentsDisplay
							.deleteModalComponentForListViewShouldDisplay,
					listViewCreateItemSidbarComponentShouldDisplay:
						passedReduxState[BUG_CONTAINER].componentsDisplay
							.listViewCreateItemSidbarComponentShouldDisplay,
					itemViewComponentShouldDisplay:
						passedReduxState[BUG_CONTAINER].componentsDisplay
							.itemViewComponentShouldDisplay,
					deleteModalComponentForItemViewShouldDisplay:
						passedReduxState[BUG_CONTAINER].componentsDisplay
							.deleteModalComponentForItemViewShouldDisplay,
					itemViewEditItemInfoComponentShouldDisplay:
						passedReduxState[BUG_CONTAINER].componentsDisplay
							.itemViewEditItemInfoComponentShouldDisplay,
				},
				(boolean) => boolean === true
			)
		);

		const breaksRuleThatOnlyOneContainerShouldHaveTrueBooleans =
			keysOfProjectContainerListAndItemComponentsSetToTrue.length > 0 &&
			keysOfBugContainerListAndItemComponentsSetToTrue.length > 0;

		const breaksRulesThatExactlyOneViewComponentBooleanShouldBeTrue =
			passedReduxState[PROJECT_CONTAINER].componentsDisplay
				.listViewComponentShouldDisplay +
				passedReduxState[PROJECT_CONTAINER].componentsDisplay
					.itemViewComponentShouldDisplay +
				passedReduxState[BUG_CONTAINER].componentsDisplay
					.listViewComponentShouldDisplay +
				passedReduxState[BUG_CONTAINER].componentsDisplay
					.itemViewComponentShouldDisplay !==
			1;

		// Fail Safe
		if (
			breaksRuleThatOnlyOneContainerShouldHaveTrueBooleans ||
			breaksRulesThatExactlyOneViewComponentBooleanShouldBeTrue
		) {
			if (breaksRuleThatOnlyOneContainerShouldHaveTrueBooleans) {
				console.log(
					"FAIL SAFE: " +
						getStringOfAllArrayValues(
							keysOfProjectContainerListAndItemComponentsSetToTrue,
							true
						) +
						" in 'PROJECT_CONTAINER' of the redux state were attempted to be set to true at the same as " +
						getStringOfAllArrayValues(
							keysOfBugContainerListAndItemComponentsSetToTrue,
							true
						) +
						" in 'BUG_CONTAINER' of the redux state, which goes against their intended use. So only 'listViewComponentShouldDisplay' in 'PROJECT_CONTAINER' will be set to true (since it is the default), while the rest will be set to false."
				);
			} else {
				console.log(
					"FAIL SAFE: Neither 'listViewComponentShouldDisplay' or 'itemViewComponentShouldDisplay' in both the 'PROJECT_CONTAINER' and 'BUG_CONTAINER' of the redux state were attempted to be set to true, which goes against their intended use. So only 'listViewComponentShouldDisplay' in 'PROJECT_CONTAINER' will be set true since it is the default."
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
