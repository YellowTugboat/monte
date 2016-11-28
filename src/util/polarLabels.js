import { HALF_PI, PI } from '../const/math';
export const polarLabelCssPrefix = 'monte-polar-label-';

const LABEL_PLACEMENT = {
  CENTROID: {
    css: `${polarLabelCssPrefix}centroid`,
    radius: function(w, h) {
      const innerRadius = this.tryInvoke(this.option('innerRadius'), w, h);
      const outerRadius = this.tryInvoke(this.option('outerRadius'), w, h);
      return innerRadius + (outerRadius - innerRadius) * 0.5;
    },
  },

  INNER: {
    css: `${polarLabelCssPrefix}inner`,
    radius: function(w, h) {
      const innerRadius = this.tryInvoke(this.option('innerRadius'), w, h);
      return innerRadius * 0.9;
    },
  },

  OUTER: {
    css: `${polarLabelCssPrefix}outer`,
    radius: function(w, h) {
      const outerRadius = this.tryInvoke(this.option('outerRadius'), w, h);
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

export function polarLabelInnerFactor(factor) {
  return {
    css: `${polarLabelCssPrefix}inner-${factor}`,
    radius: function(w, h) {
      const innerRadius = this.tryInvoke(this.option('innerRadius'), w, h);
      return innerRadius * factor;
    },
  };
}

export function polarLabelOuterFactor(factor) {
  return {
    css: `${polarLabelCssPrefix}outer-${factor}`,
    radius: function(w, h) {
      const outerRadius = this.tryInvoke(this.option('outerRadius'), w, h);
      return outerRadius * factor;
    },
  };
}

export function polarLabelRotateTangentOrigin(d) {
  const angle = ((d.endAngle - d.startAngle) / 2 + d.startAngle);

  return angle;
}

export function polarLabelRotateTangentFlip(d) {
  let angle = ((d.endAngle - d.startAngle) / 2 + d.startAngle);

  const absAngle = Math.abs(angle);
  if (absAngle > HALF_PI && absAngle <= 3 * HALF_PI) {
    angle -= PI;
  }

  return angle;
}

export function polarLabelRotateRay(d) {
  const angle = ((d.endAngle - d.startAngle) / 2 + d.startAngle) - HALF_PI;

  return angle;
}

export function polarLabelRotateRayOpposite(d) {
  const angle = ((d.endAngle - d.startAngle) / 2 + d.startAngle) - HALF_PI - PI;

  return angle;
}
