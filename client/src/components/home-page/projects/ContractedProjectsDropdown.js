import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";

import { setNavbarDropdownComponents } from "../../../actions";

/* // Modals components for editing account
import EditInfoModal from "./EditInfoModal"; */

import "../../../SCSS/contractedProjectsDropdown.scss";

export default function ContractedProjectsDropdown() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	/* const openEditInfoModals = () => {
		dispatch(
			setAccountModalComponents({
				editInfoModal: <EditInfoModal />,
				editEmailModal: null,
				editPasswordModal: null,
			})
		);
	}; */

	return (
		<div>
			<div className="contractedProjectsConstainerDiv">
				<button className="expandProjects">
					<i className="fa fa-angle-double-right" aria-hidden="true"></i>
				</button>
			</div>
		</div>
	);
}
