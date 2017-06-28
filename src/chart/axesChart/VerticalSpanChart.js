import { ENTER, EXIT, UPDATE } from '../../const/d3';
import { AxesChart } from './AxesChart';
import { commonEventNames } from '../../tools/commonEventNames';
import { defaultDataKey } from '../Chart';
import { extentBalanced } from '../../util/extents';
import { kebabCase } from '../../tools/string';
import { noop } from '../../tools/noop';
import { resetScaleDomain } from '../../tools/resetScaleDomain';

const EVENT_UPDATING_LABELS = 'updatingLabels';
const EVENT_UPDATED_LABELS = 'updatedLabels';

const EVENTS = [
  EVENT_UPDATING_LABELS, EVENT_UPDATED_LABELS,
];

const CAT = 'cat';
const SPAN = 'span';
const LABEL = 'label';

const SPAN_CHART_DEFAULTS = {
  chartCss: 'monte-vertical-span-chart',

  margin: {
    top: 0,
    right: 0,
    bottom: 30,
    left: 40,
  },

  spanCssScale: noop,
  spanCssScaleAccessor: AxesChart.generateScaleAccessor('spanCssScale', 'x'),

  spanFillScale: noop,
  spanFillScaleAccessor: AxesChart.generateScaleAccessor('spanFillScale', 'x'),

  // Static CSS class(es) to apply to every line.
  spanCss: 'span',
  spanGrpCss: noop,

  xProp: 'id',
  valuesProp: 'values',
  y1Prop: 'startValue',
  y2Prop: 'endValue',

  xScale: function() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  yDomainCustomize: extentBalanced,

  includeLabels: false, // false = neither, true = both, otherwise: 'start' or 'end' for one.

  // TODO: Adopt label placement like arc charts?
  labelStartProp: 'startValue',
  labelStartFillScale: noop,
  labelStartFillScaleAccessor: AxesChart.generateScaleAccessor('labelStartFillScale', 'labelStart'),
  labelStart: function(d) {
    return this.getProp('labelStart', d);
  },
  labelStartXAdjust: '',
  labelStartX: function(d, i, node, catDatum) {
    return this._spanX(catDatum, d) + this.x.bandwidth() / 2;
  },
  labelStartYAdjustProp: 'y2',
  labelStartYAdjust: function(d) {
    const value = this.getProp('y2', d);

    return value > 0 ?
      '-0.05em' :
      '1.05em';
  },
  labelStartY: function(d, i, node, catDatum) {
    const value = this.getProp('y2', d);

    return value > 0 ?
      this._spanY(catDatum, d) + this._spanHeight(catDatum, d) :
      this._spanY(catDatum, d);
  },

  labelEndProp: 'endValue',
  labelEndFillScale: noop,
  labelEndFillScaleAccessor: AxesChart.generateScaleAccessor('labelEndFillScale', 'labelEnd'),
  labelEnd: function(d) {
    return this.getProp('labelEnd', d);
  },
  labelEndXAdjust: '',
  labelEndX: function(d, i, node, catDatum) {
    return this._spanX(catDatum, d) + this.x.bandwidth() / 2;
  },
  labelEndYAdjustProp: 'y2',
  labelEndYAdjust: function(d) {
    const value = this.getProp('y2', d);

    return value > 0 ?
      '-0.05em' :
      '1.05em';
  },
  labelEndY: function(d, i, node, catDatum) {
    const value = this.getProp('y2', d);

    return value > 0 ?
      this._spanY(catDatum, d) :
      this._spanY(catDatum, d) + this._spanHeight(catDatum, d);
  },

  innerDataKey: defaultDataKey,

  transition: {
    [CAT]: {
      duration: 0,
      delay: 0,
    },
  },
};

export class VerticalSpanChart extends AxesChart {
  _initOptions(...options) {
    super._initOptions(...options, SPAN_CHART_DEFAULTS);
  }

  _initPublicEvents(...events) {
    super._initPublicEvents(...events,
      ...commonEventNames(SPAN),   // Span events
      ...EVENTS
    );
  }

  _domainExtent(data, scaleName) {
    let extent = null;

    if (scaleName === 'y') {
      const y1Values = [];
      const y2Values = [];

      data.forEach((d) => this.getProp('values', d).forEach((v) => {
        y1Values.push(this.getProp('y1', v));
        y2Values.push(this.getProp('y2', v));
      }));

      extent = d3.extent([
        d3.min(y1Values),
        d3.min(y1Values),
        d3.max(y2Values),
        d3.max(y2Values),
      ]);
    }
    else if (scaleName === 'x') {
      extent = data.map((d) => this.getProp('x', d));
    }

    return extent;
  }

