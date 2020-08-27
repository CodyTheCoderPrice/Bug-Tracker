import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setWhichProjectComponentsDisplay } from "../../../../actions";

import { getElementSize } from "../../../../utils/displaySizeUtils";

import {
	toggleOptionsDropdownDisplay,
} from "../../../../utils/viewProjectModalUtils";

// Components
import DisplayProjectInfo from "./DisplayProjectInfo";
import EditProjectInfo from "./EditProjectInfo";
import DeleteProjectModal from "./DeleteProjectModal";

import "../../../../SCSS/projects/view-edit-delete/viewProjectModal.scss";

export default function ViewProjectModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);

	// Set blurredBackground and viewProjectModal to the corect sizes
	useEffect(() => {
		let blurredBackgroundElement = document.getElementsByClassName(
			"js-view-project-blurred-background"
		)[0];
		// Will equal the height of the projectTable
		blurredBackgroundElement.style.height =
			getElementSize("js-project-filter-search-bar").height +
			getElementSize("js-project-table__header").height *
				(reduxState.projects.length + 1) +
			"px";

		let projectModalElement = document.getElementsByClassName(
			"js-view-project-modal"
		)[0];
		if (reduxState.displaySizes.window !== null) {
			// 30 pixels are subtracted at the end to correct for this modal's margin and border
			projectModalElement.style.width =
				reduxState.displaySizes.window.width -
				reduxState.displaySizes.scrollbar.width -
				30 +
				"px";

			console.log(projectModalElement.style.width);
		}
	}, [reduxState.displaySizes, reduxState.projects]);

	useEffect(() => {
		toggleOptionsDropdownDisplay(
			showOptionsDropdown,
			document.getElementsByClassName("js-project-options-button")[0],
			document.getElementsByClassName("js-project-options-dropdown")[0]
		);
	}, [showOptionsDropdown]);

	const openOptionsDropdown = () => {
		setShowOptionsDropdown(!showOptionsDropdown);
	};

	const closeOptionsDropdown = () => {
		if (showOptionsDropdown) {
			setShowOptionsDropdown(false);
		}
	};

	const switchBetweenDisplayAndEditProjectInfo = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				editProjectInfo: !reduxState.projectComponentsDisplay.editProjectInfo,
			})
		);
	};

	const openDeleteProjectModal = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				deleteProjectModal: true,
			})
		);
	};

	const closeViewProjectDashboard = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				viewProjectModal: false,
			})
		);
	};

	return (
		<div className="view-project-modal-component">
			<div className="blurred-background js-view-project-blurred-background" />
			<div
				className="view-project-modal js-view-project-modal"
				onClick={closeOptionsDropdown}
			>
				<div className="project-options-container js">
					<div
						className="project-options-container__button js-project-options-button"
						onClick={openOptionsDropdown}
					>
						<i className="fa fa-ellipsis-h" aria-hidden="true"></i>
					</div>
					<div className="project-options-container__dropdown js-project-options-dropdown">
						<span
							className="project-options-container__dropdown__option js-edit-option"
							onClick={switchBetweenDisplayAndEditProjectInfo}
						>
							{reduxState.projectComponentsDisplay.editProjectInfo
								? "Cancel"
								: "Edit Project"}
						</span>
						<span
							className="project-options-container__dropdown__option project-options-container__dropdown__option--no-border"
							onClick={openDeleteProjectModal}
						>
							Delete Project
						</span>
					</div>
				</div>
				<div className="x-button" onClick={closeViewProjectDashboard}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<div className="padded-container">
					{reduxState.projectComponentsDisplay.editProjectInfo ? (
						<EditProjectInfo />
					) : (
						<DisplayProjectInfo />
					)}
					{reduxState.projectComponentsDisplay.deleteProjectModal ? (
						<DeleteProjectModal />
					) : null}
				</div>
			</div>
		</div>
	);
}
