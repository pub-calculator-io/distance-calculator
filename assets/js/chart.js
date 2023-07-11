'use strict'
import { Chart, registerables  } from './lib/chartjs/chart.js';

Chart.register(...registerables);
Chart.defaults.borderColor = '#000';

const theme = localStorage.getItem('theme') !== 'system' ? localStorage.getItem('theme') : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const colors = {
	light: {
		purple: '#A78BFA',
		yellow: '#FBBF24',
		sky: '#7DD3FC',
		blue: '#1D4ED8',
		textColor: '#6B7280',
		yellowGradientStart: 'rgba(250, 219, 139, 0.33)',
		purpleGradientStart: 'rgba(104, 56, 248, 0.16)',
		skyGradientStart: 'rgba(56, 187, 248, 0.16)',
		tealGradientStart: 'rgba(56, 248, 222, 0.16)',
		yellowGradientStop: 'rgba(250, 219, 139, 0)',
		purpleGradientStop: 'rgba(104, 56, 248, 0)',
		gridColor: '#DBEAFE',
		tooltipBackground: '#fff',
		fractionColor: '#EDE9FE',
	},
	dark: {
		purple: '#7C3AED',
		yellow: '#D97706',
		sky: '#0284C7',
		blue: '#101E47',
		textColor: '#fff',
		yellowGradientStart: 'rgba(146, 123, 67, 0.23)',
		purpleGradientStart: 'rgba(78, 55, 144, 0.11)',
		skyGradientStart: 'rgba(56, 187, 248, 0.16)',
		tealGradientStart: 'rgba(56, 248, 222, 0.16)',
		yellowGradientStop: 'rgba(250, 219, 139, 0)',
		purpleGradientStop: 'rgba(104, 56, 248, 0)',
		gridColor: '#162B64',
		tooltipBackground: '#1C3782',
		fractionColor: '#41467D',
	},
};

class Custom extends LineController {
	draw() {
		super.draw(arguments);

		const ctx = this.chart.ctx;
		let _stroke = ctx.stroke;

		ctx.stroke = function () {
			ctx.save();
			ctx.shadowColor = 'black';
			ctx.shadowBlur = 20;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 20;
			_stroke.apply(this, arguments);
			ctx.restore();
		};
	}
}

Custom.id = 'shadowLine';
Custom.defaults = LineController.defaults;

Chart.register(Custom);

let switchTheme = []

if (document.getElementById('chartC150')) {
	let ctx = document.getElementById('chartC150').getContext('2d');

	let purpleGradient = ctx.createLinearGradient(0, 0, 2048, 0);
	purpleGradient.addColorStop(0, 'rgba(152, 96, 250, 0)');
	purpleGradient.addColorStop(1, 'rgba(152, 96, 250, .8)');

	const dataCharts = {
		labels: [0, 1, 2, 3, 4, 5, 6],
		datasets: [
			{
				label: 'D1',
				data: [{ x: 4, y: 40 }],
				backgroundColor: '#7C3AED',
				borderWidth: 0,
				radius: 6,
				hoverRadius: 6,
				type: 'scatter',
				stacked: true,
				order: 0,
			},
			{
				label: 'D2',
				data: [0, 10, 20, 40, 60, 80, 100],
				borderColor: colors[theme].purple,
				type: 'line',
				fill: '-1',
				order: 1,
				pointHoverRadius: 0,
			},
			{
				label: 'D3',
				data: [0, 5, 5, 15, 25, 35, 45],
				borderColor: colors[theme].purple,
				backgroundColor: purpleGradient,
				type: 'line',
				fill: '-1',
				order: 1,
				pointHoverRadius: 0,
			},
		],
	};

	let chart = new Chart(document.getElementById('chartC150'), {
		data: dataCharts,
		options: {
			stepSize: 1,
			response: true,
			elements: {
				point: {
					radius: 0,
				},
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: false,
			},
			interaction: {
				mode: 'index',
				intersect: false,
			},
			scales: {
				y: {
					max: 100,
					grid: {
						tickLength: 0,
						color: colors[theme].gridColor,
					},
					ticks: {
						display: false,
						stepSize: 25,
					},
					border: {
						color: colors[theme].gridColor,
					},
				},
				x: {
					stacked: false,
					border: {
						color: colors[theme].gridColor,
					},
					ticks: {
						display: false,
						color: colors[theme].gridColor,
						stepSize: 1,
					},
					grid: {
						tickLength: 0,
						color: colors[theme].gridColor,
					},
				},
			},
		},
	});

	let switchThemeChartC150 = function(theme) {
		let y = chart.config.options.scales.y
		let x = chart.config.options.scales.x
		let data = chart.config.data
		y.grid.color = colors[theme].gridColor;
		y.border.color = colors[theme].gridColor;
		x.border.color = colors[theme].gridColor;
		x.grid.color = colors[theme].gridColor;
		x.ticks.color = colors[theme].gridColor;
		data.datasets[1].borderColor = colors[theme].purple;
		data.datasets[2].borderColor = colors[theme].purple;
		chart.update()
	}

	switchTheme.push(switchThemeChartC150)

}

// if (document.getElementById('chartC76')) {
// 	let ctx = document.getElementById('chartC76').getContext('2d');

// 	let tooltip = {
// 		enabled: false,
// 		external: function (context) {
// 			let tooltipEl = document.getElementById('chartjs-tooltip');
// 			if (!tooltipEl) {
// 				tooltipEl = document.createElement('div');
// 				tooltipEl.classList.add('chart-tooltip')
// 				tooltipEl.id = 'chartjs-tooltip';
// 				tooltipEl.innerHTML = '<table></table>';
// 				document.body.appendChild(tooltipEl);
// 			}

// 			const tooltipModel = context.tooltip;
// 			if (tooltipModel.opacity === 0) {
// 				tooltipEl.style.opacity = 0;
// 				return;
// 			}

// 			tooltipEl.classList.remove('above', 'below', 'no-transform');
// 			if (tooltipModel.yAlign) {
// 				tooltipEl.classList.add(tooltipModel.yAlign);
// 			} else {
// 				tooltipEl.classList.add('no-transform');
// 			}

// 			function getBody(bodyItem) {
// 				return bodyItem.lines;
// 			}

// 			if (tooltipModel.body) {
// 				const bodyLines = tooltipModel.body.map(getBody);

// 				let innerHtml = '<tbody>';
// 				innerHtml += '<tr><td class="chart-tooltip__text">' + bodyLines + '</td></tr>';
// 				innerHtml += '</tbody>';

