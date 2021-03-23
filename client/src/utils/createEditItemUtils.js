import React from "react";

export function getSelectOptionsWithStatusColors(
	objectList,
	objectIdProperty,
	objectOptionProptery
) {
	return objectList.map((obj, idx) => {
		return (
			<option
				className={"js-set-status-box-text-color-" + obj.color}
				key={idx}
				value={obj[objectIdProperty]}
			>
				{obj[objectOptionProptery]}
			</option>
		);
	});
}
