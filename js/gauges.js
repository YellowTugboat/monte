//**************************************************************************************************
//
// SPEEDOMETER GAUGE
//
//**************************************************************************************************
var speedData = {
  value: 20,
  startLabel: 0,
  segments: [
    // { interval:   0, label:   '0', css: 'fill-low', },
    { interval:  20, label:  '20', css: 'fill-low', },
    { interval:  20, label:  '40', css: 'fill-low', },
    { interval:  20, label:  '60', css: 'fill-low', },
    { interval:  20, label:  '80', css: 'fill-low', },
    { interval:  20, label: '100', css: 'fill-low', },
    { interval:  20, label: '120', css: 'fill-med', },
    { interval:  20, label: '140', css: 'fill-med', },
    { interval:  20, label: '160', css: 'fill-high', }
  ]
};

var speedOpts = {
  boundingWidth: 250,
  boundingHeight: 250,
  outerRadius: 110,
  innerRadius: 100,
  pieStartAngle: Math.PI * -0.7,
  pieEndAngle: Math.PI * 0.7,
  piePadAngle: 0.0,
  margin: {
    top: 10,
    left: 0,
    right: 0,
  },
  extensions: [
      new Monte.ExtPolarTicks({
        // tick interval: (angle distance between start and end angle) * PI / (ticks - 1)
        //                (endAngle-startAngle) * PI / ()
        tickInterval: 1.4 * Math.PI / 8,
        startAngle: Math.PI * -0.7,
        endAngle: Math.PI * 0.7,
        innerRadius: 30,
        outerRadius: 75,
      }),
    new Monte.ExtLabel({
      binding: ['updated'],
      labelCss: 'monte-gauge-value-label',
      text: function() {
        return this.chart.needleValue();
      },
      y: 70,
    })
  ],
};

var speedometer = new Monte.GaugeChart('#gaugeSpeedometer', speedOpts)
  .on('rendered', function() {
    this.bg.append('circle')
      .attr('class', 'monte-gauge-frame')
      .attr('r', 115);
  })
  .data(speedData);

var speed = d3.randomUniform(0, 160);
d3.interval(function() {
  var s = Math.floor(speed());
  speedometer.needleValue(s);
}, 5000);


//**************************************************************************************************
//
// PERCENTAGE GAUGE
//
//**************************************************************************************************
var gaugePercentOpts = {
  boundingWidth: 300,
  boundingHeight: 160,
  pieStartAngle: Math.PI * -0.5,
  pieEndAngle: Math.PI * 0.5,
  margin: {
    top: 10,
    left: 0,
    right: 0,
  },
  cornerRadius: 5,
  outerRadius: 140,
  innerRadius: 140,
  labelRadius: 134,
  needleBase: 5,
  needlePath: Monte.needleRect(),
  extensions: [
    new Monte.ExtArc({
      binding: ['updated'],
      arcCss: 'monte-gauge-arc-fill',
      innerRadius: 145,
      outerRadius: 146,
      startAngle: Math.PI * -0.5,
      cornerRadius: 0,
      endAngle: function() { return this.chart.needleValueAngle(); },
    }),
    new Monte.ExtPolarTicks({
      tickInterval: Math.PI / 10,
      startAngle: Math.PI * -0.5,
      endAngle: Math.PI * 0.5,
      innerRadius: 140,
      outerRadius: 150,
    }),
    new Monte.ExtPolarTicks({
      tickInterval: Math.PI / 20,
      startAngle: Math.PI * -0.5,
      endAngle: Math.PI * -0.30,
      innerRadius: 145,
      outerRadius: 150,
    }),
    new Monte.ExtLabel({
      binding: ['updated'],
      labelCss: 'monte-gauge-value-label',
      text: function() {
        return this.chart.needleValue();
      },
      y: -60,
    })
  ],
};
var gauge = new Monte.GaugeChart('#gaugePercent', gaugePercentOpts)
  .on('rendered', function() {
    this.overlay.append('circle').attr('r', 10).lower();
  })
  .data({
    value: 20,
    startLabel: '0',
    segments: [
      // { interval:   0, label:   '0', css: 'fill-low', },
      { interval:   5, label:   '5', css: 'fill-low', },
      { interval:   5, label:  '10', css: 'fill-low', },
      { interval:   5, label:  '15', css: 'fill-low', },
      { interval:   5, label:  '20', css: 'fill-low', },
      { interval:  10, label:  '30', css: 'fill-low', },
      { interval:  10, label:  '40', css: 'fill-low', },
      { interval:  10, label:  '50', css: 'fill-low', },
      { interval:  10, label:  '60', css: 'fill-low', },
      { interval:  10, label:  '70', css: 'fill-med', },
      { interval:  10, label:  '80', css: 'fill-med', },
      { interval:  10, label:  '90', css: 'fill-high', },
      { interval:  10, label: '100', css: 'fill-high', },
    ],
  });

var per = d3.randomUniform(0, 100);
d3.interval(function() {
  var s = Math.floor(per());
  gauge.needleValue(s);
}, 5000);


//**************************************************************************************************
//
// RANGE GAUGE
//
//**************************************************************************************************
var gaugeRangeOpts = {
  boundingWidth: 200,
  boundingHeight: 220,
  pieStartAngle: Math.PI * -0.75,
  pieEndAngle: Math.PI * 0.75,

  innerRadius:  80,
  outerRadius: 100,
  cornerRadius: 3,
  labelPlacement: Monte.polarLabelOuter,

  needleBase: 15,
  needlePath: Monte.needleExtraPointer({ smallNeedleHeight: 5 }),
  needleHeight: 75,

  transition: {
    duration: 2000,
    ease: d3.easeExp,
  },

  extensions: [
    new Monte.ExtArc({
      binding: ['updated'],
      arcCss: 'monte-arc-neg',
      innerRadius:  80,
      outerRadius: 100,
      startAngle: 0,
      cornerRadius: 3,
      endAngle: function() {
        if (this.chart.needleValueAngle() < 0) {
          return this.chart.needleValueAngle();
        }

        return null;
      },
    }),
    new Monte.ExtArc({
      binding: ['updated'],
      arcCss: 'monte-arc-pos',
      innerRadius:  80,
      outerRadius: 100,
      startAngle: 0,
      endAngle: function() {
        if (this.chart.needleValueAngle() > 0) {
          return this.chart.needleValueAngle();
        }

        return null;
      },
      cornerRadius: 3,
    }),
    new Monte.ExtLabel({
      binding: ['updated'],
      anchor: 'middle',
      text: function() {
        return parseInt(this.chart.needleValue(), 10);
      },
      y: 60,
    }),
  ],
};

var rangeGauge = new Monte.GaugeChart('#gaugeRange', gaugeRangeOpts)
  .on('updated', function() {
    if (this.needleValue() === 0) {
      this.classed('has-pos', false);
      this.classed('has-neg', false);
    }
    else if (this.needleValue() > 0) {
      this.classed('has-pos', true);
      this.classed('has-neg', false);
    }
    else if (this.needleValue() < 0) {
      this.classed('has-pos', false);
      this.classed('has-neg', true);
    }
  })
  .data({
    value: 0,
    start: -50,
    segments: [
      { interval: -50, label: '-50' },
      { interval:  50, label:  '50' },
    ]
  });

var rand2 = d3.randomUniform(-50, 50);
var i = 0;
d3.interval(function() {
  i++;
  var newVal = rand2();
  rangeGauge.needleValue(newVal);
}, 5000);