// 				let tableRoot = tooltipEl.querySelector('table');
// 				tableRoot.innerHTML = innerHtml;
// 			}

// 			const position = context.chart.canvas.getBoundingClientRect();

// 			tooltipEl.style.opacity = "1";
// 			tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.clientWidth / 2 + 'px';
// 			tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.clientHeight - 11 + 'px';
// 		},
// 	};

// 	const dataCharts = {
// 		labels: [48, 43, 38, 32, 15, 12],
// 		datasets: [
// 			{
// 				data: [48, 43, 38, 32, 15, 12],
// 				barThickness: window.innerWidth < 1024 ? 24 : 56,
// 				max: 5,
// 				type: 'bar',
// 				order: 1,
// 				pointHoverBackgroundColor: '#FFFFFF',
// 				pointHoverBorderWidth: 2,
// 				pointHoverRadius: 6,
// 				pointHoverBorderColor: '#5045E5',
// 				borderRadius: {
// 					topLeft: 4,
// 					topRight: 4,
// 				},
// 				stacked: true,
// 				backgroundColor: colors[theme].sky,
// 			},
// 		],
// 	};

// 	let chart = new Chart(document.getElementById('chartC76'), {
// 		data: dataCharts,
// 		options: {
// 			stepSize: 1,
// 			response: true,
// 			elements: {
// 				point: {
// 					radius: 0,
// 				},
// 			},
// 			plugins: {
// 				legend: {
// 					display: false,
// 				},
// 				tooltip: tooltip,
// 			},
// 			interaction: {
// 				mode: 'index',
// 				intersect: false,
// 			},
// 			scales: {
// 				y: {
// 					max: 50,
// 					grid: {
// 						tickLength: 0,
// 						color: colors[theme].gridColor,
// 					},
// 					ticks: {
// 						display: false,
// 						stepSize: 10,
// 					},
// 					border: {
// 						color: colors[theme].gridColor,
// 					},
// 				},
// 				x: {
// 					border: {
// 						color: colors[theme].gridColor,
// 					},
// 					ticks: {
// 						display: false,
// 						color: colors[theme].gridColor,
// 						stepSize: 1,
// 					},
// 					grid: {
// 						tickLength: 0,
// 						color: colors[theme].gridColor,
// 					},
// 				},
// 			},
// 		},
// 	});

// 	let switchThemeChartC76 = function(theme) {
// 		let y = chart.config.options.scales.y
// 		let x = chart.config.options.scales.x
// 		let data = chart.config.data
// 		y.grid.color = colors[theme].gridColor;
// 		y.border.color = colors[theme].gridColor;
// 		x.border.color = colors[theme].gridColor;
// 		x.grid.color = colors[theme].gridColor;
// 		x.ticks.color = colors[theme].gridColor;
// 		data.datasets[0].backgroundColor = colors[theme].sky;
// 		chart.update()
// 	}

// 	switchTheme.push(switchThemeChartC76)
// }

// if (document.getElementById('fractionFirst')) {
// 	let options = {
// 		plugins: {
// 			tooltip: {
// 				enabled: false,
// 			},
// 			legend: {
// 				display: false,
// 			},
// 		},
// 	};
// 	let fractionF = new Chart(document.getElementById('fractionFirst'), {
// 		type: 'pie',
// 		data: {
// 			datasets: [
// 				{
// 					data: [15, 85],
// 					backgroundColor: ['#6D28D9', colors[theme].fractionColor],
// 					weight: 1,
// 					borderColor: '#DDD6FE',
// 					borderWidth: 0,
// 				},
// 			],
// 		},
// 		options: options,
// 	});
// 	let fractionS = new Chart(document.getElementById('fractionSecondary'), {
// 		type: 'pie',
// 		data: {
// 			datasets: [
// 				{
// 					data: [45, 55],
// 					backgroundColor: ['#6D28D9', colors[theme].fractionColor],
// 					weight: 1,
// 					borderColor: '#DDD6FE',
// 					borderWidth: 0,
// 				},
// 			],
// 		},
// 		options: options,
// 	});
// 	let fractionA = new Chart(document.getElementById('fractionAnswer'), {
// 		type: 'pie',
// 		data: {
// 			datasets: [
// 				{
// 					data: [fractionF.data.datasets[0].data[0] + fractionS.data.datasets[0].data[0], 100 - (fractionF.data.datasets[0].data[0] + fractionS.data.datasets[0].data[0])],
// 					backgroundColor: ['#6D28D9', colors[theme].fractionColor],
// 					weight: 1,
// 					borderColor: '#DDD6FE',
// 					borderWidth: 0,
// 				},
// 			],
// 		},
// 		options: options,
// 	});

// 	let switchThemeFractions = function(theme) {
// 		fractionF.data.datasets[0].backgroundColor = ['#6D28D9', colors[theme].fractionColor];
// 		fractionS.data.datasets[0].backgroundColor = ['#6D28D9', colors[theme].fractionColor];
// 		fractionA.data.datasets[0].backgroundColor = ['#6D28D9', colors[theme].fractionColor];
// 		fractionF.update()
// 		fractionS.update()
// 		fractionA.update()
// 	}

// 	switchTheme.push(switchThemeFractions)
// }

// if (document.getElementById('chartDonut')) {
// 	let data = [
// 		{
// 			data: [85, 15],
// 			labels: ['15%', '85%'],
// 			backgroundColor: [colors[theme].purple, colors[theme].yellow],
// 			borderColor: '#DDD6FE',
// 			borderWidth: 0,
// 		},
// 	];

// 	let options = {
// 		rotation: 0,
// 		cutout: '37%',
// 		layout: {
// 			padding: 16,
// 		},
// 		plugins: {
// 			tooltip: {
// 				enabled: false,
// 			},
// 			legend: {
// 				display: false,
// 			},
// 		},
// 	};

// 	const customDataLabels = {
// 		id: 'customDataLabel',
// 		afterDatasetDraw(chart, args, pluginOptions) {
// 			const {
// 				ctx,
// 				data,
// 				chartArea: { top, bottom, left, right, width, height },
// 			} = chart;
// 			ctx.save();

// 			data.datasets[0].data.forEach((datapoint, index) => {
// 				const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();
// 				let halfWidth = width / 2;
// 				let halfHeight = height / 2;

// 				let textXPosition = x >= halfWidth ? 'left' : 'right';

