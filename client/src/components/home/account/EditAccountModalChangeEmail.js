import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../reducers/containerNames";

import {
	updateAccountEmail,
	setWhichAccountComponentsDisplay,
	clearInputErrors,
} from "../../../actions";

import {
	getCurrentContainerName,
	getProjectOrBugBackgroundColorClassNameWithHover,
	getProjectOrBugTextColorClassName,
} from "../../../utils";

import "../../../SCSS/home/account/editAccountModals.scss";

export default function EditAccountModalChangeEmail() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		email: reduxState[ACCOUNT_CONTAINER].info.email,
		currentPassword: "",
	});

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
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
				<i className="fa fa-arrow-left" aria-hidden="true"></i>
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
					{reduxState[GENERAL_CONTAINER].inputErrors.validationAccountEmail}
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
					{reduxState[GENERAL_CONTAINER].inputErrors.currentPassword}
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
					{reduxState[GENERAL_CONTAINER].inputErrors.validationAccount}
					{reduxState[GENERAL_CONTAINER].inputErrors.authorization}
					{reduxState[GENERAL_CONTAINER].inputErrors.serverAccount}
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