  _resetStyleDomains() {
    super._resetStyleDomains();

    resetScaleDomain(this.opts.spanCssScale);
    resetScaleDomain(this.opts.spanFillScale);
    resetScaleDomain(this.opts.labelFillScale);
  }

  // Render the vis.
  _update() {
    const self = this;
    const spanCats = this.draw.selectAll('.monte-span-cat')
      .data(this.displayData, this.opts.dataKey);

    const doUpdate = (d, i, nodes) => {
      const catSel = d3.select(nodes[i]);
      self._updateSpans(catSel, d);

      if (this.opts.includeLabels) {
        this.emit(EVENT_UPDATING_LABELS);

        catSel.selectAll('.monte-span-grp').each((d, i, nodes) => {
          const node = d3.select(nodes[i]);

          if (this.opts.includeLabels === true || this.opts.includeLabels === 'start') {
            this._updateSpanLabel(node, d, i, nodes, 'labelStart');
          }

          if (this.opts.includeLabels === true || this.opts.includeLabels === 'end') {
            this._updateSpanLabel(node, d, i, nodes, 'labelEnd');
          }
        });

        this.emit(EVENT_UPDATED_LABELS);
      }
    };

    // Create new groupings
    spanCats.enter().append('g')
      .attr('class', (d, i) => this._buildCss([
        'monte-span-cat',
        this.opts.spanGrpCss], d, i))
      .call((sel) => this.fnInvoke(this.opts.catEnterSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(CAT, ENTER))
        .call((t) => this.fnInvoke(this.opts.catEnterTransitionCustomize, t))
        .each(function(d, i, nodes) {
          if (d3.active(this)) {
            d3.active(this).on('end', doUpdate);
          }
          else {
            doUpdate(d, i, nodes);
          }
        });

    // Update
    spanCats.each(doUpdate);

    // Remove a grouping
    spanCats.exit()
    .call((sel) => this.fnInvoke(this.opts.catExitSelectionCustomize, sel))
    .transition()
      .call(this._transitionSetup(CAT, EXIT))
      .call((t) => this.fnInvoke(this.opts.catExitTransitionCustomize, t))
      // TODO: Calculate value or sync events?
    .remove();

    return spanCats.merge(spanCats.enter().selectAll('.monte-span-cat'));
  }

  _updateSpans(spanCat, catDatum) {
    const values = this.getProp('values', catDatum);
    const spanGrps = spanCat.selectAll('.monte-span-grp').data(values);

    const spanX = this._spanX.bind(this, catDatum);
    const spanY = this._spanY.bind(this, catDatum);
    const spanWidth = this._spanWidth.bind(this, catDatum);
    const spanHeight = this._spanHeight.bind(this, catDatum);

    // Create new span groups
    spanGrps.enter().append('g')
      .attr('class', (d, i) => this._buildCss([
        'monte-span-grp',
        this.opts.spanGrpCss], d, i))
      .append('rect')
        .call(this.__bindCommonEvents(SPAN))
        .style('opacity', 0)
        .attr('x', spanX)
        .attr('y', spanY)
        .attr('width', spanWidth)
        .attr('height', spanHeight)
        .style('fill', this.optionReaderFunc('spanFillScaleAccessor'))
        .attr('class', (d, i) => this._buildCss([
          'monte-span',
          this.opts.spanCss,
          this.opts.spanCssScaleAccessor,
          d.css], d, i))
        .call((sel) => this.fnInvoke(this.opts.spanEnterSelectionCustomize, sel))
        .transition()
          .call(this._transitionSetup(SPAN, ENTER))
          .style('opacity', 1)
          .attr('x', spanX)
          .attr('y', spanY)
          .attr('width', spanWidth)
          .attr('height', spanHeight)
          .call((t) => this.fnInvoke(this.opts.spanEnterTransitionCustomize, t));

    // Update existing span groups
    spanGrps
      .attr('class', (d, i) => this._buildCss([
        'monte-span-grp',
        this.opts.spanGrpCss], d, i))
      .select('rect')
        .style('fill', this.optionReaderFunc('spanFillScaleAccessor'))
        .attr('class', (d, i) => this._buildCss([
          'monte-span',
          this.opts.spanCss,
          this.opts.spanCssScaleAccessor,
          d.css], d, i))
        .call((sel) => this.fnInvoke(this.opts.spanUpdateSelectionCustomize, sel))
        .transition()
          .call(this._transitionSetup(SPAN, UPDATE))
          .attr('x', spanX)
          .attr('y', spanY)
          .attr('width', spanWidth)
          .attr('height', spanHeight)
          .style('opacity', 1)
          .call((t) => this.fnInvoke(this.opts.spanUpdateTransitionCustomize, t));

    // Fade out removed lines.
    spanGrps.exit()
      .call((sel) => this.fnInvoke(this.opts.spanExitSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(SPAN, EXIT))
        .style('opacity', 0)
        .call((t) => this.fnInvoke(this.opts.spanExitTransitionCustomize, t))
      .remove();

    // Here the order is important. Merging the line groups when only an update occurs results in an
    // empty selection if the command was lineGrps.enter().selectAll('.grp-line').merge(lineGrps);
    return spanGrps.merge(spanGrps.enter().selectAll('.monte-span-grp'));
  }

  _updateSpanLabel(spanGrp, d, i, nodes, labelSet) {
    const labelSetCss = kebabCase(labelSet);
    const lbl = spanGrp.selectAll(`.monte-span-label.${labelSetCss}`).data([d]);
    const catDatum = d3.select(spanGrp.node().parentNode).datum();

    lbl.enter().append('text')
      .attr('class', 'monte-span-label')
      .classed(labelSetCss, true)
      .style('opacity', 0)
      .style('fill', (d1) => this.tryInvoke(this.opts[`${labelSet}FillScaleAccessor`], d1, i, nodes, catDatum))
      .attr('x', (d1) => this.tryInvoke(this.opts[`${labelSet}X`], d1, i, nodes, catDatum))
      .attr('dx', (d1) => this.tryInvoke(this.opts[`${labelSet}XAdjust`], d1, i, nodes, catDatum))
      .attr('y', (d1) => this.tryInvoke(this.opts[`${labelSet}Y`], d1, i, nodes, catDatum))
      .attr('dy', (d1) => this.tryInvoke(this.opts[`${labelSet}YAdjust`], d1, i, nodes, catDatum))
      .text((d1) => this.tryInvoke(this.opts[labelSet], d1, i, nodes, catDatum))
      .call((sel) => this.fnInvoke(this.opts[`${labelSet}EnterSelectionCustomize`], sel))
      .transition()
        .call((t) => {
          const ts = this._transitionSettings(LABEL, ENTER);
          this._transitionConfigure(t, ts, d, i, nodes);
        })
        .style('opacity', 1)
        .call((t) => this.fnInvoke(this.opts[`${labelSet}EnterTransitionCustomize`], t));

    lbl.style('fill', (d1) => this.tryInvoke(this.opts[`${labelSet}FillScaleAccessor`], d1, i, nodes, catDatum))
      .attr('x', (d1) => this.tryInvoke(this.opts[`${labelSet}X`], d1, i, nodes, catDatum))
      .attr('dx', (d1) => this.tryInvoke(this.opts[`${labelSet}XAdjust`], d1, i, nodes, catDatum))
      .attr('y', (d1) => this.tryInvoke(this.opts[`${labelSet}Y`], d1, i, nodes, catDatum))
      .attr('dy', (d1) => this.tryInvoke(this.opts[`${labelSet}YAdjust`], d1, i, nodes, catDatum))
      .text((d1) => this.tryInvoke(this.opts[labelSet], d1, i, nodes, catDatum))
      .call((sel) => this.fnInvoke(this.opts[`${labelSet}UpdateSelectionCustomize`], sel))
      .transition()
        .call((t) => {
          const ts = this._transitionSettings(LABEL, UPDATE);
          this._transitionConfigure(t, ts, d, i, nodes);
        })
        .style('opacity', 1)
        .call((t) => this.fnInvoke(this.opts[`${labelSet}UpdateTransitionCustomize`], t));

    lbl.exit()
      .call((sel) => this.fnInvoke(this.opts[`${labelSet}ExitSelectionCustomize`], sel))
      .transition()
        .call(this._transitionSetup(LABEL, EXIT))
        .call((t) => this.fnInvoke(this.opts[`${labelSet}ExitTransitionCustomize`], t))
      .remove();
  }

  _spanX(catDatum) { return this.getScaledProp('x', catDatum); }
  _spanWidth() { return this.x.bandwidth(); }
  _spanY(catDatum, d) { return this.getScaledProp('y', 'y2', d); }
  _spanHeight(catDatum, d) { return this.getScaledProp('y', 'y1', d) - this.getScaledProp('y', 'y2', d); }
}

VerticalSpanChart.EVENTS = EVENTS;
