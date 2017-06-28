import { combineTransforms, readTransforms } from '../tools/transform';
import { isDefined, isFunc } from '../tools/is';
import { Extension } from './Extension';
import { ReplacePreceding } from '../tools/mergeOptions';
import { noop } from '../tools';

// TODO: Add support for angle units? DEG, RAD, etc...
// TODO: Add text anchors
const AXIS_TICK_TRANSFORM_DEFAULTS = {
  binding: new ReplacePreceding(['axisRendered']),
  layer: 'support',
  eventPrefix: 'axisrotatelabel',
  axis: 'x',
  rotate: 45, // The rotation amount in degrees (SVG default units)
  textAnchor: '',
  x: function(d, i, nodes, axis) {
    if (axis.substring(0, 1) === 'y') {
      return 0;
    }

    return 10;
  },
  y: function(d, i, nodes, axis) {
    if (axis.substring(0, 1) === 'y') {
      return 10;
    }

    return 0;
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

      if (ext.opts.textAnchor) {
        ticks.style('text-anchor', function(d, i, nodes) {
          return ext.tryInvoke(ext.opts.textAnchor, d, i, nodes, axis);
        });
      }

      ticks.attr('transform', function(d, i, nodes) {
        let currentTransforms = readTransforms(this.getAttribute('transform'));

        const rotate = ext.tryInvoke(ext.opts.rotate, d, i, nodes, axis);
        if (isDefined(rotate)) { currentTransforms.rotate = [rotate]; }

        const x = ext.tryInvoke(ext.opts.x, d, i, nodes, axis);
        const y = ext.tryInvoke(ext.opts.y, d, i, nodes, axis);
        if (isDefined(x) && isDefined(y)) { currentTransforms.translate = [x, y]; }

        if (ext.opts.transformCustomize && isFunc(ext.opts.transformCustomize) &&
          ext.opts.transformCustomize !== noop) {
          currentTransforms = ext.opts.transformCustomize(currentTransforms);
        }

        return combineTransforms(currentTransforms);
      });
    }
  }
}
