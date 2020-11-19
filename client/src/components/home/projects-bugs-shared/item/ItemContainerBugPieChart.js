import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	projectContainerName,
	bugContainerName,
} from "../../../../reducers/containerNames";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerBugPieChart.scss";

export default function ItemContainerBugPieChart() {
	const reduxState = useSelector((state) => state);

	const [pieChartSize] = useState(260);

	useEffect(() => {
		const bugsInProjectList = [...reduxState[bugContainerName].list].filter(
			(item) =>
				item.project_id ===
				reduxState[projectContainerName].componentsDisplay.targetItem.id
		);

		const statusList =
			reduxState[bugContainerName].priorityStatusOptions.statusList;

		let ctx = document
			.getElementsByClassName("js-pie-chart-canvas")[0]
			.getContext("2d");

		ctx.clearRect(0, 0, pieChartSize, pieChartSize);

		drawPieChart(ctx, statusList, bugsInProjectList);
		addLabels(ctx, statusList, bugsInProjectList);
	}, [
		reduxState[projectContainerName].componentsDisplay.targetItem,
		reduxState[bugContainerName].list,
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
		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
		ctx.closePath();
		ctx.fill();
	}

	function drawPieChart(ctx, statusList, bugsInProjectList) {
		var startAngle = 0;
		for (let statusObject of statusList) {
			let statusCount = bugsInProjectList.filter(
				(item) => item.status_id === statusObject.id
			).length;
			let sliceAngle = (statusCount / bugsInProjectList.length) * 2 * Math.PI;

			drawPieSlice(
				ctx,
				pieChartSize / 2,
				pieChartSize / 2,
				pieChartSize / 2,
				startAngle,
				startAngle + sliceAngle,
				statusObject.color
			);
			startAngle += sliceAngle;
		}
	}

	function addLabels(ctx, statusList, bugsInProjectList) {
		let startAngle = 0;
		for (let statusObject of statusList) {
			let statusCount = bugsInProjectList.filter(
				(item) => item.status_id === statusObject.id
			).length;
			let sliceAngle = (statusCount / bugsInProjectList.length) * 2 * Math.PI;

			console.log(
				statusObject.option +
					" -> " +
					Math.cos(sliceAngle) +
					" vs " +
					Math.sin(sliceAngle)
			);
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

	const getNumberOfBugsForStatus = (statusId) => {
		const bugsForStatus = [...reduxState[bugContainerName].list].filter(
			(item) =>
				item.project_id ===
					reduxState[projectContainerName].componentsDisplay.targetItem.id &&
				item.status_id === statusId
		);

		return bugsForStatus.length;
	};

	const getAllStatusStatisticsElement = () => {
		const bugsInProjectList = [...reduxState[bugContainerName].list].filter(
			(item) =>
				item.project_id ===
				reduxState[projectContainerName].componentsDisplay.targetItem.id
		);

		return (
			<div className="stats-container">
				{reduxState[bugContainerName].priorityStatusOptions.statusList.map(
					(statusObject) => {
						return (
							<div className="stats-container__row">
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
										{getNumberOfBugsForStatus(statusObject.id)} /{" "}
										{bugsInProjectList.length}
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
						<td className="centering-table-data">{getAllStatusStatisticsElement()}</td>
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
