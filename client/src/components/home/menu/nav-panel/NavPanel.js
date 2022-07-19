import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function NavPanel() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<div className="nav-panel js-nav-panel">
		</div>
	);
}
