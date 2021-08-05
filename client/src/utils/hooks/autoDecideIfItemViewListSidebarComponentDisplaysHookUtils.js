import { useEffect } from "react";
import { useDispatch } from "react-redux";
// Util uses container names to work with the redux state
import {
	GENERAL_CONTAINER,
	SIZE_CONTAINER,
} from "../../actions/constants/containerNames";
import { setWhichGeneralComponentsDisplay } from "../../actions";
import { getWindowSize } from "../index";

/**
 * Custom hook that adds auto-deciding functionality to whether the
 * ItemViewListSidebar component's 'list-sidebar-container' (className) element
 * should be expanded (i.e. have the 'list-sidebar-container--expanded' modifier
 * appended), based on if current window size is wide enough to both expand the
 * 'list-sidebar-container' element and have the ItemView component to display 
 * an item's info. This functionality will only take place during any given 
 * session while the 'itemViewListSidebarComponentContainerElementExpandedUserSet'
 * property in 'componentsDisplay' property's object in GENERAL_CONTAINER of the 
 * redux state is false (i.e. until the user manually expands or minimizes the 
 * 'list-sidebar-container' element). This hook changes whether the 
 * 'list-sidebar-container' element is expanded or not by changing the
 * 'itemViewListSidebarComponentContainerElementExpanded' property in the 
 * GENERAL_CONTAINER of the redux state.
 *
 * Note: The purpose of this custom hook is to be used by the ItemView component
 * to make the ItemViewListSidebar component more user friendly, as when the
 * window size gets too narrow, it being expanded can inhibit seeing an item's 
 * info, which would likely annoy the user. However, it's also likely that once 
 * the user manually expands or minimizes the 'list-sidebar-container' element 
 * during any given session, that they would expect it to remain that way for 
 * the remainder of the session, unless they personally change it, which is why
 * the auto-decide functionality only takes place until the user manually expands
 * or minimizes it.
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 *
 * @example
 * useAutoDecideIfItemViewListSidebarComponentDisplays(
 * 	reduxState
 * );
 */
export function useAutoDecideIfItemViewListSidebarComponentDisplays(
	passedReduxState
) {
	const dispatch = useDispatch();

	useEffect(() => {
		// Only runs while the user has not manually openned or closed the
		// ...ItemViewListSidebar component. Also won't run while needed sizes
		// ...in redux state for calculations are null, but thanks to them being
		// ...in the optimization below, once they are set, this will run
		if (
			passedReduxState[GENERAL_CONTAINER].componentsDisplay
				.itemViewListSidebarComponentContainerElementExpandedUserSet ===
				false &&
			passedReduxState[SIZE_CONTAINER].constants
				.itemViewListSidebarComponentContainerElementWithExpandedModifierWidth !==
				null &&
			passedReduxState[SIZE_CONTAINER].constants
				.itemViewComponentPaddingContainerElementLeftPadding !== null &&
			passedReduxState[SIZE_CONTAINER].constants
				.itemViewComponentOuterDividingContainerElementMinWidth !== null
		) {
			// Not included in if statement condition above, since it would also
			// ...require including passedReduxState[SIZE_CONTAINER].variables
			// ...in the optimization, which would cause a re-run during every
			// ...window resize, which is inefficient, as the code inside this
			// ...if statement only needs to run once per each time the ItemView
			// ...component is openned. To get around this, if it is null, then
			// ...the windowSize is instead calculated on the spot.
			const windowSize =
				passedReduxState[SIZE_CONTAINER].variables.window !== null
					? passedReduxState[SIZE_CONTAINER].variables.window
					: getWindowSize();

			const minWidthNeededForNoItemBoxOverflow =
				passedReduxState[SIZE_CONTAINER].constants
					.itemViewComponentPaddingContainerElementLeftPadding *
					2 +
				passedReduxState[SIZE_CONTAINER].constants
					.itemViewComponentOuterDividingContainerElementMinWidth;

			dispatch(
				setWhichGeneralComponentsDisplay({
					...passedReduxState[GENERAL_CONTAINER].componentsDisplay,
					itemViewListSidebarComponentContainerElementExpanded:
						windowSize.width -
							passedReduxState[SIZE_CONTAINER].constants
								.itemViewListSidebarComponentContainerElementWithExpandedModifierWidth >=
						minWidthNeededForNoItemBoxOverflow,
				})
			);
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		passedReduxState[SIZE_CONTAINER].constants,
	]);
}
