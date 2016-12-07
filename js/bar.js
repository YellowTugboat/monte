var BAR_DATA = [{
  "id": "First",
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
    new Monte.ExtHorizontalLines(),
    // new Monte.ExtBarBg(),
  ],

  resize: new Monte.HorizontalResizer(),
  includeLabels: true,

  margin: {
    top: 20,
  },

  barFillScale: d3.scaleOrdinal(MonteSchemes.schemeMonte),
};
var barChart = new Monte.BarChart('#barChart', barOpts).data(BAR_DATA);


var hortBarOpts = {
  boundingWidth: 300,
  boundingHeight: 200,
  css: 'monte-no-domain-lines',
  extensions: [
    new Monte.ExtVerticalLines(),
    new Monte.ExtHorizontalBarBg({
      maxValue: 1650,
      enlarge: 0.1,
      goalProp: 'goal',
      cornerRadius: 1,
    }),
  ],
  resize: new Monte.HorizontalResizer(),
  margin: {
    left: 50,
    right: 30,
  },
  yScale: function() {
    return d3.scaleBand().paddingInner(0.5).paddingOuter(0.1).round(true);
  },
  includeLabels: true,
};
var hortBarChart = new Monte.HorizontalBarChart('#hbarChart', hortBarOpts, BAR_DATA);


//**************************************************************************************************
//
// SIMPLE BAR CHARTS
//
//**************************************************************************************************
var simpleBarChart = new Monte.SimpleBarChart('#simpleBarChart', {}, { id: 'Item', value: 85 });
var simpleHortBarChart = new Monte.HorizontalSimpleBarChart('#simpleHBarChart', {}, { value: 85, css: 'hort-bar' });


//**************************************************************************************************
//
// SEGMENT BAR CHARTS
//
//**************************************************************************************************
var opts = {
  boundingWidth: 300,
  boundingHeight: 200,
  resize: new Monte.HorizontalResizer(),
  segmentBarMode: 'stacked',
  transition: {
    duration: 500
  },
};
var segBarChart = new Monte.SegmentBarChart('#segBarChart', opts);


var hopts = {
  boundingWidth: 300,
  boundingHeight: 200,
  resize: new Monte.HorizontalResizer(),

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
var segHBarChart = new Monte.HorizontalSegmentBarChart('#segHBarChart', hopts);
var segBarGroup = Monte.HorizontalSegmentBarChart.createInstanceGroup([segBarChart, segHBarChart]);

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
    new Monte.ExtHorizontalLines(),
    // new Monte.ExtBarBg(),
  ],

  resize: new Monte.HorizontalResizer(),
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
    new Monte.ExtVerticalLines(),
    // new Monte.ExtBarBg(),
  ],

  resize: new Monte.HorizontalResizer(),
  includeLabels: true,

  margin: {
    top: 20,
    left: 50,
    right: 0,
  },
};

var negBarChart = new Monte.BarChart('#tornadoBarChart', tornadoBarOpts).data(TORNADO_DATA);
var negHbarChart = new Monte.HorizontalBarChart('#tornadoHBarChart', tornadoHBarOpts).data(TORNADO_DATA);
