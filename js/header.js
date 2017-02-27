var INTERVAL_MS = 5000;
const MOUNTAINS_DATA = [{
  "id": "bg",
  "values": [
    { "x": 0, "y": 0 },
    { "x": 1, "y": 20 },
    { "x": 10, "y": 67, "adjust": 5 },
    { "x": 16.67, "y": 33.33 },
    { "x": 33.33, "y": 83, "adjust": 5 },
    { "x": 50, "y": 40 },
    { "x": 66.66, "y": 88, "adjust": 5 },
    { "x": 83.33, "y": 55 },
    { "x": 90, "y": 90, "adjust": 5 },
    { "x": 99, "y": 30 },
    { "x": 100, "y": 10 },
  ],
  "css": "bg-mtns"
},{
  "id": "fg",
  "values": [
    { "x": 0, "y": 0 },
    { "x": 16.67, "y": 70, "adjust": 20 },
    { "x": 33.33, "y": 35, "adjust": 5 },
    { "x": 50, "y": 87, "adjust": 15 },
    { "x": 66.67, "y": 50, "adjust": 5 },
    { "x": 83.33, "y": 85, "adjust": 15 },
    { "x": 100, "y": 0 }
  ],
  "css": "fg-mtns"
}];
MOUNTAINS_DATA.forEach(function(area) {
  area.values.forEach(function(d) { d.origY = d.y; });
});

const TREE_COUNT = 25;
const STAR_COUNT = 17;

// Percent placement / adjustments
var treeXPlacement = d3.randomUniform(0, 1);
var treeHeight = d3.randomUniform(35, 50);
var starXPlacement = d3.randomUniform(0, 1);
var starScale = d3.randomUniform(0.7, 1.2);
var peakRandomAdjust = d3.randomUniform(-1, 1);

// Actual adjustment
var starYPlacement = d3.randomUniform(-20, 50);

// var lineGen = d3.line().curve(d3.curveMonotoneX);
var opts = {
  css: 'header-mtns',
  boundingWidth: 400,
  boundingHeight: 350,
  boundingWidthAttr: '100%',
  margin: { top: 50, left: 10, right: 10, bottom: 0 },
  transition: {
    duration: 1500,

    enter: {
      duration: 0,
      delay: 100,
    }
  },
  suppressAxes: true,
  includePoints: false,
  resize: new monte.HorizontalResizer(),

  xDomainCustomize: function() { return [0, 100]; },
  yDomainCustomize: function() { return [0, 100]; },

  areaFillScaleAccessor: function(d) {
    return d.id === 'fg' ? 'url(#diagFill)' : '';
  },
  // areaCustomize: function(area) {
  //   area.curve(d3.curveCatmullRom);
  // },
};
var headerChart = new monte.AreaChart('#headerChart', opts)
  .call(function setupFillPattern() {
    const fill = this.defs.append('pattern');
    const size = 8;

    // Setup the pattern element
    fill.attr('id', 'diagFill')
      .attr('width', size)
      .attr('height', size)
      .attr('patternUnits', 'userSpaceOnUse')

    // Setup fill for pattern
    fill.append('rect')
      .attr('width', size)
      .attr('height', size)
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', '#19AEFF');

    fill.append('line')
      .attr('x1', size)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', size)
      .style('stroke', 'rgba(255, 255, 255, 0.1)');
  })
  .call(function setupSymbols() {
    // Tree Symbol
    this.defs.append('symbol')
      .attr('id', 'tree')
      .attr('viewBox', '0 0 16 50')
      .append('path')
        .attr('d', 'M8 0L0 21l6.5-8.5-6.5 20L6.5 25 0 44l6.5-6.5V50h3V37.5L16 44 9.5 25l6.5 7.5-6.5-20L16 21 8 0z')
        .style('fill', '#FB4B4E');

    // Star Symbol
    this.defs.append('symbol')
      .attr('id', 'star')
      .attr('viewBox', '0 0 19 22')
      .append('path')
        .attr('d', 'M9.5 22L8 13.5l-8 3L6.675 11 0 5.5l8 3L9.5 0 11 8.5l8-3-6.675 5.5L19 16.5l-8-3z')
        .style('fill', 'rgba(255, 255, 255, 0.1)');
  })
  .on('rendered', function() {
    const chart = this;

    // Generate a random forest
    const trees = [];
    for (var i = 0; i < TREE_COUNT; i++) {
      trees.push({ x: treeXPlacement(), height: treeHeight() });
    }

    this.overlay.selectAll('.tree')
      .data(trees)
      .enter().append('use')
        .classed('tree', true)
        .attr('width', 16)
        .attr('height', function(d) { return d.height; })
        .attr('x', function(d) { return chart.width * d.x; })
        .attr('y', function(d) { return chart.height - d.height; })
        .attr('href', '#tree');

    // Generate a random constellation
    const stars = [];
    for (var i = 0; i < STAR_COUNT; i++) {
      stars.push({ x: starXPlacement(), y: starYPlacement(), scale: starScale() });
    }

    this.support.selectAll('.star')
      .data(stars)
      .enter().append('use')
        .classed('star', true)
        .attr('width', 19)
        .attr('height', 22)
        .attr('x', function(d) { return chart.width * d.x; })
        .attr('y', function(d) { return d.y; })
        .attr('transform',  function(d) { return 'scale(' + d.scale + ')'; })
        .attr('href', '#star');
  })
  .on('updated', function() {
    const chart = this;

    this.overlay.selectAll('.tree')
      .transition()
        .duration(this.option('transition.duration'))
        .attr('x', function(d) { return chart.width * d.x; });

    this.support.selectAll('.star')
      .transition()
        .duration(this.option('transition.duration'))
        .attr('x', function(d) { return chart.width * d.x; });
  });

  setTimeout(function() {
    headerChart.data(MOUNTAINS_DATA);
  }, 500);

// Randomize update of the chart.
d3.interval(function() {
  // Allow items on the right greater variation than the items on the left (for cosmetic reasons)
  MOUNTAINS_DATA.forEach(function(area) {
    area.values.forEach(function(d, i) {
      // TODO: Only adjust certain point values.
      if (d.adjust) {
        const newVal = d.origY + (peakRandomAdjust() * d.adjust);
        d.y = newVal;
      }
    });
  });

  headerChart.updateData(MOUNTAINS_DATA);
}, INTERVAL_MS);
