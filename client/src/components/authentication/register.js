import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function RegisterPage() {
	const [account, setAccount] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		password2: "",
		formInputErrors: {},
	});

	const { formInputErrors } = account.formInputErrors;

	return (
		<div className="registerPage">
			<h1>Register</h1>
		</div>
	);
}
