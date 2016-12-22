var BAR_DATA = [{
  "id": "First with a long name",
  "value": 770,
  "goal": 1000,
  "css": "first-bar"
},{
  "id": "Second",
  "value": 1820,
  "goal": 1000,
  "css": "second-bar"
},{
  "id": "Third",
  "value": 1630,
  "goal": 1000,
  "css": "third-bar"
},{
  "id": "Fourth",
  "value": 960,
  "css": "fourth-bar"
},{
  "id": "Fifth",
  "value": 1320,
  "css": "fifth-bar"
},{
  "id": "Sixth",
  "value": 1470,
  "css": "sixth-bar"
}];

var GROUPED_BAR_DATA = [
  {
    "id": "Game 1",
    "values": [{
      "type": "Shots on net",
      "value": 32
    },{
      "type": "Blocked shots",
      "value": 8
    },{
      "type": "Goals",
      "value": 3
    }]
  },


  {
    "id": "Game 2",
    "values": [{
      "type": "Shots on net",
      "value": 26
    },{
      "type": "Blocked shots",
      "value": 6
    },{
      "type": "Goals",
      "value": 4
    }]
  },


  {
    "id": "Game 3",
    "values": [{
      "type": "Shots on net",
      "value": 28
    },{
      "type": "Blocked shots",
      "value": 10
    },{
      "type": "Goals",
      "value": 6
    }]
  },


  {
    "id": "Game 4",
    "values": [{
      "type": "Shots on net",
      "value": 35
    },{
      "type": "Blocked shots",
      "value": 7
    },{
      "type": "Goals",
      "value": 3
    }]
  },


  {
    "id": "Game 5",
    "values": [{
      "type": "Shots on net",
      "value": 22
    },{
      "type": "Blocked shots",
      "value": 14
    },{
      "type": "Goals",
      "value": 2
    }]
  }
];

const TORNADO_DATA = [{
  "id": "First",
  "value": -770,
  "goal": -1000,
  "css": "first-bar"
}, {
  "id": "Second",
  "value": 1820,
  "goal": 1000,
  "css": "second-bar"
}, {
  "id": "Third",
  "value": -1630,
  "goal": 1000,
  "css": "third-bar"
},{
  "id": "Fourth",
  "value": 960,
  "css": "fourth-bar"
}
];

//**************************************************************************************************
//
// STANDARD BAR CHARTS
//
//**************************************************************************************************
var barOpts = {
  boundingWidth: 300,
  boundingHeight: 200,
  css: 'monte-no-domain-lines',
  extensions: [
    new monte.ExtHorizontalLines(),
    new monte.ExtAxisLabelWrap({
      maxWidth: function() {
        return this.chart.x.bandwidth();
      }
    }),
  ],

  resize: new monte.HorizontalResizer(),
  includeLabels: true,

  margin: {
    top: 20,
  },

  barFillScale: d3.scaleOrdinal(monteSchemes.schemeMonte),
};
var barChart = new monte.BarChart('#barChart', barOpts).data(BAR_DATA);


var hortBarOpts = {
  boundingWidth: 300,
  boundingHeight: 200,
  css: 'monte-no-domain-lines',
  extensions: [
    new monte.ExtVerticalLines(),
    new monte.ExtHorizontalBarBg({
      maxValue: 1650,
      enlarge: 0.1,
      goalProp: 'goal',
      cornerRadius: 1,
    }),
    new monte.ExtAxisLabelWrap({
      maxWidth: 50,
      axis: 'y',
    }),
  ],
  resize: new monte.HorizontalResizer(),
  margin: {
    left: 50,
    right: 30,
  },
  yAxisCustomize: monte.axisNoTicks,
  yScale: function() {
    return d3.scaleBand().paddingInner(0.5).paddingOuter(0.1).round(true);
  },
  includeLabels: true,
};
var hortBarChart = new monte.HorizontalBarChart('#hbarChart', hortBarOpts, BAR_DATA);


//**************************************************************************************************
//
// SIMPLE BAR CHARTS
//
//**************************************************************************************************
var simpleBarChart = new monte.SimpleBarChart('#simpleBarChart', {}, { id: 'Item', value: 85 });
var simpleHortBarChart = new monte.HorizontalSimpleBarChart('#simpleHBarChart', {}, { value: 85, css: 'hort-bar' });


//**************************************************************************************************
//
// SEGMENT BAR CHARTS
//
//**************************************************************************************************
var opts = {
  boundingWidth: 300,
  boundingHeight: 200,
  resize: new monte.HorizontalResizer(),
  segmentBarMode: 'stacked',
  transition: {
    duration: 500
  },
};
var segBarChart = new monte.SegmentBarChart('#segBarChart', opts);


var hopts = {
  boundingWidth: 300,
  boundingHeight: 200,
  resize: new monte.HorizontalResizer(),

  transition: {
    duration: 1500,

    // bars: {
      update: {
        delay: function(d, i) {
          return i * 100;
        },
      },
    // },

    enter: {
      duration: function(d, i) { return 500 + i * 250; },
      delay: function(d, i) { return i * 100; }
    },

    exit: {
      duration: 100,
    },
  },

  margin: {
    left: 50,
  },
};
var segHBarChart = new monte.HorizontalSegmentBarChart('#segHBarChart', hopts);
var segBarGroup = monte.HorizontalSegmentBarChart.createInstanceGroup([segBarChart, segHBarChart]);

segBarGroup.data(GROUPED_BAR_DATA);

var i = 0;
var t = d3.interval(function() {
  i++;

  if (i % 2 === 0) {
    segBarGroup.setMode('grouped');
  }
  else {
    segBarGroup.setMode('stacked');
  }
}, 5000);

//**************************************************************************************************
//
// TORNADO
//
//**************************************************************************************************
var tornadoBarOpts = {
  boundingWidth: 300,
  boundingHeight: 200,
  css: 'monte-no-domain-lines monte-tornado-chart monte-grid-ticks',
  extensions: [
    new monte.ExtHorizontalLines(),
    // new monte.ExtBarBg(),
  ],

  resize: new monte.HorizontalResizer(),
  includeLabels: true,

  margin: {
    top: 20,
    right: 20,
  },
};

var tornadoHBarOpts = {
  boundingWidth: 300,
  boundingHeight: 200,
  css: 'monte-no-domain-lines monte-tornado-chart monte-grid-ticks',
  extensions: [
    new monte.ExtVerticalLines(),
    // new monte.ExtBarBg(),
  ],

  resize: new monte.HorizontalResizer(),
  includeLabels: true,

  margin: {
    top: 20,
    left: 50,
    right: 0,
  },
};

var negBarChart = new monte.BarChart('#tornadoBarChart', tornadoBarOpts).data(TORNADO_DATA);
var negHbarChart = new monte.HorizontalBarChart('#tornadoHBarChart', tornadoHBarOpts).data(TORNADO_DATA);
