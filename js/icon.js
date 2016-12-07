var SHOTS_DATA = [
  { "type": "shot", "period": 1 },
  { "type": "shot", "period": 1 },
  { "type": "shot", "period": 1 },
  { "type": "goal", "period": 1 },
  { "type": "shot", "period": 1 },
  { "type": "shot", "period": 1 },
  { "type": "shot", "period": 1 },
  { "type": "shot", "period": 1 },
  { "type": "shot", "period": 1 },
  { "type": "shot", "period": 1 },
  { "type": "shot", "period": 2 },
  { "type": "shot", "period": 2 },
  { "type": "shot", "period": 2 },
  { "type": "shot", "period": 2 },
  { "type": "shot", "period": 2 },
  { "type": "shot", "period": 2 },
  { "type": "shot", "period": 2 },
  { "type": "goal", "period": 2 },
  { "type": "shot", "period": 2 },
  { "type": "shot", "period": 2 },
  { "type": "shot", "period": 3 },
  { "type": "shot", "period": 3 },
  { "type": "shot", "period": 3 },
  { "type": "shot", "period": 3 },
  { "type": "shot", "period": 3 },
  { "type": "goal", "period": 3 },
  { "type": "shot", "period": 3 },
  { "type": "shot", "period": 3 },
  { "type": "shot", "period": 3 },
  { "type": "shot", "period": 3 },
  { "type": "shot", "period": 3 },
  { "type": "empty", "period": 3 }
];

var PEOPLE_DATA = [
  { "type": "man" },
  { "type": "man" },
  { "type": "man" },
  { "type": "woman" },
  { "type": "man" },
  { "type": "man" },
  { "type": "woman" },
  { "type": "woman" },
  { "type": "woman" },
  { "type": "man" },
  { "type": "man" },
  { "type": "woman" },
  { "type": "woman" },
  { "type": "man" },
  { "type": "woman" },
  { "type": "man" },
  { "type": "woman" },
  { "type": "man" }
];

var BIKES_DATA = [
  { "color": "red" },
  { "color": "red" },
  { "color": "blue" },
  { "color": "blue" },
  { "color": "red" },
  { "color": "darkBlue" },
  { "color": "darkBlue" },
  { "color": "black" },
  { "color": "blue" },
  { "color": "darkBlue" },
  { "color": "black" },
  { "color": "black" },
  { "color": "red" },
  { "color": "darkBlue" },
  { "color": "blue" },
  { "color": "black" }
];


//**************************************************************************************************
//
// ICON ARRAY D3 SYMBOL
//
//**************************************************************************************************
var d3IconOpts = {
  rows: 7,
  columns: 5,

  margin: 0,
  boundingHeight: 144,
  boundingWidth: 170,

  placement: {
    rowIndex: function(d, i) { return this.opts.rows - Math.floor(i / this.opts.columns) - 1; },
  },

  iconSize: function(d) { return d.type === 'empty' ? 50 : 64; },
  iconCss: function(d) {
    return d.type;
  },
};

var d3IconArray = new Monte.IconArray('#d3IconArray', d3IconOpts, SHOTS_DATA);


//**************************************************************************************************
//
// ICON ARRAY SVG DEF
//
//**************************************************************************************************
var defIconOpts = {
  rows: 4,
  columns: 6,

  margin: 0,
  boundingHeight: 100,
  boundingWidth: 170,

  iconCss: 'svg-icon',
  iconCss: function(d) {
    return d.type;
  },

  iconSvgWidth: 24,
  iconSvgHeight: 24,
  iconMode: 'svgUseDef',

  iconSvgSymbol: function(symbol) {
    symbol.attr('viewBox', '0 0 24 24')
      .append('path')
        .attr('d', 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z');
  }
};

var svgUseDefIconArray = new Monte.IconArray('#svgUseDefIconArray', defIconOpts, PEOPLE_DATA);


//**************************************************************************************************
//
// ICON ARRAY EXTERNAL FILE
//
//**************************************************************************************************
var extIconOpts = {
  rows: 4,
  columns: 4,

  margin: 0,
  boundingHeight: 144,
  boundingWidth: 170,

  iconCss: 'svg-icon',
  // iconFillScaleAccessor: function(d) {
  //   return d.type;
  // },
  iconFillScale: d3.scaleOrdinal([colorSet.montePrimary, colorSet.monteAccent, colorSet.monteSecondary, colorSet.monteGreyDark]).domain(['blue', 'red', 'darkBlue', 'black']),
  iconProp: 'color',

  iconSvgWidth: 24,
  iconSvgHeight: 24,
  iconHref: 'ic_motorcycle_black_24px.svg#mc',
  iconMode: 'svgUseExternal',
};

var svgUseExtIconArray = new Monte.IconArray('#svgUseExtIconArray', extIconOpts, BIKES_DATA);
