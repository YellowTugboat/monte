var INTERVAL_MS = 5000;
var HEADER_DATA = {
  "lineCurve": "curveCardinal",
  "values": [
    { "id": 0, "value":   0, "adjust": 0.0 },
    { "id": 1, "value":   5, "adjust": 0.5 },
    { "id": 2, "value":  15, "adjust": 0.5 },
    { "id": 3, "value":  30, "adjust": 0.5 },
    { "id": 4, "value":  50, "adjust": 0.6 },
    { "id": 5, "value":  75, "adjust": 0.7 },
    { "id": 6, "value": 105, "adjust": 0.8 },
    { "id": 7, "value": 140, "adjust": 0.9 },
    { "id": 8, "value": 180, "adjust": 1.0 }]
};
HEADER_DATA.values.forEach(function(d) { d.origValue = d.value; });

var random = d3.randomUniform(-1, 1);
var lineGen = d3.line().curve(d3.curveMonotoneX);;
var opts = {
  boundingWidth: 400,
  boundingHeight: 200,
  margin: { top: 50, left: 0, right: 0, bottom: 10 },
  transition: {
    duration: 1500,
  },
  suppressAxes: true,

  resize: new monte.HorizontalResizer(),
};
var headerChart = new monte.BarChart('#headerChart', opts)
  .on('updated', function() {
    var chart = this;
    var data = this.data();
    var lineValues = data.map(function(d, i) { return [chart.x(i), chart.y(d.value)]; });
    var lastPoint = data[data.length - 1];
    var xShift = chart.x.bandwidth() * 0.50; // center of bar X coordinate adjustment
    var lastX = chart.x(lastPoint.id) + xShift; // Add final segment predicting based on trend.
    var lastYDiff = chart.y(lastPoint.value) - chart.y(data[data.length - 2].value);
    var line, points;

    lineValues.push([lastX + chart.x.bandwidth(), chart.y(lastPoint.value) + lastYDiff]);
    line = this.overlay.selectAll('.line').data([lineGen(lineValues)]);

    line.enter().append('path')
        .attr('class', 'line')
      .merge(line)
      .attr('transform', 'translate(' + xShift + ', 0)')
      .transition()
        .duration(this.opts.transition.duration)
        .attr('d', function(d) { return d; });

    // Create a point for each data item except the first item (becuase it is only used to anchor
    // the trend line).
    points = this.overlay.selectAll('circle').data(data.slice(1));

    // Draw new points
    points.enter().append('circle')
      .attr('r', 5)
      .attr('cx', function(d) { return chart.x(d.id) + xShift; })
      .attr('cy', function(d) { return chart.y(d.value); });

    // Shift points to correct position
    points.transition()
      .duration(this.opts.transition.duration)
      .attr('cx', function(d) { return chart.x(d.id) + xShift; })
      .attr('cy', function(d) { return chart.y(d.value); });
  })
  .data(HEADER_DATA.values);

// Randomize update of the chart.
d3.interval(function() {
  // Allow items on the right greater variation than the items on the left (for cosmetic reasons)
  HEADER_DATA.values.forEach(function(d) {
    d.value =  d.origValue + (d.origValue * random() * d.adjust);
  });

  headerChart.data(HEADER_DATA.values);
}, INTERVAL_MS);
