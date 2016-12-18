import { combineTransforms, readTransforms } from '../tools/transform';
import { Extension } from './Extension';
import { polarLabelRotateTangentFlip } from '../util/polarLabelRotations';
import { radiansToDegrees } from '../util/polar';

const POLAR_ROTATE_LABEL_DEFAULTS = {
  layer: 'draw',
  eventPrefix: 'polarRotateLabel',
  labelCss: 'monte-arc-label',
  rotation: polarLabelRotateTangentFlip,
};

export class PolarRotateLabel extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, POLAR_ROTATE_LABEL_DEFAULTS);
  }

  _update() {
    const css = this.tryInvoke(this.opts.labelCss);
    const labels = this.layer.selectAll(`.${css}`);

    labels.attr('transform', (d, i, nodes) => {
      const nodeSel = d3.select(nodes[i]);
      const rotate = radiansToDegrees(this.tryInvoke(this.opts.rotation, d, i, nodes));
      const currentTransforms = readTransforms(nodeSel.attr('transform'));
      currentTransforms.rotate = [rotate]; // Replace existing if it's there; otherwise add it.

      return combineTransforms(currentTransforms);
    });
  }
}
