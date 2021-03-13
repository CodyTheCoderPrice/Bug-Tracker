import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
	getUpdatedDeepCopyFilterArray,
	getSearchFilterSortList,
	getBaseBackgroundAndTextColorClassNameForLightOrDarkMode,
} from "../../utils";

// Components
// Navbar
import Navbar from "./menu/Navbar";
// Account
import AccountBlurredBackground from "./account/AccountBlurredBackground";
import AccountSidebar from "./account/AccountSidebar";
import AccountModal from "./account/AccountModal";
// Projects & Bugs
import ListView from "./projects-bugs-shared/list/ListView";
import ItemView from "./projects-bugs-shared/item/ItemView";

export default function Home() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Updates list filters to match account settings on app start up or after
	// ...filter account settings have been changed
	useEffect(() => {
		// Won't set filter to settings if target item status is completed so
		// ...user is not confused where the target item went from the list
		if (
			reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem === null ||
			reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.status_id !==
				reduxState[PROJECT_CONTAINER].priorityStatusOptions
					.statusCompletionId &&
			reduxState[ACCOUNT_CONTAINER].settings
				.filter_completed_projects_by_default !==
				reduxState[PROJECT_CONTAINER].searchFilterSort.statusFilter.includes(
					reduxState[PROJECT_CONTAINER].priorityStatusOptions.statusCompletionId
				)
		) {
			dispatch(
				setProjectOrBugSearchFilterSort(PROJECT_CONTAINER, {
					...reduxState[PROJECT_CONTAINER].searchFilterSort,
					statusFilter: getUpdatedDeepCopyFilterArray(
						reduxState,
						PROJECT_CONTAINER,
						"statusFilter",
						reduxState[PROJECT_CONTAINER].priorityStatusOptions
							.statusCompletionId
					),
				})
			);
		}

		// Won't set filter to settings if target item status is completed so
		// ...user is not confused where the target item went from the list
		if (
			reduxState[BUG_CONTAINER].componentsDisplay.targetItem === null ||
			reduxState[BUG_CONTAINER].componentsDisplay.targetItem.status_id !==
				reduxState[BUG_CONTAINER].priorityStatusOptions.statusCompletionId &&
			reduxState[ACCOUNT_CONTAINER].settings
				.filter_completed_bugs_by_default !==
				reduxState[BUG_CONTAINER].searchFilterSort.statusFilter.includes(
					reduxState[BUG_CONTAINER].priorityStatusOptions.statusCompletionId
				)
		) {
			dispatch(
				setProjectOrBugSearchFilterSort(BUG_CONTAINER, {
					...reduxState[BUG_CONTAINER].searchFilterSort,
					statusFilter: getUpdatedDeepCopyFilterArray(
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

	// Updates list sort to match account settings on app start up or after
	// ...sort account settings have been changed
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

	// Updates mass delete list to not include items that are being searchFilterSorted out
	useEffect(() => {
		const verifyMassDeleteList = (reduxContainerName) => {
			if (reduxState[reduxContainerName].massDeleteList.length > 0) {
				const searchFilterSortListIds = getSearchFilterSortList(
					reduxState,
					reduxContainerName
				).map((item) => item.id);

				// Spread operator makes deep copy of list so original is not affected
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
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].searchFilterSort,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].searchFilterSort,
	]);

	// Closes general dropdowns whenever they are open and user anywhere
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
			onClick={closeDropdownsWhenOpen}
		>
			<Navbar />
			{/*Account components*/}
			{/*Displays blurred background when an account component is open*/}
			{Object.values(reduxState[ACCOUNT_CONTAINER].componentsDisplay).indexOf(
				true
			) > -1 ? (
				<AccountBlurredBackground />
			) : null}
			{reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ? (
				<AccountSidebar />
			) : null}
			{/*If any account component other than accountSidebar is true, display modal*/}
			{Object.values(reduxState[ACCOUNT_CONTAINER].componentsDisplay).indexOf(
				true
			) > -1 &&
			!reduxState[ACCOUNT_CONTAINER].componentsDisplay.accountSidebar ? (
				<AccountModal />
			) : null}
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
