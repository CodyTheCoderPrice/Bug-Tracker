import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setWhichProjectComponentsDisplay } from "../../../../actions";

import { toggleClassName } from "../../../../utils/elementUtils";

import {
	getElementSize,
	getElementStyle,
	stripNonDigits,
} from "../../../../utils/displaySizeUtils";

import { toggleOptionsDropdownDisplay } from "../../../../utils/viewProjectModalUtils";

// Components
import DisplayProjectInfo from "./DisplayProjectInfo";
import EditProjectInfo from "./EditProjectInfo";
import DeleteProjectModal from "./DeleteProjectModal";

import "../../../../SCSS/projects/view-edit-delete/viewProjectModal.scss";

export default function ViewProjectModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);

	// Used to decide when to resize the modal, and to reset its size
	const [originalModalSizeAndStyles, setOriginalModalSizeAndStyles] = useState(
		null
	);

	// Used to decide when to enlargen the modal
	const [allContentInsideModalSize, setAllContentInsideModalSize] = useState(
		null
	);

	// Disable scrolling for the HTML and body
	useEffect(() => {
		let html = document.getElementsByClassName("js-html")[0];
		let body = document.getElementsByClassName("js-body")[0];

		toggleClassName(true, html, "stop-scrolling");
		toggleClassName(true, body, "stop-scrolling");

		return () => {
			toggleClassName(false, html, "stop-scrolling");
			toggleClassName(false, body, "stop-scrolling");
		};
	}, []);

	// Adjusts the height of the modal to fit the screen
	useEffect(() => {
		if (
			reduxState.displaySizeVariables.window !== null &&
			reduxState.displaySizeConstants.navbar !== null
		) {
			let viewProjectModalElement = document.getElementsByClassName(
				"js-view-project-modal"
			)[0];

			// Makes sure originalModalSizeAndStyles gets set
			if (originalModalSizeAndStyles === null) {
				const sidebarStyle = getElementStyle(viewProjectModalElement);
				setOriginalModalSizeAndStyles({
					height: stripNonDigits(sidebarStyle.height),
					marginOnOneSide: stripNonDigits(sidebarStyle.marginTop),
					borderWidthOnOneSide: stripNonDigits(sidebarStyle.borderTopWidth),
				});

				// Prevents crash since originalModalSizeAndStyles will still
				// ...be null for remainder of this useEfffect iteration
				return;
			}

			// Makes sure allContentInsideModalSize gets set
			if (allContentInsideModalSize === null) {
				setAllContentInsideModalSize(
					getElementSize(
						document.getElementsByClassName("js-all-content-container")[0]
					)
				);

				// Prevents crash since allContentInsideModalSize will still
				// ...be null for remainder of this useEfffect iteration
				return;
			}

			// Resize modal width
			if (reduxState.displaySizeVariables.window !== null) {
				viewProjectModalElement.style.width =
					reduxState.displaySizeVariables.window.width -
					reduxState.displaySizeConstants.scrollbar.width -
					originalModalSizeAndStyles.marginOnOneSide -
					originalModalSizeAndStyles.borderWidthOnOneSide * 2 +
					"px";
			}

			const adjustedWindowHeight =
				reduxState.displaySizeVariables.window.height -
				reduxState.displaySizeConstants.navbar.height -
				originalModalSizeAndStyles.marginOnOneSide * 2 -
				originalModalSizeAndStyles.borderWidthOnOneSide * 2;

			// Resize modal height
			if (
				originalModalSizeAndStyles.height < allContentInsideModalSize.height ||
				originalModalSizeAndStyles.height > adjustedWindowHeight
			) {
				viewProjectModalElement.style.height = adjustedWindowHeight + "px";
			} else {
				viewProjectModalElement.style.height =
					originalModalSizeAndStyles.height + "px";
			}
		}
	}, [
		reduxState.displaySizeConstants,
		reduxState.displaySizeVariables,
		originalModalSizeAndStyles,
		allContentInsideModalSize,
		reduxState.projects,
	]);

	useEffect(() => {
		toggleOptionsDropdownDisplay(
			showOptionsDropdown,
			document.getElementsByClassName("js-project-options-button")[0],
			document.getElementsByClassName("js-project-options-dropdown")[0],
			"project-options-container__button--selected"
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
				<div className="js-all-content-container">
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
						{!reduxState.projectComponentsDisplay.editProjectInfo ? (
							<div>
								<DisplayProjectInfo />
								<DisplayProjectInfo />
								<DisplayProjectInfo />
							</div>
						) : (
							<div>
								<EditProjectInfo />
								<EditProjectInfo />
								<EditProjectInfo />
							</div>
						)}
						{reduxState.projectComponentsDisplay.deleteProjectModal ? (
							<DeleteProjectModal />
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
