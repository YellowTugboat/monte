import { combineTransforms, readTransforms } from '../tools/transform';
import { isDefined, isFunc } from '../tools/is';
import { Extension } from './Extension';
import { ReplacePreceding } from '../tools/mergeOptions';
import { noop } from '../tools';

// TODO: Add support for angle units? DEG, RAD, etc...
const AXIS_TICK_TRANSFORM_DEFAULTS = {
  binding: new ReplacePreceding(['axisRendered']),
  layer: 'support',
  eventPrefix: 'axisRotateLabel',
  axis: 'x',
  rotation: 45, // The rotation amount in degrees (SVG default units)
  translate: function(d, i, nodes, axis) {
    if (axis.substring(0, 1) === 'y') {
      return [0, 10];
    }

    return [10, 0];
  },
  transformCustomize: noop,
};

export class AxisTickTransform extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, AXIS_TICK_TRANSFORM_DEFAULTS);
  }

  _update(scaleName) {
    const ext = this;
    const axis = this.tryInvoke(this.opts.axis);

    if (axis === scaleName) {
      const ticks = this.layer.selectAll(`.${axis}-axis.axis .tick text`);

      ticks.attr('transform', function(d, i, nodes) {
        let currentTransforms = readTransforms(this.getAttribute('transform'));

        const rotate = ext.tryInvoke(ext.opts.rotation, d, i, nodes, axis);
        if (isDefined(rotate)) { currentTransforms.rotate = [rotate]; }

        const translate = ext.tryInvoke(ext.opts.translate, d, i, nodes, axis);
        if (isDefined(translate)) { currentTransforms.translate = [translate]; }

        if (ext.opts.transformCustomize && isFunc(ext.opts.transformCustomize) &&
          ext.opts.transformCustomize !== noop) {
          currentTransforms = ext.opts.transformCustomize(currentTransforms);
        }

        return combineTransforms(currentTransforms);
      });
    }
  }
}
