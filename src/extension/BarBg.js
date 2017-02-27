import { Extension } from './Extension';

const BAR_BG_DEFAULTS = {
  eventPrefix: 'barbg',
  barBgCss: 'monte-ext-bar-bg',
  data: null,
  maxValue: null,     // Maximum value
  maxValueProp: null, // Maximum value taken from chart data
  minValue: null,     // Minimum value
  minValueProp: null, // Minimum value taken from chart data
  enlarge: 0.05,
  cornerRadius: 0,
};

export class BarBg extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, BAR_BG_DEFAULTS);
  }

  _update() {
    const barChart = this.chart;
    const chartData = barChart.data() || [];
    let data;

    if (this.opts.data) {
      data = this.tryInvoke(this.opts.data);
    }
    else {
      data = this._buildData(barChart, chartData);
    }

    const bgs = this._extCreateSelection().data(data);
    const sizeAdjust = this._sizeAdjust(barChart);
    const css = this.tryInvoke(this.opts.barBgCss);

    bgs.enter().append('rect')
      .call(this._setExtAttrs.bind(this))
      .merge(bgs)
        .attr('class', css)
        .attr('x', (...args) => this._x(barChart, sizeAdjust, ...args))
        .attr('y', (...args) => this._y(barChart, sizeAdjust, ...args))
        .attr('width', (...args) => this._width(barChart, sizeAdjust, ...args))
        .attr('height', (...args) => this._height(barChart, sizeAdjust, ...args))
        .attr('rx', (d, i) => this.tryInvoke(this.opts.cornerRadius, d, i));

    bgs.exit().remove();
  }

  _buildData(barChart, chartData) {
    const data = new Array(chartData.length);
    const domain = barChart.y.domain();

    for (let i = 0; i < data.length; i++) {
      const minValueProp = this.tryInvoke(this.opts.minValueProp);
      const maxValueProp = this.tryInvoke(this.opts.maxValueProp);
      const minVal = minValueProp ? chartData[i][minValueProp] : null;
      const maxVal = maxValueProp ? chartData[i][maxValueProp] : null;

      data[i] = {
        [barChart.option('xProp')]: chartData[i][barChart.option('xProp')],
        'min': minVal || this.opts.minValue || domain[0],
        'max': maxVal || this.opts.maxValue || domain[1],
      };
    }

    return data;
  }

  _sizeAdjust(barChart) {
    const enlarge = this.tryInvoke(this.opts.enlarge);
    return barChart.x.bandwidth() * enlarge;
  }

  _x(barChart, sizeAdjust, ...args) {
    const v = barChart._barX.bind(barChart)(...args) + this._xShift(sizeAdjust);
    return v;
  }

  _xShift(sizeAdjust) {
    return -sizeAdjust;
  }

  _y(barChart, sizeAdjust, d) {
    return barChart.y(d.max) + this._yShift(sizeAdjust);
  }

  _yShift(sizeAdjust) { // eslint-disable-line no-unused-vars
    return 0;
  }

  _widthAdjust(sizeAdjust) {
    return 2 * sizeAdjust;
  }

  _width(barChart, sizeAdjust, d) {
    const bw = barChart._barWidth(d);
    const wa = this._widthAdjust(sizeAdjust);
    return bw + wa;
  }

  _heightAdjust(sizeAdjust) { // eslint-disable-line no-unused-vars
    return 0;
  }

  _height(barChart, sizeAdjust, d) {
    const z = barChart.y(0);
    const h = (barChart.y(d.min) - z) + (z - barChart.y(d.max));
    return h + this._heightAdjust(sizeAdjust);
  }
}

export class HorizontalBarBg extends BarBg {
  _buildData(hBarChart, chartData) {
    const data = new Array(chartData.length);
    const domain = hBarChart.x.domain();

    for (let i = 0; i < data.length; i++) {
      const minValueProp = this.tryInvoke(this.opts.minValueProp);
      const maxValueProp = this.tryInvoke(this.opts.maxValueProp);
      const minVal = minValueProp ? chartData[i][minValueProp] : null;
      const maxVal = maxValueProp ? chartData[i][maxValueProp] : null;

      data[i] = {
        [hBarChart.option('yProp')]: chartData[i][hBarChart.option('yProp')],
        'min': minVal || this.opts.minValue || domain[0],
        'max': maxVal || this.opts.maxValue || domain[1],
      };
    }

    return data;
  }

  _sizeAdjust(barChart) {
    return barChart.y.bandwidth() * this.opts.enlarge;
  }

  _x(barChart, sizeAdjust, d) {
    return barChart.x(d.min) + this._xShift(sizeAdjust);
  }

  _xShift(sizeAdjust) { // eslint-disable-line no-unused-vars
    return 0;
  }

  _y(barChart, sizeAdjust, ...args) {
    const v = barChart._barY.bind(barChart)(...args) + this._yShift(sizeAdjust);
    return v;
  }

  _yShift(sizeAdjust) {
    return -sizeAdjust;
  }

  _widthAdjust(sizeAdjust) { // eslint-disable-line no-unused-vars
    return 0;
  }

  _width(barChart, sizeAdjust, d) {
    const z = barChart.x(0);
    const w = (z - barChart.x(d.min)) + (barChart.x(d.max) - z);
    return w + this._widthAdjust(sizeAdjust);
  }

  _heightAdjust(sizeAdjust) {
    return 2 * sizeAdjust;
  }

  _height(barChart, sizeAdjust, d) {
    const bh = barChart._barHeight(d);
    const ha = this._heightAdjust(sizeAdjust);
    return bh + ha;
  }
}
