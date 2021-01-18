import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	SIZE_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
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

export default function NavbarBreadcrumb() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Resizes breacrumb buttons to fit inside the navbar based on the window size
	useEffect(() => {
		/**
		 * Resets a navbar breadcrumb button's text-container element size and
		 * returns a json object to be used in the resizing process
		 *
		 * @param {String} buttonTextContainerClassName - className for navbar
		 * breadcrumb button's outer text container element
		 * @returns {JSON} - JSON container a navbar breadcrumb buttons
		 * text-container className and the text-container element's width
		 */
		const resetButtonSizeAndGetJson = (buttonTextContainerClassName) => {
			/*
			Working with button's text-container element instead of the entire
			button element since only the text-container of a button resizes
			*/
			const buttonTextContainerElement = document.getElementsByClassName(
				buttonTextContainerClassName
			)[0];

			/*
			maxWidth determins the size of the text-container.
			Also, must set maxWidth to null encase there was a prior
			resizing that would interfer with this current resizing
			*/
			buttonTextContainerElement.style.maxWidth = null;

			return {
				className: buttonTextContainerClassName,
				width: getElementSize(buttonTextContainerElement).width,
			};
		};

		/*
		Project list breadcrumb button added here since it is always present
		and may need it's size reset even if it is the only breadcrumb button
		*/
		const navbarBreadcrumbButtonJsonArray = [
			resetButtonSizeAndGetJson("js-project-list-button-text-container"),
		];

		/*
		If project item and bug list breadcrumb buttons are present. Also needs
		to check if the SIZE_CONTAINER has the sizes needed to calc resize.
		*/
		if (
			reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem !== null &&
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].constants.navbarAccountButton !== null &&
			reduxState[SIZE_CONTAINER].constants.navbarButtonArrowWidth !== null
		) {
			// Following 2 buttons are always present when there's a target project.
			navbarBreadcrumbButtonJsonArray.push(
				resetButtonSizeAndGetJson("js-project-item-button-text-container")
			);
			navbarBreadcrumbButtonJsonArray.push(
				resetButtonSizeAndGetJson("js-bug-list-button-text-container")
			);

			let navbarAvailableSpace =
				reduxState[SIZE_CONTAINER].variables.navbar.width -
				reduxState[SIZE_CONTAINER].constants.navbarAccountButton.width -
				navbarBreadcrumbButtonJsonArray[0].width -
				navbarBreadcrumbButtonJsonArray[1].width -
				navbarBreadcrumbButtonJsonArray[2].width -
				reduxState[SIZE_CONTAINER].constants.navbarButtonArrowWidth * 3;

			// If bug item breadcrumb button is also present
			if (reduxState[BUG_CONTAINER].componentsDisplay.targetItem !== null) {
				navbarBreadcrumbButtonJsonArray.push(
					resetButtonSizeAndGetJson("js-bug-item-button-text-container")
				);

				navbarAvailableSpace -=
					navbarBreadcrumbButtonJsonArray[3].width +
					reduxState[SIZE_CONTAINER].constants.navbarButtonArrowWidth;
			}

			// If navbar doesn't have enough space -- resize breadcrumb buttons
			if (navbarAvailableSpace < 0) {
				// Sort by desc width so largest buttons are resized first
				navbarBreadcrumbButtonJsonArray.sort((a, b) => {
					return b.width - a.width;
				});

				let combinedElementWidths = 0;
				const navbarBreadcrumbButtonJsonArrayToResize = [];

				/*
				Since forEach loops can't be broken out of, using every (break
				by returning false instead of true)
				*/
				navbarBreadcrumbButtonJsonArray.every((elementJson, i) => {
					combinedElementWidths += elementJson.width;
					navbarBreadcrumbButtonJsonArrayToResize.push(elementJson);

					// If not the last element
					if (navbarBreadcrumbButtonJsonArray[i + 1] !== undefined) {
						/*
						If reducing the current & previous element's widths to
						being equal to next element's (smaller element) width
						would be more than enough to fit the available space.
						*/
						if (
							navbarAvailableSpace +
								(combinedElementWidths -
									navbarBreadcrumbButtonJsonArray[i + 1].width *
										navbarBreadcrumbButtonJsonArrayToResize.length) >
							0
						) {
							/*
							Only current & previous elements need resizing so
							break out of the every loop
							*/
							return false;
						}
					}
					// Continue every loop (or end it if last element)
					return true;
				});

				/*
				We now know how many buttons need resizing, so we calc the size
				that will make them all just fit the available space.
				*/
				const resizeWidth =
					(combinedElementWidths + navbarAvailableSpace) /
					navbarBreadcrumbButtonJsonArrayToResize.length;

				navbarBreadcrumbButtonJsonArrayToResize.forEach((elementJson) => {
					document.getElementsByClassName(
						elementJson.className
					)[0].style.maxWidth = resizeWidth + "px";
				});
			}
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER],
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
			<div
				className={
					"navbar-button js-project-list-button" +
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
				<div className="navbar-button__outer-text-container js-project-list-button-text-container">
					<div className="navbar-button__outer-text-container__inner-text-container">
						<i className="fa fa-folder" aria-hidden="true" /> Projects
					</div>
				</div>
				<div
					// Background color must be made that of the navbar
					// ...otherwise selecting the last button will have
					// ... its light color extend past the arrow
					className={
						"navbar-button__arrow-container" +
						getProjectOrBugBackgroundColorClassNameDark(
							getCurrentContainerName(reduxState)
						)
					}
				>
					<div
						className={
							"navbar-button__arrow-container__arrow js-project-list-button-arrow" +
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
					<div className="navbar-button__arrow-container__border-arrow" />
				</div>
			</div>

			{reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem ===
			null ? null : (
				<div
					className={
						"navbar-button navbar-button--arrow-buffered js-project-item-button" +
						getProjectOrBugBackgroundColorClassNameDark(
							getCurrentContainerName(reduxState)
						) +
						(reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem !==
							null && reduxState[PROJECT_CONTAINER].componentsDisplay.itemView
							? getProjectOrBugBackgroundColorClassNameLight(
									getCurrentContainerName(reduxState)
							  )
							: "")
					}
					onClick={openProjectsItemView}
				>
					<div className="navbar-button__outer-text-container js-project-item-button-text-container">
						<div className="navbar-button__outer-text-container__inner-text-container navbar-button__outer-text-container__inner-text-container--item-name">
							{reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.name}
						</div>
					</div>
					<div
						// Background-color must be made same as the navbar
						// ...otherwise selecting last visible button will
						// ...have its different color extend past arrow
						className={
							"navbar-button__arrow-container" +
							getProjectOrBugBackgroundColorClassNameDark(
								getCurrentContainerName(reduxState)
							)
						}
					>
						<div
							className={
								"navbar-button__arrow-container__arrow" +
								getProjectOrBugNavbarArrowColorClassNameDark(
									getCurrentContainerName(reduxState)
								) +
								(reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem !==
									null &&
								reduxState[PROJECT_CONTAINER].componentsDisplay.itemView
									? getProjectOrBugNavbarArrowColorClassNameLight(
											getCurrentContainerName(reduxState)
									  )
									: "")
							}
						>
							<i
								className="fa fa-times navbar-button__arrow-container__border-arrow__close-button"
								aria-hidden="true"
								onClick={closeProjectItemView}
							/>
						</div>
						<div className="navbar-button__arrow-container__border-arrow" />
					</div>
				</div>
			)}

			<div
				className={
					"navbar-button navbar-button--arrow-buffered js-bug-list-button" +
					(reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem === null
						? " navbar-button--invisible"
						: "") +
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
				<div className="navbar-button__outer-text-container  js-bug-list-button-text-container">
					<div className="navbar-button__outer-text-container__inner-text-container">
						<i className="fa fa-bug" aria-hidden="true" /> Bugs
					</div>
				</div>
				<div
					// Background-color must be made same as the navbar
					// ...otherwise selecting last visible button will
					// ...have its different color extend past arrow
					className={
						"navbar-button__arrow-container" +
						getProjectOrBugBackgroundColorClassNameDark(
							getCurrentContainerName(reduxState)
						)
					}
				>
					<div
						className={
							"navbar-button__arrow-container__arrow" +
							getProjectOrBugNavbarArrowColorClassNameDark(
								getCurrentContainerName(reduxState)
							) +
							(reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem !==
								null && reduxState[BUG_CONTAINER].componentsDisplay.listView
								? getProjectOrBugNavbarArrowColorClassNameLight(
										getCurrentContainerName(reduxState)
								  )
								: "")
						}
					/>
					<div className="navbar-button__arrow-container__border-arrow" />
				</div>
			</div>

			{reduxState[BUG_CONTAINER].componentsDisplay.targetItem ===
			null ? null : (
				<div
					className={
						"navbar-button navbar-button--arrow-buffered js-bug-item-button" +
						getProjectOrBugBackgroundColorClassNameDark(
							getCurrentContainerName(reduxState)
						) +
						(reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem !==
							null && reduxState[BUG_CONTAINER].componentsDisplay.itemView
							? getProjectOrBugBackgroundColorClassNameLight(
									getCurrentContainerName(reduxState)
							  )
							: "")
					}
					onClick={openBugsItemView}
				>
					<div className="navbar-button__outer-text-container js-bug-item-button-text-container">
						<div className="navbar-button__outer-text-container__inner-text-container navbar-button__outer-text-container__inner-text-container--item-name">
							{reduxState[BUG_CONTAINER].componentsDisplay.targetItem.name}
						</div>
					</div>
					<div
						// Background-color must be made same as the navbar
						// ...otherwise selecting last visible button will
						// ...have its different color extend past arrow
						className={
							"navbar-button__arrow-container" +
							getProjectOrBugBackgroundColorClassNameDark(
								getCurrentContainerName(reduxState)
							)
						}
					>
						<div
							className={
								"navbar-button__arrow-container__arrow" +
								getProjectOrBugNavbarArrowColorClassNameDark(
									getCurrentContainerName(reduxState)
								) +
								(reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem !==
									null && reduxState[BUG_CONTAINER].componentsDisplay.itemView
									? getProjectOrBugNavbarArrowColorClassNameLight(
											getCurrentContainerName(reduxState)
									  )
									: "")
							}
						>
							{" "}
							<i
								className="fa fa-times navbar-button__arrow-container__border-arrow__close-button"
								aria-hidden="true"
								onClick={(e) => closeBugItemView(e)}
							/>
						</div>
						<div className="navbar-button__arrow-container__border-arrow" />
					</div>
				</div>
			)}
		</div>
	);
}
