var debugVar;
function buildGraph() {
  var workerConstructions = $(".tasks_SCV");
  var workerCompletions = [];
  var eventHistory = [];

  for (var i = 0; i < workerConstructions.size(); i++) {
    var blockEnd = $.data(workerConstructions[i], "block-data").start;
    var myEvent = {"time": blockEnd, "eventType": "newWorker"};
    eventHistory.push(myEvent);
  }

  var purchaseHistory = [];
  var latestEvent = 0;

  for(building in buildOrder) {
    var buildingName = buildOrder[building].name;

    for(task in buildOrder[building].tasks){
      var eventName       = buildOrder[building].tasks[task].taskName;

      var eventStart      = parseInt(buildOrder[building].tasks[task].taskTime);

      var eventType       = taskDescription[buildingName][eventName][0];
      var eventDuration   = taskDescription[buildingName][eventName][1];
      var eventMinCost    = taskDescription[buildingName][eventName][2];
      var eventGasCost    = taskDescription[buildingName][eventName][3];
      var eventSupCost    = taskDescription[buildingName][eventName][4];

      var eventEnd        = eventStart + eventDuration;
      
      var buildEvent   = {"time": eventStart, "eventType": eventType + "Begins", "minCost": eventMinCost};
      var finishEvent  = {"time": eventEnd, "eventType": eventType + "Ends" };

      eventHistory.push(buildEvent);
      eventHistory.push(finishEvent);

      if (latestEvent < eventEnd) {
        latestEvent = eventEnd;
      }
    }
  }

  var minCount = 50;                  //  you start off w/ 50 min
  var workerCount = 6;                //  ... and 6 workers
  var harvestRateFast = 42.5 / 60.0;  //  workers 1  through 16 harvest at 42.5 minerals a minute (/60 for per sec)
  var harvestRateSlow = 16.0 / 60.0;  //  workers 17 through 24 harvest at 16.0 minerals a minute (/60 for per sec)
  var dataPoints = [];
  var maxMinCount = 0;

  for (var i = 0; i < latestEvent; i++) {
    for (var j = 0; j < eventHistory.length; j ++) {
      if (eventHistory[j].time == i) {
        currentEvent = eventHistory[j];
        if (currentEvent.eventType == "workerBegins") {
          minCount = minCount - currentEvent.minCost;
        }
        if (currentEvent.eventType == "workerEnds") {
          workerCount = workerCount + 1;
        }
        if (currentEvent.eventType == "unitBegins") {
          minCount = minCount - currentEvent.minCost;
        }
        if (currentEvent.eventType == "constructionBegins") {
          minCount = minCount - currentEvent.minCost;
          workerCount = workerCount - 1;
        }
        if (currentEvent.eventType == "constructionEnds") {
          workerCount = workerCount + 1;
        }
      }
    }
    if (i > 6) {
      harvest = workerCount * harvestRateFast; // takes roughly 6 sec for workers to come back with $
    } else {
      harvest = 0;
    }
    minCount = minCount + harvest;

    var dataPoint = [];
    dataPoint[0] = i;
    dataPoint[1] = minCount;
    dataPoints.push(dataPoint);
    
    if (maxMinCount < minCount) {
      maxMinCount = minCount;
    }
  }

  var xTicks = [0];
  var yTicks = [0];

  var minutesCount = Math.ceil(latestEvent/60);
  for (var i = 0; i < minutesCount; i++) {
    xTicks.push(i * 60);
  }
  
  maxMinCount = 700;
  for (var i = 0; i < Math.ceil(maxMinCount/50); i++) {
    yTicks.push(i * 50);
  }

  $("#graphDiv").html("");

  $.jqplot('graphDiv',  [dataPoints],
  {
    axes: {
      xaxis: {
        min: 0,
        ticks: xTicks
      },
      yaxis: {
        min: -50,
        ticks: yTicks
      }
    },
    series:[{
      markerOptions:{show: false}
    }]
  }
);
debugVar = eventHistory;
}