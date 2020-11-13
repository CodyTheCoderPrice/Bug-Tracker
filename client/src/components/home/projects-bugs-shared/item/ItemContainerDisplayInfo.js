import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
	projectContainerName,
	bugContainerName,
	sizeContainerName,
} from "../../../../reducers/containerNames";

import { manageSizeOfItemBoxsInPairContainer } from "../../../../utils/itemContainerUtils";
import { formatDateMMddYYYY } from "../../../../utils/dateUtils";
import { displayNoneIfEmpty } from "../../../../utils/elementUtils";
import { isEmpty } from "../../../../utils/basicUtils";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerDisplayInfo.scss";

export default function ItemContainerDisplayInfo(props) {
	const reduxState = useSelector((state) => state);

	useEffect(() => {
		if (
			reduxState[sizeContainerName].constants
				.itemContainerOuterDividingContainerMinWidth !== null
		) {
			manageSizeOfItemBoxsInPairContainer(
				document.getElementsByClassName("js-description-info-pair")[0],
				"outer-dividing-container--half-width",
				reduxState[sizeContainerName].constants
					.itemContainerOuterDividingContainerMinWidth
			);
			if (props.reduxContainerName === projectContainerName) {
				manageSizeOfItemBoxsInPairContainer(
					document.getElementsByClassName("js-projects-bug-info-pair")[0],
					"outer-dividing-container--half-width",
					reduxState[sizeContainerName].constants
						.itemContainerOuterDividingContainerMinWidth
				);
			}
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[sizeContainerName].constants
			.itemContainerOuterDividingContainerMinWidth,
	]);

	const getStatusBoxColorClassName = () => {
		if (props.reduxContainerName === projectContainerName) {
			switch (
				reduxState[props.reduxContainerName].componentsDisplay.targetItem
					.status_id
			) {
				// Starts at 2 since 1 means status was left empty
				case 2:
					return " item-box__group__field__status-box--purple";
				case 3:
					return " item-box__group__field__status-box--blue";
				case 4:
					return " item-box__group__field__status-box--orange";
				case 5:
					return " item-box__group__field__status-box--green";
				case 6:
					return " item-box__group__field__status-box--red";
				default:
					return "";
			}
		} else {
			switch (
				reduxState[props.reduxContainerName].componentsDisplay.targetItem
					.status_id
			) {
				case 1:
					return " item-box__group__field__status-box--purple";
				case 2:
					return " item-box__group__field__status-box--blue";
				case 3:
					return " item-box__group__field__status-box--orange";
				case 4:
					return " item-box__group__field__status-box--green";
				default:
					return "";
			}
		}
	};

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
			<div className="pair-container js-description-info-pair">
				<div className="outer-dividing-container">
					<div className="item-box item-box--desciption-info-height">
						<h2 className="item-box__title">Description</h2>
						<span className="item-box__description">
							{
								reduxState[props.reduxContainerName].componentsDisplay
									.targetItem.description
							}
						</span>
					</div>
				</div>
				<div className="outer-dividing-container">
					<div className="item-box item-box--desciption-info-height">
						<h2 className="item-box__title">Info</h2>
						{props.reduxContainerName === bugContainerName ? (
							<div className="item-box__group__field">
								<span className="item-box__group__field__type">Location:</span>
								<span className="item-box__group__field_content">
									{displayNoneIfEmpty(
										reduxState[props.reduxContainerName].componentsDisplay
											.targetItem.location
									)}
								</span>
							</div>
						) : null}
						<div className="item-box__group">
							<div className="item-box__group__field">
								<span className="item-box__group__field__type">
									Start Date:
								</span>
								<span className="item-box__group__field_content">
									{displayNoneIfEmpty(
										formatDateMMddYYYY(
											reduxState[props.reduxContainerName].componentsDisplay
												.targetItem.start_date
										)
									)}
								</span>
							</div>
							<div className="item-box__group__field">
								<span className="item-box__group__field__type">Due Date:</span>
								<span className="item-box__group__field_content">
									{displayNoneIfEmpty(
										formatDateMMddYYYY(
											reduxState[props.reduxContainerName].componentsDisplay
												.targetItem.due_date
										)
									)}
								</span>
							</div>
							<div className="item-box__group__field">
								<span className="item-box__group__field__type">
									Completed on:
								</span>
								<span className="item-box__group__field_content">
									{displayNoneIfEmpty(
										formatDateMMddYYYY(
											reduxState[props.reduxContainerName].componentsDisplay
												.targetItem.completion_date
										)
									)}
								</span>
							</div>
						</div>
						<div className="item-box__group item-box__group--right">
							<div className="item-box__group__field">
								<span className="item-box__group__field__type">Priority:</span>
								<span className="item-box__group__field_content">
									{displayNoneIfEmpty(
										reduxState[props.reduxContainerName].componentsDisplay
											.targetItem.priority_option
									)}
								</span>
							</div>
							<div className="item-box__group__field">
								<div className="item-box__group__field__centering-container">
									<span className="item-box__group__field__centering-container__type item-box__group__field__type">
										Status:
									</span>
								</div>
								<div
									className={
										"item-box__group__field__status-box" +
										getStatusBoxColorClassName()
									}
								>
									<span className="item-box__group__field__status-box__centered-content">
										{isEmpty(
											reduxState[props.reduxContainerName].componentsDisplay
												.targetItem.status_option
										)
											? "None"
											: reduxState[props.reduxContainerName].componentsDisplay
													.targetItem.status_option}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{props.reduxContainerName !== projectContainerName ? null : (
				<div className="pair-container js-projects-bug-info-pair">
					<div className="outer-dividing-container outer-dividing-container--half-width">
						<div className="item-box">
							<h2 className="item-box__title">Status of Bugs</h2>
							<span>Comming soon!</span>
						</div>
					</div>
					<div className="outer-dividing-container outer-dividing-container--half-width">
						<div className="item-box">
							<h2 className="item-box__title">Last Five Bugs</h2>
							<span>Comming soon!</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
