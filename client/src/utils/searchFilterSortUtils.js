// Util uses container names to work with the redux state
import { PROJECT_CONTAINER } from "../actions/constants/containerNames";
import { dateToInt } from "./index";

/**
 * Takes an array of projects or bugs and returns it filtered to only have items
 * that fit the current searchFilterSort configuration (i.e. 'searchFilterSort' 
 * property's Object in 'PROJECT_CONTAINER' or 'BUG_CONTAINER' of the redux state)
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
 * }} reduxSearchFilterSort - 'searchFilterSort' property's Object inside either 
 * 'PROJECT_CONTAINER' or 'BUG_CONTAINER' of the redux state
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
 * }[]} Array of projects or bugs filtered to only have items that fit current
 * searchFilterSort configuration
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
 * only have items that fit current searchFilterSort configuration (i.e. 
 * 'searchFilterSort' property's Object in 'PROJECT_CONTAINER' or 'BUG_CONTAINER' of
 * the redux state)
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - Redux 
 * container (i.e. 'PROJECT_CONTAINER' or 'BUG_CONTAINER') for which 'list' and
 * 'searchFilterSort' properties to use
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
 * searchFilterSort configuration
 */
export function getSearchedFilteredSortedList(
	passedReduxState,
	reduxContainerName
) {
	return searchFilterSort(
		// If 'PROJECT_CONTAINER', then passes list of projects. Otherwise passes
		// ...list of bugs (only with bugs belonging to non-filtered-out projects).
		reduxContainerName === PROJECT_CONTAINER
			? // Spread operator makes deep copy of list so original is not affected
			  [...passedReduxState[reduxContainerName].list]
			: [...passedReduxState[reduxContainerName].list].filter(
					(item) =>
						item.project_id ===
						passedReduxState[PROJECT_CONTAINER].componentsDisplay
							.itemViewCurrentItem.id
			  ),
		// 'PROJECT_CONTAINER' & 'BUG_CONTAINER' have different searchFilterSort
		passedReduxState[reduxContainerName].searchFilterSort
	);
}

/**
 * Gets a deep copy of either 'priorityFilter' or 'statusFilter' (based on 
 * filterName param) proprty's Object in 'searchFilterSort' property's Object
 * in either 'PROJECT_CONTAINER' or 'BUG_CONTAINER' (based on reduxContainerName 
 * param) of the redux state updated to have targetId param value added if not
 * present, or removed it it was present.
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - Redux
 * container (i.e. 'PROJECT_CONTAINER' or 'BUG_CONTAINER') for which 
 * 'searchFilterSort' property to update
 * @param {("priorityFilter"|"statusFilter")} filterName - Which filter to 
 * update
 * @param {(number|string)} targetId - Number (or string of number) for which
 * prioirty/status id to add or remove from the filter
 * @returns
 */
export function getUpdatedFilterArray(
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
