import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setWhichProjectComponentsDisplay } from "../../../../actions";

import { toggleClassName } from "../../../../utils/elementUtils";

import {
	getElementSize,
	getElementStyle,
	stripNonDigits,
} from "../../../../utils/displaySizeUtils";

import { toggleDropdownButtonDisplay } from "../../../../utils/buttonUtils";

// Components
import DisplayProjectInfo from "./DisplayProjectInfo";
import EditProjectInfo from "./EditProjectInfo";
import DeleteProjectModal from "./DeleteProjectModal";

import "../../../../SCSS/projects/view-edit-delete/viewProjectModal.scss";

export default function ViewProjectModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);

	// Used for optimization in modal resizes
	const [
		regularlyUsedModalSizesAndStyles,
		setRegularlyUsedModalSizesAndStyles,
	] = useState(null);

	// Disable scrolling for the HTML and body
	useEffect(() => {
		let body = document.getElementsByClassName("js-body")[0];

		toggleClassName(true, body, "stop-scrolling");

		return () => {
			toggleClassName(false, body, "stop-scrolling");
		};
	}, []);

	// Adjusts the height of the modal to fit the screen
	useEffect(() => {
		if (
			reduxState.displaySizeVariables.window !== null &&
			reduxState.displaySizeVariables.navbar !== null
		) {
			let viewProjectModalElement = document.getElementsByClassName(
				"js-view-project-modal"
			)[0];

			// Makes sure regularlyUsedModalSizesAndStyles gets set
			if (regularlyUsedModalSizesAndStyles === null) {
				const sidebarStyle = getElementStyle(viewProjectModalElement);
				setRegularlyUsedModalSizesAndStyles({
					topButttonsBarSize: getElementSize(
						document.getElementsByClassName("js-top-buttons-bar")[0]
					),
					modalMarginOnOneSide: stripNonDigits(sidebarStyle.marginTop),
					modalBorderWidthOnOneSide: stripNonDigits(
						sidebarStyle.borderTopWidth
					),
				});

				// Prevents crash since regularlyUsedModalSizesAndStyles will still
				// ...be null for remainder of this useEfffect iteration
				return;
			}
			viewProjectModalElement.style.width =
				reduxState.displaySizeVariables.window.width -
				regularlyUsedModalSizesAndStyles.modalMarginOnOneSide * 2 -
				regularlyUsedModalSizesAndStyles.modalBorderWidthOnOneSide * 2 +
				"px";

			// Didn't add "px" since it would get in the way when
			// ...resizing js-project-content-container
			const adjustedModalHeight =
				reduxState.displaySizeVariables.window.height -
				reduxState.displaySizeVariables.navbar.height -
				regularlyUsedModalSizesAndStyles.modalMarginOnOneSide * 2 -
				regularlyUsedModalSizesAndStyles.modalBorderWidthOnOneSide * 2;

			viewProjectModalElement.style.height = adjustedModalHeight + "px";

			document.getElementsByClassName(
				"js-project-content-container"
			)[0].style.height =
				adjustedModalHeight -
				regularlyUsedModalSizesAndStyles.topButttonsBarSize.height +
				"px";
		}
	}, [
		reduxState.displaySizeVariables,
		regularlyUsedModalSizesAndStyles,
		reduxState.projects,
	]);

	useEffect(() => {
		toggleDropdownButtonDisplay(
			showOptionsDropdown,
			document.getElementsByClassName("js-project-options-button")[0],
			document.getElementsByClassName("js-project-options-dropdown")[0],
			"project-options-container__button--clicked"
		);
	}, [showOptionsDropdown]);

	const toggleOptionsDropdown = () => {
		// Toggle logic is unnessesary since this onClick will only be reached
		// ...if showOptionsDropdown === false becasue of closeOptionsDropdown
		setShowOptionsDropdown(!showOptionsDropdown);
	};

	// Closes options dropdown when clicking outside of dropdown
	const closeOptionsDropdown = () => {
		// This allows toggleOptionsDropdown to work
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
				<div className="top-buttons-bar js-top-buttons-bar">
					<div className="project-options-container js">
						<div
							className="project-options-container__button js-project-options-button"
							onClick={toggleOptionsDropdown}
						>
							<span className="project-options-container__button__text">
								<i className="fa fa-ellipsis-h" aria-hidden="true" />
							</span>
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
				</div>
				<div className="project-content-container js-project-content-container">
					<div className="padding-container">
						{!reduxState.projectComponentsDisplay.editProjectInfo ? (
							<div>
								<DisplayProjectInfo />
							</div>
						) : (
							<div>
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
