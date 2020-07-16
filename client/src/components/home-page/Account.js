import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { Link } from "react-router-dom";

//import { loginAccount } from "../../actions/authActions";

//import "../../SCSS/registerLogin.scss";

export default function Account() {
	const reduxState = useSelector((state) => state);
	//const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(reduxState);
	};

	return (
		<div className="constainerDiv">
			<form className="registerForm" noValidate onSubmit={handleSubmit}>
				<button type="submit">Test</button>
			</form>
		</div>
	);
}
