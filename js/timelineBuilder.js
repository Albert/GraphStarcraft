var debugVar;
function buildGraph() {
  var workerCompletions = [];
  var eventHistory = [];
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
      var eventCap        = taskDescription[buildingName][eventName][5];

      var eventEnd        = eventStart + eventDuration;
      
      var buildEvent   = {
        "time": eventStart,
        "eventType": eventType + "Begins",
        "minCost": eventMinCost,
        "gasCost": eventGasCost,
        "supCost": eventSupCost,
        "cap": 0
      };
      var finishEvent  = {
        "time": eventEnd,
        "eventType": eventType + "Ends",
        "minCost": 0,
        "gasCost": 0,
        "supCost": 0,
        "cap": eventCap
      };

      eventHistory.push(buildEvent);
      eventHistory.push(finishEvent);

      if (latestEvent < eventEnd) {
        latestEvent = eventEnd;
      }
    }
  }

  var minCount = 50;                  //  you start off w/ 50 min
  var gasCount = 0;                   //  ... and 0 gas
  var workerCount = 6;                //  ... and 6 workers
  var supCount = 6;                   //  ... and 6 consumed supply
  var cap = 11;                       //  ... and 11 supply cap
  var fastMinerRate = 42.5 / 60.0;  //  workers 1  through 16 harvest at 42.5 minerals a minute (/60 for per sec)
  var slowMinerRate = 16.0 / 60.0;  //  workers 17 through 24 harvest at 16.0 minerals a minute (/60 for per sec)
  var minPoints = [];
  var gasPoints = [];
  var supPoints = [];
  var capPoints = [];
  var dataPoints = [];
  var maxMinCount = 0;
  var minHarvest  = 0;
  var gasHarvest  = 0;

  for (var i = 0; i < latestEvent; i++) {
    for (var j = 0; j < eventHistory.length; j ++) {
      if (eventHistory[j].time == i) {
        currentEvent = eventHistory[j];

        minCount = minCount - currentEvent.minCost;
        gasCount = gasCount - currentEvent.gasCost;
        supCount = supCount + currentEvent.supCost;
        cap      = cap      + currentEvent.cap;

        if (currentEvent.eventType == "workerEnds") {
          workerCount = workerCount + 1;
        }
        if (currentEvent.eventType == "buildingBegins") {
          workerCount = workerCount - 1;
        }
        if (currentEvent.eventType == "buildingEnds") {
          workerCount = workerCount + 1;
        }
      }
    }
    var minerCount = workerCount;
    if (i > 6) {
      var efficientMiners   = (minerCount < 16) ? minerCount : 16;
      var inefficientMiners = (minerCount < 16) ? 0 : minerCount - 16;
      var slowMiners        = (inefficientMiners > 8) ? 8 : inefficientMiners;
      minHarvest = (efficientMiners * fastMinerRate) + (slowMiners * slowMinerRate);
    }
    minCount = minCount + minHarvest ;

    /* gas calculation credits: http://www.starcraft2-wiki.com/guides/gameplay-guides/gas-matters */
    gaserCount = 3;
    gasHarvest = gaserCount * .76;
    gasCount = gasCount + gasHarvest;

    var minPoint = [];
    minPoint[0] = i;
    minPoint[1] = minCount;
    minPoints.push(minPoint);
    
    var gasPoint = [];
    gasPoint[0] = i;
    gasPoint[1] = gasCount;
    gasPoints.push(gasPoint);
    
    var supPoint = [];
    supPoint[0] = i;
    supPoint[1] = supCount;
    supPoints.push(supCount);
    
    var capPoint = [];
    capPoint[0] = i;
    capPoint[1] = cap;
    capPoints.push(cap);
    
    dataPoints = [minPoints, gasPoints, supPoints, capPoints]
    if (maxMinCount < minCount) {
      maxMinCount = minCount;
    }
  }

  var xTicks = [0];
  var yTicks = [0];

  for (var i = 0; i <= 9; i++) {
    xTicks.push([i * 60, i]);
  }
  
  maxMinCount = 700;
  for (var i = 0; i < Math.ceil(maxMinCount/50); i++) {
    yTicks.push(i * 50);
  }

  $("#graphDiv").html("");

  $.jqplot('graphDiv', dataPoints,
  {
    axes: {
      xaxis: {
        ticks: xTicks
      },
      yaxis: {
        min: -50,
        ticks: yTicks
      },
      y2axis: {
        showTicks: false,
        tickOptions: {
          showGridline: false
        }
      }
    },
    series:[
        {label:'Minerals',    color: '#4bb2c5', markerOptions:{show: false}},
        {label:'Gas',         color: '#00ff00', markerOptions:{show: false}},
        {label:'Supply',      color: '#ff5800', markerOptions:{show: false}, yaxis:'y2axis'},
        {label:'Supply Cap',  color: '#EAA228', markerOptions:{show: false}, yaxis:'y2axis'}
    ],
  }
);
}