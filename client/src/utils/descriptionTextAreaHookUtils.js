import { useEffect } from "react";

export function useDescriptionTextAreaResize(textAreaClassName, textAreaContainerClassName, itemInfo){
	// Adjust description text area size to match the size 
	// ...of the description in ItemContainerDisplayInfo's
	useEffect(() => {
		const textAreaElement = document.getElementsByClassName(textAreaClassName)[0];

		const myObserver = new ResizeObserver(() => {
			textAreaElement.style.height = "0px";
			textAreaElement.style.height =
				textAreaElement.scrollHeight + 10 + "px";
		});

		myObserver.observe(
			document.getElementsByClassName(textAreaContainerClassName)[0]
		);
	}, []);

	// Adjust description text area size to match ItemContainerDisplayInfo's description
	useEffect(() => {
		let textAreaElement = document.getElementsByClassName(
			"js-item-description-text-area"
		)[0];

		textAreaElement.style.height = "0px";
		textAreaElement.style.height =
			textAreaElement.scrollHeight + 10 + "px";
	}, [itemInfo.description]);
}