import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../reducers/containerNames";

import {
	getBugsInProjectList,
	getNumberOfBugsForStatus,
} from "../../../../utils";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerBugPieChart.scss";

export default function ItemContainerBugPieChart() {
	const reduxState = useSelector((state) => state);

	const [pieChartSize] = useState(250);

	useEffect(() => {
		const bugsInProjectList = [...reduxState[BUG_CONTAINER].list].filter(
			(item) =>
				item.project_id ===
				reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.id
		);

		const statusList =
			reduxState[BUG_CONTAINER].priorityStatusOptions.statusList;

		let ctx = document
			.getElementsByClassName("js-pie-chart-canvas")[0]
			.getContext("2d");

		ctx.clearRect(0, 0, pieChartSize, pieChartSize);

		drawPieChart(ctx, statusList, bugsInProjectList);
		addLabels(ctx, statusList, bugsInProjectList);
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].list,
	]);

	function drawPieSlice(
		ctx,
		centerX,
		centerY,
		radius,
		startAngle,
		endAngle,
		color
	) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		/*
		 * Since drawing a cirlce only works with a startAngle of 0 and an
		 * endAngle of 2 PI, if the angles are the same, uses 0 and 2 PI instead
		 */
		startAngle !== endAngle
			? ctx.arc(centerX, centerY, radius, startAngle, endAngle)
			: ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
	}

	function drawPieChart(ctx, statusList, bugsInProjectList) {
		// Math.PI instead of 0 so pie chart will be drawn starting on the left
		var startAngle = Math.PI;

		for (let statusObject of statusList) {
			let statusCount = bugsInProjectList.filter(
				(item) => item.status_id === statusObject.id
			).length;
			let sliceAngle = (statusCount / bugsInProjectList.length) * 2 * Math.PI;

			if (statusCount > 0) {
				drawPieSlice(
					ctx,
					pieChartSize / 2,
					pieChartSize / 2,
					pieChartSize / 2,
					// Modulos of (2 * Math.PI) because startAngle begins at Math.PI
					startAngle % (2 * Math.PI),
					// Modulos of (2 * Math.PI) because startAngle begins at Math.PI
					(startAngle + sliceAngle) % (2 * Math.PI),
					statusObject.colorHex !== null
						? statusObject.colorHex
						: statusObject.color
				);
			}

			startAngle += sliceAngle;
		}
	}

	function addLabels(ctx, statusList, bugsInProjectList) {
		// Math.PI instead of 0 so pie chart will be drawn starting on the left
		var startAngle = Math.PI;

		for (let statusObject of statusList) {
			let statusCount = bugsInProjectList.filter(
				(item) => item.status_id === statusObject.id
			).length;
			let sliceAngle = (statusCount / bugsInProjectList.length) * 2 * Math.PI;

			let labelX =
				pieChartSize / 2 +
				(pieChartSize / 4) * Math.cos(startAngle + sliceAngle / 2) -
				18;
			let labelY =
				pieChartSize / 2 +
				(pieChartSize / 4) * Math.sin(startAngle + sliceAngle / 2);

			let labelText = Math.round(
				(100 * statusCount) / bugsInProjectList.length
			);
			if (labelText !== 0) {
				ctx.fillStyle = "white";
				ctx.font = "bold 20px Arial";
				ctx.fillText(labelText + "%", labelX, labelY);
				startAngle += sliceAngle;
			}
		}
	}

	const getAllStatusStatisticsElement = () => {
		const bugsInProjectList = getBugsInProjectList(
			reduxState,
			reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.id
		);

		return (
			<div className="stats-container">
				{reduxState[BUG_CONTAINER].priorityStatusOptions.statusList.map(
					(statusObject, idx) => {
						return (
							<div className="stats-container__row" key={idx}>
								<div
									className={
										"stats-container__row__status-box" +
										" status-box-background-color-" +
										statusObject.color
									}
								>
									<span className="stats-container__row__status-box__centered-info">
										{statusObject.option}
									</span>
								</div>
								<div className="stats-container__row__stats-centering-container">
									<span
										className={
											"stats-container__row__stats-centering-container__stats" +
											" status-box-text-color-" +
											statusObject.color
										}
									>
										{getNumberOfBugsForStatus(
											reduxState,
											reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem
												.id,
											statusObject.id
										)}{" "}
										/ {bugsInProjectList.length}
									</span>
								</div>
							</div>
						);
					}
				)}
			</div>
		);
	};

	return (
		<div className="item-container-bug-pie-chart-component">
			<table className="centering-table">
				<tbody>
					<tr>
						<td className="centering-table-data">
							{getAllStatusStatisticsElement()}
						</td>
						<td className="centering-table-data">
							<canvas
								className="pie-chart js-pie-chart-canvas"
								height={pieChartSize}
								width={pieChartSize}
							></canvas>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