// 				let xLine = x >= halfWidth ? x + 15 : x - 15;
// 				let yLine = y >= halfHeight ? y + 25 : y - 25;
// 				ctx.font = '14px Inter';
// 				ctx.textAlign = textXPosition;
// 				ctx.fillStyle = colors[theme].textColor;
// 				ctx.textBaseline = 'middle';

// 				ctx.fillText(`${datapoint}%`, xLine, yLine);
// 			});
// 		},
// 	};

// 	let donut = new Chart(document.getElementById('chartDonut'), {
// 		type: 'doughnut',
// 		data: {
// 			datasets: data,
// 		},
// 		options: options,
// 		plugins: [customDataLabels],
// 	});

// 	let switchThemeDonut = function(theme) {
// 		donut.destroy()

// 		const customDataLabels = {
// 			id: 'customDataLabel',
// 			afterDatasetDraw(chart, args, pluginOptions) {
// 				const {
// 					ctx,
// 					data,
// 					chartArea: { top, bottom, left, right, width, height },
// 				} = chart;
// 				ctx.save();
	
// 				data.datasets[0].data.forEach((datapoint, index) => {
// 					const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();
// 					let halfWidth = width / 2;
// 					let halfHeight = height / 2;
	
// 					let textXPosition = x >= halfWidth ? 'left' : 'right';
	
// 					let xLine = x >= halfWidth ? x + 15 : x - 15;
// 					let yLine = y >= halfHeight ? y + 25 : y - 25;
// 					ctx.font = '14px Inter';
// 					ctx.textAlign = textXPosition;
// 					ctx.fillStyle = colors[theme].textColor;
// 					ctx.textBaseline = 'middle';
	
// 					ctx.fillText(`${datapoint}%`, xLine, yLine);
// 				});
// 			},
// 		};

// 		donut = new Chart(document.getElementById('chartDonut'), {
// 			type: 'doughnut',
// 			data: {
// 				datasets: data,
// 			},
// 			options: options,
// 			plugins: [customDataLabels],
// 		});

// 		donut.data.datasets[0].backgroundColor = [colors[theme].purple, colors[theme].yellow];
// 		donut.update()
// 	}

// 	switchTheme.push(switchThemeDonut)
// }

// if (document.getElementById('chartDonutSmall')) {
// 	let data = [
// 		{
// 			data: [85, 15],
// 			labels: ['15%', '85%'],
// 			backgroundColor: [colors[theme].purple, colors[theme].yellow],
// 			borderColor: '#DDD6FE',
// 			borderWidth: 0,
// 		},
// 	];

// 	let options = {
// 		rotation: 0,
// 		cutout: '37%',
// 		layout: {
// 			padding: 29,
// 		},
// 		plugins: {
// 			tooltip: {
// 				enabled: false,
// 			},
// 			legend: {
// 				display: false,
// 			},
// 		},
// 	};

// 	const customDataLabels = {
// 		id: 'customDataLabel',
// 		afterDatasetDraw(chart, args, pluginOptions) {
// 			const {
// 				ctx,
// 				data,
// 				chartArea: { top, bottom, left, right, width, height },
// 			} = chart;
// 			ctx.save();

// 			data.datasets[0].data.forEach((datapoint, index) => {
// 				const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();

// 				let textXPosition = x >= 110 ? 'left' : 'right';

// 				let xLine = x >= 110 ? x + 30 : x - 30;
// 				let yLine = y >= 77 ? y + 10 : y - 10;

// 				ctx.font = '14px Inter';
// 				ctx.textAlign = textXPosition;
// 				ctx.fillStyle = colors[theme].textColor;
// 				ctx.textBaseline = 'middle';

// 				ctx.fillText(`${datapoint}%`, xLine, yLine);
// 			});
// 		},
// 	};

// 	let donutSmall = new Chart(document.getElementById('chartDonutSmall'), {
// 		type: 'doughnut',
// 		data: {
// 			datasets: data,
// 		},
// 		options: options,
// 		plugins: [customDataLabels],
// 	});

// 	let switchThemeDonutSmall = function(theme) {
// 		donutSmall.destroy()

// 		const customDataLabels = {
// 			id: 'customDataLabel',
// 			afterDatasetDraw(chart, args, pluginOptions) {
// 				const {
// 					ctx,
// 					data,
// 					chartArea: { top, bottom, left, right, width, height },
// 				} = chart;
// 				ctx.save();
	
// 				data.datasets[0].data.forEach((datapoint, index) => {
// 					const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();
	
// 					let textXPosition = x >= 110 ? 'left' : 'right';
	
// 					let xLine = x >= 110 ? x + 30 : x - 30;
// 					let yLine = y >= 77 ? y + 10 : y - 10;
	
// 					ctx.font = '14px Inter';
// 					ctx.textAlign = textXPosition;
// 					ctx.fillStyle = colors[theme].textColor;
// 					ctx.textBaseline = 'middle';
	
// 					ctx.fillText(`${datapoint}%`, xLine, yLine);
// 				});
// 			},
// 		};

// 		donutSmall = new Chart(document.getElementById('chartDonutSmall'), {
// 			type: 'doughnut',
// 			data: {
// 				datasets: data,
// 			},
// 			options: options,
// 			plugins: [customDataLabels],
// 		});

// 		donutSmall.data.datasets[0].backgroundColor = [colors[theme].purple, colors[theme].yellow];
// 		donutSmall.update()
// 	}

// 	switchTheme.push(switchThemeDonutSmall)
// }

// if (document.getElementById('chartDonutBigger')) {
// 	let data = [
// 		{
// 			data: [85, 15],
// 			labels: ['15%', '85%'],
// 			backgroundColor: [colors[theme].purple, colors[theme].yellow],
// 			borderColor: '#DDD6FE',
// 			borderWidth: 0,
// 		},
// 	];

// 	let options = {
// 		rotation: 0,
// 		cutout: '37%',
// 		layout: {
// 			padding: 0,
// 		},
// 		plugins: {
// 			tooltip: {
// 				enabled: false,
// 			},
// 			legend: {
// 				display: false,
// 			},
// 		},
// 	};

// 	const customDataLabels = {
// 		id: 'customDataLabel',
// 		afterDatasetDraw(chart, args, pluginOptions) {
// 			const {
// 				ctx,
// 				data,
// 				chartArea: { top, bottom, left, right, width, height },
// 			} = chart;
// 			ctx.save();

// 			data.datasets[0].data.forEach((datapoint, index) => {
// 				const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();

// 				let textXPosition = x >= 110 ? 'left' : 'right';

