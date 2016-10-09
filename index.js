export { version } from './build/package';

// Abstract charts
export { Chart } from './src/chart/Chart';
export { AxesChart } from './src/chart/axesChart/AxesChart';
export { PolarChart } from './src/chart/polarChart/PolarChart';

// Concrete charts
// Cartesian coordinates
export { LineChart } from './src/chart/axesChart/LineChart';
export { AreaChart } from './src/chart/axesChart/AreaChart';
export { BarChart } from './src/chart/axesChart/BarChart';
export { HorizontalBarChart } from './src/chart/axesChart/HorizontalBarChart';
export { ScatterPlot } from './src/chart/axesChart/ScatterPlotChart';
export { SparklineChart } from './src/chart/axesChart/SparklineChart';

// Polar coordinates
export { ArcChart } from './src/chart/polarChart/ArcChart';
export { GaugeChart } from './src/chart/polarChart/GaugeChart';
export { SegmentChart } from './src/chart/polarChart/SegmentChart';
export { WedgeChart } from './src/chart/polarChart/WedgeChart';

// Support
export {
  EventWatcher,
  MonteError,
  MonteOptionError,
} from './src/support/';

// Extensions
export { Extension } from './src/extension/Extension';

export {
  Grid as ExtGrid,
  HorizontalLines as ExtHorizontalLines,
  VerticalLines as ExtVerticalLines,
} from './src/extension/Grid';

export { PolarGrid as ExtPolarGrid } from './src/extension/PolarGrid';

export { PolarTicks as ExtPolarTicks } from './src/extension/PolarTicks';

export { Frame as ExtFrame } from './src/extension/Frame';

export {
  BarBg as ExtBarBg,
  HorizontalBarBg as ExtHorizontalBarBg,
} from './src/extension/BarBg';

export { ReferenceLine as ExtReferenceLine } from './src/extension/ReferenceLine';

// Tools
import * as tools from './src/tools/';
export { tools };

// Util
export {
  axisNoTicks,
  axisWholeNumberFormat,
} from './src/util/axis';

export {
  needleRoundedEnd,
  needleFlatEnd,
  needleExtraPointer,
  needleRect,
} from './src/util/needle';

export {
  extentFromZero,
  extentBalanced,
  extentGeneratorPercentOffset,
  extentGeneratorValueOffset,
  extentGeneratorZeroToMax,
} from './src/util/extents';

export {
  AutoResizer,
  HorizontalResizer,
  HorizontalRatioResizer,
  Resizer,
  VerticalResizer,
} from './src/util/resizeHandlers';
