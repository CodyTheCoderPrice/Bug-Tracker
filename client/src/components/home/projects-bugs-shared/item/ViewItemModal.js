import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { projectContainerName } from "../../../../reducers/containerNames";

import { setWhichProjectOrBugComponentsDisplay } from "../../../../actions";

import { toggleClassName } from "../../../../utils/elementUtils";

import {
	getElementSize,
	getElementStyle,
	stripNonDigits,
} from "../../../../utils/displaySizeUtils";

import { toggleDropdownButtonDisplay } from "../../../../utils/buttonUtils";

// Components
import MiniListTable from "../list/MiniListTable";
import ViewItemModalDisplayInfo from "./ViewItemModalDisplayInfo";
import ViewItemModalEditInfo from "./ViewItemModalEditInfo";
import ViewItemModalDelete from "./ViewItemModalDelete";

import "../../../../SCSS/home/projects-bugs-shared/item/viewItemModal.scss";

export default function ViewItemModal(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);

	// Used for optimization in modal resizes
	const [
		regularlyUsedSizesAndStyles,
		setRegularlyUsedSizesAndStyles,
	] = useState(null);

	// Disable scrolling for the body
	useEffect(() => {
		let body = document.getElementsByClassName("js-body")[0];

		toggleClassName(true, body, "stop-x-y-scrolling");

		return () => {
			toggleClassName(false, body, "stop-x-y-scrolling");
		};
	}, []);

	// Adjusts the height and width of the modal to fit the screen
	useEffect(() => {
		if (
			reduxState.sizeContainer.variables.window !== null &&
			reduxState.sizeContainer.variables.navbar !== null
		) {
			let viewItemModalElement = document.getElementsByClassName(
				"js-view-item-modal"
			)[0];

			// Makes sure regularlyUsedSizesAndStyles gets set
			if (regularlyUsedSizesAndStyles === null) {
				const sidebarStyle = getElementStyle(viewItemModalElement);
				setRegularlyUsedSizesAndStyles({
					topButttonsBarSize: getElementSize(
						document.getElementsByClassName("js-top-buttons-bar")[0]
					),
					miniListTableWidth: getElementSize(
						document.getElementsByClassName("js-mini-list-table-component")[0]
					).width,
					modalMarginOnOneSide: stripNonDigits(sidebarStyle.marginTop),
					modalBorderWidthOnOneSide: stripNonDigits(
						sidebarStyle.borderTopWidth
					),
				});

				// Prevents crash since regularlyUsedSizesAndStyles will still
				// ...be null for remainder of this useEfffect iteration
				return;
			}

			viewItemModalElement.style.width =
				reduxState.sizeContainer.variables.window.width -
				regularlyUsedSizesAndStyles.miniListTableWidth -
				regularlyUsedSizesAndStyles.modalMarginOnOneSide * 2 -
				regularlyUsedSizesAndStyles.modalBorderWidthOnOneSide * 2 +
				"px";

			// Didn't add "px" since it would get in the way when
			// ...resizing js-item-content-container
			const adjustedModalHeight =
				reduxState.sizeContainer.variables.window.height -
				reduxState.sizeContainer.variables.navbar.height -
				regularlyUsedSizesAndStyles.modalMarginOnOneSide * 2 -
				regularlyUsedSizesAndStyles.modalBorderWidthOnOneSide * 2;

			viewItemModalElement.style.height = adjustedModalHeight + "px";

			document.getElementsByClassName(
				"js-item-content-container"
			)[0].style.height =
				adjustedModalHeight -
				regularlyUsedSizesAndStyles.topButttonsBarSize.height +
				"px";
		}
	}, [reduxState.sizeContainer.variables, regularlyUsedSizesAndStyles]);

	useEffect(() => {
		toggleDropdownButtonDisplay(
			showOptionsDropdown,
			document.getElementsByClassName("js-item-options-button")[0],
			document.getElementsByClassName("js-item-options-dropdown")[0],
			"item-options-container__button--clicked"
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

	const switchBetweenDisplayAndEditInfo = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				viewItemModalEditInfo: !reduxState[props.reduxContainerName]
					.componentsDisplay.viewItemModalEditInfo,
			})
		);
	};

	const openDeleteItemModal = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				viewItemModalDelete: true,
			})
		);
	};

	const closeViewItemModal = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				viewItemModal: false,
			})
		);
	};

	return (
		<div>
			<MiniListTable reduxContainerName={props.reduxContainerName} />
			<div className="view-item-modal-component">
				{/* <div className="blurred-background" /> */}
				<div
					className="view-item-modal js-view-item-modal"
					onClick={closeOptionsDropdown}
				>
					<div className="top-buttons-bar js-top-buttons-bar">
						<div className="item-options-container js">
							<div
								className="item-options-container__button js-item-options-button"
								onClick={toggleOptionsDropdown}
							>
								<span className="item-options-container__button__text">
									<i className="fa fa-ellipsis-h" aria-hidden="true" />
								</span>
							</div>
							<div className="item-options-container__dropdown js-item-options-dropdown">
								<span
									className="item-options-container__dropdown__option js-edit-option"
									onClick={switchBetweenDisplayAndEditInfo}
								>
									{reduxState[props.reduxContainerName].componentsDisplay
										.viewItemModalEditInfo
										? "Cancel"
										: props.reduxContainerName === projectContainerName
										? "Edit Project"
										: "Edit Bug"}
								</span>
								<span
									className="item-options-container__dropdown__option item-options-container__dropdown__option--no-border"
									onClick={openDeleteItemModal}
								>
									{props.reduxContainerName === projectContainerName
										? "Delete Project"
										: "Delete Bug"}
								</span>
							</div>
						</div>
						<div className="x-button" onClick={closeViewItemModal}>
							<i className="fa fa-times" aria-hidden="true"></i>
						</div>
					</div>
					<div className="item-content-container js-item-content-container">
						<div className="padding-container">
							{!reduxState[props.reduxContainerName].componentsDisplay
								.viewItemModalEditInfo ? (
								<div>
									<ViewItemModalDisplayInfo
										reduxContainerName={props.reduxContainerName}
									/>
								</div>
							) : (
								<div>
									<ViewItemModalEditInfo
										reduxContainerName={props.reduxContainerName}
									/>
								</div>
							)}
							{reduxState[props.reduxContainerName].componentsDisplay
								.viewItemModalDelete ? (
								<ViewItemModalDelete
									reduxContainerName={props.reduxContainerName}
								/>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
