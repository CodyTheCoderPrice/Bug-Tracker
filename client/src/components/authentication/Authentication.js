import React from "react";
import { useSelector } from "react-redux";
// Component uses container names to work with the redux state
import { GENERAL_CONTAINER } from "../../actions/constants/containerNames";
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

	return (
		<div className="authentication-component">
			<div className="background" />
			<div className="background-cover" />
			{reduxState[GENERAL_CONTAINER].componentsDisplay
				.registerComponentShouldDisplay ? (
				<Register />
			) : null}
			{reduxState[GENERAL_CONTAINER].componentsDisplay
				.loginComponentShouldDisplay ? (
				<Login />
			) : null}
		</div>
	);
}

export default Authentication;