// 				let xLine = x >= 110 ? x + 30 : x - 30;
// 				let yLine = y >= 110 ? y + 30 : y - 30;

// 				ctx.font = '14px Inter';
// 				ctx.textAlign = textXPosition;
// 				ctx.fillStyle = colors[theme].textColor;
// 				ctx.textBaseline = 'middle';

// 				ctx.fillText(`${datapoint}%`, xLine, yLine);
// 			});
// 		},
// 	};

// 	let donutBig = new Chart(document.getElementById('chartDonutBigger'), {
// 		type: 'doughnut',
// 		data: {
// 			datasets: data,
// 		},
// 		options: options,
// 		plugins: [customDataLabels],
// 	});

// 	let switchThemeDonutBig = function(theme) {
// 		donutBig.destroy()

// 		const customDataLabels = {
// 			id: 'customDataLabel',
// 			afterDatasetDraw(chart, args, pluginOptions) {
// 				const {
// 					ctx,
// 					data,
// 					chartArea: { top, bottom, left, right, width, height },
// 				} = chart;
// 				ctx.save();
	
// 				data.datasets[0].data.forEach((datapoint, index) => {
// 					const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();
	
// 					let textXPosition = x >= 110 ? 'left' : 'right';
	
// 					let xLine = x >= 110 ? x + 30 : x - 30;
// 					let yLine = y >= 110 ? y + 30 : y - 30;
	
// 					ctx.font = '14px Inter';
// 					ctx.textAlign = textXPosition;
// 					ctx.fillStyle = colors[theme].textColor;
// 					ctx.textBaseline = 'middle';
	
// 					ctx.fillText(`${datapoint}%`, xLine, yLine);
// 				});
// 			},
// 		};

// 		donutBig = new Chart(document.getElementById('chartDonutBigger'), {
// 			type: 'doughnut',
// 			data: {
// 				datasets: data,
// 			},
// 			options: options,
// 			plugins: [customDataLabels],
// 		});

// 		donutBig.data.datasets[0].backgroundColor = [colors[theme].purple, colors[theme].yellow];
// 		donutBig.update()
// 	}

// 	switchTheme.push(switchThemeDonutBig)
// }

// if (document.getElementById('chartDonutBig')) {
// 	let data = [
// 		{
// 			data: [85, 15],
// 			labels: ['15%', '85%'],
// 			backgroundColor: [colors[theme].purple, colors[theme].yellow],
// 			borderColor: '#DDD6FE',
// 			borderWidth: 0,
// 		},
// 	];

// 	let options = {
// 		rotation: 0,
// 		cutout: '37%',
// 		layout: {
// 			padding: 0,
// 		},
// 		plugins: {
// 			tooltip: {
// 				enabled: false,
// 			},
// 			legend: {
// 				display: false,
// 			},
// 		},
// 	};

// 	const customDataLabels = {
// 		id: 'customDataLabel',
// 		afterDatasetDraw(chart, args, pluginOptions) {
// 			const {
// 				ctx,
// 				data,
// 				chartArea: { top, bottom, left, right, width, height },
// 			} = chart;
// 			ctx.save();

// 			data.datasets[0].data.forEach((datapoint, index) => {
// 				const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();

// 				let textXPosition = x >= 110 ? 'left' : 'right';

// 				let xLine = x >= 77 ? x + 25 : x - 25;
// 				let yLine = y >= 77 ? y + 25 : y - 25;

// 				ctx.font = '14px Inter';
// 				ctx.textAlign = textXPosition;
// 				ctx.fillStyle = colors[theme].textColor;
// 				ctx.textBaseline = 'middle';

// 				ctx.fillText(`${datapoint}%`, xLine, yLine);
// 			});
// 		},
// 	};

// 	let donutBig = new Chart(document.getElementById('chartDonutBig'), {
// 		type: 'doughnut',
// 		data: {
// 			datasets: data,
// 		},
// 		options: options,
// 		plugins: [customDataLabels],
// 	});

// 	let switchThemeDonutBig = function(theme) {
// 		donutBig.destroy()

// 		const customDataLabels = {
// 			id: 'customDataLabel',
// 			afterDatasetDraw(chart, args, pluginOptions) {
// 				const {
// 					ctx,
// 					data,
// 					chartArea: { top, bottom, left, right, width, height },
// 				} = chart;
// 				ctx.save();
	
// 				data.datasets[0].data.forEach((datapoint, index) => {
// 					const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();
	
// 					let textXPosition = x >= 110 ? 'left' : 'right';
	
// 					let xLine = x >= 77 ? x + 25 : x - 25;
// 					let yLine = y >= 77 ? y + 25 : y - 25;
	
// 					ctx.font = '14px Inter';
// 					ctx.textAlign = textXPosition;
// 					ctx.fillStyle = colors[theme].textColor;
// 					ctx.textBaseline = 'middle';
	
// 					ctx.fillText(`${datapoint}%`, xLine, yLine);
// 				});
// 			},
// 		};

// 		donutBig = new Chart(document.getElementById('chartDonutBig'), {
// 			type: 'doughnut',
// 			data: {
// 				datasets: data,
// 			},
// 			options: options,
// 			plugins: [customDataLabels],
// 		});

// 		donutBig.data.datasets[0].backgroundColor = [colors[theme].purple, colors[theme].yellow];
// 		donutBig.update()
// 	}

// 	switchTheme.push(switchThemeDonutBig)
// }

// if (document.getElementById('chartLoan')) {
// 	let ctx = document.getElementById('chartLoan').getContext('2d');

// 	let yellowGradient = ctx.createLinearGradient(0, 0, 0, 1024);
// 	yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
// 	yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);

// 	let purpleGradient = ctx.createLinearGradient(0, 0, 0, 1024);
// 	purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
// 	purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);

// 	let tooltip = {
// 		enabled: false,
// 		external: function (context) {
// 			let tooltipEl = document.getElementById('chartjs-tooltip');

// 			// Create element on first render
// 			if (!tooltipEl) {
// 				tooltipEl = document.createElement('div');
// 				tooltipEl.id = 'chartjs-tooltip';
// 				tooltipEl.innerHTML = '<table></table>';
// 				document.body.appendChild(tooltipEl);
// 			}

// 			// Hide if no tooltip
// 			const tooltipModel = context.tooltip;
// 			if (tooltipModel.opacity === 0) {
// 				tooltipEl.style.opacity = 0;
// 				return;
// 			}

