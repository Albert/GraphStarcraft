var buildOrder = [
  {
    name: "command_center",
    tasks: [
      { taskTime:   0, taskName: "scv" }
    ]
  }
]

var buildOrderyetanother = [
  {
    name: "command_center",
    tasks: [
      { taskTime: 100, taskName: "scv" }
    ]
  },
  {
    name: "refinery",
    tasks: [
      { taskTime: 10, taskName: "construction" },
      { taskTime: 40, taskName: 3 }
    ]
  },
  {
    name: "refinery",
    tasks: [
      { taskTime: 100, taskName: "construction" },
      { taskTime: 130, taskName: 3 }
    ]
  }
]

var buildOrderAiaodhfo = [         // Gantt Row #, Building Type, events:
  {
    name: "command_center",
    tasks: [
      { taskTime:   0, taskName: "scv" },
      { taskTime:  17, taskName: "scv" },
      { taskTime:  34, taskName: "scv" },
      { taskTime:  51, taskName: "scv" },
      { taskTime:  68, taskName: "scv" },
      { taskTime:  85, taskName: "scv" },
      { taskTime: 102, taskName: "scv" },
      { taskTime: 119, taskName: "scv" },
      { taskTime: 136, taskName: "scv" },
      { taskTime: 153, taskName: "scv" },
      { taskTime: 170, taskName: "scv" },
      { taskTime: 187, taskName: "scv" },
      { taskTime: 204, taskName: "scv" }
    ]
  },
  {
    name: "depot",
    tasks: [
      { taskTime: 55, taskName: "construction" },
      { taskTime: 157, taskName: "construction" }
    ]
  },
  {
    name: "barracks",
    tasks: [
      { taskTime: 93, taskName: "construction" },
      { taskTime: 153, taskName: "marine" },
      { taskTime: 178, taskName: "marine" },
    ]
  },
  {
    name: "refinery",
    tasks: [
      { taskTime: 110, taskName: "construction" },
      { taskTime: 140, taskName: 3 }
    ]
  }
]
