import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	generalContainerName,
	accountContainerName,
	projectContainerName,
	bugContainerName,
} from "../../../reducers/containerNames";

import {
	updateAccountInfo,
	setWhichAccountComponentsDisplay,
	clearInputErrors,
} from "../../../actions";

import { getProjectOrBugBackgroundColorWithHover } from "../../../utils/elementColorUtils";

import "../../../SCSS/home/account/editAccountModals.scss";

export default function EditAccountModalChangeInfo() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		first_name: reduxState[accountContainerName].info.first_name,
		last_name: reduxState[accountContainerName].info.last_name,
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

	const openEditEmailModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				editAccountModalChangeEmail: true,
			})
		);
	};

	const openEditPasswordModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				editAccountModalChangePassword: true,
			})
		);
	};

	const openDeleteAccountModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				editAccountModalDeleteAccount: true,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateAccountInfo(accountInfo));
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

	return (
		<div>
			<h1 className="title">Edit Personal Info</h1>
			<form className="form" noValidate onSubmit={handleSubmit}>
				<label htmlFor="edit-account-info-first-name" className="form__label">
					First Name:{" "}
				</label>
				<input
					type="text"
					name="first_name"
					onChange={(e) => onChange(e)}
					value={accountInfo.first_name}
					id="edit-account-info-first-name"
					className="form__text-input"
				/>
				<span className="form__errors">
					{
						reduxState[generalContainerName].inputErrors
							.validationAccountFirstName
					}
				</span>
				<label htmlFor="edit-account-info-last-name" className="form__label">
					Last Name:{" "}
				</label>
				<input
					type="text"
					name="last_name"
					onChange={(e) => onChange(e)}
					value={accountInfo.last_name}
					id="edit-account-info-last-name"
					className="form__text-input"
				/>
				<span className="form__errors">
					{
						reduxState[generalContainerName].inputErrors
							.validationAccountLastName
					}
				</span>
				<button type="submit" className={"form__submit" + getSubmitButtonBackgroundColorWithHover()}>
					Update
				</button>
				<span className="form__errors">
					{reduxState[generalContainerName].inputErrors.validationAccount}
					{reduxState[generalContainerName].inputErrors.serverAccount}
				</span>
			</form>
			<div className="modal-links-container">
				<span onClick={openEditEmailModal} className="modal-link">
					Edit Email
				</span>
				<span className="link-spacer">|</span>
				<span onClick={openEditPasswordModal} className="modal-link">
					Edit Password
				</span>
				<span className="link-spacer">|</span>
				<span onClick={openDeleteAccountModal} className="modal-link">
					Delete Account
				</span>
			</div>
		</div>
	);
}
