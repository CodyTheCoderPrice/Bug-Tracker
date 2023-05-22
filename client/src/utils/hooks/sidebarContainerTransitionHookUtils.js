import { useState, useEffect } from "react";

/**
 * Custom hook used to get an Object containing two booleans used to give
 * transition animations to AccountSidebar and ListViewCreateItemSidebar
 * components
 *
 * Note: The purpose of this custom hook is to be used by AccountSidebar and
 * ListViewCreateItemSidebar components to an Object containing two variables.
 * The first (i.e. shouldExistInDom) is used to tell the component when its
 * 'sidebar-container' element should exist in the DOM. The second (i.e.
 * shouldBeMinimized) is used to tell the component when its 'side-container'
 * element should have the 'sidebar-container--minimized' modifier className.
 *
 * @param {boolean} componentShouldDisplayLogic - when should the component display
 * @returns {{
 * 	shouldExistInDom: boolean,
 * 	shouldBeMinimized: boolean
 * }} Object used to give transition animations
 *
 * @example
 * // Intended for AccountSidebar component
 * useSidebarContainerTransitionHookUtils(reduxState[ACCOUNT_CONTAINER]
 * .componentsDisplay.accountSidebarComponentShouldDisplay);
 *
 * @example
 * // Intended for ListViewCreateItemSidebar component to create projects
 * useSidebarContainerTransitionHookUtils(reduxState[PROJECT_CONTAINER]
 * .componentsDisplay.listViewCreateItemSidbarComponentShouldDisplay);
 *
 * @example
 * // Intended for ListViewCreateItemSidebar component to create bugss
 * useSidebarContainerTransitionHookUtils(reduxState[BUG_CONTAINER]
 * .componentsDisplay.listViewCreateItemSidbarComponentShouldDisplay);
 */
export function useSidebarContainerTransitionHookUtils(
	componentShouldDisplayLogic
) {
	const [siderbarContainerDomStatus, setSidebarContainerDomStatus] = useState({
		shouldExist: componentShouldDisplayLogic,
		shouldLingerForFadeOut: false,
	});

	// Width needs to initally be set to zero so the first transition can work
	const [
		sidebarContainerInitialWidthSetToZero,
		setSidebarContainerInitialWidthSetToZero,
	] = useState(false);

	// Updates siderbarContainerDomStatus
	useEffect(() => {
		const sidebarContainerLingerLogic =
			siderbarContainerDomStatus.shouldExist &&
			!siderbarContainerDomStatus.shouldLingerForFadeOut &&
			!componentShouldDisplayLogic;

		setSidebarContainerDomStatus({
			shouldExist: componentShouldDisplayLogic || sidebarContainerLingerLogic,
			shouldLingerForFadeOut: sidebarContainerLingerLogic,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		// eslint-disable-next-line react-hooks/exhaustive-deps
		componentShouldDisplayLogic,
	]);

	// Updates sidebarContainerInitialWidthSetToZero
	useEffect(() => {
		// Since this state takes 1 cycle to update, it gives the 'sidebar container'
		// ...element enought time to first set its width to zero
		setSidebarContainerInitialWidthSetToZero(
			siderbarContainerDomStatus.shouldExist && componentShouldDisplayLogic
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		siderbarContainerDomStatus,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		componentShouldDisplayLogic,
	]);

	return {
		shouldExistInDom: siderbarContainerDomStatus.shouldExist,
		shouldBeMinimized:
			!sidebarContainerInitialWidthSetToZero || !componentShouldDisplayLogic,
	};
}
