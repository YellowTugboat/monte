import { EXIT, UPDATE } from '../../const/d3';
import { AxesChart } from './AxesChart';
import { MonteError } from '../../support/MonteError';
import { commonEventNames } from '../../tools/commonEventNames';
import { noop } from '../../tools/noop';
import { resetScaleDomain } from '../../tools/resetScaleDomain';

export const ICON_MODE = {
  D3_SYMBOL: 'd3Symbol',
  SVG_USE_DEF: 'svgUseDef',
  SVG_USE_EXTERNAL: 'svgUseExternal',
};

export const ICON_PLACEMENT = {
  BottomToTopLeftToRightPlacement: {
    rowIndex: function(d, i) {
      return Math.floor(i / this.opts.columns);
    },

    columnIndex: function(d, i) {
      return i % this.opts.columns;
    },
  },

  TopToBottomLeftToRightPlacement: {
    rowIndex: function(d, i) {
      return this.opts.rows - Math.floor(i / this.opts.columns) - 1;
    },

    columnIndex: function(d, i) {
      return i % this.opts.columns;
    },
  },
};

const ICON_ARRAY_DEFAULTS = {
  chartCss: 'monte-icon-array',
  boundingWidth: 100,
  boundingHeight: 100,

  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  suppressAxes: true,

  xScale: function() {
    return d3.scalePoint().padding(0.5);
  },

  yScale: function() {
    return d3.scalePoint().padding(0.5);
  },

  iconProp: '',
  iconFillScale: noop,
  iconFillScaleAccessor: AxesChart.generateScaleAccessor('iconFillScale', 'icon'),
  iconStrokeScale: noop,
  iconStrokeScaleAccessor: AxesChart.generateScaleAccessor('iconStrokeScale', 'icon'),
  iconCssScale: noop,
  iconCssScaleAccessor: AxesChart.generateScaleAccessor('iconCssScale', 'icon'),
  iconCss: 'icon',
  iconSize: 24,
  iconSymbol: (symbol) => symbol.type(d3.symbolCircle),
  iconMode: ICON_MODE.D3_SYMBOL,
  iconDefId: 'svgIcon',
  iconSvgWidth: 24,
  iconSvgHeight: 24,
  iconHref: '',
  iconSvgSymbol: (symbol) => {
    symbol.attr('viewbox', '0 0 24 24')
      .append('path')
        .attr('d', 'm 0,0 24,24 m -24,0 24,-24');
  },

  rows: 10,
  columns: 10,

  placement: ICON_PLACEMENT.TopToBottomLeftToRightPlacement,

  svgVersion: 1, // SVG version 1 requires `xlink:href` for <use> references, but SVG version 2 adds a regular `href` to use instead.
};

export class IconArray extends AxesChart {
  _initOptions(...options) {
    super._initOptions(...options, ICON_ARRAY_DEFAULTS);
  }

  _initPublicEvents(...events) {
    super._initPublicEvents(...events,
      ...commonEventNames('icon') // Icon events
    );
  }

  _resetCssDomains() {
    super._resetCssDomains();

    resetScaleDomain(this.opts.iconCssScale);
    resetScaleDomain(this.opts.iconFillScale);
    resetScaleDomain(this.opts.iconStrokeScale);
  }

  _domainExtent(data, scaleName) {
    let extent = null;

    if (scaleName === 'y') {
      extent = new Array(this.opts.rows);
    }
    else if (scaleName === 'x') {
      extent = new Array(this.opts.columns);
    }

    return extent.fill().map((_, idx) => idx);
  }

  _render() {
    if (this.opts.iconMode === ICON_MODE.SVG_USE_DEF) {
      const chart = this;
      this.defs.append('symbol')
        .attr('id', 'svgIcon')
        .each(function() {
          chart.opts.iconSvgSymbol(d3.select(this));
        });
    }
  }

  _update() {
    const max = this.opts.rows * this.opts.columns;

    if (max < this.displayData.length ) {
      throw new MonteError(`Maximum number of items is ${max}. Data contains ${this.displayData.length}.`);
    }

    this._updateIcons();
  }

  _updateIcons() {
    const modeMap = {
      [ICON_MODE.D3_SYMBOL]: this._updateD3Symbol,
      [ICON_MODE.SVG_USE_DEF]: this._updateSvgUse,
      [ICON_MODE.SVG_USE_EXTERNAL]: this._updateSvgUse,
    };

    const icons = this.draw.selectAll('.monte-icon').data(this.displayData);

    modeMap[this.opts.iconMode].call(this, icons, this.opts.iconMode);

    // Fade out removed icons.
    icons.exit()
      .transition()
        .call(this._transitionSetup('icon', EXIT))
        .style('opacity', 0)
        .remove();
  }

  _updateD3Symbol(icons) {
    const genSym = (d, i) => {
      const size = this.tryInvoke(this.opts.iconSize, d, i);
      const symbase = d3.symbol().size(size);
      const symbol = this.opts.iconSymbol(symbase, d, i);
      return symbol(d, i);
    };

    this._updateCommon('path', icons, iconTransform).attr('d', genSym);
  }

  _updateSvgUse(icons, mode) {
    const href = mode === ICON_MODE.SVG_USE_DEF ?
      (d, i, nodes) => '#' + this.tryInvoke(this.opts.iconDefId, d, i, nodes) :
      (d, i, nodes) => this.tryInvoke(this.opts.iconHref, d, i, nodes);

    const mergedUpdates = (d, i, nodes) => {
      const node = d3.select(nodes[i]);

      node.attr('width', this.opts.iconSvgWidth)
        .attr('height', this.opts.iconSvgHeight);
    };

    const hrefAttr = this.tryInvoke(this.opts.svgVersion) === 2 ? 'href' : 'xlink:href';
    this._updateCommon('use', icons, iconTransformShift, mergedUpdates).attr(hrefAttr, href);
  }

  _updateCommon(type, icons, transform, merge = noop) {
    const t = icons.enter().append(type)
        .call(this.__bindCommonEvents('icon'))
      .merge(icons)
        .each(merge)
        .attr('transform', (d, i, nodes) => transform.call(this, d, i, nodes))
        .attr('class', (d, i) => this._buildCss(['monte-icon',
          this.opts.iconCss,
          this.opts.iconCssScaleAccessor,
          d.css], d, i))
        .transition()
          .call(this._transitionSetup('icon', UPDATE))
          .style('fill', this.optionReaderFunc('iconFillScaleAccessor'))
          .style('stroke', this.optionReaderFunc('iconStrokeScaleAccessor'));

    return t;
  }
}

function iconTransform(d, i, nodes) {
  const col = this.tryInvoke(this.opts.placement.columnIndex, d, i, nodes);
  const row = this.tryInvoke(this.opts.placement.rowIndex, d, i, nodes);
  const x = this.getScaledProp('x', col);
  const y = this.getScaledProp('y', row);

  return `translate(${x}, ${y})`;
}

function iconTransformShift(d, i, nodes) {
  const col = this.tryInvoke(this.opts.placement.columnIndex, d, i, nodes);
  const row = this.tryInvoke(this.opts.placement.rowIndex, d, i, nodes);
  const x = this.getScaledProp('x', col);
  const y = this.getScaledProp('y', row);
  const xShift = this.opts.iconSvgWidth / 2;
  const yShift = this.opts.iconSvgHeight / 2;

  return `translate(${x - xShift}, ${y - yShift})`;
}
