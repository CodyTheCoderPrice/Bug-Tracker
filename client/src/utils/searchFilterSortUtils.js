// Util uses container names to work with the redux state
import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	GENERAL_CONTAINER,
} from "../actions/constants/containerNames";
import {
	dateToInt,
	getStatusIdForCompletedProjects,
	getStatusIdForClosedBugs,
	getSortIdForStatus,
} from "./index";

/**
 * Takes an array of projects or bugs and returns it filtered according to
 * searchKeyWordString parameter (e.g. as can be found in 'searchFilterSort'
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
 * @param {string} searchKeyWordString - string of words of which one must be
 * present in an items name
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
 * }[]} Array of projects or bugs and returns it filtered according to
 * searchKeyWordString parameter
 */
function search(projectsOrBugsArray, searchKeyWordString) {
	// Checks if searchKeyWordString contains more than just white spaces
	if (/\S/.test(searchKeyWordString)) {
		const keyWords = searchKeyWordString.toLowerCase().split(/\s+/);
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

/**
 * Takes an array of projects or bugs and returns it filtered according to
 * priorityFilter and statusFilter parameters (e.g. as can be found in 'searchFilterSort'
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
 * @param {number[]} priorityFilter - Array of priority ids to be filtered out
 * @param {number[]} statusFilter - Array of status ids to be filtered out
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
 * }[]} Array of projects or bugs and returns it filtered according to
 * priorityFilter and statusFilter parameters
 */
function filter(projectsOrBugsArray, priorityFilter, statusFilter) {
	return projectsOrBugsArray.filter((projectOrBug) => {
		return (
			// priorityFilter & statusFilter arrays include ids for
			// ...prioirties and statuses the user wants filtered out
			!priorityFilter.includes(projectOrBug.priority_id) &&
			!statusFilter.includes(projectOrBug.status_id)
		);
	});
}

/**
 * Takes an array of projects or bugs and returns it sorted according to
 * sortAscending and sortId parameters (e.g. as can be found in 'searchFilterSort'
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
 * @param {boolean} sortAscending - Should list be sorted in ascending order
 * @param {number} sortId - Id for how the list will be sorted (i.e. 1=name's case,
 * 2=status_id, 3=priority_id, 4=creation_date, 5=start_date, 6=due_date)
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
 * }[]} Array of projects or bugs and returns it sorted according to
 * sortAscending and sortId parameters
 */
function sort(projectsOrBugsArray, sortAscending, sortId) {
	if (sortAscending) {
		switch (sortId) {
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
		switch (sortId) {
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

/**
 * Takes an array of projects or bugs and returns it containing only items that
 * fit the current searchFilterSort configuration (i.e. 'searchFilterSort'
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
 * }[]} Array of projects or bugs containing only items that fit current
 * searchFilterSort configuration
 */
export function searchFilterSort(projectsOrBugsArray, reduxSearchFilterSort) {
	// The order of these functions does not matter
	return sort(
		filter(
			search(projectsOrBugsArray, reduxSearchFilterSort.searchKeyWordString),
			reduxSearchFilterSort.priorityFilter,
			reduxSearchFilterSort.statusFilter
		),
		reduxSearchFilterSort.sortAscending,
		reduxSearchFilterSort.sortId
	);
}

/**
 * Get list of projects containing only those that fit current searchFilterSort
 * configuration (i.e. 'searchFilterSort' property's Object in 'PROJECT_CONTAINER'
 * of the redux state)
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @returns {{
 * 	id: number,
 * 	account_id: (number|undefined),
 * 	name: string,
 * 	description: string,
 * 	priority_id: number,
 * 	status_id: number,
 * 	creation_date: string,
 * 	start_date: string,
 * 	due_date: (string|null),
 * 	completion_date: (string|null),
 * 	last_edited_timestamp: string,
 * 	priority_option: string,
 * 	status_option: string
 * }[]} List of projects containing only items that fit current searchFilterSort
 * configuration
 */
export function getSearchedFilteredSortedProjectList(passedReduxState) {
	return searchFilterSort(
		// Spread operator makes deep copy of list so original is not affected
		[...passedReduxState[PROJECT_CONTAINER].list],
		// 'PROJECT_CONTAINER' & 'BUG_CONTAINER' have different
		// ...'searchFilterSort' objects
		passedReduxState[PROJECT_CONTAINER].searchFilterSort
	);
}

/**
 * Get list bugs containing only items that fit current searchFilterSort
 * configuration (i.e. 'searchFilterSort' property's Object in 'BUG_CONTAINER'
 * of the redux state)
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @param {(Object|undefined)} specificProject - The specific project from whose bug
 * list is to be returned. If undefined, then the bug list of the currently selected
 * project with be returned.
 * @returns {{
 * 	id: number,
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
 * }[]} List of bugs containing only items that fit current searchFilterSort
 * configuration
 */
export function getSearchedFilteredSortedBugList(
	passedReduxState,
	specificProject
) {
	if (
		passedReduxState[PROJECT_CONTAINER].componentsDisplay
			.itemViewCurrentItem === null &&
		specificProject === undefined
	) {
		return [];
	} else {
		return searchFilterSort(
			// Spread operator makes deep copy of list so original is not affected.
			[...passedReduxState[BUG_CONTAINER].list].filter(
				(item) =>
					item.project_id ===
					(specificProject !== undefined
						? specificProject.id
						: passedReduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewCurrentItem.id)
			),
			// 'PROJECT_CONTAINER' & 'BUG_CONTAINER' have different
			// ...'searchFilterSort' objects
			passedReduxState[BUG_CONTAINER].searchFilterSort
		);
	}
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
 * }[]} List of projects or bugs containing only items that fit current
 * searchFilterSort configuration
 */
export function getSearchedFilteredSortedList(
	passedReduxState,
	reduxContainerName
) {
	return reduxContainerName === PROJECT_CONTAINER
		? getSearchedFilteredSortedProjectList(passedReduxState)
		: getSearchedFilteredSortedBugList(passedReduxState);
}

/**
 * Get list of projects for the NavPanelButtonList component. The list is sorted
 * ascending by status and closed projectss will be filtered out unless
 * 'navPanelButtonListComponentShouldIncludeCompletedProjects' property in the
 * 'GENERAL_CONTAINER' container of the redux state is true.
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @returns {{
 * 	id: number,
 * 	account_id: (number|undefined),
 * 	name: string,
 * 	description: string,
 * 	priority_id: number,
 * 	status_id: number,
 * 	creation_date: string,
 * 	start_date: string,
 * 	due_date: (string|null),
 * 	completion_date: (string|null),
 * 	last_edited_timestamp: string,
 * 	priority_option: string,
 * 	status_option: string
 * }[]} List of projects sorted ascending by status and comnpleted projects
 * potentially filtered out
 */
export function getProjectListForNavPanelButtonList(passedReduxState) {
	// The order of these functions does not matter
	return sort(
		filter(
			// Spread operator makes deep copy of list so original is not affected
			[...passedReduxState[PROJECT_CONTAINER].list],
			// We don't want any priorities to be filtered out
			[],
			passedReduxState[GENERAL_CONTAINER].componentsDisplay
				.navPanelButtonListComponentShouldIncludeCompletedProjects
				? []
				: [getStatusIdForCompletedProjects()]
		),
		true,
		getSortIdForStatus()
	);
}

/**
 * Get list of bugs for the NavPanelButtonList component. The list is sorted
 * ascending by status and closed bugs will be filtered out unless
 * 'navPanelButtonListComponentShouldIncludeClosedBugs' property in the
 * 'GENERAL_CONTAINER' container of the redux state is true.
 *
 * @param {Object} passedReduxState - Current redux state from
 * useSelector((state) => state)
 * @returns {{
 * 	id: number,
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
 * }[]} List of bugs sorted ascending by status and closed bugs potentially
 * filtered out
 */
export function getBugListForNavPanelButtonList(passedReduxState) {
	return passedReduxState[PROJECT_CONTAINER].componentsDisplay
		.itemViewCurrentItem === null
		? []
		: // The order of these functions does not matter
		  sort(
				filter(
					// Spread operator makes deep copy of list so original is not affected
					[...passedReduxState[BUG_CONTAINER].list].filter(
						(item) =>
							item.project_id ===
							passedReduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewCurrentItem.id
					),
					// We don't want any priorities to be filtered out
					[],
					passedReduxState[GENERAL_CONTAINER].componentsDisplay
						.navPanelButtonListComponentShouldIncludeClosedBugs
						? []
						: [getStatusIdForClosedBugs()]
				),
				true,
				getSortIdForStatus()
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
