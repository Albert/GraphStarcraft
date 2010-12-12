/*
Based off of:

/*
jQuery.ganttView v.0.8.2
Copyright (c) 2010 JC Grubbs - jc.grubbs@devmynd.com
MIT License Applies
*/

/*
Options
-----------------
data: object
start: date
duration: date
cellWidth: number
cellHeight: number
slideWidth: number
behavior: {
	clickable: boolean,
	draggable: boolean,
	resizable: boolean,
	onClick: function,
	onDrag: function,
	onResize: function
}
*/

(function ($) {
    $.fn.ganttView = function (options) {

        var els = this;
        var defaults = {
            cellWidth: 21,
            cellHeight: 31,
            slideWidth: 400,
            vHeaderWidth: 100,
            behavior: {
            	clickable: true,
            	draggable: true,
            	resizable: true,
            	onClick: null,
            	onDrag: null,
            	onResize: null
            }
        };
        
        var opts = $.extend(true, defaults, options);
        var minutes = Chart.getMinutes(opts.start, opts.end);

        els.each(function () {

            var container = $(this);
            var div = $("<div>", { "class": "ganttview" });

            Chart.addVtHeader(div, opts.data, opts.cellHeight);
            Chart.addBuildingAdder(div);

            var slideDiv = $("<div>", {
                "class": "ganttview-slide-container",
                "css": { "width": opts.slideWidth + "px" }
            });

            Chart.addHzHeader(slideDiv, minutes, opts.cellWidth);
            Chart.addGrid(slideDiv, opts.data, minutes, opts.cellWidth, opts.cellHeight);
            Chart.addBlockContainers(slideDiv, opts.data, opts.cellHeight);
            Chart.addBlocks(slideDiv, opts.data, opts.cellWidth, opts.cellHeight, opts.start);

            div.append(slideDiv);
            container.append(div);

            var w = $("div.ganttview-vtheader", container).outerWidth() +	$("div.ganttview-slide-container", container).outerWidth();
            container.css("width", (w + 2) + "px");

            Chart.applyLastClass(container);
            
            if (opts.behavior.draggable) { 
            	Behavior.bindBlockDrag(container, opts.cellWidth, opts.start, opts.behavior.onDrag); 
        	}
        });
        buildGraph();
    };

    var Chart = {

        getMinutes: function (start, end) {
            var minutes = [];
            var total_time = end - start;
            var total_minutes = Math.floor(total_time/60);
            for (var i = 0; i <= total_minutes; i++) {
              minutes.push(i);
            }
            return minutes;
        },

        addVtHeader: function (div, data, cellHeight) {
            var headerDiv = $("<div>", { "class": "ganttview-vtheader" });
            for (var i = 0; i < data.length; i++) {
                var itemDiv = $("<div>", { "class": "ganttview-vtheader-item", "css": { "height": (cellHeight+1) + "px" }});
                var selector = $("<select>");

                if (buildOrder[i].tasks.length > 0) {
                  var lastTask = _.max(buildOrder[i].tasks, function(task){return task.taskTime});
                }

                for (taskName in taskDescription[data[i].name]) {
                  var isSelected = (lastTask.taskName == taskName ) ? "selected" : "";
                  dom_option = $("<option>", { "value": taskName, "selected": isSelected }).html(taskName);
                  selector.append(dom_option);
                }
                var input =$("<input>", {"type": "submit", "value": "Add", "id": "for_row_" + i});
                input.click(function() {
                  var newTask = $(this).siblings('select').attr('value');
                  var rowIndex = $(this).attr('id').replace("for_row_", "");
                  var lastEventEnd = 0;
                  if (buildOrder[rowIndex].tasks.length > 0) {
                    var lastEventName = _.max(buildOrder[rowIndex].tasks, function(task){return task.taskTime}).taskName;
                    var lastEventStart = _.max(buildOrder[rowIndex].tasks, function(task){return task.taskTime}).taskTime;
                    var lastEventDuration = taskDescription[buildOrder[rowIndex].name][lastEventName][1];
                    var lastEventEnd = lastEventStart + lastEventDuration;
                  }
                  buildOrder[rowIndex].tasks.push({taskTime: lastEventEnd, taskName: newTask})
                  ganttTheData();
                });
                var closeButton = $("<div>", { "class": "ganttview-vtheader-item-close" }).text("x");

                closeButton.click(function() {
                  var toRemove = $(this).parent().data("vtHeaderId");
                  delete buildOrder[toRemove];
                  buildOrder = _.compact(buildOrder)
                  ganttTheData();
                });

                itemDiv.append($("<div>", { "class": "ganttview-vtheader-item-name"}).append(data[i].name)).append(selector).append(input).append(closeButton);
                var vtHeaderId = i;
                itemDiv.data("vtHeaderId", vtHeaderId);
                headerDiv.append(itemDiv);
            }
            div.append(headerDiv);
        },
        
        addBuildingAdder: function(div) {
          var buildingAdder = $('<div>', {"id": "building_adder"});
          var buildingAdderOption = $("<select>");
          for (building in taskDescription) {
            var buildingOption = $("<option>", {"value": building }).html(building);
            buildingAdderOption.append(buildingOption);
          }
          var buildingAdderInput =$("<input>", {"type": "submit", "value": "Add"});
          buildingAdderInput.click(function() {
            var newBuildingName = $(this).siblings('select').attr("value");
            var newBuildingObj = { name: newBuildingName, tasks: [] }
            buildOrder.push(newBuildingObj);
            console.log(buildOrder);
            ganttTheData();
          });
          buildingAdder.append(buildingAdderOption).append(buildingAdderInput);
          div.append(buildingAdder);
        },

        addHzHeader: function (div, minutes, cellWidth) {
            var headerDiv = $("<div>", { "class": "ganttview-hzheader" });
            var minutesDiv = $("<div>", { "class": "ganttview-hzheader-minutes" });
            var secondsDiv = $("<div>", { "class": "ganttview-hzheader-seconds" });
            var chunkWidth = cellWidth * 10;
            var totalW = 0;
            for (var i = 0; i < 12; i++) {
                if (minutes[i] != undefined) {
                    var w = 60* cellWidth;
                    totalW = totalW + w;
                    minutesDiv.append($("<div>", {
                        "class": "ganttview-hzheader-minute",
                        "css": { "width": (w - 1) + "px" }
                    }).append(minutes[i]));
                    for (var j = 0; j < (60); j = j + 10) {
                        secondsDiv.append($("<div>", { "class": "ganttview-hzheader-second", "width" : (chunkWidth - 1) })
							.append(j));
                    }
                }
            }
            minutesDiv.css("width", totalW + "px");
            secondsDiv.css("width", totalW + "px");
            headerDiv.append(minutesDiv).append(secondsDiv);
            div.append(headerDiv);
        },

        addGrid: function (div, data, minutes, cellWidth, cellHeight) {
            var gridDiv = $("<div>", { "class": "ganttview-grid" });
            var rowDiv = $("<div>", { "class": "ganttview-grid-row" });
            for (var i = 0; i < 12; i++) {
                if (minutes[i] != undefined) {
                    for (var j = 0; j < 60; j++) {
                        var cellDiv = $("<div>", { "class": "ganttview-grid-row-cell ", "width" : (cellWidth - 1), "height": cellHeight });
                        if (j % 10 == 9) {
                          cellDiv.addClass("darker");
                        }
                        rowDiv.append(cellDiv);
                    }
                }
            }
            var w = $("div.ganttview-grid-row-cell", rowDiv).length * cellWidth;
            rowDiv.css("width", w + "px");
            gridDiv.css("width", w + "px");
            for (var i = 0; i < data.length; i++) {
                gridDiv.append(rowDiv.clone());
            }
            div.append(gridDiv);
        },

        addBlockContainers: function (div, data, cellHeight) {
            var blocksDiv = $("<div>", { "class": "ganttview-blocks" });
            for (var i = 0; i < data.length; i++) {
                    blocksDiv.append($("<div>", { "class": "ganttview-block-container", "height": cellHeight - 3}));
            }
            div.append(blocksDiv);
        },

        addBlocks: function (div, data, cellWidth, cellHeight, start) {
            var rows = $("div.ganttview-blocks div.ganttview-block-container", div);
            for (var i = 0; i < data.length; i++) { /* for each structure */
              var building = data[i];
              for (taskIndex in building.tasks) {
                var currentTask = building.tasks[taskIndex];
                var taskDetails = taskDescription[building.name][currentTask.taskName];
                var type = taskDetails[0];
                var size = taskDetails[1];
                var offset = currentTask.taskTime;
                var block = $("<div>", {
                  "class": "ganttview-block tasks_" + type,
                  "title": currentTask + ", " + size + " seconds",
                  "css": {
                    "width": ((size * cellWidth) - 2) + "px",
                    "height": (cellHeight - 6) + "px",
                    "left": ((offset * cellWidth) - 1) + "px",
                  }
                });
                block.append($("<div>", { "class": "ganttview-block-text" }).text(currentTask.taskName));

                return_times = getFriendlyTimes(offset, offset + size);

                var closeButton = $("<div>", { "class": "ganttview-block-close" }).text("x");
                closeButton.click(function() {
                  var toRemove = $(this).parent().data("blockId").split("_");
                  var xBuilding = buildOrder[toRemove[0]];
                  var xTask = buildOrder[toRemove[0]].tasks[toRemove[1]];
                  var newBuildingTasks = _.reject(xBuilding.tasks, function(rejTask){
                    return (rejTask.taskName == xTask.taskName) && (rejTask.taskTime == xTask.taskTime);
                  });
                  buildOrder[toRemove[0]].tasks = newBuildingTasks;
                  ganttTheData();
                });
                
                block.append($("<div>", { "class": "ganttview-block-start" }).text(return_times[0]));
                block.append($("<div>", { "class": "ganttview-block-end" }).text(return_times[1]));
                block.append(closeButton);
                var blockId = i + "_" + taskIndex;

                block.data("blockId", blockId);

                $(rows[i]).append(block);
              }
            }
        },

        applyLastClass: function (div) {
          $("div.ganttview-grid-row div.ganttview-grid-row-cell:last-child", div).addClass("last");
          $("div.ganttview-hzheader-seconds div.ganttview-hzheader-second:last-child", div).addClass("last");
          $("div.ganttview-hzheader-minutes div.ganttview-hzheader-minute:last-child", div).addClass("last");
        }

    };

    var Behavior = {
      
      bindBlockDrag: function (div, cellWidth, startDate, callback) {
      	$("div.ganttview-block", div).draggable({
      		axis: "x", 
      		grid: [cellWidth, cellWidth],
      		stop: function () {
      			var block = $(this);
      			var blockId = block.data("blockId");
      			Behavior.updateDataAndRedraw(div, block, cellWidth, blockId);
      		}
      	});
      },
      
      updateDataAndRedraw: function (div, block, cellWidth, blockId) {
        var blockIdComponents = blockId.split("_");
        var blockBuilding = blockIdComponents[0];
        var blockTimeSig  = blockIdComponents[1];
        var blockTaskName = blockIdComponents[2];

        var container = $("div.ganttview-slide-container", div);
        var scroll = container.scrollLeft();
        var offset = block.offset().left - container.offset().left - 1 + scroll;

        // Set new start time
        var newStart = Math.round(offset / cellWidth);

        buildOrder[blockBuilding]["tasks"][blockTimeSig].taskTime = newStart;
        ganttTheData();
      },

    };

    var ArrayUtils = {
        contains: function (arr, obj) {
            var has = false;
            for (var i = 0; i < arr.length; i++) { if (arr[i] == obj) { has = true; } }
            return has;
        }
    };
})(jQuery);

function ganttTheData() {
  $("#ganttChartDiv").html("");
  
  $(function () {
    $("#ganttChartDiv").ganttView({ 
      data: buildOrder,
      start: 0,
      end: 480,
      slideWidth: 2175,
      cellWidth: 4,
      cellHeight: 40,
      behavior: {
        resizable: false,
        onDrag: function (data) { 
            buildGraph();
        }
      }
    });
  });
}

function getFriendlyTimes(start_time, end_time) {
  var return_times = [];
  if (start_time % 60 < 10) {
    start_lead = "0";
  } else {
    start_lead = "";
  }
  if (end_time % 60 < 10) {
    end_lead = "0";
  } else {
    end_lead = "";
  }
  var friendly_start = Math.floor(start_time/60) + ":" + start_lead + (start_time % 60);
  var friendly_end   = Math.floor(end_time/60) + ":" + end_lead + (end_time % 60);
  
  return_times.push(friendly_start);
  return_times.push(friendly_end);
  
  return return_times;
}