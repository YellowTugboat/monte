import { halfPi, pi } from '../../const/math';
import { Chart } from '../Chart';

// Serves as the base chart for charts using polar coordinates (pie, donut, guage, etc...)
// Adds utility common utility functions such as:
// * placement on an arc given an angle and radius, (cos(a) * r, sin(a) * r)
//
// * conversion between Radians (rad) and Degrees (deg)
//    -- Also add support for CSS values like `turn` and `grad` (gradians)???
//
// * constants for angles:
//    -- Common (quarters / cardinal):
//        North/Top (0), West/Left (-1/2 PI), East/Right (1/2 PI), South/Bottom (PI)
//
//    -- Intermediates (eights / ordinal / intercardinal) (i.e. cardinal bisects):
//        Northwest/TopLeft (-1/4 PI), etc...
//
//    [Note: The top eight points collectively are called the principal (or main) winds]
//
//    -- Tertiary (sixteenths / half-winds):
//        NNE (North-northeast) (1/8 PI), etc...

export class PolarChart extends Chart {
  _getLayerTranslate() {
    let l;
    let t;

    if (this.opts.origin) {
      l = this.optInvoke(this.opts.origin.left, this);
      t = this.optInvoke(this.opts.origin.top, this);
    }
    else {
      l = this.width / 2 + this.margin.left;
      t = this.height / 2 + this.margin.top;
    }

    return `translate(${l}, ${t})`;
  }

  static getCoord(radius, angle) {
    // In d3-shape the arc `centroid` function uses a 1/2 PI adjustment. We repeat that here for
    // coordinate consistency.
    const a = angle - halfPi;
    return [Math.cos(a) * radius, Math.sin(a) * radius];
  }
  static degreesToRadians(deg) { return deg * (pi / 180); } // radians = degrees * (pi/180)
  static radiansToDegrees(rad) { return rad * (180 / pi); } // degrees = radians * (180/pi)
}
