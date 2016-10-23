import { AxesChart } from './AxesChart';
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

  iconFillScale: noop,
  iconStrokeScale: noop,
  iconCssScale: noop,
  iconCss: 'icon',
  iconSize: 24,
  iconSymbol: (symbol) => symbol.type(d3.symbolCircle),
  iconMode: ICON_MODE.D3_SYMBOL,
  iconDefId: 'svgIcon',
  iconSvgWidth: 24,
  iconSvgHeight: 24,
  iconHref: '',

  rows: 10,
  columns: 10,

  placement: ICON_PLACEMENT.TopToBottomLeftToRightPlacement,
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

    return this;
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

  _update() {
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
      .duration(this.opts.transitionDuration)
      .style('opacity', 0)
      .remove();
  }

  _updateD3Symbol(icons) {
    const genSym = (d, i) => {
      const size = this.optInvoke(this.opts.iconSize, d, i);
      const symbase = d3.symbol().size(size);
      const symbol = this.opts.iconSymbol(symbase, d, i);
      return symbol(d, i);
    };

    this._updateCommon('path', icons, iconTransform).attr('d', genSym);
  }

  _updateSvgUse(icons, mode) {
    const href = mode === ICON_MODE.SVG_USE_DEF ?
      (d, i, nodes) => '#' + this.optInvoke(this.opts.iconDefId, d, i, nodes) :
      (d, i, nodes) => this.optInvoke(this.opts.iconHref, d, i, nodes);

    const mergedUpdates = (d, i, nodes) => {
      const node = d3.select(nodes[i]);

      node.attr('width', this.opts.iconSvgWidth)
        .attr('height', this.opts.iconSvgHeight);
    };

    this._updateCommon('use', icons, iconTransformShift, mergedUpdates).attr('href', href);
  }

  _updateCommon(type, icons, transform, merge = noop) {
    const t = icons.enter().append(type)
        .call(this.__bindCommonEvents('icon'))
      .merge(icons)
        .each(merge)
        .attr('transform', (d, i, nodes) => transform.call(this, d, i, nodes))
        .attr('class', (d, i, nodes) => ['monte-icon',
          this.opts.iconCss,
          this.opts.iconCssScale(d, i, nodes),
          d.css].join(' '))
        .transition()
          .duration(this.opts.transitionDuration)
          .attr('fill', this.opts.iconFillScale)
          .attr('stroke', this.opts.iconStrokeScale);

    return t;
  }
}

function iconTransform(d, i, nodes) {
  const col = this.optInvoke(this.opts.placement.columnIndex, d, i, nodes);
  const row = this.optInvoke(this.opts.placement.rowIndex, d, i, nodes);
  const x = this.getScaledProp('x', col);
  const y = this.getScaledProp('y', row);

  return `translate(${x}, ${y})`;
}

function iconTransformShift(d, i, nodes) {
  const col = this.optInvoke(this.opts.placement.columnIndex, d, i, nodes);
  const row = this.optInvoke(this.opts.placement.rowIndex, d, i, nodes);
  const x = this.getScaledProp('x', col);
  const y = this.getScaledProp('y', row);
  const xShift = this.opts.iconSvgWidth / 2;
  const yShift = this.opts.iconSvgHeight / 2;

  return `translate(${x - xShift}, ${y - yShift})`;
}
