import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
	bugContainerName,
} from "../../../../reducers/containerNames";

import { formatDateMMddYYYY } from "../../../../utils/dateUtils";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerDisplayInfo.scss";
import { projectContainerName } from "../../../../reducers/containerNames";

export default function ItemContainerDisplayInfo(props) {
	const reduxState = useSelector((state) => state);

	return (
		<div>
			<div className="outer-dividing-container outer-dividing-container--full">
				<h1 className="item-name">
					{
						reduxState[props.reduxContainerName].componentsDisplay.targetItem
							.name
					}
				</h1>
				<div className="item-creation-date">
					Created on:{" "}
					{formatDateMMddYYYY(
						reduxState[props.reduxContainerName].componentsDisplay.targetItem
							.creation_date
					)}
				</div>
			</div>
			<div className="outer-dividing-container">
				<div className="item-box">
					<h2 className="item-box__title">Description</h2>
					<span className="item-box__description">
						{
							reduxState[props.reduxContainerName].componentsDisplay.targetItem
								.description
						}
					</span>
				</div>
			</div>
			<div className="outer-dividing-container outer-dividing-container--fixed-width-for-info">
				<div className="item-box">
					<h2 className="item-box__title">Info</h2>
					{props.reduxContainerName === bugContainerName ? (
						<div className="item-box__group__field">
							<span className="item-box__group__field__type">Location:</span>
							<span className="item-box__group__field_content">
								{
									reduxState[props.reduxContainerName].componentsDisplay
										.targetItem.location
								}
							</span>
						</div>
					) : null}
					<div className="item-box__group">
						<div className="item-box__group__field">
							<span className="item-box__group__field__type">Start Date:</span>
							<span className="item-box__group__field_content">
								{formatDateMMddYYYY(
									reduxState[props.reduxContainerName].componentsDisplay
										.targetItem.start_date
								)}
							</span>
						</div>
						<div className="item-box__group__field">
							<span className="item-box__group__field__type">Due Date:</span>
							<span className="item-box__group__field_content">
								{formatDateMMddYYYY(
									reduxState[props.reduxContainerName].componentsDisplay
										.targetItem.due_date
								)}
							</span>
						</div>
						{reduxState[props.reduxContainerName].componentsDisplay.targetItem
							.completion_date === null ? null : (
							<div className="item-box__group__field">
								<span className="item-box__group__field__type">
									Completed on:
								</span>
								<span className="item-box__group__field_content">
									{formatDateMMddYYYY(
										reduxState[props.reduxContainerName].componentsDisplay
											.targetItem.completion_date
									)}
								</span>
							</div>
						)}
					</div>
					<div className="item-box__group item-box__group--right">
						<div className="item-box__group__field">
							<span className="item-box__group__field__type">Priority:</span>
							<span className="item-box__group__field_content">
								{
									reduxState[props.reduxContainerName].componentsDisplay
										.targetItem.priority_option
								}
							</span>
						</div>
						<div className="item-box__group__field">
							<span className="item-box__group__field__type">Status:</span>
							<span className="item-box__group__field_content">
								{
									reduxState[props.reduxContainerName].componentsDisplay
										.targetItem.status_option
								}
							</span>
						</div>
					</div>
				</div>
			</div>
			{props.reduxContainerName === projectContainerName ? (
				<div>
					<div className="outer-dividing-container outer-dividing-container--one-third">
						<div className="item-box">
							<h2 className="item-box__title">Status of Bugs</h2>
							<span>Comming soon!</span>
						</div>
					</div>
					<div className="outer-dividing-container outer-dividing-container--one-third">
						<div className="item-box">
							<h2 className="item-box__title">Last Five Bugs</h2>
							<span>Comming soon!</span>
						</div>
					</div>
				</div>
			) : (
				<div>
					<div className="outer-dividing-container outer-dividing-container--one-third">
						<div className="item-box">
							<h2 className="item-box__title">Comments</h2>
							<span>Comming soon!</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
