import { useEffect } from "react";

/**
 * Custom hook that will cause a form to submit on an enter key press, given 
 * that one of it's child input element's is in focus
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
