import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../actions/constants/containerNames";
import {
	setWhichGeneralDropdownsDisplay,
	setProjectOrBugSearchFilterSort,
	setProjectOrBugMassDeleteList,
} from "../../actions";
import {
	getUpdatedFilterArray,
	getSearchedFilteredSortedList,
	getBaseBackgroundAndTextColorClassNameForLightOrDarkMode,
} from "../../utils";
// Other components used by this component
import Navbar from "./menu/Navbar";
import AccountBlurredBackground from "./account/AccountBlurredBackground";
import AccountSidebar from "./account/AccountSidebar";
import AccountModal from "./account/AccountModal";
import ListView from "./projects-bugs-shared/list/ListView";
import ItemView from "./projects-bugs-shared/item/ItemView";

/**
 * React functional component used as a hub to display components available to
 * a logged in user. Component will always have the Navbar component displayed 
 * at the top. The account components will be displayed if the user opens them. 
 * Below the Navbar will always be be displayed either the ListView (project),
 * ListView (bug), ItemView (project), or ItemView (bug) component based on 
 * which the user has selected to be open at any given point in time (only one
 * may be displaed at a time).
 *
 * The flag for displaying this component is intended to be 'home' property
 * of 'componentsDisplay' Object in GENERAL_CONTAINER of redux state.
 * This component should only be used inside the App component, and is not 
 * intended to be displayed while either the Login or Register components are 
 * also displayed. This component should only be displayed if an account is 
 * logged in.
 *
 * @component
 */
