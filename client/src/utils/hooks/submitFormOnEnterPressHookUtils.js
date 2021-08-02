import { useEffect } from "react";

/**
 * Custom hook that will cause a form to submit on an enter key press if one of 
 * the form's child input element's is in focus.
 * 
 * Note: The purpose of this custom hook is to be used by forms (e.g. 
 * ListViewCreateItemSidebar) to make them more user friendly.
 * 
 * @param {string} formClassName - Unique className assigned to a form element
 * 
 * @example
 * useSubmitFormOnEnterPress("js-create-item-form");
 */
export function useSubmitFormOnEnterPress(formClassName) {
	useEffect(() => {
		document
			.getElementsByClassName(formClassName)[0]
			.addEventListener("keypress", submitOnEnter);

		return () => {
			document
				.getElementsByClassName(formClassName)[0]
				.removeEventListener("keypress", submitOnEnter);
		};
		// eslint-disable-next-line
	}, []);

	function submitOnEnter(event) {
		if (event.which === 13) {
			let newEvent = document.createEvent("Event");
			newEvent.initEvent("submit", false, true);
			event.target.form.dispatchEvent(newEvent);
			event.preventDefault();
		}
	}
}
