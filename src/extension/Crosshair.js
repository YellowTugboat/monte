import { AXIS_SHIFT, EXIT, UPDATE } from '../const/d3';
import { INTERACTION_HIDE_EVENTS, INTERACTION_SHOW_EVENTS } from '../const/events';
import { isArray, isDefined, isFunc } from '../tools/is';
import { Extension } from './Extension';
import { noop } from '../tools/noop';

// TODO: Add support for "always active" (i.e chart:mousemove)
const CROSSHAIR_DEFAULTS = {
  featurePrefix: 'point',
  eventPrefix: 'crosshair',
  crosshairCss: '',
  lines: ['bottom', 'left'],
  alignmentShift: AXIS_SHIFT, // Use a slight shift to match default d3-axis drawing.
  showBindings: INTERACTION_SHOW_EVENTS,
  hideBindings: INTERACTION_HIDE_EVENTS,
  topCustomize: noop,
  leftCustomize: noop,
  rightCustomize: noop,
  bottomCustomize: noop,
};

// Draws lines connecting a chart feature to axes and/or chart edges.
export class Crosshair extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, CROSSHAIR_DEFAULTS);

    const showBindings = this.tryInvoke(this.opts.showBindings);
    const hideBindings = this.tryInvoke(this.opts.hideBindings);
    let featurePrefix = this.tryInvoke(this.opts.featurePrefix);
    if (!isArray(featurePrefix)) { featurePrefix = [featurePrefix]; }

    this.showEvents = [];
    this.hideEvents = [];

    featurePrefix.forEach((fp) => {
      showBindings.forEach((ev) => {
        const fev = Extension.featureEventName(fp, ev);
        this.opts.binding.push(fev);
        this.showEvents.push(fev);
      });

      hideBindings.forEach((ev) => {
        const fev = Extension.featureEventName(fp, ev);
        this.opts.binding.push(fev);
        this.hideEvents.push(fev);
      });
    });
  }

  _update(...args) {
    const ext = this;
    const css = this.tryInvoke(this.opts.crosshairCss);
    const linesToDraw = this.tryInvoke(this.opts.lines);
    const lines = this._extCreateSelection().data(linesToDraw).order();
    const shift = this.tryInvoke(this.opts.alignmentShift);
    const coords = {
      top: {
        x1: (d) => this.chart.getScaledProp('x', d) + shift,
        y1: 0,
        x2: (d) => this.chart.getScaledProp('x', d) + shift,
        y2: (d) => this.chart.getScaledProp('y', d),
      },

      left: {
        x1: 0,
        y1: (d) => this.chart.getScaledProp('y', d) + shift,
        x2: (d) => this.chart.getScaledProp('x', d),
        y2: (d) => this.chart.getScaledProp('y', d) + shift,
      },

      right: {
        x1: (d) => this.chart.getScaledProp('x', d),
        y1: (d) => this.chart.getScaledProp('y', d) + shift,
        x2: this.chart.width,
        y2: (d) => this.chart.getScaledProp('y', d) + shift,
      },

      bottom: {
        x1: (d) => this.chart.getScaledProp('x', d) + shift,
        y1: (d) => this.chart.getScaledProp('y', d),
        x2: (d) => this.chart.getScaledProp('x', d) + shift,
        y2: this.chart.height,
      },
    };

    if (this.lastUpdateEvent === 'updated') {
      lines.enter().append('line')
          .call(this._setExtAttrs.bind(this))
          .attr('opacity', 0)
          .attr('class', css)
          .classed('monte-ext-crosshair', true);

      if (this.activeFeatureDatum) {
        lines.transition()
          .call(this.chart._transitionSetup('extCrosshair', UPDATE))
          .each(setLinePoints);
      }

      lines.exit()
        .transition()
          .call(this.chart._transitionSetup('extCrosshair', EXIT))
          .attr('opacity', 0)
          .remove();
    }
    else if (this.isShowEvent(this.lastUpdateEvent)) {
      const featureDatum = args[0];
      this.activeFeatureDatum = featureDatum;

      lines.interrupt()
        .attr('opacity', 1)
        .each(setLinePoints);
    }
    else if (this.isHideEvent(this.lastUpdateEvent)) {
      this.activeFeatureDatum = null;
      lines.interrupt().attr('opacity', 0);
    }

    // Function is invoked in the `d3.each` context (i.e. `this` is the current element)
    function setLinePoints(d) {
      const node = d3.select(this);
      const customize = ext.opts[d + 'Customize'];
      let points = {
        x1: ext.tryInvoke(coords[d].x1, ext.activeFeatureDatum),
        y1: ext.tryInvoke(coords[d].y1, ext.activeFeatureDatum),
        x2: ext.tryInvoke(coords[d].x2, ext.activeFeatureDatum),
        y2: ext.tryInvoke(coords[d].y2, ext.activeFeatureDatum),
      };

      if (isDefined(customize) && isFunc(customize) && customize !== noop) {
        points = ext.tryInvoke(customize, points);
      }

      node.attr('x1', points.x1)
        .attr('y1', points.y1)
        .attr('x2', points.x2)
        .attr('y2', points.y2);
    }
  }

  isShowEvent(event) {
    return this.showEvents.indexOf(event) > -1;
  }

  isHideEvent(event) {
    return this.hideEvents.indexOf(event) > -1;
  }
}
