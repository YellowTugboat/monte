const baseLineData = [{
  "id": "main",
  "values": [
    { "x": "2010-01-01", "y": 300 },
    { "x": "2011-01-01", "y": 400 },
    { "x": "2012-01-01", "y": 600 },
    { "x": "2013-01-01", "y": 500 },
    { "x": "2014-01-01", "y": 700 },
    { "x": "2015-01-01", "y": 550 },
    { "x": "2016-01-01", "y": 400 }
  ],
  "css": "main-line"
},{
  "id": "second",
  "values": [
    { "x": "2010-01-01", "y": 250 },
    { "x": "2011-01-01", "y": 350 },
    { "x": "2012-01-01", "y": 450 },
    { "x": "2013-01-01", "y": 400 },
    { "x": "2014-01-01", "y": 600 },
    { "x": "2015-01-01", "y": 450 },
    { "x": "2016-01-01", "y": 500 }
  ],
  "css": "second-line"
},{
  "id": "third",
  "values": [
    { "x": "2010-01-01", "y": 200 },
    { "x": "2011-01-01", "y": 300 },
    { "x": "2012-01-01", "y": 400 },
    { "x": "2013-01-01", "y": 450 },
    { "x": "2014-01-01", "y": 300 },
    { "x": "2015-01-01", "y": 500 },
    { "x": "2016-01-01", "y": 550 }
  ],
  "css": "third-line"
},{
  "id": "fourth",
  "values": [
    { "x": "2010-01-01", "y": 400 },
    { "x": "2011-01-01", "y": 225 },
    { "x": "2012-01-01", "y": 200 },
    { "x": "2013-01-01", "y": 300 },
    { "x": "2014-01-01", "y": 200 },
    { "x": "2015-01-01", "y": 400 },
    { "x": "2016-01-01", "y": 275 }
  ],
  "css": "fourth-line"
},{
  "id": "alt",
  "values": [
    { "x": "2010-01-01", "y": 350 },
    { "x": "2011-01-01", "y": 550 },
    { "x": "2012-01-01", "y": 500 },
    { "x": "2013-01-01", "y": 600 },
    { "x": "2014-01-01", "y": 500 },
    { "x": "2015-01-01", "y": 600 },
    { "x": "2016-01-01", "y": 600 }
  ],
  "css": "alt-line"
}];

function convertLineData(data) {
  // Convert date strings to date objects.
  data.forEach(function(line) {
    line.values.forEach(function(val) {
      val.xOrig = val.x;
      var matches = val.x.match(/(\d+)-(\d+)-(\d+)/);
      val.x = new Date(Date.UTC(matches[1], +matches[2] - 1, matches[3]));
    });
  });

  return data;
}

//**************************************************************************************************
//
// LINE CHART
//
//**************************************************************************************************

var lineData = convertLineData(baseLineData);
var lineOpts = {
  boundingWidth: 300,
  boundingHeight: 200,
  includePoints: true,
  xScale: d3.scaleTime,
  yDomainCustomize: function(extent) {
    var diff = extent[1] - extent[0];
    var adjust = diff * 0.1;

    return [extent[0] - adjust, extent[1] + adjust];
  },
  xDomainCustomize: function(extent) {
    return [extent[0], (extent[1].setDate(extent[1].getDate() + 1))];
  },
  // boundingWidthAttr: '100%',
  resize: new monte.HorizontalResizer(),
  margin: {
    right: 20,
  },
  pointSymbol: function(symbol) { return symbol.type(d3.symbolCircle);},
  pointSize: 16,
  extensions: [new monte.ExtCrosshair({
    layer: 'overlay',
  })],
};
var lineChart = new monte.LineChart('#lineChart', lineOpts).data(lineData);

function xAxisCustom(axis) {
  axis.tickValues([new Date('2010-01-01'), new Date('2011-01-01'), new Date('2012-01-01'),
    new Date('2013-01-01'), new Date('2014-01-01'), new Date('2015-01-01'), new Date('2016-01-01')]); //, 2012, 2013, 2014, 2015, 2016 ]);
  return axis;
};


//**************************************************************************************************
//
// AREA CHART
//
//**************************************************************************************************
var areaOpts = {
  boundingWidth: 300,
  boundingHeight: 200,
  resize: new monte.HorizontalResizer(),
  includePoints: false,
  xScale: d3.scaleTime,
  // xAxisCustomize: xAxisCustom,
  yAxisCustomize: monte.axisNoTicks,

  margin: {
    right: 16,
  },
  extensions: [new monte.ExtFrame(), new monte.ExtGrid()],
};

var areaChart = new monte.AreaChart('#areaChart', areaOpts).data(lineData.slice(0, 3));


//**************************************************************************************************
//
// SPARKLINES
//
//**************************************************************************************************
var sparklineOpts = {
  xScale: d3.scaleTime,
  margin: 4,
  includePoints: false
};
var sparklineChart1 = new monte.SparklineChart('#sparklineChart1', sparklineOpts, lineData[0]);
var sparklineChart2 = new monte.SparklineChart('#sparklineChart2', sparklineOpts, lineData[1]);
var sparklineChart3 = new monte.SparklineChart('#sparklineChart3', sparklineOpts, lineData[2]);
var sparklineChart4 = new monte.SparklineChart('#sparklineChart4', sparklineOpts, lineData[3]);
var sparklineChart4 = new monte.SparklineChart('#sparklineChart5', sparklineOpts, lineData[4]);
