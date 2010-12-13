var debugVar;
function buildGraph() {
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
        "buildingIndex": building,
        "time": eventStart,
        "eventType": eventType,
        "eventSide": "beginning",
        "minCost": eventMinCost,
        "gasCost": eventGasCost,
        "supCost": eventSupCost
      };
      var finishEvent  = {
        "time": eventEnd,
        "eventType": eventType,
        "eventSide": "end",
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
  var gaserCount = 0;
  var muleCount = 0;
  var supCount = 6;                   //  ... and 6 consumed supply
  var cap = 11;                       //  ... and 11 supply cap
  var fastMinerRate = 42.5 / 60.0;  //  workers 1  through 16 harvest at 42.5 minerals a minute (/60 for per sec)
  var slowMinerRate = 16.0 / 60.0;  //  workers 17 through 24 harvest at 16.0 minerals a minute (/60 for per sec)
  var muleMinerRate = 170.0 / 90.0;   //  apparently mules live 90 seconds and gather anywhere from 160 to 180 (http://wiki.teamliquid.net/starcraft2/MULE)
  var fastGaserRate = .75           //  workers 1 and 2 pull in .75 gas per second
  var slowGaserRate = .50           //  workers 1 and 2 pull in .75 gas per second
  var lastMinCount = 0;
  var lastGasCount = 0;
  var lastSupCount = 0;
  var lastCapCount = 0;
  var minPoints = [];
  var gasPoints = [];
  var supPoints = [];
  var capPoints = [];
  var dataPoints = [];
  var maxMinCount = 0;
  var minHarvest  = 0;
  var gasHarvest  = 0;
  var refineryGasers = [];
  for (building in buildOrder) {
    refineryGasers.push(0);
  }

  for (var i = 0; i < latestEvent; i++) {
    var notableMin = false;
    var notableGas = false;
    var notableSup = false;
    var notableCap = false;

    if (i == 6) {notableMin = true;}
    if (i == 0) {notableCap = true;}
    if (i == latestEvent - 1) {
      notableMin = true;
      notableGas = true;
      notableSup = true;
      notableCap = true;
    }

    for (var j = 0; j < eventHistory.length; j ++) {
      if (eventHistory[j].time == i) {
        currentEvent = eventHistory[j];
        if (currentEvent.eventSide == "beginning") {
          minCount = minCount - currentEvent.minCost;
          gasCount = gasCount - currentEvent.gasCost;
          supCount = supCount + currentEvent.supCost;
          if (!currentEvent.minCost == 0) {notableMin = true;}
          if (!currentEvent.gasCost == 0) {notableGas = true;}
          if (!currentEvent.supCost == 0) {notableSup = true;}
        }
        else {
          cap      = cap      + currentEvent.cap;
          if (!currentEvent.cap == 0) {notableCap = true;}
        }
        if (currentEvent.eventType == "worker" && currentEvent.eventSide == "end") {
          workerCount = workerCount + 1;
          notableMin = true;
        }
        if (currentEvent.eventType.substring(0, 9) == "gasWorker" && currentEvent.eventSide == "beginning") {
          refineryGasers[currentEvent.buildingIndex] = parseInt(currentEvent.eventType.split("_")[1]);
          notableMin = true;
          notableGas = true;
        }
        if (currentEvent.eventType == "mule") {
          if (currentEvent.eventSide == "beginning") {
            muleCount = muleCount + 1;
            notableMin = true;
          } else {
            muleCount = muleCount - 1;
            notableMin = true;
          }
        }
        if (currentEvent.eventType == "building") {
          workerCount = (currentEvent.eventSide == "beginning") ? workerCount - 1 : workerCount + 1;
          notableMin = true;
        }
      }
    }

    gaserCount = _.reduce(refineryGasers, function(initial, num) {return initial + num}, 0);

    var minerCount = workerCount - gaserCount;
    if (i > 6) {
      var efficientMiners   = (minerCount < 16) ? minerCount : 16;
      var inefficientMiners = (minerCount < 16) ? 0 : minerCount - 16;
      var slowMiners        = (inefficientMiners > 8) ? 8 : inefficientMiners;
      minHarvest = (efficientMiners * fastMinerRate) + (slowMiners * slowMinerRate);
    }
    minHarvest = minHarvest + muleMinerRate * muleCount;
    minCount = minCount + minHarvest ;

    /* gas calculation credits: http://www.starcraft2-wiki.com/guides/gameplay-guides/gas-matters */
    var efficientGasers = 0;
    var slowGasers = 0;

    for (refinery in refineryGasers) {
      var gasersForRefinery = refineryGasers[refinery];
      if (gasersForRefinery > 0) {
        var efficientGasersForRefinery   = (gasersForRefinery < 3) ? gasersForRefinery : 2;
        var slowGasersForRefinery        = (gasersForRefinery >= 3) ? 1: 0;
        efficientGasers = efficientGasers + efficientGasersForRefinery;
        slowGasers = slowGasers + slowGasersForRefinery;
      }
    }
    gasHarvest = efficientGasers * fastGaserRate + slowGasers * slowGaserRate;
    gasCount = gasCount + gasHarvest;

    if (notableMin) { minPoints.push([i-1,   lastMinCount]); minPoints.push([i, minCount]); }
    if (notableGas) { gasPoints.push([i-1,   lastGasCount]); gasPoints.push([i, gasCount]); }
    if (notableSup) { supPoints.push([i-0.1, lastSupCount]); supPoints.push([i, supCount]); }
    if (notableCap) { capPoints.push([i-0.1, lastCapCount]); capPoints.push([i, cap     ]); }

    lastMinCount = minCount;
    lastGasCount = gasCount;
    lastSupCount = supCount;
    lastCapCount = cap;

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