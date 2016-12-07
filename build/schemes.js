var colorSet = {
  "montePrimary": "#19aeff",
  "monteSecondary": "#005c94",
  "monteAlt": "#292930",
  "monteAccent": "#FB4B4E",
  "monteAccent2": "#B73739",
  "monteGreyDarker": "#333",
  "monteGreyDark": "#666",
  "monteGreyMedium": "#888",
  "monteGreyLight": "#BBB",
  "monteGreyLighter": "#DDD",
  "monteGreyLightest": "#f0f0f0",

  "schemeMonte": ["$montePrimary", "$monteSecondary", "$monteAlt", "$monteAccent", "$monteAccent2",
    "$monteGreyDark", "$monteGreyMedium", "$monteGreyLight", "$monteGreyLighter",
    "$monteGreyLightest"],

  "schemeMonteMonochrome": ["$monteGreyDark", "$monteGreyMedium", "$monteGreyLight",
    "$monteGreyLighter", "$monteGreyLightest"]
};

window.MonteSchemes = {};

for (var key in colorSet) {
  if (colorSet.hasOwnProperty(key) && Monte.tools.isArray(colorSet[key])) {
    MonteSchemes[key] = [];

    colorSet[key].forEach(function(c) {
      var matches = c.match(/^\$(.+)/);

      if (matches && matches[1]) {
         MonteSchemes[key].push(colorSet[matches[1]]);
      }
    });
  }
}
