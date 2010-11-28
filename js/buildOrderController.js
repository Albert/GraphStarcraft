var flattenedTimeline = [];

function drawGraph(dataset) {

  var workerConstructions = $(".series_SCV");
  var workerCompletions = [];
  var eventHistory = {
    "events": []
  }

  for (var i = 0; i < workerConstructions.size(); i++) {
    var blockEnd = $.data(workerConstructions[i], "block-data").start;
    var myEvent = {"time": blockEnd, "eventType": "newWorker"};
    eventHistory.events.push(myEvent);
  }

  var purchaseHistory = [];
  var latestEvent = 0;

  for (var i = 0; i < dataset.length; i++) {
    for (var s = 0; s < buildOrder[i].series.length; s++) {
      flattenedTimeline.push(buildOrder[i].series[s]);
    }
  }

  $(".ganttview-block").each(function(i) {
    purchase = $(this);
    var blockStart    = purchase.data("block-data").start;
    var blockDuration = purchase.data("block-data").duration;
    var blockEnd      = blockStart + blockDuration;
    var blockMinCost  = purchase.data("block-data").minCost;

    var purchaseType;

    if (purchase.hasClass("series_SCV")) {
      purchaseType = "newWorker"
    } else if (purchase.hasClass("series_marine")){
      purchaseType = "newUnit"
    } else {
      purchaseType = "construction"
    }
    debugVar = purchase;

    var buildEvent   = {"time": blockStart, "eventType": purchaseType + "Begins", "minCost": blockMinCost};
    var finishEvent  = {"time": blockEnd, "eventType": purchaseType + "Ends" };

    eventHistory.events.push(buildEvent);
    eventHistory.events.push(finishEvent);

    if (latestEvent < blockEnd) {
      latestEvent = blockEnd;
    }
  });

  var minCount = 50;                  //  you start off w/ 50 min
  var workerCount = 6;                //  ... and 6 workers
  var harvestRateFast = 42.5 / 60.0;  //  workers 1  through 16 harvest at 42.5 minerals a minute (/60 for per sec)
  var harvestRateSlow = 16.0 / 60.0;  //  workers 17 through 24 harvest at 16.0 minerals a minute (/60 for per sec)
  var dataPoints = [];
  var maxMinCount = 0;

  for (var i = 0; i < latestEvent; i++) {
    for (var j = 0; j < eventHistory.events.length; j ++) {
      if (eventHistory.events[j].time == i) {
        currentEvent = eventHistory.events[j];
        if (currentEvent.eventType == "newWorkerBegins") {
          minCount = minCount - currentEvent.minCost;
        }
        if (currentEvent.eventType == "newWorkerEnds") {
          workerCount = workerCount + 1;
        }
        if (currentEvent.eventType == "newUnitBegins") {
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
