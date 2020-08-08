// Used with numeric values stored in bug table
const bugPriorityOptions = ["", "Low", "Medium", "High"]
const bugStatusOptions = ["", "Open", "In Progress", "In Testing", "Closed"];

// Bug priority
export const getbugPriorityName = (index) => {
	return bugPriorityOptions[index];
}

// Bug status
export const getbugStatusName = (index) => {
	return bugStatusOptions[index];
}