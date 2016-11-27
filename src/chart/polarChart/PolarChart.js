import { Chart } from '../Chart';

// Serves as the base chart for charts using polar coordinates (pie, donut, guage, etc...)
export class PolarChart extends Chart {
  _getLayerTranslate() {
    let l;
    let t;

    if (this.opts.origin) {
      l = this.tryInvoke(this.opts.origin.left, this);
      t = this.tryInvoke(this.opts.origin.top, this);
    }
    else {
      l = this.width / 2 + this.margin.left;
      t = this.height / 2 + this.margin.top;
    }

    return `translate(${l}, ${t})`;
  }
}