export default function Home() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Updates statusFilter in project/bug searchFilterSort to match account
	// ...settings on app start-up/refresh, or after settings have been changed
	useEffect(() => {
		// Won't set statusFilter to match settings if itemViewCurrentItem has
		// ...completed status (can only happen on refresh), otherwise it will
		// ...disappear which is confusing for the user
		if (
			reduxState[ACCOUNT_CONTAINER].settings
				.filter_completed_projects_by_default !==
				reduxState[PROJECT_CONTAINER].searchFilterSort.statusFilter.includes(
					reduxState[PROJECT_CONTAINER].priorityStatusOptions.statusCompletionId
				) &&
			(reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
				null ||
				reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem
					.status_id !==
					reduxState[PROJECT_CONTAINER].priorityStatusOptions
						.statusCompletionId)
		) {
			dispatch(
				setProjectOrBugSearchFilterSort(PROJECT_CONTAINER, {
					...reduxState[PROJECT_CONTAINER].searchFilterSort,
					statusFilter: getUpdatedFilterArray(
						reduxState,
						PROJECT_CONTAINER,
						"statusFilter",
						reduxState[PROJECT_CONTAINER].priorityStatusOptions
							.statusCompletionId
					),
				})
			);
		}

		// Won't set statusFilter to match settings if itemViewCurrentItem has
		// ...completed status (can only happen on refresh), otherwise it will
		// ...disappear which is confusing for the user
		if (
			reduxState[ACCOUNT_CONTAINER].settings
				.filter_completed_bugs_by_default !==
				reduxState[BUG_CONTAINER].searchFilterSort.statusFilter.includes(
					reduxState[BUG_CONTAINER].priorityStatusOptions.statusCompletionId
				) &&
			(reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem ===
				null ||
				reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem
					.status_id !==
					reduxState[BUG_CONTAINER].priorityStatusOptions.statusCompletionId)
		) {
			dispatch(
				setProjectOrBugSearchFilterSort(BUG_CONTAINER, {
					...reduxState[BUG_CONTAINER].searchFilterSort,
					statusFilter: getUpdatedFilterArray(
						reduxState,
						BUG_CONTAINER,
						"statusFilter",
						reduxState[BUG_CONTAINER].priorityStatusOptions.statusCompletionId
					),
				})
			);
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[ACCOUNT_CONTAINER].settings.filter_completed_projects_by_default,
		// eslint-disable-next-line
		reduxState[ACCOUNT_CONTAINER].settings.filter_completed_bugs_by_default,
	]);

	// Updates sortId & sortAscending in project/bug searchFilterSort to match
	// ...account settings on app start-up/refresh, or after settings have been
	// ...changed
	useEffect(() => {
		if (
			reduxState[ACCOUNT_CONTAINER].settings.project_sort_id !==
				reduxState[PROJECT_CONTAINER].searchFilterSort.sortId ||
			reduxState[ACCOUNT_CONTAINER].settings.project_sort_ascending !==
				reduxState[PROJECT_CONTAINER].searchFilterSort.sortAscending
		) {
			dispatch(
				setProjectOrBugSearchFilterSort(PROJECT_CONTAINER, {
					...reduxState[PROJECT_CONTAINER].searchFilterSort,
					sortId: reduxState[ACCOUNT_CONTAINER].settings.project_sort_id,
					sortAscending:
						reduxState[ACCOUNT_CONTAINER].settings.project_sort_ascending,
				})
			);
		}

		if (
			reduxState[ACCOUNT_CONTAINER].settings.bug_sort_id !==
				reduxState[BUG_CONTAINER].searchFilterSort.sortId ||
			reduxState[ACCOUNT_CONTAINER].settings.bug_sort_ascending !==
				reduxState[BUG_CONTAINER].searchFilterSort.sortAscending
		) {
			dispatch(
				setProjectOrBugSearchFilterSort(BUG_CONTAINER, {
					...reduxState[BUG_CONTAINER].searchFilterSort,
					sortId: reduxState[ACCOUNT_CONTAINER].settings.bug_sort_id,
					sortAscending:
						reduxState[ACCOUNT_CONTAINER].settings.bug_sort_ascending,
				})
			);
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[ACCOUNT_CONTAINER].settings.project_sort_id,
		// eslint-disable-next-line
		reduxState[ACCOUNT_CONTAINER].settings.project_sort_ascending,
		// eslint-disable-next-line
		reduxState[ACCOUNT_CONTAINER].settings.bug_sort_id,
		// eslint-disable-next-line
		reduxState[ACCOUNT_CONTAINER].settings.bug_sort_ascending,
	]);

	// Updates mass delete list to not include any project/bug items that have
	// ...just been searchFilterSorted out, so the user does not accidentally
	// ...delete items that are no longer visible on the ListView
	useEffect(() => {
		const verifyMassDeleteList = (reduxContainerName) => {
			if (reduxState[reduxContainerName].massDeleteList.length > 0) {
				const searchFilterSortListIds = getSearchedFilteredSortedList(
					reduxState,
					reduxContainerName
				).map((item) => item.id);

				// Creating deep copy of list so original stays unaffected
				const verifiedMassDeleteList = [
					...reduxState[reduxContainerName].massDeleteList,
				].filter((id) => searchFilterSortListIds.includes(id));

				if (
					verifiedMassDeleteList.length !==
					reduxState[reduxContainerName].massDeleteList.length
				) {
					dispatch(
						setProjectOrBugMassDeleteList(
							reduxContainerName,
							verifiedMassDeleteList
						)
					);
				}
			}
		};

		verifyMassDeleteList(PROJECT_CONTAINER);
		verifyMassDeleteList(BUG_CONTAINER);
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].searchFilterSort,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].searchFilterSort,
	]);

	/**
	 * Gets whether AccountModal component should display, based on if any of
	 * the five modal components that are children of AccountModal are set to 
	 * true in ACCOUNT_CONTAINER of the redux state.
	 *
	 * @returns {Boolean} Whether the AccountModal component should display
	 */
	const getShouldAccountModalDisplay = () => {
		return (
			reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountModalEditInfo ||
			reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountModalEditEmail ||
			reduxState[ACCOUNT_CONTAINER].componentsDisplay
				.accountModalEditPassword ||
			reduxState[ACCOUNT_CONTAINER].componentsDisplay
				.accountModalDeleteAccount ||
			reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountModalEditSettings
		);
	};

	/**
	 * If any dropdown components (managed within GENERAL_CONTAINER of redux
	 * state) are open, this function will close them.
	 */
	const closeDropdownsWhenOpen = () => {
		if (
			Object.values(reduxState[GENERAL_CONTAINER].dropdownsDisplay).indexOf(
				true
			) > -1
		) {
			dispatch(setWhichGeneralDropdownsDisplay({}));
		}
	};

	return (
		<div
			className={
				"home-container" +
				getBaseBackgroundAndTextColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				)
			}
			/*Closes open dropdowns whenever the user clicks anywhere away 
			from the dropdown*/
			onClick={closeDropdownsWhenOpen}
		>
			{/*Below component order doesn't matter due to how css was written*/}
			<Navbar />
			{Object.values(reduxState[ACCOUNT_CONTAINER].componentsDisplay).indexOf(
				true
			) > -1 ? (
				<AccountBlurredBackground />
			) : null}
			{reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ? (
				<AccountSidebar />
			) : null}
			{getShouldAccountModalDisplay() ? <AccountModal /> : null}
			{/*Project components*/}
			{reduxState[PROJECT_CONTAINER].componentsDisplay.listView ? (
				<ListView reduxContainerName={PROJECT_CONTAINER} />
			) : null}
			{reduxState[PROJECT_CONTAINER].componentsDisplay.itemView ? (
				<ItemView reduxContainerName={PROJECT_CONTAINER} />
			) : null}
			{/*Bug components*/}
			{reduxState[BUG_CONTAINER].componentsDisplay.listView ? (
				<ListView reduxContainerName={BUG_CONTAINER} />
			) : null}
			{reduxState[BUG_CONTAINER].componentsDisplay.itemView ? (
				<ItemView reduxContainerName={BUG_CONTAINER} />
			) : null}
		</div>
	);
}
