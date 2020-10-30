import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generalContainerName, projectContainerName } from "../../../../reducers/containerNames";

import { toggleClassName } from "../../../../utils/elementUtils";

// Components
import ItemContainerTopBar from "./ItemContainerTopBar";
import ItemContainerListSidebar from "./ItemContainerListSidebar";
import ItemContainerDisplayInfo from "./ItemContainerDisplayInfo";
import ItemContainerEditInfo from "./ItemContainerEditInfo";
import ItemContainerDeleteModal from "./ItemContainerDeleteModal";
import ItemContainerCommentBox from "./ItemContainerCommentBox";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainer.scss";

export default function ItemContainer(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

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
			reduxState.sizeContainer.variables.navbar !== null &&
			reduxState.sizeContainer.constants.itemContainerTopBar !== null &&
			reduxState.sizeContainer.constants.itemContainerListSidebar !== null
		) {
			const itemContainerElement = document.getElementsByClassName(
				"js-item-container"
			)[0];

			itemContainerElement.style.height =
				reduxState.sizeContainer.variables.window.height -
				reduxState.sizeContainer.variables.navbar.height -
				reduxState.sizeContainer.constants.itemContainerTopBar.height +
				"px";

			if (
				!reduxState[generalContainerName].componentsDisplay
					.itemContainerListSidebar
			) {
				itemContainerElement.style.width =
					reduxState.sizeContainer.variables.window.width -
					reduxState.sizeContainer.constants.itemContainerListSidebar.width +
					"px";
			} else {
				itemContainerElement.style.width =
					reduxState.sizeContainer.variables.window.width + "px";
			}
		}
	}, [
		reduxState.sizeContainer,
		reduxState[generalContainerName].componentsDisplay.itemContainerListSidebar,
	]);

	return (
		<div>
			<ItemContainerTopBar reduxContainerName={props.reduxContainerName} />
			<ItemContainerListSidebar reduxContainerName={props.reduxContainerName} />
			{/* Located outside item-container-component so topBar doesn't cover it */}
			{reduxState[props.reduxContainerName].componentsDisplay
				.itemContainerDeleteModal ? (
				<ItemContainerDeleteModal
					reduxContainerName={props.reduxContainerName}
				/>
			) : null}
			<div className="item-container-component">
				<div className="item-container item-container--shifted-right js-item-container">
					<div className="item-content-container js-item-content-container">
						<div className="padding-container">
							{!reduxState[props.reduxContainerName].componentsDisplay
								.itemContainerEditInfo ? (
								<div>
									<ItemContainerDisplayInfo
										reduxContainerName={props.reduxContainerName}
									/>
								</div>
							) : (
								<div>
									<ItemContainerEditInfo
										reduxContainerName={props.reduxContainerName}
									/>
								</div>
							)}
							{props.reduxContainerName === projectContainerName ? null : (
								<ItemContainerCommentBox />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
