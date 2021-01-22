import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	SIZE_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	setWhichGeneralComponentsDisplay,
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
	setWhichCommentComponentsDisplay,
} from "../../../actions";

import {
	getElementSize,
	getElementStyle,
	stripNonDigits,
} from "../../../utils";

import bendyArrowRight from "../../../images/bendy-arrow-longer-icon.svg";

export default function NavbarHamburger() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Resizes breacrumb buttons to fit inside the navbar based on the window size
	useEffect(() => {
		const hamburgerTitleElement = document.getElementsByClassName(
			"js-hamburger-title"
		)[0];

		hamburgerTitleElement.style.visibility = "hidden";

		// Resets fontSize and maxWidth
		hamburgerTitleElement.style.fontSize =
			reduxState[SIZE_CONTAINER].constants.navbarHamburgerTitleStyles
				.baseFontSize + "px";
		hamburgerTitleElement.style.maxWidth = null;

		if (
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].constants.navbarAccountButtonWidth !== null
		) {
			/* 
			Width of hambugerTitle left out since it needs it will
			change frequently and new available space needs to be calculated
			 */
			let navbarAvailableSpace =
				reduxState[SIZE_CONTAINER].variables.navbar.width -
				reduxState[SIZE_CONTAINER].constants.navbarAccountButtonWidth -
				reduxState[SIZE_CONTAINER].constants.navbarHamburgerTitleStyles.left;

			let hamburgerTitleElementWidth = getElementSize(hamburgerTitleElement)
				.width;

			let fontSize =
				reduxState[SIZE_CONTAINER].constants.navbarHamburgerTitleStyles
					.baseFontSize;

			while (
				fontSize >
					reduxState[GENERAL_CONTAINER].globalConstants
						.navbarBreadcrumbMinimumFontSize &&
				navbarAvailableSpace - hamburgerTitleElementWidth < 0
			) {
				fontSize -= 1;
				hamburgerTitleElement.style.fontSize = fontSize + "px";

				hamburgerTitleElementWidth = getElementSize(hamburgerTitleElement)
					.width;
			}

			if (navbarAvailableSpace - hamburgerTitleElementWidth < 0) {
				hamburgerTitleElement.style.maxWidth = navbarAvailableSpace + "px";
			}

			hamburgerTitleElement.style.visibility = "visible";
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
		reduxState[PROJECT_CONTAINER].componentsDisplay,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].componentsDisplay,
	]);

	const toggleHamburgerDropdown = () => {
		dispatch(
			setWhichGeneralComponentsDisplay({
				...reduxState[GENERAL_CONTAINER].componentsDisplay,
				navbarHamburherDropdown: !reduxState[GENERAL_CONTAINER]
					.componentsDisplay.navbarHamburherDropdown,
			})
		);
	};

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

	const getTitle = () => {
		if (reduxState[PROJECT_CONTAINER].componentsDisplay.listView) {
			return "Projects";
		} else if (reduxState[PROJECT_CONTAINER].componentsDisplay.itemView) {
			return reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.name;
		} else if (reduxState[BUG_CONTAINER].componentsDisplay.listView) {
			return "Bugs";
		} else if (reduxState[BUG_CONTAINER].componentsDisplay.itemView) {
			return reduxState[BUG_CONTAINER].componentsDisplay.targetItem.name;
		}
	};

	return (
		<div className="hamburger-container">
			{!reduxState[GENERAL_CONTAINER].componentsDisplay
				.navbarHamburherDropdown ? (
				<div
					className="hamburger-button-container"
					onClick={toggleHamburgerDropdown}
				>
					<i
						className="fa fa-bars hamburger-button-container__icon"
						aria-hidden="true"
					/>
				</div>
			) : (
				<div>
					<div className="blurred-background" />
					<div className="hamburger-dropdown">
						<div className="hamburger-dropdown__top-space">
							<i
								className="fa fa-bars hamburger-dropdown__top-space__icon"
								aria-hidden="true"
								onClick={toggleHamburgerDropdown}
							/>
						</div>
						<div
							className={
								"hamburger-dropdown__option" +
								(reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem ===
								null
									? " hamburger-dropdown__option--round-bottom-border-first-button"
									: "")
							}
							onClick={openProjectsListView}
						>
							<i className="fa fa-folder" aria-hidden="true" /> Projects
						</div>

						{reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem ===
						null ? null : (
							<div>
								<div
									className="hamburger-dropdown__option"
									onClick={openProjectsItemView}
								>
									<img
										className="hamburger-dropdown__option__arrow-icon"
										src={bendyArrowRight}
										alt="Arrow pointing from the Projects button above to this button signifying this is a project"
									/>
									{
										reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem
											.name
									}
								</div>

								<div
									className={
										"hamburger-dropdown__option" +
										(reduxState[BUG_CONTAINER].componentsDisplay.targetItem ===
										null
											? " hamburger-dropdown__option--round-bottom-border-third-button"
											: "")
									}
									onClick={openBugsListView}
								>
									<i className="fa fa-bug" aria-hidden="true" /> Bugs
								</div>

								{reduxState[BUG_CONTAINER].componentsDisplay.targetItem ===
								null ? null : (
									<div
										className="hamburger-dropdown__option hamburger-dropdown__option--round-bottom-border-last-button"
										onClick={openBugsItemView}
									>
										<img
											className="hamburger-dropdown__option__arrow-icon"
											src={bendyArrowRight}
											alt="Arrow pointing from the Bugs button above to this button signifying this is a bug"
										/>
										{
											reduxState[BUG_CONTAINER].componentsDisplay.targetItem
												.name
										}
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			)}
			<div
				className="hamburger-title js-hamburger-title"
				onClick={toggleHamburgerDropdown}
			>
				{getTitle()}
			</div>
		</div>
	);
}
