import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	SIZE_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../actions/constants/containerNames";

import {
	setDisplaySizeConstants,
	setDisplaySizeVariables,
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
	setWhichCommentComponentsDisplay,
} from "../../actions";

import {
	getWindowSize,
	getElementSize,
	calcScrollbarWidth,
	calcListViewSearchFilterSortBarHeight,
	calcListViewTableRowHeight,
	calcViewItemTopBarHeight,
	calcItemViewListSidebarWidth,
	calcItemViewOuterDividingContainerMinWidth,
	calcItemViewPaddingContainerPadding,
	getCurrentContainerName,
	getProjectOrBugBackgroundColorClassNameDark,
	getProjectOrBugBackgroundColorClassNameLight,
	getProjectOrBugNavbarArrowColorClassNameDark,
	getProjectOrBugNavbarArrowColorClassNameLight,
} from "../../utils";

export default function Navbar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Makes sure the current size of the window and navbar are stored in redux
	useEffect(() => {
		dispatch(
			setDisplaySizeConstants({
				scrollbarWidth: calcScrollbarWidth(),
				navbarAccountButton: getElementSize(
					document.getElementsByClassName("js-account-button")[0]
				),
				navbarButtonArrowWidth: getElementSize(
					document.getElementsByClassName("js-project-list-button-arrow")[0]
				).width,
				listViewSearchFilterSortBarHeight: calcListViewSearchFilterSortBarHeight(),
				listViewTableRowHeight: calcListViewTableRowHeight(),
				itemViewTopBarHeight: calcViewItemTopBarHeight(),
				itemViewListSidebarWidth: calcItemViewListSidebarWidth(),
				itemViewOuterDividingContainerMinWidth: calcItemViewOuterDividingContainerMinWidth(),
				itemViewPaddingContainerPadding: calcItemViewPaddingContainerPadding(),
			})
		);

		dispatch(
			setDisplaySizeVariables({
				window: getWindowSize(),
				navbar: getElementSize(document.getElementsByClassName("js-navbar")[0]),
			})
		);

		// Adds event to update navbar size on a resize
		window.addEventListener("resize", displaySizeHandler);

		return () => {
			window.removeEventListener("resize", displaySizeHandler);
		};
		// eslint-disable-next-line
	}, []);

	// Declared outside of the eventListener so removing will working on cleanup
	function displaySizeHandler() {
		dispatch(
			setDisplaySizeVariables({
				window: getWindowSize(),
				navbar: getElementSize(document.getElementsByClassName("js-navbar")[0]),
			})
		);
	}

	// Sets max-width for navbar buttons depending on navbar width
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			// If navbarAccountButton is set, then projects and bugs button should also be set (possibly remove this comment)
			reduxState[SIZE_CONTAINER].constants.navbarAccountButton !== null &&
			reduxState[SIZE_CONTAINER].constants.navbarButtonArrowWidth !== null &&
			reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem !== null
		) {
			const projectListButtonTextContainerElement = document.getElementsByClassName(
				"js-project-list-button-text-container"
			)[0];

			const projectItemButtonTextContainerElement = document.getElementsByClassName(
				"js-project-item-button-text-container"
			)[0];

			const bugListButtonTextContainerElement = document.getElementsByClassName(
				"js-bug-list-button-text-container"
			)[0];

			// Reset maxWidth so will not interferre with measuring the new width
			projectListButtonTextContainerElement.style.maxWidth = null;
			projectItemButtonTextContainerElement.style.maxWidth = null;
			bugListButtonTextContainerElement.style.maxWidth = null;

			const projectListButtonTextContainerJson = {
				className: "js-project-list-button-text-container",
				width: getElementSize(projectListButtonTextContainerElement).width,
			};

			const projectItemButtonTextContainerJson = {
				className: "js-project-item-button-text-container",
				width: getElementSize(projectItemButtonTextContainerElement).width,
			};

			const bugListButtonTextContainerJson = {
				className: "js-bug-list-button-text-container",
				width: getElementSize(bugListButtonTextContainerElement).width,
			};

			const navbarButtonElementJsonArray = [
				projectListButtonTextContainerJson,
				projectItemButtonTextContainerJson,
				bugListButtonTextContainerJson,
			];

			let navbarAvailableSpace =
				reduxState[SIZE_CONTAINER].variables.navbar.width -
				reduxState[SIZE_CONTAINER].constants.navbarAccountButton.width -
				projectListButtonTextContainerJson.width -
				projectItemButtonTextContainerJson.width -
				bugListButtonTextContainerJson.width -
				reduxState[SIZE_CONTAINER].constants.navbarButtonArrowWidth * 3;

			if (reduxState[BUG_CONTAINER].componentsDisplay.targetItem !== null) {
				const bugItemButtonTextContainerElement = document.getElementsByClassName(
					"js-bug-item-button-text-container"
				)[0];

				// Reset maxWidth so will not interferre with measuring the new width
				bugItemButtonTextContainerElement.style.maxWidth = null;

				const bugItemButtonTextContainerJson = {
					className: "js-bug-item-button-text-container",
					width: getElementSize(bugItemButtonTextContainerElement).width,
				};

				navbarButtonElementJsonArray.push(bugItemButtonTextContainerJson);

				navbarAvailableSpace -=
					bugItemButtonTextContainerJson.width +
					reduxState[SIZE_CONTAINER].constants.navbarButtonArrowWidth;
			}

			if (navbarAvailableSpace < 0) {
				// Sort by width descending
				navbarButtonElementJsonArray.sort((a, b) => {
					return b.width - a.width;
				});

				let combinedElementWidths = 0;
				let navbarButtonElementsJsonToResizeArray = [];

				// Using every instead of forEach so loop can be broken (by returning false)
				navbarButtonElementJsonArray.every((elementJson, i) => {
					combinedElementWidths += elementJson.width;

					// Inserts current element to the front of the resize array (so the smallest element should be at the start)
					navbarButtonElementsJsonToResizeArray.unshift(elementJson);

					// If not the last element
					if (navbarButtonElementJsonArray[i + 1] !== undefined) {
						// Checks if reducing the the current (and previous) elements width to being the same as the next element's width is more than enough to solve the deficit
						if (
							navbarAvailableSpace +
								(combinedElementWidths -
									navbarButtonElementJsonArray[i + 1].width *
										navbarButtonElementsJsonToResizeArray.length) >
							0
						) {
							// We can solve the deficit by resizing only the current (and previous) elements while not making them the same size or smaller than the next element
							return false;
						}
					}
					return true;
				});

				const resizeWidth =
					(combinedElementWidths + navbarAvailableSpace) /
					navbarButtonElementsJsonToResizeArray.length;
				navbarButtonElementsJsonToResizeArray.forEach((elementJson) => {
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

	const openAccountSidebar = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountSidebar: !reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountSidebar,
			})
		);
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState[PROJECT_CONTAINER].componentsDisplay,
				listViewCreateItemSidbar: false,
				itemViewDeleteModal: false,
				listViewMassDeleteItemsModal: false,
			})
		);
		dispatch(
			setWhichBugComponentsDisplay({
				...reduxState[BUG_CONTAINER].componentsDisplay,
				listViewCreateItemSidbar: false,
				itemViewDeleteModal: false,
				listViewMassDeleteItemsModal: false,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
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

	return (
		<div className="navbar-and-other-components-container">
			<div
				className={
					"navbar-component js-navbar" +
					getProjectOrBugBackgroundColorClassNameDark(
						getCurrentContainerName(reduxState)
					)
				}
			>
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
								{
									reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem
										.name
								}
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
									(reduxState[PROJECT_CONTAINER].componentsDisplay
										.targetItem !== null &&
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
									(reduxState[PROJECT_CONTAINER].componentsDisplay
										.targetItem !== null &&
									reduxState[BUG_CONTAINER].componentsDisplay.itemView
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
				<div className="navbar-button navbar-button--right js-account-button">
					<div
						className={
							"navbar-button__outer-text-container" +
							getProjectOrBugBackgroundColorClassNameDark(
								getCurrentContainerName(reduxState)
							)
						}
						onClick={openAccountSidebar}
					>
						<div className="navbar-button__outer-text-container__inner-text-container navbar-button__outer-text-container__inner-text-container--right">
							<i className="fa fa-fw fa-user" />
							Account
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
