import { Extension } from './Extension';

const BAR_BG_DEFAULTS = {
  eventPrefix: 'barbg',
  barBgCss: 'monte-ext-bar-bg',
  data: null,
  maxValue: null,  // Maximum value
  maxValueProp: null, // Maximum value taken from chart data
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
      data = this.opts.data;
    }
    else {
      data = this._buildData(barChart, chartData);
    }

    const bgs = this.layer.selectAll(`.${this.opts.barBgCss}`).data(data);
    const sizeAdjust = this._sizeAdjust(barChart);

    bgs.enter().append('rect')
      .merge(bgs)
        .attr('class', this.opts.barBgCss)
        .attr('x', (...args) => barChart._barX.bind(barChart)(...args) + this._xShift(sizeAdjust))
        .attr('y', (...args) => barChart._barY.bind(barChart)(...args) + this._yShift(sizeAdjust))
        .attr('width', (d) => {
          const bw = barChart._barWidth(d);
          const wa = this._widthAdjust(sizeAdjust);
          let v = bw + wa;
          return v;
        })
        .attr('height', (...args) => barChart._barHeight.bind(barChart)(...args) + this._heightAdjust(sizeAdjust))
        .attr('rx', (d, i) => this.tryInvoke(this.opts.cornerRadius, d, i));
  }

  _buildData(barChart, chartData) {
    const data = new Array(chartData.length);
    const domain = barChart.y.domain();

    for (let i = 0; i < data.length; i++) {
      const maxVal = this.opts.maxValue ? chartData[i][this.opts.maxValue] : null;

      data[i] = {
        [barChart.option('xProp')]: chartData[i][barChart.option('xProp')],
        [barChart.option('yProp')]: maxVal || this.opts.maxValue || domain[1],
      };
    }

    return data;
  }

  _sizeAdjust(barChart) {
    return barChart.x.bandwidth() * this.opts.enlarge;
  }

  _xShift(sizeAdjust) {
    return -sizeAdjust;
  }

  _yShift(sizeAdjust) { // eslint-disable-line no-unused-vars
    return 0;
  }

  _widthAdjust(sizeAdjust) {
    return 2 * sizeAdjust;
  }

  _heightAdjust(sizeAdjust) { // eslint-disable-line no-unused-vars
    return 0;
  }
}

export class HorizontalBarBg extends BarBg {
  _buildData(hBarChart, chartData) {
    const data = new Array(chartData.length);
    const domain = hBarChart.x.domain();

    for (let i = 0; i < data.length; i++) {
      const maxVal = this.opts.maxValueProp ? chartData[i][this.opts.maxValueProp] : null;

      data[i] = {
        [hBarChart.option('xProp')]: maxVal || this.opts.maxValue || domain[1],
        [hBarChart.option('yProp')]: chartData[i][hBarChart.option('yProp')],
      };
    }

    return data;
  }

  _sizeAdjust(barChart) {
    return barChart.y.bandwidth() * this.opts.enlarge;
  }

  _xShift(sizeAdjust) { // eslint-disable-line no-unused-vars
    return 0;
  }

  _yShift(sizeAdjust) {
    return -sizeAdjust;
  }

  _widthAdjust(sizeAdjust) { // eslint-disable-line no-unused-vars
    return 0;
  }

  _heightAdjust(sizeAdjust) {
    return 2 * sizeAdjust;
  }
}
