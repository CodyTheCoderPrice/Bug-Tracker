export const toggleCharCountColor = (
	nameOfClass,
	descriptionLength,
	charLimit
) => {
	document.getElementsByClassName(nameOfClass)[0].style.color =
		descriptionLength > charLimit ? "red" : "black";
};

export const populateComboBox = (selectElementClassName, array) => {
	let selectElem = document.getElementsByClassName(selectElementClassName)[0];

	for (let i = 0; i < array.length; i++) {
		let optionElem = document.createElement("option");

		// Makes the first item of the array the default selection
		if (i === 0) {
			optionElem.selected = "selected";
		}

		optionElem.value = array[i].id;
		optionElem.textContent = array[i].option;
		selectElem.appendChild(optionElem);
	}
};