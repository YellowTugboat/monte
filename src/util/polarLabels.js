export const polarLabelCssPrefix = 'monte-polar-label-';

const LABEL_PLACEMENT = {
  CENTROID: {
    css: `${polarLabelCssPrefix}centroid`,
    radius: function(w, h) {
      const innerRadius = this.tryInvoke(this.opts.innerRadius, w, h);
      const outerRadius = this.tryInvoke(this.opts.outerRadius, w, h);
      return innerRadius + (outerRadius - innerRadius) * 0.5;
    },
  },

  INNER: {
    css: `${polarLabelCssPrefix}inner`,
    radius: function(w, h) {
      const innerRadius = this.tryInvoke(this.opts.innerRadius, w, h);
      return innerRadius * 0.9;
    },
  },

  OUTER: {
    css: `${polarLabelCssPrefix}outer`,
    radius: function(w, h) {
      const outerRadius = this.tryInvoke(this.opts.outerRadius, w, h);
      return outerRadius * 1.1;
    },
  },
};

export function polarLabelCentroid() {
  return LABEL_PLACEMENT.CENTROID;
}

export function polarLabelInner() {
  return LABEL_PLACEMENT.INNER;
}

export function polarLabelOuter() {
  return LABEL_PLACEMENT.OUTER;
}
