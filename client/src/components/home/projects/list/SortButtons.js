/* import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setProjectsSearchFilterSort } from "../../../../actions";

import "../../../../SCSS/projects-bugs-shared/sortButtons.scss";

export default function SortButtons() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const onChangeSortByType = (e) => {
		dispatch(
			setProjectsSearchFilterSort({
				...reduxState.projectsSearchFilterSort,
				[e.target.name]: Number(e.target.value),
			})
		);
	};

	const onChangeSortByAscending = (e) => {
		dispatch(
			setProjectsSearchFilterSort({
				...reduxState.projectsSearchFilterSort,
				// Converts string to boolean by setting equal
				// ...to whether the value == true
				[e.target.name]: e.target.value == "true",
			})
		);
	};

	return (
		<div className="sort-buttons-component">
			<div className="buttons-container">
				
			</div>
		</div>
	);
}
 */