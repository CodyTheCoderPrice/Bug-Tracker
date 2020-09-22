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
import ViewItemModalDisplayInfo from "./ViewItemModalDisplayInfo";
import ViewItemModalEditInfo from "./ViewItemModalEditInfo";
import ViewItemModalDelete from "./ViewItemModalDelete";

import "../../../../SCSS/home/projects-bugs-shared/item/viewItemModal.scss";

export default function ViewItemModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);

	// Used for optimization in modal resizes
	const [
		regularlyUsedModalSizesAndStyles,
		setRegularlyUsedModalSizesAndStyles,
	] = useState(null);

	// Disable scrolling for the body
	useEffect(() => {
		let body = document.getElementsByClassName("js-body")[0];

		toggleClassName(true, body, "stop-x-y-scrolling");

		return () => {
			toggleClassName(false, body, "stop-x-y-scrolling");
		};
	}, []);

	// Adjusts the height of the modal to fit the screen
	useEffect(() => {
		if (
			reduxState.sizeContainer.variables.window !== null &&
			reduxState.sizeContainer.variables.navbar !== null
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
				reduxState.sizeContainer.variables.window.width -
				regularlyUsedModalSizesAndStyles.modalMarginOnOneSide * 2 -
				regularlyUsedModalSizesAndStyles.modalBorderWidthOnOneSide * 2 +
				"px";

			// Didn't add "px" since it would get in the way when
			// ...resizing js-project-content-container
			const adjustedModalHeight =
				reduxState.sizeContainer.variables.window.height -
				reduxState.sizeContainer.variables.navbar.height -
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
		reduxState.sizeContainer.variables,
		regularlyUsedModalSizesAndStyles,
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
				...reduxState.projectContainer.componentsDisplay,
				viewItemModalEditInfo: !reduxState.projectContainer.componentsDisplay.viewItemModalEditInfo,
			})
		);
	};

	const openDeleteProjectModal = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectContainer.componentsDisplay,
				viewItemModalDelete: true,
			})
		);
	};

	const closeViewProjectDashboard = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectContainer.componentsDisplay,
				viewItemModal: false,
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
								{reduxState.projectContainer.componentsDisplay.viewItemModalEditInfo
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
						{!reduxState.projectContainer.componentsDisplay.viewItemModalEditInfo ? (
							<div>
								<ViewItemModalDisplayInfo />
							</div>
						) : (
							<div>
								<ViewItemModalEditInfo />
							</div>
						)}
						{reduxState.projectContainer.componentsDisplay.viewItemModalDelete ? (
							<ViewItemModalDelete />
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
