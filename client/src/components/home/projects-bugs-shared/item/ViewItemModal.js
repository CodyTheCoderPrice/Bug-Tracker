import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import ViewItemModalTopBar from "./ViewItemModalTopBar";
import MiniListTable from "../list/MiniListTable";
import ViewItemModalDisplayInfo from "./ViewItemModalDisplayInfo";
import ViewItemModalEditInfo from "./ViewItemModalEditInfo";
import ViewItemModalDelete from "./ViewItemModalDelete";

import "../../../../SCSS/home/projects-bugs-shared/item/viewItemModal.scss";

export default function ViewItemModal(props) {
	const reduxState = useSelector((state) => state);
	return (
		<div>
			<ViewItemModalTopBar reduxContainerName={props.reduxContainerName} />
			<div className="view-item-modal-component">
				<div className="view-item-modal js-view-item-modal">
					<MiniListTable reduxContainerName={props.reduxContainerName} />
					<div className="item-content-container js-item-content-container">
						<div className="padding-container">
							{!reduxState[props.reduxContainerName].componentsDisplay
								.viewItemModalEditInfo ? (
								<div>
									<ViewItemModalDisplayInfo
										reduxContainerName={props.reduxContainerName}
									/>
								</div>
							) : (
								<div>
									<ViewItemModalEditInfo
										reduxContainerName={props.reduxContainerName}
									/>
								</div>
							)}
							{reduxState[props.reduxContainerName].componentsDisplay
								.viewItemModalDelete ? (
								<ViewItemModalDelete
									reduxContainerName={props.reduxContainerName}
								/>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
