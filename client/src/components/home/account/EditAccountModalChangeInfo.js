import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	updateAccountInfo,
	setWhichAccountComponentsDisplay,
	clearBackendErrors,
} from "../../../actions";

import {
	getCurrentContainerName,
	getProjectOrBugBackgroundColorClassNameWithHover,
	getProjectOrBugTextColorClassName,
} from "../../../utils";

export default function EditAccountModalChangeInfo() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		first_name: reduxState[ACCOUNT_CONTAINER].info.first_name,
		last_name: reduxState[ACCOUNT_CONTAINER].info.last_name,
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
						reduxState[GENERAL_CONTAINER].backendErrors
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
						reduxState[GENERAL_CONTAINER].backendErrors
							.validationAccountLastName
					}
				</span>
				<button
					type="submit"
					className={"form__submit" + getProjectOrBugBackgroundColorClassNameWithHover(getCurrentContainerName(reduxState))}
				>
					Update
				</button>
				<span className="form__errors">
					{reduxState[GENERAL_CONTAINER].backendErrors.validationAccount}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverAccount}
				</span>
			</form>
			<div className="modal-links-container">
				<span
					onClick={openEditEmailModal}
					className={"modal-link" + getProjectOrBugTextColorClassName(getCurrentContainerName(reduxState))}
				>
					Edit Email
				</span>
				<span className="link-spacer">|</span>
				<span
					onClick={openEditPasswordModal}
					className={"modal-link" + getProjectOrBugTextColorClassName(getCurrentContainerName(reduxState))}
				>
					Edit Password
				</span>
				<span className="link-spacer">|</span>
				<span
					onClick={openDeleteAccountModal}
					className={"modal-link" + getProjectOrBugTextColorClassName(getCurrentContainerName(reduxState))}
				>
					Delete Account
				</span>
			</div>
		</div>
	);
}
