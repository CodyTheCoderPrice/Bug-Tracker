import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleClassName } from "../../../../utils/elementUtils";

// Components
import ViewItemModalTopBar from "./ViewItemModalTopBar";
import MiniListTable from "../list/MiniListTable";
import ViewItemModalDisplayInfo from "./ViewItemModalDisplayInfo";
import ViewItemModalEditInfo from "./ViewItemModalEditInfo";
import ViewItemModalDelete from "./ViewItemModalDelete";

import "../../../../SCSS/home/projects-bugs-shared/item/viewItemModal.scss";

export default function ViewItemModal(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Adjusts the height of the modal to fit the screen
	useEffect(() => {
		if (
			reduxState.sizeContainer.variables.window !== null &&
			reduxState.sizeContainer.variables.navbar !== null &&
			reduxState.sizeContainer.constants.viewItemTopBar !== null &&
			reduxState.sizeContainer.constants.miniListTable !== null
		) {
			const viewItemModalElement = document.getElementsByClassName(
				"js-view-item-modal"
			)[0];

			viewItemModalElement.style.height =
				reduxState.sizeContainer.variables.window.height -
				reduxState.sizeContainer.variables.navbar.height -
				reduxState.sizeContainer.constants.viewItemTopBar.height +
				"px";

			viewItemModalElement.style.width =
				reduxState.sizeContainer.variables.window.width -
				reduxState.sizeContainer.constants.miniListTable.width +
				"px";
		}
	}, [reduxState.sizeContainer]);

	// Disable scrolling for the body
	useEffect(() => {
		let body = document.getElementsByClassName("js-body")[0];

		toggleClassName(true, body, "stop-x-y-scrolling");

		return () => {
			toggleClassName(false, body, "stop-x-y-scrolling");
		};
	}, []);

	return (
		<div>
			<ViewItemModalTopBar reduxContainerName={props.reduxContainerName} />
			<MiniListTable reduxContainerName={props.reduxContainerName} />
			<div className="view-item-modal-component">
				<div className="view-item-modal js-view-item-modal">
					<div className="item-content-container js-item-content-container">
						<div className="padding-container">
							{!reduxState[props.reduxContainerName].componentsDisplay
								.viewItemModalEditInfo ? (
								<div>
									<ViewItemModalDisplayInfo
										reduxContainerName={props.reduxContainerName}
									/>
									<ViewItemModalDisplayInfo
										reduxContainerName={props.reduxContainerName}
									/>
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
