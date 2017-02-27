export const polarLabelCssPrefix = 'monte-polar-label-';

// NOTE: Radius functions exoect to be invoked in the context of an `Extension` or a `Chart`.
const LABEL_PLACEMENT = {
  CENTROID: {
    css: `${polarLabelCssPrefix}centroid`,
    radius: function(w, h) {
      const chart = this.chart || this; // Expecting to be invoked from an `Extension` or a `Chart`
      const innerRadius = this.tryInvoke(this.option('innerRadius'), w, h);
      const outerRadius = this.tryInvoke(this.option('outerRadius'), w, h);

      return function(d, i, nodes) {
        const ir = chart.tryInvoke(innerRadius, d, i, nodes);
        const or = chart.tryInvoke(outerRadius, d, i, nodes);

        return (ir + or) / 2;
      };
    },
  },

  INNER: {
    css: `${polarLabelCssPrefix}inner`,
    radius: function(w, h) {
      const chart = this.chart || this;
      const innerRadius = this.tryInvoke(this.option('innerRadius'), w, h);

      return function(d, i, nodes) {
        const ir = chart.tryInvoke(innerRadius, d, i, nodes);
        return ir * 0.9;
      };
    },
  },

  INNER_EDGE: {
    css: `${polarLabelCssPrefix}inner-edge`,
    radius: function(w, h) {
      const chart = this.chart || this;
      const innerRadius = this.tryInvoke(this.option('innerRadius'), w, h);

      return function(d, i, nodes) {
        return chart.tryInvoke(innerRadius, d, i, nodes);
      };
    },
  },

  OUTER: {
    css: `${polarLabelCssPrefix}outer`,
    radius: function(w, h) {
      const chart = this.chart || this;
      const outerRadius = this.tryInvoke(this.option('outerRadius'), w, h);

      return function(d, i, nodes) {
        const or = chart.tryInvoke(outerRadius, d, i, nodes);
        return or * 1.1;
      };
    },
  },

  OUTER_EDGE: {
    css: `${polarLabelCssPrefix}outer-edge`,
    radius: function(w, h) {
      const chart = this.chart || this;
      const outerRadius = this.tryInvoke(this.option('outerRadius'), w, h);

      return function(d, i, nodes) {
        return chart.tryInvoke(outerRadius, d, i, nodes);
      };
    },
  },
};

export function polarLabelCentroid() {
  return LABEL_PLACEMENT.CENTROID;
}

export function polarLabelInner() {
  return LABEL_PLACEMENT.INNER;
}

export function polarLabelInnerEdge() {
  return LABEL_PLACEMENT.INNER_EDGE;
}

export function polarLabelOuter() {
  return LABEL_PLACEMENT.OUTER;
}

export function polarLabelOuterEdge() {
  return LABEL_PLACEMENT.OUTER_EDGE;
}

export function polarLabelInnerFactor(factor) {
  return {
    css: `${polarLabelCssPrefix}inner ${polarLabelCssPrefix}inner-x${factor}`,
    radius: function(w, h) {
      const chart = this.chart || this;
      const innerRadius = this.tryInvoke(this.option('innerRadius'), w, h);

      return function(d, i, nodes) {
        const ir = chart.tryInvoke(innerRadius, d, i, nodes);
        return ir * factor;
      };
    },
  };
}

export function polarLabelInnerAdjust(adjust) {
  return {
    css: `${polarLabelCssPrefix}inner ${polarLabelCssPrefix}inner-${adjust}`,
    radius: function(w, h) {
      const chart = this.chart || this;
      const innerRadius = this.tryInvoke(this.option('innerRadius'), w, h);

      return function(d, i, nodes) {
        const ir = chart.tryInvoke(innerRadius, d, i, nodes);
        return ir + adjust;
      };
    },
  };
}

export function polarLabelOuterFactor(factor) {
  return {
    css: `${polarLabelCssPrefix}outer ${polarLabelCssPrefix}outer-x${factor}`,
    radius: function(w, h) {
      const chart = this.chart || this;
      const outerRadius = this.tryInvoke(this.option('outerRadius'), w, h);

      return function(d, i, nodes) {
        const or = chart.tryInvoke(outerRadius, d, i, nodes);
        return or * factor;
      };
    },
  };
}

export function polarLabelOuterAdjust(adjust) {
  return {
    css: `${polarLabelCssPrefix}outer ${polarLabelCssPrefix}outer-${adjust}`,
    radius: function(w, h) {
      const chart = this.chart || this;
      const outerRadius = this.tryInvoke(this.option('outerRadius'), w, h);

      return function(d, i, nodes) {
        const or = chart.tryInvoke(outerRadius, d, i, nodes);
        return or + adjust;
      };
    },
  };
}
