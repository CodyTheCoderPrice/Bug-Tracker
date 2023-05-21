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
			.addEventListener("keypress", submitOnEnterHandler);

		return () => {
			document
				.getElementsByClassName(formClassName)[0]
				.removeEventListener("keypress", submitOnEnterHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Declared as an object outside the eventListener so removal works on cleanup
	function submitOnEnterHandler (event) {
		if (event.which === 13) {
			const submitOnEnterEvent = new CustomEvent("submit", {"bubbles":false, "cancelable":true})
			event.target.form.dispatchEvent(submitOnEnterEvent);
			event.preventDefault();
		}
	}
}
