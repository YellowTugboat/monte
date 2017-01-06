var pieData = {
  "set0": [
    { "value": 10, "label": "Lead" }
  ],

  "set1": [
    { "value": 10, "label": "Lead" },
    { "value": 30, "label": "Second" }
  ],

  "set2": [
    { "value": 10, "label": "Lead" },
    { "value": 30, "label": "Second" },
    { "value": 22, "label": "Third" }
  ],

  "set3": [
    { "value": 10, "label": "Lead" },
    { "value": 11, "label": "Second" },
    { "value": 12, "label": "Third" },
    { "value": 13, "label": "Fourth" }
  ],

  "set4": [
    { "value": 10, "label": "Lead" },
    { "value": 11, "label": "Second" },
    { "value": 12, "label": "Third" },
    { "value": 13, "label": "Fourth" },
    { "value": 14, "label": "Fifth" }
  ],

  "set5": [
    { "value": 10, "label": "Lead" },
    { "value": 11, "label": "Second" },
    { "value": 12, "label": "Third" },
    { "value": 13, "label": "Fourth" },
    { "value": 14, "label": "Fifth" },
    { "value": 15, "label": "Sixth" }
  ],

  "set6": [
    { "value": 10, "label": "Lead" },
    { "value": 11, "label": "Second" },
    { "value": 12, "label": "Third" },
    { "value": 13, "label": "Fourth" },
    { "value": 14, "label": "Fifth" },
    { "value": 15, "label": "Sixth" },
    { "value": 22, "label": "Seventh" }
  ],

  "set7": [
    { "value": 18, "label": "Lead" },
    { "value": 10, "label": "Second" },
    { "value": 11, "label": "Third" },
    { "value": 12, "label": "Fourth" },
    { "value": 13, "label": "Fifth" },
    { "value": 14, "label": "Sixth" },
    { "value": 15, "label": "Seventh" },
    { "value": 22, "label": "Eight" }
  ],

  "set8": [
    { "value": 18, "label": "Lead" },
    { "value": 10, "label": "Second" },
    { "value": 11, "label": "Third" },
    { "value": 12, "label": "Fourth" },
    { "value": 13, "label": "Fifth" },
    { "value": 14, "label": "Sixth" },
    { "value": 15, "label": "Seventh" },
    { "value": 22, "label": "Eight" },
    { "value": 32, "label": "Ninth" }
  ]
};

//**************************************************************************************************
//
// PIE
//
//**************************************************************************************************
var pieOpts = {
  boundingWidth: 300,
  boundingHeight: 200,
  innerRadius: 1,
  transition: { duration: 750 },

  margin: 5,
  piePadAngle: 0,

  includeLabels: true,
  labelProp: 'value',
  // labelPlacement: monte.polarLabelOuter,
  labelRotation: monte.polarLabelRotateRayFlip,
};
var pie = new monte.ArcChart('#pieChart', pieOpts, pieData.set0);


//**************************************************************************************************
//
// DONUT
//
//**************************************************************************************************
var donutOpts = {
  boundingWidth: 300,
  boundingHeight: 200,
  innerRadius: 60,
  pieStartAngle: 2 * Math.PI * 0.03,
  pieEndAngle: 2 * Math.PI * 0.97,

  margin: 20,

  transition: {
    duration: 750,

    enter: {
      duration: function(d, i) { return 500 + i * 250; },
      delay: function(d, i) { return i * 100; }
    },

    exit: {
      duration: 100,
    },
  },

  includeLabels: true,
  labelProp: 'label',
  labelPlacement: monte.polarLabelOuter,

  extensions: [
    new monte.ExtLabel({
      anchor: 'middle',
      labelCss: 'donut-small-lg',
      text: 'segments',
      y: 34,
    }),
    new monte.ExtLabel({
      binding: ['updated'],
      anchor: 'middle',
      labelCss: 'donut-label-lg',
      text: function() {
        return this.chart.data().length;
      },
      y: -10,
    }),
  ],
};

var donut = new monte.ArcChart('#donutChart', donutOpts)
  .on('rendered', function() {
    var arc = d3.arc()
      .innerRadius(58)
      .outerRadius(82)
      .startAngle(2 * Math.PI * -0.02)
      .endAngle(2 * Math.PI * 0.02);

    // Draw keystone
    this.bg.append('path')
      .attr('class', 'arc-keystone')
      .attr('d', arc());
  })
  .data(pieData.set0);


//**************************************************************************************************
//
// POLAR AREA CHART
//
//**************************************************************************************************
var polarAreaOpts = {
  boundingWidth: 300,
  boundingHeight: 200,
  innerRadius: 20,
  pieStartAngle: Math.PI,
  pieEndAngle: 3 * Math.PI,

  margin: 20,

  transition: {
    duration: 750,

    enter: {
      duration: function(d, i) { return 500 + i * 250; },
      delay: function(d, i) { return i * 100; }
    },

    exit: {
      duration: 100,
    },
  },

  includeLabels: true,
  labelProp: 'label',
  labelPlacement: monte.polarLabelOuterFactor(1.1),
  labelRotation: monte.polarLabelRotateTangentOrigin,

  extensions: [
  ],
};

var polarArea = new monte.PolarAreaChart('#polarAreaChart', polarAreaOpts)
  .data(pieData.set0);

var i = 1;
var wedges = d3.randomUniform(0, 8);
d3.interval(function() {
  i = Math.round(wedges());

  pie.updateData(pieData['set' + i]);
  donut.updateData(pieData['set' + i]);
  polarArea.updateData(pieData['set' + i]);
}, 3000);

//**************************************************************************************************
//
// WEDGES
//
//**************************************************************************************************
var wedgeOpts = {
  boundingWidth: 50,
  boundingHeight: 70,
  margin: { top: 10 },
}

var wedge1 = new monte.WedgeChart('#wedge1', wedgeOpts, 15);
var wedge2 = new monte.WedgeChart('#wedge2', wedgeOpts, 25);
var wedge3 = new monte.WedgeChart('#wedge3', wedgeOpts, 50);
var wedge4 = new monte.WedgeChart('#wedge4', wedgeOpts, 75);
