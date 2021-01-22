import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	SIZE_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	GENERAL_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	setDisplaySizeVariablesBreadcrumbFontSize,
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
	setWhichCommentComponentsDisplay,
} from "../../../actions";

import {
	getElementSize,
	getCurrentContainerName,
	getProjectOrBugBackgroundColorClassNameDark,
	getProjectOrBugBackgroundColorClassNameLight,
	getProjectOrBugNavbarArrowColorClassNameDark,
	getProjectOrBugNavbarArrowColorClassNameLight,
} from "../../../utils";

export default function NavbarBreadcrumb(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Resizes breacrumb buttons to fit inside the navbar based on the window size
	useEffect(() => {
		if (
			reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem !== null &&
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].constants.navbarAccountButtonWidth !== null &&
			reduxState[SIZE_CONTAINER].constants.navbarBreadcrumbArrowWidth !==
				null &&
			reduxState[GENERAL_CONTAINER].globalConstants
				.navbarBreadcrumbMinimumFontSize !== null
		) {
			const breadcrumbProjectListButtonTextElement = document.getElementsByClassName(
				"js-breadcrumb-project-list-button-text"
			)[0];
			breadcrumbProjectListButtonTextElement.style.fontSize =
				reduxState[SIZE_CONTAINER].constants
					.navbarBreadcrumbButtonTextBaseFontSize + "px";
			let breadcrumbProjectListButtonTextElementWidth = getElementSize(
				breadcrumbProjectListButtonTextElement
			).width;
			const breadcrumbProjectItemButtonTextElement = document.getElementsByClassName(
				"js-breadcrumb-project-item-button-text"
			)[0];
			breadcrumbProjectItemButtonTextElement.style.fontSize =
				reduxState[SIZE_CONTAINER].constants
					.navbarBreadcrumbButtonTextBaseFontSize + "px";
			let breadcrumbProjectItemButtonTextElementWidth = getElementSize(
				breadcrumbProjectItemButtonTextElement
			).width;

			const breadcrumbBugListButtonTextElement = document.getElementsByClassName(
				"js-breadcrumb-bug-list-button-text"
			)[0];
			breadcrumbBugListButtonTextElement.style.fontSize =
				reduxState[SIZE_CONTAINER].constants
					.navbarBreadcrumbButtonTextBaseFontSize + "px";
			let breadcrumbBugListButtonTextElementWidth = getElementSize(
				breadcrumbBugListButtonTextElement
			).width;

			// Set to null, but will be updated later if button is present
			let breadcrumbBugItemButtonTextElement = null;
			let breadcrumbBugItemButtonTextElementWidth = 0;

			let navbarAvailableSpace =
				reduxState[SIZE_CONTAINER].variables.navbar.width -
				reduxState[SIZE_CONTAINER].constants.navbarAccountButtonWidth -
				reduxState[SIZE_CONTAINER].constants.navbarBreadcrumbArrowWidth * 3;

			// If bug item breadcrumb button is also present
			if (reduxState[BUG_CONTAINER].componentsDisplay.targetItem !== null) {
				breadcrumbBugItemButtonTextElement = document.getElementsByClassName(
					"js-breadcrumb-bug-item-button-text"
				)[0];
				breadcrumbBugItemButtonTextElement.style.fontSize =
					reduxState[SIZE_CONTAINER].constants
						.navbarBreadcrumbButtonTextBaseFontSize + "px";
				breadcrumbBugItemButtonTextElementWidth = getElementSize(
					breadcrumbBugItemButtonTextElement
				).width;

				navbarAvailableSpace -=
					reduxState[SIZE_CONTAINER].constants.navbarBreadcrumbArrowWidth;
			}

			let fontSize =
				reduxState[SIZE_CONTAINER].constants
					.navbarBreadcrumbButtonTextBaseFontSize;

			while (
				fontSize >=
					reduxState[GENERAL_CONTAINER].globalConstants
						.navbarBreadcrumbMinimumFontSize &&
				navbarAvailableSpace -
					(breadcrumbProjectListButtonTextElementWidth +
						breadcrumbProjectItemButtonTextElementWidth +
						breadcrumbBugListButtonTextElementWidth +
						breadcrumbBugItemButtonTextElementWidth) <
					0
			) {
				fontSize -= 1;
				breadcrumbProjectListButtonTextElement.style.fontSize = fontSize + "px";
				breadcrumbProjectItemButtonTextElement.style.fontSize = fontSize + "px";
				breadcrumbBugListButtonTextElement.style.fontSize = fontSize + "px";

				breadcrumbProjectListButtonTextElementWidth = getElementSize(
					breadcrumbProjectListButtonTextElement
				).width;
				breadcrumbProjectItemButtonTextElementWidth = getElementSize(
					breadcrumbProjectItemButtonTextElement
				).width;
				breadcrumbBugListButtonTextElementWidth = getElementSize(
					breadcrumbBugListButtonTextElement
				).width;

				if (breadcrumbBugItemButtonTextElement !== null) {
					breadcrumbBugItemButtonTextElement.style.fontSize = fontSize + "px";

					breadcrumbBugItemButtonTextElementWidth = getElementSize(
						breadcrumbBugItemButtonTextElement
					).width;
				}
			}

			dispatch(setDisplaySizeVariablesBreadcrumbFontSize(fontSize));
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants,
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].variables.navbar,
		// eslint-disable-next-line
		reduxState[GENERAL_CONTAINER].globalConstants,
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].componentsDisplay.targetItem,
	]);

	const openProjectsListView = () => {
		if (reduxState[PROJECT_CONTAINER].componentsDisplay.listView !== true) {
			dispatch(
				setWhichProjectComponentsDisplay({
					listView: true,
					targetItem:
						reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichAccountComponentsDisplay({}));
			dispatch(
				setWhichBugComponentsDisplay({
					targetItem: reduxState[BUG_CONTAINER].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichCommentComponentsDisplay({}));
		}
	};

	const openProjectsItemView = () => {
		if (
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemsContainer !== true
		) {
			dispatch(
				setWhichProjectComponentsDisplay({
					itemView: true,
					targetItem:
						reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichAccountComponentsDisplay({}));
			dispatch(
				setWhichBugComponentsDisplay({
					targetItem: reduxState[BUG_CONTAINER].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichCommentComponentsDisplay({}));
		}
	};

	const openBugsListView = () => {
		if (reduxState[BUG_CONTAINER].componentsDisplay.listView !== true) {
			dispatch(
				setWhichBugComponentsDisplay({
					listView: true,
					targetItem: reduxState[BUG_CONTAINER].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichAccountComponentsDisplay({}));
			dispatch(
				setWhichProjectComponentsDisplay({
					targetItem:
						reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichCommentComponentsDisplay({}));
		}
	};

	const openBugsItemView = () => {
		if (reduxState[BUG_CONTAINER].componentsDisplay.itemView !== true) {
			dispatch(
				setWhichBugComponentsDisplay({
					itemView: true,
					targetItem: reduxState[BUG_CONTAINER].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichAccountComponentsDisplay({}));
			dispatch(
				setWhichProjectComponentsDisplay({
					targetItem:
						reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem,
				})
			);
			dispatch(setWhichCommentComponentsDisplay({}));
		}
	};

	const closeProjectItemView = (e) => {
		e.stopPropagation();
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState[PROJECT_CONTAINER].componentsDisplay,
				listView: true,
				itemView: false,
				targetItem: null,
			})
		);
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(setWhichBugComponentsDisplay({}));
		dispatch(setProjectOrBugMassDeleteList(BUG_CONTAINER));
		dispatch(setWhichCommentComponentsDisplay({}));
	};

	const closeBugItemView = (e) => {
		e.stopPropagation();
		dispatch(
			setWhichBugComponentsDisplay({
				...reduxState[BUG_CONTAINER].componentsDisplay,
				// Keeps the user on their current tab (since the user can close a bug from the project tab)
				listView:
					reduxState[BUG_CONTAINER].componentsDisplay.listView === true ||
					reduxState[BUG_CONTAINER].componentsDisplay.itemView === true
						? true
						: false,
				itemView: false,
				targetItem: null,
			})
		);
		dispatch(setWhichAccountComponentsDisplay({}));
		// projectComponentsDisplay is not cleared here on purpose
		dispatch(setWhichCommentComponentsDisplay({}));
	};

	return (
		<div className="breadcrumb-container">
			<div className={props.visible ? "" : "invisible"}>
				<div
					className={
						"breadcrumb-button js-breadcrumb-project-list-button" +
						getProjectOrBugBackgroundColorClassNameDark(
							getCurrentContainerName(reduxState)
						) +
						(reduxState[PROJECT_CONTAINER].componentsDisplay.listView
							? getProjectOrBugBackgroundColorClassNameLight(
									getCurrentContainerName(reduxState)
							  )
							: "")
					}
					onClick={openProjectsListView}
				>
					<div className="breadcrumb-button__text js-breadcrumb-project-list-button-text">
						<i className="fa fa-folder" aria-hidden="true" /> Projects
					</div>
					<div
						// Background color must be made that of the navbar
						// ...otherwise selecting the last button will have
						// ... its light color extend past the arrow
						className={
							"breadcrumb-button__end-container" +
							getProjectOrBugBackgroundColorClassNameDark(
								getCurrentContainerName(reduxState)
							)
						}
					>
						<div
							className={
								"breadcrumb-button__end-container__arrow js-breadcrumb-project-list-button-arrow" +
								getProjectOrBugNavbarArrowColorClassNameDark(
									getCurrentContainerName(reduxState)
								) +
								(reduxState[PROJECT_CONTAINER].componentsDisplay.listView
									? getProjectOrBugNavbarArrowColorClassNameLight(
											getCurrentContainerName(reduxState)
									  )
									: "")
							}
						/>
						<div className="breadcrumb-button__end-container__border-arrow" />
					</div>
				</div>

				{reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem ===
				null ? null : (
					<div>
						<div
							className={
								"breadcrumb-button breadcrumb-button--breadcrumb-arrow-buffered js-breadcrumb-project-item-button" +
								getProjectOrBugBackgroundColorClassNameDark(
									getCurrentContainerName(reduxState)
								) +
								(reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem !==
									null &&
								reduxState[PROJECT_CONTAINER].componentsDisplay.itemView
									? getProjectOrBugBackgroundColorClassNameLight(
											getCurrentContainerName(reduxState)
									  )
									: "")
							}
							onClick={openProjectsItemView}
						>
							<div className="breadcrumb-button__text breadcrumb-button__text--item-name js-breadcrumb-project-item-button-text">
								{
									reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem
										.name
								}
							</div>
							<div
								// Background-color must be made same as the navbar
								// ...otherwise selecting last visible button will
								// ...have its different color extend past arrow
								className={
									"breadcrumb-button__end-container" +
									getProjectOrBugBackgroundColorClassNameDark(
										getCurrentContainerName(reduxState)
									)
								}
							>
								<div
									className={
										"breadcrumb-button__end-container__arrow" +
										getProjectOrBugNavbarArrowColorClassNameDark(
											getCurrentContainerName(reduxState)
										) +
										(reduxState[PROJECT_CONTAINER].componentsDisplay
											.targetItem !== null &&
										reduxState[PROJECT_CONTAINER].componentsDisplay.itemView
											? getProjectOrBugNavbarArrowColorClassNameLight(
													getCurrentContainerName(reduxState)
											  )
											: "")
									}
								/>
								<div className="breadcrumb-button__end-container__border-arrow" />
								<i
									className="fa fa-times breadcrumb-button__end-container__close-button"
									aria-hidden="true"
									onClick={closeProjectItemView}
								/>
							</div>
						</div>

						<div
							className={
								"breadcrumb-button breadcrumb-button--breadcrumb-arrow-buffered js-breadcrumb-bug-list-button" +
								getProjectOrBugBackgroundColorClassNameDark(
									getCurrentContainerName(reduxState)
								) +
								(reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem !==
									null && reduxState[BUG_CONTAINER].componentsDisplay.listView
									? getProjectOrBugBackgroundColorClassNameLight(
											getCurrentContainerName(reduxState)
									  )
									: "")
							}
							onClick={openBugsListView}
						>
							<div className="breadcrumb-button__text js-breadcrumb-bug-list-button-text">
								<i className="fa fa-bug" aria-hidden="true" /> Bugs
							</div>
							<div
								// Background-color must be made same as the navbar
								// ...otherwise selecting last visible button will
								// ...have its different color extend past arrow
								className={
									"breadcrumb-button__end-container" +
									getProjectOrBugBackgroundColorClassNameDark(
										getCurrentContainerName(reduxState)
									)
								}
							>
								<div
									className={
										"breadcrumb-button__end-container__arrow" +
										getProjectOrBugNavbarArrowColorClassNameDark(
											getCurrentContainerName(reduxState)
										) +
										(reduxState[PROJECT_CONTAINER].componentsDisplay
											.targetItem !== null &&
										reduxState[BUG_CONTAINER].componentsDisplay.listView
											? getProjectOrBugNavbarArrowColorClassNameLight(
													getCurrentContainerName(reduxState)
											  )
											: "")
									}
								/>
								<div className="breadcrumb-button__end-container__border-arrow" />
							</div>
						</div>

						{reduxState[BUG_CONTAINER].componentsDisplay.targetItem ===
						null ? null : (
							<div
								className={
									"breadcrumb-button breadcrumb-button--breadcrumb-arrow-buffered js-breadcrumb-bug-item-button" +
									getProjectOrBugBackgroundColorClassNameDark(
										getCurrentContainerName(reduxState)
									) +
									(reduxState[PROJECT_CONTAINER].componentsDisplay
										.targetItem !== null &&
									reduxState[BUG_CONTAINER].componentsDisplay.itemView
										? getProjectOrBugBackgroundColorClassNameLight(
												getCurrentContainerName(reduxState)
										  )
										: "")
								}
								onClick={openBugsItemView}
							>
								<div className="breadcrumb-button__text breadcrumb-button__text--item-name js-breadcrumb-bug-item-button-text">
									{reduxState[BUG_CONTAINER].componentsDisplay.targetItem.name}
								</div>
								<div
									// Background-color must be made same as the navbar
									// ...otherwise selecting last visible button will
									// ...have its different color extend past arrow
									className={
										"breadcrumb-button__end-container" +
										getProjectOrBugBackgroundColorClassNameDark(
											getCurrentContainerName(reduxState)
										)
									}
								>
									<div
										className={
											"breadcrumb-button__end-container__arrow" +
											getProjectOrBugNavbarArrowColorClassNameDark(
												getCurrentContainerName(reduxState)
											) +
											(reduxState[PROJECT_CONTAINER].componentsDisplay
												.targetItem !== null &&
											reduxState[BUG_CONTAINER].componentsDisplay.itemView
												? getProjectOrBugNavbarArrowColorClassNameLight(
														getCurrentContainerName(reduxState)
												  )
												: "")
										}
									></div>
									<div className="breadcrumb-button__end-container__border-arrow" />
									<i
										className="fa fa-times breadcrumb-button__end-container__close-button"
										aria-hidden="true"
										onClick={(e) => closeBugItemView(e)}
									/>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
