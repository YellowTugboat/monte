import { ENTER, UPDATE } from '../const/d3';
import { HORIZONTAL, VERTICAL } from '../const/direction';
import { AXIS_SHIFT } from '../const/d3';
import { Extension } from './Extension';
import { MonteOptionError } from '../support/MonteOptionError';
import { ReplacePreceding } from '../tools/mergeOptions';
import { isDefined } from '../tools/is';

const GRID_DEFAULTS = {
  eventPrefix: 'grid',
  scalePrefixes: ['x', 'y'],
  axisLayer: 'support',
  prefixCssMap: {
    'x': 'v-line',
    'y': 'h-line',
  },
  lineCss: 'monte-ext-grid-line',
  binding: new ReplacePreceding(['axisRendered']),
  x1Adjust: 0,
  x2Adjust: 0,
  y1Adjust: 0,
  y2Adjust: 0,

  // Draw vertical lines for X, and horziontal for Y
  orient: function(scaleName) {
    if (scaleName.charAt(0) === 'x') {
      return VERTICAL;
    }
    else if (scaleName.charAt(0) === 'y') {
      return HORIZONTAL;
    }

    throw new MonteOptionError(`Unknown grid direction for scale ${scaleName}`);
  },
};

// BG Grid
export class Grid extends Extension {

  _initOptions(...options) {
    super._initOptions(...options, GRID_DEFAULTS);
  }

  _update(scaleName, axis, axisTransition) {
    const axesChart = this.chart;

    // Set transition defaults if `axisTransition` is undefined or null.
    if (!isDefined(axisTransition)) {
      const action = this.chart.hasRendered ? UPDATE : ENTER;
      const axisLayerName = this.tryInvoke(this.opts.axisLayer);
      const axisLayer = this.chart[axisLayerName];
      axisTransition = axisLayer.transition().call(this.chart._transitionSetup('axis', action));
    }

    const prefixCssMap = this.tryInvoke(this.opts.prefixCssMap);

    // Draw all axis
    axesChart.forEachAxisScale((scaleName) => {
      if (!prefixCssMap[scaleName]) { return; }

      const css = this.getCss(scaleName, prefixCssMap);
      const scale = axesChart[scaleName];
      const axis = axesChart[scaleName + 'Axis'];
      const orient = this.tryInvoke(this.opts.orient, scaleName);

      if (css && scale && axis) {
        // Next three lines match internal workings of the D3 Axis object.
        const tickValues = axis.tickValues();
        const tickArguments = axis.tickArguments();
        const values = tickValues == null ?
          (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) :
          tickValues;

        const ticks = this._extCreateSelection(css).data(values, (d) => d);

        this._updateTicks(ticks, axisTransition, {
          axesChart, axis, axisTransition, css, orient, scale, scaleName,
          lineCss: this.option('lineCss'),
        });
      }
    });
  }

  _updateTicks(ticks, axisTransition, cfg) {
    const fullCss = [cfg.lineCss, cfg.css].join(' ');
    const x1 = this.tryInvoke(this.opts.x1Adjust);
    const x2 = this.tryInvoke(this.opts.x2Adjust);
    const y1 = this.tryInvoke(this.opts.y1Adjust);
    const y2 = this.tryInvoke(this.opts.y2Adjust);

    if (cfg.orient === HORIZONTAL) {
      ticks.enter().append('line')
        .call(this._setExtAttrs.bind(this))
        .attr('class', fullCss)
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('x1', 0 + x1)
        .attr('x2', cfg.axesChart.width + x2)
        .attr('y1', AXIS_SHIFT + y1)
        .attr('y2', AXIS_SHIFT + y2)
        .attr('transform', (d) => 'translate(0,' + cfg.scale(d) + ')')
        .style('opacity', 0)
        .transition(axisTransition)
          .style('opacity', 1);

      ticks.transition(axisTransition)
        .attr('x1', () => 0 + x1)
        .attr('x2', () => cfg.axesChart.width + x2)
        .attr('transform', (d) => 'translate(0,' + cfg.scale(d) + ')')
        .style('opacity', 1);
    }
    else if (cfg.orient === VERTICAL) {
      ticks.enter().append('line')
        .call(this._setExtAttrs.bind(this))
        .attr('class', fullCss)
        .attr('x1', AXIS_SHIFT + x1)
        .attr('x2', AXIS_SHIFT + x2)
        .attr('y1', 0 + y1)
        .attr('y2', cfg.axesChart.height + y2)
        .attr('transform', (d) => 'translate(' + cfg.scale(d) + ', 0)')
        .style('opacity', 0)
        .transition(axisTransition)
          .style('opacity', 1);

      ticks.transition(axisTransition)
        .attr('y1', () => 0 + y1)
        .attr('y2', () => cfg.axesChart.height + y2)
        .attr('transform', (d) => 'translate(' + cfg.scale(d) + ', 0)')
        .style('opacity', 1);
    }

    ticks.exit()
      .transition(axisTransition)
      .style('opacity', 0)
      .remove();
  }

  getCss(scaleName, prefixCssMap) {
    for (let prefix in prefixCssMap) {
      if (this.opts.prefixCssMap.hasOwnProperty(prefix)) {
        const hasPrefix = scaleName.substr(0, prefix.length) === prefix;

        if (hasPrefix) {
          return this.tryInvoke(this.opts.prefixCssMap[prefix]);
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
