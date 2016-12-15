import { HALF_PI, PI } from '../const/math';
import { isNumeric } from '../tools/is';

export const polarLabelCssPrefix = 'monte-polar-label-';

// NOTE: Radius functions exoect to be invoked in the context of an `Extension` or a `Chart`.
const LABEL_PLACEMENT = {
  CENTROID: {
    css: `${polarLabelCssPrefix}centroid`,
    radius: function(w, h) {
      const chart = this.chart || this; // Expecting to be invoked from an `Extension` or a `Chart`
      const innerRadius = this.tryInvoke(this.option('innerRadius'), w, h);
      const outerRadius = this.tryInvoke(this.option('outerRadius'), w, h);
      // return innerRadius + (outerRadius - innerRadius) * 0.5;

      return function(d, i, nodes) {
        const ir = chart.tryInvoke(innerRadius, d, i, nodes);
        const or = chart.tryInvoke(outerRadius, d, i, nodes);

        return ir + (or - ir) * 0.5;
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
    css: `${polarLabelCssPrefix}inner-x${factor}`,
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
    css: `${polarLabelCssPrefix}inner-${adjust}`,
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
    css: `${polarLabelCssPrefix}outer-x${factor}`,
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
    css: `${polarLabelCssPrefix}outer-${adjust}`,
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

// TODO: Add `css` to all rotations
export function polarLabelRotateTangentOrigin(d) {
  const datum = getDatum(d);
  const angle = ((datum.endAngle - datum.startAngle) / 2 + datum.startAngle);

  return angle;
}

export function polarLabelRotateTangentFlip(d) {
  const datum = getDatum(d);
  let angle = ((datum.endAngle - datum.startAngle) / 2 + datum.startAngle);

  const absAngle = Math.abs(angle);
  if (absAngle > HALF_PI && absAngle <= 3 * HALF_PI) {
    angle -= PI;
  }

  return angle;
}

export function polarLabelRotateRay(d) {
  const datum = getDatum(d);
  const angle = ((datum.endAngle - d.startAngle) / 2 + datum.startAngle) - HALF_PI;

  return angle;
}

export function polarLabelRotateRayOpposite(d) {
  const datum = getDatum(d);
  const angle = ((datum.endAngle - d.startAngle) / 2 + datum.startAngle) - HALF_PI - PI;

  return angle;
}

export function polarLabelRotateRayFlip(d) {
  const datum = getDatum(d);
  const angle = ((datum.endAngle - datum.startAngle) / 2 + datum.startAngle);

  if ((angle <= 0 && angle >= -PI) || angle > PI) { // Right side of circle
    return angle + HALF_PI;
  }
  else if ((angle > 0 && angle <= PI) || angle < -PI) { // Left side of circle
    return angle - HALF_PI;
  }

  return angle;
}

function getDatum(d) {
  return (isNumeric(+d)) ? { startAngle: d, endAngle: d } : d;
}
