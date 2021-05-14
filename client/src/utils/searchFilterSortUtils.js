// Util uses container names to work with the redux state
import { PROJECT_CONTAINER } from "../actions/constants/containerNames";

import { dateToInt } from "./index";

/**
 * Takes an array of projects or bugs and returns it filtered to only items
 * that fit current searchFilterSort configuration the user has set
 *
 * @param {{
 * 	id: number,
 * 	account_id: (number|undefined),
 * 	project_id: (number|undefined),
 * 	name: string,
 * 	description: string,
 * 	location: (string|undefined),
 * 	priority_id: number,
 * 	status_id: number,
 * 	creation_date: string,
 * 	start_date: string,
 * 	due_date: (string|null),
 * 	completion_date: (string|null),
 * 	last_edited_timestamp: string,
 * 	priority_option: string,
 * 	status_option: string
 * }[]} projectsOrBugsArray - Array of projects or bugs
 * @param {{
 * 	searchKeyWordString: string,
 * 	sortAscending: boolean,
 * 	sortId: number,
 * 	priorityFilter: number[],
 * 	statusFilter: number[]
 * }} reduxSearchFilterSort - SearchFilterSort inside either project or bug
 * container of the redux state
 * @returns {{
 * 	id: number,
 * 	account_id: (number|undefined),
 * 	project_id: (number|undefined),
 * 	name: string,
 * 	description: string,
 * 	location: (string|undefined),
 * 	priority_id: number,
 * 	status_id: number,
 * 	creation_date: string,
 * 	start_date: string,
 * 	due_date: (string|null),
 * 	completion_date: (string|null),
 * 	last_edited_timestamp: string,
 * 	priority_option: string,
 * 	status_option: string
 * }[]} Array of projects or bugs filtered to only items that fit current
 * searchFilterSort configuration the user has set
 */
export function searchFilterSort(projectsOrBugsArray, reduxSearchFilterSort) {
	// Function is nest so it doesn't need to have reduxSearchFilterSort as a param
	function search(projectsOrBugsArray) {
		// Checks if searchKeyWordString contains more than just white spaces
		if (/\S/.test(reduxSearchFilterSort.searchKeyWordString)) {
			const keyWords = reduxSearchFilterSort.searchKeyWordString
				.toLowerCase()
				.split(/\s+/);
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
	}

	// Function is nest so it doesn't need to have reduxSearchFilterSort as a param
	function filter(projectsOrBugsArray) {
		return projectsOrBugsArray.filter((projectOrBug) => {
			return (
				// priorityFilter & statusFilter arrays include ids for
				// ...prioirties and statuses the user wants filtered out
				!reduxSearchFilterSort.priorityFilter.includes(
					projectOrBug.priority_id
				) &&
				!reduxSearchFilterSort.statusFilter.includes(projectOrBug.status_id)
			);
		});
	}

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
		}
	}

	// The order of these functions does not matter
	return sort(filter(search(projectsOrBugsArray)));
}

/**
 * Get list of projects or bugs (based on reduxContainerName param) filtered to
 * only have items that fit current searchFilterSort configuration the user has
 * set
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - Redux
 * container for which list and searchFilterSort to use
 * @returns {{
 * 	id: number,
 * 	account_id: (number|undefined),
 * 	project_id: (number|undefined),
 * 	name: string,
 * 	description: string,
 * 	location: (string|undefined),
 * 	priority_id: number,
 * 	status_id: number,
 * 	creation_date: string,
 * 	start_date: string,
 * 	due_date: (string|null),
 * 	completion_date: (string|null),
 * 	last_edited_timestamp: string,
 * 	priority_option: string,
 * 	status_option: string
 * }[]} List of projects or bugs filtered to only have items that fit current
 * searchFilterSort configuration the user has set
 */
export function getSearchedFilteredSortedList(
	passedReduxState,
	reduxContainerName
) {
	return searchFilterSort(
		// If PROJECT_CONTAINER, then pass project list. Otherwise pass bug
		// ...list with bugs not belonging to current project filtered out.
		reduxContainerName === PROJECT_CONTAINER
			? // Spread operator makes deep copy of list so original is not affected
			  [...passedReduxState[reduxContainerName].list]
			: [...passedReduxState[reduxContainerName].list].filter(
					(item) =>
						item.project_id ===
						passedReduxState[PROJECT_CONTAINER].componentsDisplay
							.itemViewCurrentItem.id
			  ),
		// PROJECT_CONTAINER & BUG_CONTAINER have different searchFilterSort
		passedReduxState[reduxContainerName].searchFilterSort
	);
}

/**
 * Get a deep copy of a filter array (either priorityFilter or statusFilter
 * based on filterName param) from searchFilterSort of either the project or 
 * bug container of redux state (based on reduxContainerName param) updated to
 * have the targetId added if it was not already present, or removed it it was.
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - Redux
 * container for which searchFilterSort to update
 * @param {("priorityFilter"|"statusFilter")} filterName - Which filter to 
 * update
 * @param {(number|string)} targetId - Number (or string of number) for which
 * prioirty/status id to add or remove from the filter
 * @returns
 */
export function getUpdatedDeepCopyFilterArray(
	passedReduxState,
	reduxContainerName,
	filterName,
	targetId
) {
	// Converting strings to numbers so priority/status filters contain a
	// ...single data type (for consistency)
	if (typeof targetId !== "number") {
		targetId = Number(targetId);
	}

	// Spread operator makes deep copy of list so original is not affected
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
