// Used with numeric values stored in project table
const projectStatusOptions = ["", "Planning", "Developing", "Testing", "Completed", "On Hold"];
const projectPriorityOptions = ["", "Low", "Medium", "High"];

// Project status
export const getProjectStatusName = (index) => {
	return projectStatusOptions[index];
}

export const getIndexOfCompleted = () => {
	return projectStatusOptions.indexOf("Completed");
}

// Project priority
export const getProjectPriorityName = (index) => {
	return projectPriorityOptions[index];
}