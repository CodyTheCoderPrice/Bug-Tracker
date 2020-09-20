import { PROJECT_CONTAINER, BUG_CONTAINER } from "./typeContainer";
import { SET_PROJECTS_SEARCH_FILTER_SORT, SET_MASS_DELETE_LIST } from "./types";

export const setProjectOrBugMassDeleteList = (
	containerName,
	massDeleteList
) => (dispatch) => {
	switch (containerName) {
		case "projectContainer":
			dispatch({
				container: PROJECT_CONTAINER,
				type: SET_MASS_DELETE_LIST,
				list: massDeleteList,
			});
			break;
		case "bugContainer":
			dispatch({
				container: BUG_CONTAINER,
				type: SET_MASS_DELETE_LIST,
				list: massDeleteList,
			});
			break;
	}
};

export const setProjectOrBugSearchFilterSort = (
	containerName,
	searchFilterSort
) => (dispatch) => {
	switch (containerName) {
		case "projectContainer":
			dispatch({
				container: PROJECT_CONTAINER,
				type: SET_PROJECTS_SEARCH_FILTER_SORT,
				searchFilterSort: searchFilterSort,
			});
			break;
		case "bugContainer":
			dispatch({
				container: BUG_CONTAINER,
				type: SET_PROJECTS_SEARCH_FILTER_SORT,
				searchFilterSort: searchFilterSort,
			});
			break;
	}
};
