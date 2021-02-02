import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	updateAccountEmail,
	setWhichAccountComponentsDisplay,
	clearBackendErrors,
} from "../../../actions";

import {
	getCurrentContainerName,
	getProjectOrBugBackgroundColorClassNameWithHover,
	getProjectOrBugTextColorClassName,
} from "../../../utils";

export default function EditAccountModalChangeEmail() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		email: reduxState[ACCOUNT_CONTAINER].accountInfo.email,
		currentPassword: "",
	});

	// clears prior backend errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const backToEditInfo = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				editAccountModalChangeInfo: true,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateAccountEmail(accountInfo));
	};

	return (
		<div>
			<div className="back-button" onClick={backToEditInfo}>
				<i className="fa fa-arrow-left" aria-hidden="true" alt="Icon of an arrow pointing to the left" />
			</div>
			<h1 className="title">Edit Email</h1>
			<form className="form" noValidate onSubmit={handleSubmit}>
				<label htmlFor="edit-account-email-email" className="form__label">
					Email:{" "}
				</label>
				<input
					type="email"
					name="email"
					onChange={(e) => onChange(e)}
					value={accountInfo.email}
					id="edit-account-email-email"
					className="form__text-input"
				/>
				<span className="form__errors">
					{reduxState[GENERAL_CONTAINER].backendErrors.validationAccountEmail}
				</span>
				<label htmlFor="edit-account-email-password" className="form__label">
					Current Password:{" "}
				</label>
				<input
					type="password"
					name="currentPassword"
					onChange={(e) => onChange(e)}
					value={accountInfo.currentPassword}
					id="edit-account-email-password"
					className="form__text-input form__text-input--password"
				/>
				<span className="form__errors">
					{reduxState[GENERAL_CONTAINER].backendErrors.currentPassword}
				</span>
				<button
					type="submit"
					className={
						"form__submit" +
						getProjectOrBugBackgroundColorClassNameWithHover(
							getCurrentContainerName(reduxState)
						)
					}
				>
					Update
				</button>
				<span className="form__errors">
					{reduxState[GENERAL_CONTAINER].backendErrors.validationAccount}
					{reduxState[GENERAL_CONTAINER].backendErrors.authorization}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverAccount}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
				</span>
			</form>
			<div className="modal-links-container">
				<span
					onClick={backToEditInfo}
					className={"modal-link" + getProjectOrBugTextColorClassName(getCurrentContainerName(reduxState))}
				>
					Back
				</span>
			</div>
		</div>
	);
}