// 			// Set caret Position
// 			tooltipEl.classList.remove('above', 'below', 'no-transform');
// 			if (tooltipModel.yAlign) {
// 				tooltipEl.classList.add(tooltipModel.yAlign);
// 			} else {
// 				tooltipEl.classList.add('no-transform');
// 			}

// 			function getBody(bodyItem) {
// 				return bodyItem.lines;
// 			}

// 			if (tooltipModel.body) {
// 				const bodyLines = tooltipModel.body.map(getBody);

// 				let innerHtml = '<thead>';

// 				let year = Number(tooltipModel.title) * 12;
// 				let months = year % 12;
// 				let yearText = `Year ${(year - months) / 12}`;
// 				let monthText = months === 0 ? '' : `, Month ${months}`;
// 				innerHtml += '<tr><th class="loan-chart__title">' + yearText + monthText + '</th></tr>';

// 				innerHtml += '</thead><tbody>';
// 				bodyLines.forEach(function (body, i) {
// 					innerHtml += '<tr><td class="loan-chart__text">' + body + '</td></tr>';
// 				});
// 				innerHtml += '</tbody>';

// 				let tableRoot = tooltipEl.querySelector('table');
// 				tableRoot.innerHTML = innerHtml;
// 			}

// 			const position = context.chart.canvas.getBoundingClientRect();

// 			// Display, position, and set styles for font
// 			tooltipEl.style.opacity = 1;
// 			tooltipEl.style.position = 'absolute';
// 			tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.clientWidth / 2 + 'px';
// 			tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.clientHeight / 2 + 'px';
// 			// tooltipEl.style.font = bodyFont.string;
// 			tooltipEl.classList.add('loan-chart');
// 		},
// 	};

// 	const dataCharts = {
// 		labels: [5, 6.75, 7.5, 8.75, 10, 12.5, 13.75, 15, 16.75, 17.5, 20, 22.5, 25, 27.5, 30],
// 		datasets: [
// 			{
// 				data: [4, 3.75, 3.5, 3.25, 3, 2.75, 2.5, 2.25, 2, 1.75, 1.5, 1.25, 1, 0.75, 0.5],
// 				type: 'line',
// 				order: 1,
// 				label: 'Balance',
// 				pointHoverBackgroundColor: '#FFFFFF',
// 				pointHoverBorderWidth: 2,
// 				pointHoverRadius: 6,
// 				pointHoverBorderColor: '#5045E5',
// 				stacked: true,
// 				borderColor: colors[theme].yellow,
// 				backgroundColor: yellowGradient,
// 				fill: true,
// 			},
// 			{
// 				label: 'interest',
// 				data: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4],
// 				type: 'line',
// 				order: 1,
// 				pointHoverBackgroundColor: '#FFFFFF',
// 				pointHoverBorderWidth: 2,
// 				pointHoverRadius: 6,
// 				pointHoverBorderColor: '#5045E5',
// 				stack: 'combined',
// 				stacked: true,
// 				borderColor: colors[theme].purple,
// 				backgroundColor: purpleGradient,
// 				fill: true,
// 			},
// 			{
// 				label: 'Principal',
// 				data: [4, 3.75, 3.5, 3.25, 3, 2.75, 2.5, 2.25, 2, 1.75, 1.5, 1.25, 1, 0.75, 0.5],
// 				barThickness: window.innerWidth < 1024 ? 14 : 20,
// 				max: 5,
// 				type: 'bar',
// 				order: 1,
// 				pointHoverBackgroundColor: '#FFFFFF',
// 				pointHoverBorderWidth: 2,
// 				pointHoverRadius: 6,
// 				pointHoverBorderColor: '#5045E5',
// 				borderRadius: {
// 					topLeft: 4,
// 					topRight: 4,
// 				},
// 				stacked: true,
// 				backgroundColor: colors[theme].sky,
// 			},
// 		],
// 	};

// 	let chartLoan = new Chart(document.getElementById('chartLoan'), {
// 		data: dataCharts,
// 		options: {
// 			stepSize: 1,
// 			response: true,
// 			elements: {
// 				point: {
// 					radius: 0,
// 				},
// 			},
// 			plugins: {
// 				legend: {
// 					display: false,
// 				},
// 				tooltip: tooltip,
// 			},
// 			interaction: {
// 				mode: 'index',
// 				intersect: false,
// 			},
// 			scales: {
// 				y: {
// 					max: dataCharts.datasets[2].data[0] + 0.09,
// 					grid: {
// 						tickLength: 0,
// 						color: colors[theme].gridColor,
// 					},
// 					ticks: {
// 						display: false,
// 						stepSize: 1,
// 					},
// 					border: {
// 						color: colors[theme].gridColor,
// 					},
// 				},
// 				x: {
// 					border: {
// 						color: colors[theme].gridColor,
// 					},
// 					ticks: {
// 						display: false,
// 						color: colors[theme].gridColor,
// 						stepSize: 1,
// 					},
// 					grid: {
// 						tickLength: 0,
// 						color: colors[theme].gridColor,
// 					},
// 				},
// 			},
// 		},
// 	});

// 	let switchThemeLoan = function(theme) {
// 		yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
// 		yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);
// 		purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
// 		purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);
// 		chartLoan.data.datasets[0].backgroundColor = yellowGradient;
// 		chartLoan.data.datasets[0].borderColor = colors[theme].yellow;
// 		chartLoan.data.datasets[1].backgroundColor = purpleGradient;
// 		chartLoan.data.datasets[1].borderColor = colors[theme].purple;
// 		chartLoan.data.datasets[2].backgroundColor = colors[theme].sky;
// 		chartLoan.options.scales.y.grid.color = colors[theme].gridColor;
// 		chartLoan.options.scales.x.grid.color = colors[theme].gridColor;
// 		chartLoan.options.scales.y.ticks.color = colors[theme].gridColor;
// 		chartLoan.options.scales.x.ticks.color = colors[theme].gridColor;
// 		chartLoan.options.scales.y.border.color = colors[theme].gridColor;
// 		chartLoan.options.scales.x.border.color = colors[theme].gridColor;
// 		chartLoan.update()
// 	}

// 	switchTheme.push(switchThemeLoan)
// }

// if (document.getElementById('chartLoanCard')) {
// 	let ctx = document.getElementById('chartLoanCard').getContext('2d');

// 	let yellowGradient = ctx.createLinearGradient(0, 0, 0, 1024);
// 	yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
// 	yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);

// 	let purpleGradient = ctx.createLinearGradient(0, 0, 0, 1024);
// 	purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
// 	purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);

