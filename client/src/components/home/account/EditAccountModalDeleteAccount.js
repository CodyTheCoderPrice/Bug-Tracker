import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	generalContainerName,
	projectContainerName,
	bugContainerName,
} from "../../../reducers/containerNames";

import {
	deleteAccount,
	setWhichAccountComponentsDisplay,
	clearInputErrors,
} from "../../../actions";

import {
	getProjectOrBugBackgroundColorWithHover,
	getProjectOrBugTextColor,
} from "../../../utils/elementColorUtils";

import "../../../SCSS/home/account/editAccountModals.scss";

export default function EditAccountModalDeleteAccount() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		deleteTypedOut: "",
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
		dispatch(deleteAccount(accountInfo));
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
			<h1 className="title">Delete Account</h1>
			<form className="form" noValidate onSubmit={handleSubmit}>
				<label htmlFor="delete-account-type-out" className="form__label">
					Enter <span className="form__label__captial-delete">DELETE</span>{" "}
					below.
				</label>
				<input
					type="text"
					name="deleteTypedOut"
					onChange={(e) => onChange(e)}
					value={accountInfo.deleteTypedOut}
					id="delete-account-type-out"
					className="form__text-input"
				/>
				<span className="form__errors">
					{
						reduxState[generalContainerName].inputErrors
							.validationAccountTypeOutCheck
					}
				</span>
				<label htmlFor="delete-account-password" className="form__label">
					Current Password:{" "}
				</label>
				<input
					type="password"
					name="currentPassword"
					onChange={(e) => onChange(e)}
					value={accountInfo.currentPassword}
					id="delete-account-password"
					className="form__text-input form__text-input--password"
				/>
				<span className="form__errors">
					{reduxState[generalContainerName].inputErrors.currentPassword}
				</span>
				<button
					type="submit"
					className={"form__submit" + getSubmitButtonBackgroundColorWithHover()}
				>
					Delete
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
