import { HORIZONTAL, VERTICAL } from '../const/direction';
import { AXIS_SHIFT } from '../const/d3';
import { Extension } from './Extension';

const GRID_DEFAULTS = {
  scalePrefixes: ['x', 'y'],
  prefixCssMap: {
    'x': 'v-line',
    'y': 'h-line',
  },
  lineCss: 'monte-grid-line',
  binding: ['axisRendered'],
  x1Adjust: 0,
  x2Adjust: 0,
  y1Adjust: 0,
  y2Adjust: 0,
};

// BG Grid
export class Grid extends Extension {

  _initOptions(...options) {
    super._initOptions(...options, GRID_DEFAULTS);
  }

  _update(binding, axisTransition) {
    const axesChart = this.chart;

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

        const ticks = this.layer.selectAll(`.${css}`).data(values/* , scale */).order();

        this._updateTicks(ticks, axisTransition, {
          axesChart, axis, axisTransition, css, orient, scale, scaleName,
          lineCss: this.option('lineCss'),
        });
      }
    });
  }

  _updateTicks(ticks, axisTransition, cfg) {
    const fullCss = [cfg.lineCss, cfg.css].join(' ');
    const x1 = this.optInvoke(this.opts.x1Adjust);
    const x2 = this.optInvoke(this.opts.x2Adjust);
    const y1 = this.optInvoke(this.opts.y1Adjust);
    const y2 = this.optInvoke(this.opts.y2Adjust);

    if (cfg.orient === HORIZONTAL) {
      ticks.enter().append('line')
        .attr('class', fullCss)
        .attr('x1', 0 + x1)
        .attr('y1', AXIS_SHIFT + y1)
        .attr('x2', cfg.axesChart.width + x2)
        .attr('y2', AXIS_SHIFT + y2)
        .attr('transform', (d) => 'translate(0,' + cfg.scale(d) + ')');

      ticks.transition(axisTransition)
        .attr('x2', () => cfg.axesChart.width + x2)
        .attr('transform', (d) => 'translate(0,' + cfg.scale(d) + ')');
    }
    else if (cfg.orient === VERTICAL) {
      ticks.enter().append('line')
        .attr('class', fullCss)
        .attr('x1', AXIS_SHIFT + x1)
        .attr('y1', 0 + y1)
        .attr('x2', AXIS_SHIFT + x2)
        .attr('y2', cfg.axesChart.height + y2)
        .attr('transform', (d) => 'translate(' + cfg.scale(d) + ', 0)');

      ticks.transition(axisTransition)
        .attr('y2', () => cfg.axesChart.height + y2)
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