// 	let tooltip = {
// 		enabled: false,
// 		external: function (context) {
// 			let tooltipEl = document.getElementById('chartjs-tooltip');

// 			// Create element on first render
// 			if (!tooltipEl) {
// 				tooltipEl = document.createElement('div');
// 				tooltipEl.id = 'chartjs-tooltip';
// 				tooltipEl.innerHTML = '<table></table>';
// 				document.body.appendChild(tooltipEl);
// 			}

// 			// Hide if no tooltip
// 			const tooltipModel = context.tooltip;
// 			if (tooltipModel.opacity === 0) {
// 				tooltipEl.style.opacity = 0;
// 				return;
// 			}

// 			// Set caret Position
// 			tooltipEl.classList.remove('above', 'below', 'no-transform');
// 			if (tooltipModel.yAlign) {
// 				tooltipEl.classList.add(tooltipModel.yAlign);
// 			} else {
// 				tooltipEl.classList.add('no-transform');
// 			}

// 			function getBody(bodyItem) {
// 				return bodyItem.lines;
// 			}

// 			if (tooltipModel.body) {
// 				const bodyLines = tooltipModel.body.map(getBody);

// 				let innerHtml = '<thead>';

// 				let year = Number(tooltipModel.title) * 12;
// 				let months = year % 12;
// 				let yearText = `Year ${(year - months) / 12}`;
// 				let monthText = months === 0 ? '' : `, Month ${months}`;
// 				innerHtml += '<tr><th class="loan-chart__title loan-chart__title--center">' + yearText + monthText + '</th></tr>';

// 				innerHtml += '</thead><tbody>';
// 				innerHtml += '<tr><th class="loan-chart__title loan-chart__title--card">' + 'Min. Payment' + '</th></tr>';
// 				bodyLines.forEach(function (body, i) {
// 					innerHtml += '<tr><td class="loan-chart__text">' + body + '</td></tr>';
// 				});
// 				innerHtml += '<tr><th class="loan-chart__title loan-chart__title--card">' + 'Your Payment' + '</th></tr>';
// 				bodyLines.forEach(function (body, i) {
// 					innerHtml += '<tr><td class="loan-chart__text">' + body + '</td></tr>';
// 				});
// 				innerHtml += '</tbody>';

// 				let tableRoot = tooltipEl.querySelector('table');
// 				tableRoot.innerHTML = innerHtml;
// 			}

// 			const position = context.chart.canvas.getBoundingClientRect();

// 			// Display, position, and set styles for font
// 			tooltipEl.style.opacity = 1;
// 			tooltipEl.style.position = 'absolute';
// 			tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.clientWidth / 2 + 'px';
// 			tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.clientHeight / 2 + 'px';
// 			// tooltipEl.style.font = bodyFont.string;
// 			tooltipEl.classList.add('loan-chart');
// 		},
// 	};

// 	const dataCharts = {
// 		labels: [0, 2.5, 5, 7.5, 10, 12.5, 15],
// 		datasets: [
// 			{
// 				data: [3000, 2500, 1500, 0],
// 				type: 'line',
// 				order: 1,
// 				label: 'Balance',
// 				pointHoverBackgroundColor: '#FFFFFF',
// 				pointHoverBorderWidth: 2,
// 				pointHoverRadius: 6,
// 				pointHoverBorderColor: '#5045E5',
// 				stacked: true,
// 				borderColor: colors[theme].yellow,
// 				backgroundColor: yellowGradient,
// 				fill: true,
// 			},
// 			{
// 				label: 'interest',
// 				data: [3000, 2750, 2500, 2000, 1000, 0],
// 				type: 'line',
// 				order: 1,
// 				pointHoverBackgroundColor: '#FFFFFF',
// 				pointHoverBorderWidth: 2,
// 				pointHoverRadius: 6,
// 				pointHoverBorderColor: '#5045E5',
// 				stack: 'combined',
// 				stacked: true,
// 				borderColor: colors[theme].purple,
// 				backgroundColor: purpleGradient,
// 				fill: true,
// 			},
// 		],
// 	};

// 	let chartLoanCard = new Chart(document.getElementById('chartLoanCard'), {
// 		data: dataCharts,
// 		options: {
// 			stepSize: 1,
// 			response: true,
// 			elements: {
// 				point: {
// 					radius: 0,
// 				},
// 			},
// 			plugins: {
// 				legend: {
// 					display: false,
// 				},
// 				tooltip: tooltip,
// 			},
// 			interaction: {
// 				mode: 'index',
// 				intersect: false,
// 			},
// 			scales: {
// 				y: {
// 					max: dataCharts.datasets[0].data[0] + 1000,
// 					grid: {
// 						tickLength: 0,
// 						color: colors[theme].gridColor,
// 					},
// 					ticks: {
// 						display: false,
// 						stepSize: 1000,
// 					},
// 					border: {
// 						color: colors[theme].gridColor,
// 					},
// 				},
// 				x: {
// 					border: {
// 						color: colors[theme].gridColor,
// 					},
// 					ticks: {
// 						display: false,
// 						color: colors[theme].gridColor,
// 						stepSize: 1,
// 					},
// 					grid: {
// 						tickLength: 0,
// 						color: colors[theme].gridColor,
// 					},
// 				},
// 			},
// 		},
// 	});

// 	let switchThemeLoanCard = function(theme) {
// 		yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
// 		yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);
// 		purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
// 		purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);

// 		chartLoanCard.data.datasets[0].backgroundColor = yellowGradient;
// 		chartLoanCard.data.datasets[1].backgroundColor = purpleGradient;
// 		chartLoanCard.data.datasets[0].borderColor = colors[theme].yellow;
// 		chartLoanCard.data.datasets[1].borderColor = colors[theme].purple;
// 		chartLoanCard.options.scales.y.grid.color = colors[theme].gridColor;
// 		chartLoanCard.options.scales.x.grid.color = colors[theme].gridColor;
// 		chartLoanCard.options.scales.y.ticks.color = colors[theme].gridColor;
// 		chartLoanCard.options.scales.x.ticks.color = colors[theme].gridColor;
// 		chartLoanCard.options.scales.y.border.color = colors[theme].gridColor;
// 		chartLoanCard.options.scales.x.border.color = colors[theme].gridColor;
// 		chartLoanCard.update()
// 	}

// 	switchTheme.push(switchThemeLoanCard)
// }

// if (document.getElementById('chartLoanSimple')) {
// 	let ctx = document.getElementById('chartLoanSimple').getContext('2d');

