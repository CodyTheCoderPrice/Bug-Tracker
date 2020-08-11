export const populateComboBox = (selectElementClassName, array) => {
	let selectElem = document.getElementsByClassName(selectElementClassName)[0];
	
	for (let item of array) {
		let optionElem = document.createElement("option");
		optionElem.value = item.id;
		optionElem.textContent = item.option;
		selectElem.appendChild(optionElem);
	}
}