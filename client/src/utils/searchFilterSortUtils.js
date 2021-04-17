// This util imports container names as it works with the redux state
import {
	PROJECT_CONTAINER,
} from "../actions/constants/containerNames";

import { dateToInt } from "./index";

/**
 * Takes an array of projects or bugs and returns it filtered to only items 
 * that fit current searchFilterSort configuration the user has set
 * 
 * @param {Object[]} projectsOrBugsArray - Array of projects or bugs
 * @param {JSON} reduxSearchFilterSort - SearchFilterSort inside either project
 * or bug container of the redux state
 * @returns {Object[]} Array of projects or bugs filtered to only items that 
 * fit current searchFilterSort configuration the user has set
 */
 export function searchFilterSort(projectsOrBugsArray, reduxSearchFilterSort) {

	// Function is nest so it doesn't need to have reduxSearchFilterSort as a param
	function search(projectsOrBugsArray) {
		// Checks if searchKeyWordString contains more than just white spaces
		if (/\S/.test(reduxSearchFilterSort.searchKeyWordString)) {
			const keyWords = reduxSearchFilterSort.searchKeyWordString.toLowerCase().split(/\s+/);
			// eslint-disable-next-line
			return projectsOrBugsArray.filter((projectOrBug) => {
				for (let word of keyWords) {
					// Filters projectsOrBugsArray to only items that have at
					// ...least one of the key word's in its name
					if (projectOrBug.name.toLowerCase().includes(word)) {
						return true;
					}
				}
			});
		} else {
			return projectsOrBugsArray;
		}
	};

	// Function is nest so it doesn't need to have reduxSearchFilterSort as a param
	function filter(projectsOrBugsArray) {
		return projectsOrBugsArray.filter((projectOrBug) => {
			return (
				// priorityFilter & statusFilter arrays include ids for 
				// ...prioirties and statuses the user wants filtered out
				!reduxSearchFilterSort.priorityFilter.includes(projectOrBug.priority_id) &&
				!reduxSearchFilterSort.statusFilter.includes(projectOrBug.status_id)
			);
		});
	};

	// Function is nest so it doesn't need to have reduxSearchFilterSort as a param
	function sort(projectsOrBugsArray) {
		if (reduxSearchFilterSort.sortAscending) {
			switch (reduxSearchFilterSort.sortId) {
				case 1:
					return projectsOrBugsArray.sort((a, b) => {
						return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
					});
				case 2:
					return projectsOrBugsArray.sort((a, b) => {
						return a.status_id - b.status_id;
					});
				case 3:
					return projectsOrBugsArray.sort((a, b) => {
						return a.priority_id - b.priority_id;
					});
				// Dates have the soonest date considered as sorted by ascending
				case 4:
					return projectsOrBugsArray.sort((a, b) => {
						return dateToInt(b.creation_date) - dateToInt(a.creation_date);
					});
				case 5:
					return projectsOrBugsArray.sort((a, b) => {
						return dateToInt(b.start_date) - dateToInt(a.start_date);
					});
				case 6:
					return projectsOrBugsArray.sort((a, b) => {
						return dateToInt(b.due_date) - dateToInt(a.due_date);
					});
				default:
					return projectsOrBugsArray;
			}
		} else {
			switch (reduxSearchFilterSort.sortId) {
				case 1:
					return projectsOrBugsArray.sort((a, b) => {
						return b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1;
					});
				case 2:
					return projectsOrBugsArray.sort((a, b) => {
						return b.status_id - a.status_id;
					});
				case 3:
					return projectsOrBugsArray.sort((a, b) => {
						return b.priority_id - a.priority_id;
					});
				// Dates have the oldest date considered as sorted by descending
				case 4:
					return projectsOrBugsArray.sort((a, b) => {
						return dateToInt(a.creation_date) - dateToInt(b.creation_date);
					});
				case 5:
					return projectsOrBugsArray.sort((a, b) => {
						return dateToInt(a.start_date) - dateToInt(b.start_date);
					});
				case 6:
					return projectsOrBugsArray.sort((a, b) => {
						return dateToInt(a.due_date) - dateToInt(b.due_date);
					});
				default:
					return projectsOrBugsArray;
			}
		}
	};

	// The order of these functions does not matter
	return sort(filter(search(projectsOrBugsArray)));
}

/**
 * Get list of projects or bugs (depending on reduxContainerName parameter) 
 * filtered to only have items that fit current searchFilterSort configuration
 * the user has set
 * 
 * @param {JSON} passedReduxState - Current redux state from useSelector
 * @param {String} reduxContainerName - Redux container (either 
 * props.reduxContainerName, PROJECT_CONTAINER, or BUG_CONTAINER) for which 
 * list and searchFilterSort to use
 * @returns {Object[]} List of projects or bugs filtered to only have items that fit 
 * current searchFilterSort configuration the user has set
 */
export function getSearchedFilteredSortedList(passedReduxState, reduxContainerName) {
	return searchFilterSort(
		// If PROJECT_CONTAINER, then pass project list. Otherwise pass bug 
		// ...list with bugs not belonging to current project filtered out.
		reduxContainerName === PROJECT_CONTAINER
			? // Spread operator makes deep copy of list so original is not affected
			  [...passedReduxState[reduxContainerName].list]
			: [...passedReduxState[reduxContainerName].list].filter(
					(item) =>
						item.project_id ===
						passedReduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem.id
			  ),
		// PROJECT_CONTAINER & BUG_CONTAINER have different searchFilterSort
		passedReduxState[reduxContainerName].searchFilterSort
	);
};

/**
 * Get a deep copy of a filter array (either priorityFilter or statusFilter) from either the project or bug containers searchFilterSort
 * 
 * @param {JSON} passedReduxState - Current redux state from useSelector
 * @param {String} reduxContainerName - Redux container for which 
 * searchFilterSort to update (either props.reduxContainerName, 
 * PROJECT_CONTAINER, or BUG_CONTAINER)
 * @param {String} filterName - Which filter to update (either priorityFilter or statusFilter)
 * @param {(Number|String)} targetId - Number (or string of number) for which 
 * prioirty/status id to add or remove from the filter
 * @returns 
 */
export function getUpdatedDeepCopyFilterArray(passedReduxState, reduxContainerName, filterName, targetId) {
	if (typeof targetId !== "number") {
		targetId = Number(targetId);
	}

	/* ADD TRY CATCH */
	let deepCopyFilterArray = [
		...passedReduxState[reduxContainerName].searchFilterSort[filterName],
	];
	const index = deepCopyFilterArray.indexOf(targetId);

	if (index === -1) {
		deepCopyFilterArray.push(targetId);
	} else {
		deepCopyFilterArray.splice(index, 1);
	}

	return deepCopyFilterArray;
}
