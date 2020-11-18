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
		const bugsList = [...reduxState[bugContainerName].list].filter(
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

		drawPieChart(ctx, statusList, bugsList);
		addLabels(ctx, statusList, bugsList);
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

	function drawPieChart(ctx, statusList, bugsList) {
		var startAngle = 0;
		for (let statusObject of statusList) {
			let statusCount = bugsList.filter(
				(item) => item.status_id === statusObject.id
			).length;
			let sliceAngle = (statusCount / bugsList.length) * 2 * Math.PI;

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

	function addLabels(ctx, statusList, bugsList) {
		let startAngle = 0;
		for (let statusObject of statusList) {
			let statusCount = bugsList.filter(
				(item) => item.status_id === statusObject.id
			).length;
			let sliceAngle = (statusCount / bugsList.length) * 2 * Math.PI;

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

			let labelText = Math.round((100 * statusCount) / bugsList.length);
			if (labelText !== 0) {
				ctx.fillStyle = "white";
				ctx.font = "bold 20px Arial";
				ctx.fillText(labelText + "%", labelX, labelY);
				startAngle += sliceAngle;
			}
		}
	}

	return (
		<div className="item-container-bug-pie-chart-component">
			<div className="centered-pie-chart-statistics-container"></div>
			<canvas
				className="pie-chart js-pie-chart-canvas"
				height={pieChartSize}
				width={pieChartSize}
			></canvas>
		</div>
	);
}
