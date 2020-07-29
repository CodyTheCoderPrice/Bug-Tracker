// Used with numeric values stored in project table
const projectStatusOptions = ["", "Planning", "Developing", "Testing", "Completed", "On Hold"];
const projectPriorityOptions = ["", "Low", "Medium", "High"];

// Project status
export const getProjectStatusName = (index) => {
	return projectStatusOptions[index];
}

export const getProjectStatusIndex = (name) => {
	return projectStatusOptions.indexOf(name);
}

// Project priority
export const getProjectPriorityName = (index) => {
	return projectPriorityOptions[index];
}

export const getProjectPriorityIndex = (name) => {
	return projectPriorityOptions.indexOf(name);
}

// Shorten project description
export const shortenProjectDescription = (description) => {
	const cutoff = 200;
		if (description.length > cutoff) {
			for (let endOfWordIndex = cutoff; endOfWordIndex > 0; endOfWordIndex--) {
				if (description.charAt(endOfWordIndex) === " ") {
					return description.substring(0, endOfWordIndex) + "...";
				}
			}
		} else {
			return description;
		}
}