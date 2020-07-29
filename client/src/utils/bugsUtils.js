// Used with numeric values stored in bug table
const bugStatusOptions = ["", "Open", "In Progress", "In Testing", "Closed"];
const bugPriorityOptions = ["", "Low", "Medium", "High"]

// Bug status
export const getbugStatusName = (index) => {
	return bugStatusOptions[index];
}

export const getbugStatusIndex = (name) => {
	return bugStatusOptions.indexOf(name);
}

// Bug priority
export const getbugPriorityName = (index) => {
	return bugPriorityOptions[index];
}

export const getbugPriorityIndex = (name) => {
	return bugPriorityOptions.indexOf(name);
}