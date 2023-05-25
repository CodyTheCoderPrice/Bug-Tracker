import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Component uses container names to work with the redux state
import { GENERAL_CONTAINER } from "../../actions/constants/containerNames";
import {
	getAuthenticationComponentModalElementWithExpandedModifierWidth,
	getWindowSize,
} from "../../utils";
import bugTrackerLogo from "../../images/bug-tracker-logo.svg";
// Other components used by this component
import Register from "./AuthenticationRegister";
import Login from "./AuthenticationLogin";

/**
 * React functional component used to run the app. This component should have
 * only three child components -- Register, Login, and Home. Only one of
 * them should be displayed at any point in time.
 *
 * This is the highest level component of this app, meaning it should not be
 * the child of any other components.
 *
 * @component
 */
function Authentication() {
	const reduxState = useSelector((state) => state);

	const [windowWidth, setWindowWidth] = useState();

	const [
		loginComponentBreakingPointWidth,
		setLoginComponentBreakingPointWidth,
	] = useState();

	const [modalState, setModalState] = useState({
		shouldBeExpanded: null,
		readyToActivateTransitionAndFade: false,
		shouldHaveTransitionAndFade: false,
	});

	const [
		introContainerShouldHaveVisibility,
		setIntroContainerShouldHaveVisibility,
	] = useState(false);

	useEffect(() => {
		setLoginComponentBreakingPointWidth(
			// 30 is added to simulate a margin around the modal
			getAuthenticationComponentModalElementWithExpandedModifierWidth() + 30
		);

		// Initializes windowWidth
		windowSizeHandler();

		window.addEventListener("resize", windowSizeHandler);

		return () => {
			window.removeEventListener("resize", windowSizeHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Declared as an object outside the eventListener so removal works on cleanup
	function windowSizeHandler() {
		setWindowWidth(getWindowSize().width);
	}

	// Updates modalState
	useEffect(() => {
		if (
			windowWidth !== undefined &&
			loginComponentBreakingPointWidth !== undefined
		) {
			console.log(reduxState[GENERAL_CONTAINER].componentsDisplay
				.loginComponentShouldDisplay &&
			windowWidth > loginComponentBreakingPointWidth);

			setModalState({
				shouldBeExpanded:
					reduxState[GENERAL_CONTAINER].componentsDisplay
						.loginComponentShouldDisplay &&
					windowWidth > loginComponentBreakingPointWidth,
				// Delays setting shouldHaveTransitionAndFade true by 1 cycle
				// ...so modal can expand (if needed) first without transition
				readyToActivateTransitionAndFade: true,
				shouldHaveTransitionAndFade:
					modalState.readyToActivateTransitionAndFade,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		windowWidth,
		loginComponentBreakingPointWidth,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		reduxState[GENERAL_CONTAINER].componentsDisplay.loginComponentShouldDisplay,
		modalState.readyToActivateTransitionAndFade,
	]);

	// Updates introContainerShouldHaveVisibility
	useEffect(() => {
		if (
			reduxState[GENERAL_CONTAINER].componentsDisplay
				.loginComponentShouldDisplay &&
			modalState.shouldHaveTransitionAndFade
		) {
			setIntroContainerShouldHaveVisibility(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		// eslint-disable-next-line react-hooks/exhaustive-deps
		reduxState[GENERAL_CONTAINER].componentsDisplay.loginComponentShouldDisplay,
		modalState.shouldHaveTransitionAndFade,
	]);

	return (
		<div className="authentication-component">
			<div className="background" />
			<div className="background-cover" />
			<div
				className={
					"modal" +
					(modalState.shouldBeExpanded ? " modal--expanded" : "") +
					(modalState.shouldHaveTransitionAndFade
						? " modal--has-transition-and-fade"
						: "")
				}
			>
				<div
					className={
						"modal__intro-container" +
						(introContainerShouldHaveVisibility
							? ""
							: " modal__intro-container--invisible")
					}
				>
					<img
						className="modal__intro-container__logo"
						src={bugTrackerLogo}
						title="Bug Tracker created by Cody Price"
						alt="LOGO: Bug Tracker created by Cody Price"
					/>
					<h1 className="modal__intro-container__description">
						Free online bug tracking system <br /> for your software project
						needs
					</h1>
				</div>
				{reduxState[GENERAL_CONTAINER].componentsDisplay
					.loginComponentShouldDisplay ? (
					<Login />
				) : null}
				{reduxState[GENERAL_CONTAINER].componentsDisplay
					.registerComponentShouldDisplay ? (
					<Register />
				) : null}
			</div>
		</div>
	);
}

export default Authentication;
