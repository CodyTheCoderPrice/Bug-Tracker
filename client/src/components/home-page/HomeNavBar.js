import React from "react";
import Account from "./account/AccountSidebar";

import "../../SCSS/homeNavBar.scss";
import "font-awesome/css/font-awesome.min.css";

export default function HomeNavBar() {
	

	return (
		<div>
			<div className="navBarDiv">
				<div className="accountDropDownDiv">
					<div className="clickableDiv">
						<div className="textDiv">
							<i className="fa fa-fw fa-user"></i>
							<label className="choiceLabel">Account</label>
						</div>
					</div>
					<Account />
				</div>
			</div>
		</div>
	);
}
