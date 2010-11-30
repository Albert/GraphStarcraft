function drawPage(dataSet) {
  $(function () {
    $("#ganttChartDiv").ganttView({ 
      data: dataSet,
      start: 0,
      end: 240,
      slideWidth: 3000,
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