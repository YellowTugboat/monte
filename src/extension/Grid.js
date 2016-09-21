import { HORIZONTAL, VERTICAL } from '../const/direction';
import { AXIS_SHIFT } from '../const/d3';
import { Extension } from './Extension';

// import { AxesChart } from '../chart/AxesChart';
// import { readTransforms } from '../tools/transform';
// import { MonteOptionError } from '../support/MonteOptionError';
// import { mergeOptions } from '../tools/mergeOptions';

const GRID_DEFAULTS = {
  scalePrefixes: ['x', 'y'],
  prefixCssMap: {
    'x': 'v-line',
    'y': 'h-line',
  },
  lineCss: 'monte-grid-line',
  layer: 'bg',
  binding: ['axisRendered'],
};

// const HORIZONTAL = 'h';
// const VERTICAL = 'v';

// In d3-axis, there are hard coded shifts of 0.5, here the same is used for grid alignment.
// const AXIS_SHIFT = 0.5;

// BG Grid
export class Grid extends Extension {
  // constructor(...options) {
  //   // this.opts = _.defaultsDeep({}, ...options, GRID_DEFAULTS);
  //   this.opts = mergeOptions(...options, GRID_DEFAULTS);
  // }

  _initOptions(...options) {
    super._initOptions(...options, GRID_DEFAULTS);
  }

  // option(prop, value) {
  //   const currentVal = this.opts[prop];
  //
  //   if (value === undefined) { return currentVal; }
  //
  //   this.opts[prop] = value;
  //   if (prop === 'chart') {
  //     if (!(value instanceof AxesChart)) {
  //       throw new MonteOptionError('Grid backgrounds require charts extended from `AxesChart`');
  //     }
  //   }
  //   else if (prop !== 'binding') {
  //     // Clear all & redraw
  //     this.clear();
  //     this.update();
  //   }
  //
  //   return this;
  // }

  clear() {
    // TODO: Remove all elements
  }

  _update(binding, axesChart, axisTransition) {
    const layer = axesChart[this.opts.layer];

    // Draw all axis
    axesChart.forEachAxisScale((scaleName) => {
      const css = this.getCss(scaleName);
      const scale = axesChart[scaleName];
      const axis = axesChart[scaleName + 'Axis'];
      // const axisGrp = axesChart.support.select(`.${scaleName}-axis`);
      const orient = scaleName[0] === 'x' ? VERTICAL : HORIZONTAL; // Draw vertical lines for X, and horziontal for Y

      if (css && scale && axis) {
        // Next three lines match internal workings of the D3 Axis object.
        const tickValues = axis.tickValues();
        const tickArguments = axis.tickArguments();
        const values = tickValues == null ?
          (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) :
          tickValues;

        const ticks = layer.selectAll(`.${css}`).data(values/* , scale */).order();

        this._updateTicks(ticks, axisTransition, {
          axesChart, axis, axisTransition, css, orient, scale, scaleName,
          lineCss: this.option('lineCss'),
        });
      }
    });
  }

  _updateTicks(ticks, axisTransition, cfg) {
    const fullCss = [cfg.lineCss, cfg.css].join(' ');

    if (cfg.orient === HORIZONTAL) {
      ticks.enter().append('line')
        .attr('class', fullCss)
        .attr('x1', 0)
        .attr('y1', AXIS_SHIFT)
        .attr('x2', cfg.axesChart.width)
        .attr('y2', AXIS_SHIFT)
        .attr('transform', (d) => 'translate(0,' + cfg.scale(d) + ')');

      ticks.transition(axisTransition)
        .attr('x2', () => cfg.axesChart.width)
        .attr('transform', (d) => 'translate(0,' + cfg.scale(d) + ')');
    }
    else if (cfg.orient === VERTICAL) {
      ticks.enter().append('line')
        .attr('class', fullCss)
        .attr('x1', AXIS_SHIFT)
        .attr('y1', 0)
        .attr('x2', AXIS_SHIFT)
        .attr('y2', cfg.axesChart.height)
        .attr('transform', (d) => 'translate(' + cfg.scale(d) + ', 0)');

      ticks.transition(axisTransition)
        .attr('y2', () => cfg.axesChart.height)
        .attr('transform', (d) => 'translate(' + cfg.scale(d) + ', 0)');
    }

    ticks.exit().remove();
  }

  getCss(scaleName) {
    for (let prefix in this.opts.prefixCssMap) {
      if (this.opts.prefixCssMap.hasOwnProperty(prefix)) {
        const hasPrefix = scaleName.substr(0, prefix.length) === prefix;

        if (hasPrefix) {
          return this.opts.prefixCssMap[prefix];
        }
      }
    }

    return '';
  }
}

export class HorizontalLines extends Grid {
  _updateTicks(ticks, axisTransition, cfg) {
    if (cfg.orient === HORIZONTAL) {
      super._updateTicks(ticks, axisTransition, cfg);
    }
  }
}

export class VerticalLines extends Grid {
  _updateTicks(ticks, axisTransition, cfg) {
    if (cfg.orient === VERTICAL) {
      super._updateTicks(ticks, axisTransition, cfg);
    }
  }
}
