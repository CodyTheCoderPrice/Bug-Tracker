import { useEffect } from "react";

export function useSubmitFormOnEnter(formClassName) {
	useEffect(() => {
		document
			.getElementsByClassName(formClassName)[0]
			.addEventListener("keypress", submitOnEnter);

		return () => {
			document
				.getElementsByClassName(formClassName)[0]
				.removeEventListener("keypress", submitOnEnter);
		};
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