// 	let tooltip = {
// 		enabled: false,
// 		external: function (context) {
// 			let tooltipEl = document.getElementById('chartjs-tooltip');

// 			// Create element on first render
// 			if (!tooltipEl) {
// 				tooltipEl = document.createElement('div');
// 				tooltipEl.id = 'chartjs-tooltip';
// 				tooltipEl.innerHTML = '<table></table>';
// 				document.body.appendChild(tooltipEl);
// 			}

// 			// Hide if no tooltip
// 			const tooltipModel = context.tooltip;
// 			if (tooltipModel.opacity === 0) {
// 				tooltipEl.style.opacity = 0;
// 				return;
// 			}

// 			// Set caret Position
// 			tooltipEl.classList.remove('above', 'below', 'no-transform');
// 			if (tooltipModel.yAlign) {
// 				tooltipEl.classList.add(tooltipModel.yAlign);
// 			} else {
// 				tooltipEl.classList.add('no-transform');
// 			}

// 			function getBody(bodyItem) {
// 				return bodyItem.lines;
// 			}

// 			// Set Text
// 			if (tooltipModel.body) {
// 				let innerHtml = '<tbody>';

// 				const bodyLines = tooltipModel.body.map(getBody);

// 				let year = tooltipModel.title;

// 				innerHtml += '<tr><th class="chart-tooltip__text chart-tooltip__text--gray">' + year + '</th></tr>';
// 				innerHtml += '<tr><td class="chart-tooltip__text"> $' + bodyLines + '</td></tr>';
// 				innerHtml += '</tbody>';

// 				let tableRoot = tooltipEl.querySelector('table');
// 				tableRoot.innerHTML = innerHtml;
// 			}

// 			const position = context.chart.canvas.getBoundingClientRect();

// 			// Display, position, and set styles for font
// 			tooltipEl.style.opacity = 1;
// 			tooltipEl.style.position = 'absolute';
// 			tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.clientWidth / 2 + 'px';
// 			tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.clientHeight / 11 + 'px';
// 			// tooltipEl.style.font = bodyFont.string;
// 			tooltipEl.classList.add('loan-chart');
// 		},
// 	};

// 	const dataCharts = {
// 		labels: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
// 		datasets: [
// 			{
// 				data: [48, 43, 38, 32, 15, 48, 43, 38, 32, 15, 48, 43],
// 				barThickness: 56,
// 				max: 5,
// 				type: 'bar',
// 				order: 1,
// 				pointHoverBackgroundColor: '#FFFFFF',
// 				pointHoverBorderWidth: 2,
// 				pointHoverRadius: 6,
// 				pointHoverBorderColor: '#5045E5',
// 				borderRadius: {
// 					topLeft: 4,
// 					topRight: 4,
// 				},
// 				stacked: true,
// 				backgroundColor: colors[theme].sky,
// 			},
// 		],
// 	};

// 	let chartLoanSimple = new Chart(document.getElementById('chartLoanSimple'), {
// 		data: dataCharts,
// 		options: {
// 			maintainAspectRatio: false,
// 			stepSize: 1,
// 			response: true,
// 			elements: {
// 				point: {
// 					radius: 0,
// 				},
// 			},
// 			plugins: {
// 				legend: {
// 					display: false,
// 				},
// 				tooltip: tooltip,
// 			},
// 			interaction: {
// 				mode: 'index',
// 				intersect: false,
// 			},
// 			scales: {
// 				y: {
// 					max: 50,
// 					grid: {
// 						tickLength: 0,
// 						color: colors[theme].gridColor,
// 					},
// 					ticks: {
// 						display: false,
// 						stepSize: 10,
// 					},
// 					border: {
// 						color: colors[theme].gridColor,
// 					},
// 				},
// 				x: {
// 					border: {
// 						color: colors[theme].gridColor,
// 					},
// 					ticks: {
// 						display: false,
// 						color: colors[theme].gridColor,
// 						stepSize: 1,
// 					},
// 					grid: {
// 						tickLength: 0,
// 						color: colors[theme].gridColor,
// 					},
// 				},
// 			},
// 		},
// 	});

// 	let switchThemeLoanSimple = function(theme) {
// 		chartLoanSimple.data.datasets[0].backgroundColor = colors[theme].sky;
// 		chartLoanSimple.options.scales.y.grid.color = colors[theme].gridColor;
// 		chartLoanSimple.options.scales.x.grid.color = colors[theme].gridColor;
// 		chartLoanSimple.options.scales.y.ticks.color = colors[theme].gridColor;
// 		chartLoanSimple.options.scales.x.ticks.color = colors[theme].gridColor;
// 		chartLoanSimple.options.scales.y.border.color = colors[theme].gridColor;
// 		chartLoanSimple.options.scales.x.border.color = colors[theme].gridColor;
// 		chartLoanSimple.update()
// 	}

// 	switchTheme.push(switchThemeLoanSimple)
// }

// if (document.getElementById('chartFinancial')) {
// 	let ctx = document.getElementById('chartFinancial').getContext('2d');

// 	let yellowGradient = ctx.createLinearGradient(0, 0, 0, 1024);
// 	yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
// 	yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);

// 	let purpleGradient = ctx.createLinearGradient(0, 0, 0, 1024);
// 	purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
// 	purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);

// 	let skyGradient = ctx.createLinearGradient(0, 0, 0, 1024);
// 	skyGradient.addColorStop(0, colors[theme].skyGradientStart);
// 	skyGradient.addColorStop(1, colors[theme].purpleGradientStop);

// 	let tealGradient = ctx.createLinearGradient(0, 0, 0, 1024);
// 	tealGradient.addColorStop(0, colors[theme].tealGradientStart);
// 	tealGradient.addColorStop(1, colors[theme].purpleGradientStop);

// 	let tooltip = {
// 		enabled: false,
// 		external: function (context) {
// 			let tooltipEl = document.getElementById('chartjs-tooltip');

// 			// Create element on first render
// 			if (!tooltipEl) {
// 				tooltipEl = document.createElement('div');
// 				tooltipEl.id = 'chartjs-tooltip';
// 				tooltipEl.innerHTML = '<table></table>';
// 				document.body.appendChild(tooltipEl);
// 			}

// 			// Hide if no tooltip
// 			const tooltipModel = context.tooltip;
// 			if (tooltipModel.opacity === 0) {
// 				tooltipEl.style.opacity = 0;
// 				return;
// 			}

