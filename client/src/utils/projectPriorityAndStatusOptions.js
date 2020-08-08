// Used with numeric values stored in project table
const projectPriorityOptions = ["", "Low", "Medium", "High"];
const projectStatusOptions = ["", "Planning", "Developing", "Testing", "Completed", "On Hold"];

// Project priority
export const getProjectPriorityName = (index) => {
	return projectPriorityOptions[index];
}

// Project status
export const getProjectStatusName = (index) => {
	return projectStatusOptions[index];
}

export const getIndexOfCompleted = () => {
	return projectStatusOptions.indexOf("Completed");
}