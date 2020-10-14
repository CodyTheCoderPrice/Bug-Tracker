import { dateToInt } from "./dateUtils";

export function searchFilterSort(projectsOrBugsArray, state) {
	// Functions are nest inside so they do not need to be passed the state
	const search = (projectsOrBugsArray) => {
		// Makes sure searchKeyWordString contains not just white spaces
		if (/\S/.test(state.searchKeyWordString)) {
			const keyWords = state.searchKeyWordString.toLowerCase().split(/\s+/);
			return projectsOrBugsArray.filter((projectOrBug) => {
				for (let word of keyWords) {
					if (projectOrBug.name.toLowerCase().includes(word)) {
						return true
					}
				}
			});
		} else {
			return projectsOrBugsArray;
		}
	};

	const filter = (projectsOrBugsArray) => {
		return projectsOrBugsArray.filter((projectOrBug) => {
			return (
				state.priorityFilter.includes(projectOrBug.priority_id) &&
				state.statusFilter.includes(projectOrBug.status_id)
			);
		});
	};

	const sort = (projectsOrBugsArray) => {
		if (state.sortByAscending) {
			switch (state.sortByType) {
				case 1:
					return projectsOrBugsArray.sort((a, b) => {
						return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
					});
				case 2:
					return projectsOrBugsArray.sort((a, b) => {
						return dateToInt(a.creation_date) - dateToInt(b.creation_date);
					});
				case 3:
					return projectsOrBugsArray.sort((a, b) => {
						return dateToInt(a.start_date) - dateToInt(b.start_date);
					});
				case 4:
					return projectsOrBugsArray.sort((a, b) => {
						return dateToInt(a.due_date) - dateToInt(b.due_date);
					});
				case 5:
					return projectsOrBugsArray.sort((a, b) => {
						return a.priority_id - b.priority_id;
					});
				case 6:
					return projectsOrBugsArray.sort((a, b) => {
						return a.status_id - b.status_id;
					});
				default:
					return projectsOrBugsArray;
			}
		} else {
			switch (state.sortByType) {
				case 1:
					return projectsOrBugsArray.sort((a, b) => {
						return b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1;
					});
				case 2:
					return projectsOrBugsArray.sort((a, b) => {
						return dateToInt(b.creation_date) - dateToInt(a.creation_date);
					});
				case 3:
					return projectsOrBugsArray.sort((a, b) => {
						return dateToInt(b.start_date) - dateToInt(a.start_date);
					});
				case 4:
					return projectsOrBugsArray.sort((a, b) => {
						return dateToInt(b.due_date) - dateToInt(a.due_date);
					});
				case 5:
					return projectsOrBugsArray.sort((a, b) => {
						return b.priority_id - a.priority_id;
					});
				case 6:
					return projectsOrBugsArray.sort((a, b) => {
						return b.status_id - a.status_id;
					});
				default:
					return projectsOrBugsArray;
			}
		}
	};

	return sort(filter(search(projectsOrBugsArray)));
}
