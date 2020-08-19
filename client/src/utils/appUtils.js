import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { storeWindowSize } from "../actions";

export function useTrackWindowSize() {
	const dispatch = useDispatch();

	useEffect(() => {
		// Stores the initial window size
		dispatch(storeWindowSize(getWindowSize()));

		// Updates window size when resized
		window.addEventListener(
			"resize",
			() => {
				dispatch(storeWindowSize(getWindowSize()));
			},
			true
		);
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	function getWindowSize() {
		const height =
			window.innerHeight ||
			document.documentElement.clientHeight ||
			document.body.clientHeight;
		const width =
			window.innerWidth ||
			document.documentElement.clientWidth ||
			document.body.clientWidth;
		return { height, width };
	}

	return [];
}
