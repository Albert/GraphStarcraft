var ganttData = [
	{
		id: 1, itemName: "CC", series: [
			{ seriesName: "SCV", start: 0, duration: 17, minCost: 50 },
			{ seriesName: "SCV", start: 17, duration: 17, minCost: 50 },
			{ seriesName: "SCV", start: 34, duration: 17, minCost: 50 },
			{ seriesName: "SCV", start: 51, duration: 17, minCost: 50 },
			{ seriesName: "SCV", start: 68, duration: 17, minCost: 50 },
			{ seriesName: "SCV", start: 85, duration: 17, minCost: 50 },
			{ seriesName: "SCV", start: 102, duration: 17, minCost: 50 },
			{ seriesName: "SCV", start: 119, duration: 17, minCost: 50 },
			{ seriesName: "SCV", start: 136, duration: 17, minCost: 50 },
			{ seriesName: "Orbital Command", start: 153, duration: 35, minCost: 150 },
			{ seriesName: "SCV", start: 188, duration: 17, minCost: 50 },
			{ seriesName: "SCV", start: 205, duration: 17, minCost: 50 },
			{ seriesName: "SCV", start: 222, duration: 17, minCost: 50 },
			{ seriesName: "SCV", start: 239, duration: 17, minCost: 50 }
		], selectOptions: [
      { name: "Add SCV", duration: 17, minCost: 50 },
      { name: "Orbital Command", duration: 35, minCost: 150 }
		]
	},
	{
		id: 2, itemName: "Supply Depot", series: [
			{ seriesName: "Construction", start: 55, duration: 30, minCost: 100 },
			{ seriesName: "Construction", start: 170, duration: 30, minCost: 100 }
		], selectOptions: [
      { name: "Build", duration: 30, minCost: 100 }
		]
	}, 
	{
		id: 3, itemName: "Barracks", series: [
			{ seriesName: "Construction", start: 94, duration: 60, minCost: 150 },
      { seriesName: "Marine", start: 154, duration: 25, minCost: 50},
      { seriesName: "Marine", start: 179, duration: 25, minCost: 50},
      { seriesName: "Marine", start: 204, duration: 25, minCost: 50},
      { seriesName: "Marine", start: 229, duration: 25, minCost: 50},
		], selectOptions: [
      { name: "Build", duration: 60, minCost: 150 },
      { name: "Marine", duration: 25, minCost: 50 },
      { name: "Tech Lab", duration: 25, minCost: 50, gasCost: 25 },
      { name: "Reactor", duration: 50, minCost: 50, gasCost: 50 }
		]
	}, 
	{
		id: 4, itemName: "Refinery", series: [
			{ seriesName: "Construction", start: 117, duration: 30, minCost: 75 }
		], selectOptions: [
      { name: "Build", duration: 30, minCost: 75 }
		]
	},
	{
		id: 5, itemName: "Factory", series: [
			{ seriesName: "Construction", start: 204, duration: 60, minCost: 150, gasCost: 100}
		], selectOptions: [
      { name: "Build", duration: 60, minCost: 150, gasCost: 100 },
      { name: "Tech Lab", duration: 25, minCost: 50, gasCost: 25 },
      { name: "Reactor", duration: 50, minCost: 50, gasCost: 50 }
		]
	}
];