// 			// Set caret Position
// 			tooltipEl.classList.remove('above', 'below', 'no-transform');
// 			if (tooltipModel.yAlign) {
// 				tooltipEl.classList.add(tooltipModel.yAlign);
// 			} else {
// 				tooltipEl.classList.add('no-transform');
// 			}

// 			function getBody(bodyItem) {
// 				return bodyItem.lines;
// 			}

// 			if (tooltipModel.body) {
// 				const bodyLines = tooltipModel.body.map(getBody);

// 				let innerHtml = '<tbody>';

// 				bodyLines.forEach(function (body, i) {
// 					innerHtml += '<tr><td class="loan-chart__text">' + body + '</td></tr>';
// 				});
// 				innerHtml += '</tbody>';

// 				let tableRoot = tooltipEl.querySelector('table');
// 				tableRoot.innerHTML = innerHtml;
// 			}

// 			const position = context.chart.canvas.getBoundingClientRect();

// 			// Display, position, and set styles for font
// 			tooltipEl.style.opacity = 1;
// 			tooltipEl.style.position = 'absolute';
// 			tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.clientWidth / 2 + 'px';
// 			tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.clientHeight / 2 + 'px';
// 			// tooltipEl.style.font = bodyFont.string;
// 			tooltipEl.classList.add('loan-chart');
// 		},
// 	};

// 	const dataCharts = {
// 		labels: [0, 2, 4, 6, 8, 10, 12],
// 		datasets: [
// 			{
// 				data: [3000, 2500, 2000, 1500, 1000, 500, 0],
// 				type: 'line',
// 				order: 1,
// 				label: 'PV',
// 				pointHoverBackgroundColor: '#FFFFFF',
// 				pointHoverBorderWidth: 2,
// 				pointHoverRadius: 6,
// 				pointHoverBorderColor: '#5045E5',
// 				stacked: true,
// 				borderColor: colors[theme].yellow,
// 				backgroundColor: yellowGradient,
// 				fill: true,
// 			},
// 			{
// 				label: 'PMT',
// 				data: [0, 500, 1000, 1500, 2000, 2500, 3000],
// 				type: 'line',
// 				order: 1,
// 				pointHoverBackgroundColor: '#FFFFFF',
// 				pointHoverBorderWidth: 2,
// 				pointHoverRadius: 6,
// 				pointHoverBorderColor: '#5045E5',
// 				stack: 'combined',
// 				stacked: true,
// 				borderColor: colors[theme].purple,
// 				backgroundColor: purpleGradient,
// 				fill: true,
// 			},
// 			{
// 				data: [1500, 1250, 1000, 750, 500, 250, 0],
// 				type: 'line',
// 				order: 1,
// 				label: 'Interest',
// 				pointHoverBackgroundColor: '#FFFFFF',
// 				pointHoverBorderWidth: 2,
// 				pointHoverRadius: 6,
// 				pointHoverBorderColor: '#5045E5',
// 				stacked: true,
// 				borderColor: '#38BDF8',
// 				backgroundColor: skyGradient,
// 				fill: true,
// 			},
// 			{
// 				label: 'FV',
// 				data: [0, 250, 500, 750, 1000, 1250, 1500],
// 				type: 'line',
// 				order: 1,
// 				pointHoverBackgroundColor: '#FFFFFF',
// 				pointHoverBorderWidth: 2,
// 				pointHoverRadius: 6,
// 				pointHoverBorderColor: '#5045E5',
// 				stack: 'combined',
// 				stacked: true,
// 				borderColor: '#2DD4BF',
// 				backgroundColor: tealGradient,
// 				fill: true,
// 			},
// 		],
// 	};

// 	let chartFinancial = new Chart(document.getElementById('chartFinancial'), {
// 		data: dataCharts,
// 		options: {
// 			stepSize: 1,
// 			response: true,
// 			elements: {
// 				point: {
// 					radius: 0,
// 				},
// 			},
// 			plugins: {
// 				legend: {
// 					display: false,
// 				},
// 				tooltip: tooltip,
// 			},
// 			interaction: {
// 				mode: 'index',
// 				intersect: false,
// 			},
// 			scales: {
// 				y: {
// 					max: dataCharts.datasets[0].data[0] + 1000,
// 					grid: {
// 						tickLength: 0,
// 						color: colors[theme].gridColor,
// 					},
// 					ticks: {
// 						display: false,
// 						stepSize: 1000,
// 					},
// 					border: {
// 						color: colors[theme].gridColor,
// 					},
// 				},
// 				x: {
// 					border: {
// 						color: colors[theme].gridColor,
// 					},
// 					ticks: {
// 						display: false,
// 						color: colors[theme].gridColor,
// 						stepSize: 2,
// 					},
// 					grid: {
// 						tickLength: 0,
// 						color: colors[theme].gridColor,
// 					},
// 				},
// 			},
// 		},
// 	});

// 	let switchThemeLoan = function(theme) {
// 		yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
// 		yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);
// 		purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
// 		purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);
// 		skyGradient.addColorStop(0, colors[theme].skyGradientStart);
// 		skyGradient.addColorStop(1, colors[theme].purpleGradientStop);
// 		tealGradient.addColorStop(0, colors[theme].tealGradientStart);
// 		tealGradient.addColorStop(1, colors[theme].purpleGradientStop);
// 		chartFinancial.data.datasets[0].borderColor = colors[theme].yellow;
// 		chartFinancial.data.datasets[1].borderColor = colors[theme].purple;
// 		chartFinancial.data.datasets[0].backgroundColor = yellowGradient;
// 		chartFinancial.data.datasets[1].backgroundColor = purpleGradient;
// 		chartFinancial.data.datasets[2].backgroundColor = skyGradient;
// 		chartFinancial.data.datasets[3].backgroundColor = tealGradient;
// 		chartFinancial.options.scales.y.grid.color = colors[theme].gridColor;
// 		chartFinancial.options.scales.x.grid.color = colors[theme].gridColor;
// 		chartFinancial.options.scales.y.ticks.color = colors[theme].gridColor;
// 		chartFinancial.options.scales.y.ticks.stepSize = 1000;
// 		chartFinancial.options.scales.x.ticks.color = colors[theme].gridColor;
// 		chartFinancial.options.scales.x.ticks.stepSize = 2;
// 		chartFinancial.options.scales.y.border.color = colors[theme].gridColor;
// 		chartFinancial.options.scales.x.border.color = colors[theme].gridColor;
// 		chartFinancial.update()
// 	}

// 	switchTheme.push(switchThemeLoan)
// }


