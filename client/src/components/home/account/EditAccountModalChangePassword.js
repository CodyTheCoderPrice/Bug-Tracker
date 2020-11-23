import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	generalContainerName,
	projectContainerName,
	bugContainerName,
} from "../../../reducers/containerNames";

import {
	updateAccountPassword,
	setWhichAccountComponentsDisplay,
	clearInputErrors,
} from "../../../actions";

import {
	getProjectOrBugBackgroundColorWithHover,
	getProjectOrBugTextColor,
} from "../../../utils/elementColorUtils";

import "../../../SCSS/home/account/editAccountModals.scss";

export default function EditAccountModalChangePassword() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		newPassword: "",
		newPassword2: "",
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
		dispatch(updateAccountPassword(accountInfo));
	};

	const getSubmitButtonBackgroundColorWithHover = () => {
		if (
			reduxState[bugContainerName].componentsDisplay.listContainer !== true &&
			reduxState[bugContainerName].componentsDisplay.itemContainer !== true
		) {
			return getProjectOrBugBackgroundColorWithHover(projectContainerName);
		} else {
			return getProjectOrBugBackgroundColorWithHover(bugContainerName);
		}
	};

	const getLinkTextcolor = () => {
		if (
			reduxState[bugContainerName].componentsDisplay.listContainer !== true &&
			reduxState[bugContainerName].componentsDisplay.itemContainer !== true
		) {
			return getProjectOrBugTextColor(projectContainerName);
		} else {
			return getProjectOrBugTextColor(bugContainerName);
		}
	};

	return (
		<div>
			<div className="back-button" onClick={backToEditInfo}>
				<i className="fa fa-arrow-left" aria-hidden="true"></i>
			</div>
			<h1 className="title">Edit Password</h1>
			<form className="form" noValidate onSubmit={handleSubmit}>
				<label
					htmlFor="edit-account-password-new-password"
					className="form__label"
				>
					New Password:{" "}
				</label>
				<input
					type="password"
					name="newPassword"
					onChange={(e) => onChange(e)}
					value={accountInfo.newPassword}
					id="edit-account-password-new-password"
					className="form__text-input form__text-input--password"
				/>
				<span className="form__errors">
					{
						reduxState[generalContainerName].inputErrors
							.validationAccountNewPassword
					}
				</span>
				<label
					htmlFor="edit-account-password-new-password2"
					className="form__label"
				>
					Confirm New Password:{" "}
				</label>
				<input
					type="password"
					name="newPassword2"
					onChange={(e) => onChange(e)}
					value={accountInfo.newPassword2}
					id="edit-account-password-new-password2"
					className="form__text-input form__text-input--password"
				/>
				<span className="form__errors">
					{
						reduxState[generalContainerName].inputErrors
							.validationAccountNewPassword2
					}
				</span>
				<label
					htmlFor="edit-account-password-current-password"
					className="form__label form__label--top-margin"
				>
					Current Password:{" "}
				</label>
				<input
					type="password"
					name="currentPassword"
					onChange={(e) => onChange(e)}
					value={accountInfo.currentPassword}
					id="edit-account-password-current-password"
					className="form__text-input form__text-input--password"
				/>
				<span className="form__errors">
					{reduxState[generalContainerName].inputErrors.currentPassword}
				</span>
				<button
					type="submit"
					className={"form__submit" + getSubmitButtonBackgroundColorWithHover()}
				>
					Update
				</button>
				<span className="form__errors">
					{reduxState[generalContainerName].inputErrors.validationAccount}
					{reduxState[generalContainerName].inputErrors.authorization}
					{reduxState[generalContainerName].inputErrors.serverAccount}
				</span>
			</form>
			<div className="modal-links-container">
				<span
					onClick={backToEditInfo}
					className={"modal-link" + getLinkTextcolor()}
				>
					Back
				</span>
			</div>
		</div>
	);
}
