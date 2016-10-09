import { PolarChart } from './PolarChart';
import { commonEventNames } from '../../tools/commonEventNames';
import { noop } from '../../tools/noop';
import { tau } from '../../const/math';

const ARC_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart',

  cornerRadius: 0,
  innerRadius: 0,
  outerRadius: (width, height) => {
    const wr = width / 2;
    const hr = height / 2;
    return wr < hr ? wr : hr; // Constrain to smallest draw-area dimension
  },

  arcCustomize: null,
  arcCss: 'arc',
  arcWedgeCss: 'wedge',
  arcWedgeCssScale: noop,
  arcWedgeFillScale: noop,
  arcWedgeStrokeScale: noop,

  arcWedgeEnter: (d) => ({
    startAngle: d.endAngle,
    endAngle: d.endAngle,
    value: d.value,
    padAngle: d.padAngle,
    index: d.index,
  }),

  // Background css and fill scales.
  arcBgWedgeCssScale: noop,
  arcBgWedgeFillScale: noop,

  itemValueProp: 'value',
  pieStartAngle: 0,
  pieEndAngle: tau,
  piePadAngle: 0.02,
};

export class ArcChart extends PolarChart {
  _initOptions(...options) {
    super._initOptions(...options, ARC_CHART_DEFAULTS);
  }

  _initCore() {
    super._initCore();

    // Initialize the arc generator
    this.arc = d3.arc()
      .innerRadius(this.opts.innerRadius)
      .cornerRadius(this.opts.cornerRadius);

    this.pie = d3.pie().value((d) => d[this.opts.itemValueProp])
      .sortValues(null)
      .startAngle(this.opts.pieStartAngle)
      .endAngle(this.opts.pieEndAngle)
      .padAngle(this.opts.piePadAngle);
  }

  _initCustomize() {
    super._initCustomize();
    if (this.opts.arcCustomize) { this.opts.arcCustomize(this.arc); }
    if (this.opts.pieCustomize) { this.opts.pieCustomize(this.pie); }
  }

  _initPublicEvents(...events) {
    super._initPublicEvents(...events,
      ...commonEventNames('wedge')   // Wedge events
    );
  }

  _updateBounds() {
    super._updateBounds();

    this.arc.outerRadius(this.optInvoke(this.opts.outerRadius, this.width, this.height));
  }

  _data(data) {
    this.pieDisplayData = this.pie(data);
    super._data(data);
  }

  _update() {
    this._updateArcs();
    this._updateBackground();
  }

  _updateArcs() {
    const arcs = this.draw.selectAll('.monte-arc').data(this.pieDisplayData);
    const arc = this.arc;

    arcs.enter().append('g')
        .attr('class', `monte-arc ${this.opts.arcCss}`)
        .append('path')
          .attr('class', (d, i) => this._buildCss(['monte-arc-wedge',
              this.opts.arcWedgeCss,
              this.opts.arcWedgeCssScale,
              d.data.css], d, i))
          .call(this.__bindCommonEvents('wedge'))
          .transition()
            .delay(this.opts.transitionDuration)
            .duration(this.opts.transitionDuration)
            .attrTween('d', (d) => {
              const start = this.optInvoke(this.opts.arcWedgeEnter, d);
              return arcTween(arc, start, d);
            })
            .attr('fill', (d, i) => this.opts.arcWedgeFillScale(d.id || i));

    arcs.selectAll('.monte-arc-wedge')
        .each(function() {
          // Sync data to containing element since it is not done automatically.
          const pd = d3.select(this.parentElement).datum();
          const n = d3.select(this);
          const nd = n.datum();
          pd.prev = nd;
          n.datum(pd);

          delete nd.prev; // Remove old records to prevent building a history tree.
        })
        .attr('class', (d, i) =>
          ['monte-arc-wedge',
           this.opts.arcWedgeCss,
           this.opts.arcWedgeCssScale(d.id || i),
           d.data.css].join(' '))
        .transition()
          .delay(this.opts.transitionDuration)
          .duration(this.opts.transitionDuration)
          .attrTween('d', function(d) {
            return arcTween(arc, d.prev, d);
          })
          .attr('fill', (d, i) => this.opts.arcWedgeFillScale(d.id || i));

    arcs.exit()
      .transition()
        .duration(this.opts.transitionDuration)
        .style('opacity', 0.01)
        .remove();
  }

  _updateBackground() {
    const pieSum = this.displayData.reduce((accum, cur) => accum + cur.value, 0);
    const bgArc = this.arc({
      index: 0,
      startAngle: this.opts.pieStartAngle,
      endAngle: this.opts.pieEndAngle,
      value: pieSum,
    });
    const wedge = this.bg.selectAll('.monte-wedge-bg').data([bgArc]);

    wedge.enter()
        .append('path')
      .merge(wedge)
        .attr('d', (d) => d)
        .attr('fill', () => this.opts.arcBgWedgeFillScale())
        .attr('class', () =>
           ['monte-wedge-bg',
            this.opts.arcBgWedgeCssScale()].join(' '));
  }
}

function arcTween(arc, from, to) {
  const i = d3.interpolate(from, to);

  return (t) => arc(i(t));
}
