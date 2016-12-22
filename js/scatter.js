var SCATTER_DATA = [
  { "x":  5, "y": 10, "value":  5 },
  { "x":  6, "y":  7, "value": 10 },
  { "x":  8, "y": 13, "value":  7 },
  { "x":  8, "y":  8, "value": 15 },
  { "x":  9, "y":  5, "value": 13 },
  { "x":  7, "y": 12, "value":  2 },
  { "x": 10, "y":  9, "value":  9 },

  { "x":  7, "y": 10, "value":  6 },
  { "x":  8, "y":  7, "value":  8 },
  { "x":  9, "y": 11, "value":  9 },
  { "x": 10, "y":  8, "value": 10 },
  { "x": 11, "y":  5, "value":  7 },
  { "x": 12, "y": 12, "value":  8 },
  { "x": 10, "y": 12, "value":  4 }
];

var SCATTER_POW2_DATA = [
  { "x": 0, "y": 1 },
  { "x": 1, "y": 2 },
  { "x": 2, "y": 4 },
  { "x": 3, "y": 8 },
  { "x": 4, "y": 16 },
  { "x": 5, "y": 32 },
  { "x": 6, "y": 64 },
  { "x": 7, "y": 128 },
  { "x": 8, "y": 256 },
  { "x": 9, "y": 512 },
  { "x": 10, "y": 1024 },
  { "x": 11, "y": 2048 }
];


//**************************************************************************************************
//
// SCATTER PLOT
//
//**************************************************************************************************
var pointScale = d3.scaleLinear()
  .range([32, 256])
  .domain(d3.extent(SCATTER_DATA, function(d) { return d.value; }));

var scatterOpts = {
  boundingWidth: 300,
  boundingHeight: 200,
  margin: {
    right: 20,
  },
  yAxisCustomize: function(axis) { axis.tickSize(0); },
  xAxisCustomize: function(axis) { axis.tickSize(0); },
  xDomainCustomize: function(extent) { return [extent[0] - 0.5, extent[1] + 0.5]; },
  yDomainCustomize: function(extent) { return [0, extent[1] + 1]; },
  pointSymbol: function(symbol, d) {
    if (d.value <= 8) {
      return symbol.type(d3.symbolSquare);
    }
    else {
      return symbol.type(d3.symbolCircle);
    }
  },

  pointFillScale: d3.scaleOrdinal(monteSchemes.schemeMonte),
  pointProp: 'value',
  pointSize: function(d, i) {
    return pointScale(d.value);
  },
  extensions: [
    new monte.ExtVerticalLines({
      y1Adjust: 10,
      y2Adjust: -10,
    }),
    // new monte.ExtD3Tip({
    //   featurePrefix: 'point',
    //   offset: { y: -10 },
    //   html: function(d) {
    //     var html = '<div>X: ' + d.x + ' Y: ' + d.y + '</div>';
    //     html += '<div>Value: ' + d.value + '</div>';
    //
    //     return html;
    //   }
    // })
  ],
  boundingWidthAttr: '100%',
  resize: new monte.HorizontalResizer(),
};

var scatterPlot = new monte.ScatterPlot('#scatterPlot', scatterOpts)
  .classed('monte-axis-no-ticks', true)
  .data(SCATTER_DATA);

var linePoints = d3.range(0, 12, 0.5).map(function(i) { return [i, Math.pow(2, i)]; });
var logLine2 = d3.line()
  .curve(d3.curveCardinal)
  .x(function(d) { return scatterPlotLinear.x(d[0]); })
  .y(function(d) { return scatterPlotLinear.y(d[1]); });


//**************************************************************************************************
//
// SCATTER POWERS OF 2
//
//**************************************************************************************************
var scatterPowOpts = {
  css: 'red-dots',
  boundingWidth: 300,
  boundingHeight: 200,
  margin: { right: 15, },
  pointProp: 'y',
  yLabel: 'Value',
  yAxisCustomize: function(axis) {
    axis.tickFormat(d3.format(',.0f'));

    var ticks = SCATTER_POW2_DATA.map(function(d) { return d.y >= 1 ? d.y : null });
    axis.tickValues(ticks);
  },
  yExtentCustomize: function(extent) { return [0.5, extent[1]]; },
  xExtentCustomize: function(extent) { return [0.001, extent[1]]; },
  extensions: [new monte.ExtGrid(), new monte.ExtCrosshair()],
  resize: new monte.HorizontalResizer(),

  transition: {
    duration: 3000,
    ease: d3.easeSin,

    enter: {
      duration: 0,
    },

    axis: {
      enter: {
        duration: 1000,
      }
    }
  },
};

var i = 0;
var scatterPlotLinear = new monte.ScatterPlot('#scatterPow2', scatterPowOpts);
scatterPlotLinear.isLinear = false;

function updateTrend(i) {
  var scaleConstructor = i % 2 === 0 ? d3.scaleLinear : d3.scaleLog;

  scatterPlotLinear.isLinear = i % 2 !== 0;
  scatterPlotLinear.replaceScale('y', scaleConstructor);
}

scatterPlotLinear.on('rendered', function() {
    this.support.append('path')
      .datum(linePoints)
      .style('fill', 'none')
      .attr('class', 'trend-line')
      .attr('d', logLine2);
  })
  .on('axisRendered', function(scaleName, axis, t) {
    this.support.selectAll('.trend-line').data([linePoints])
      .transition(t)
        .attr('d', function(d) { return logLine2(d) });

    this.support.select('.y-axis').selectAll('.tick')
      .transition(t)
        .style('opacity', function(d) {

          if (scatterPlotLinear.isLinear) {
            return 1;
          }

          return d >= 64 ? 1 : 0;
        });
  })
  .data(SCATTER_POW2_DATA);

var t = d3.interval(function() {
  i++;
  updateTrend(i);
}, 5000);
