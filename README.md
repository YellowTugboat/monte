# Monte
A visualization framework for D3.js and SVG. Ships with prebuilt charts and components.

# Preview Notice
This code is currently in active development, but the code base is stabilizing. The API is still
subject to change before a formal release occurs.

# Chart Types
## Bar
* Standard with vertical and horizontal. Has support for positive and negative values.
* Grouped & Stacked with vertical and horizontal.

## Line
* Common line chart
* Area chart
* Sparkline

## Scatterplot
* Commmon scatterplot

## Arc
* Pie
* Donut
* Polar Area
* Gauge

## Radar
* Common radar chart

## Icon Array
* Icons from D3 Symbols
* SVG use path from `defs`
* SVG use external file.

## Custom
Use the base classes `Chart`, `AxesChart`, and `PolarChart` to build custom charts that leverage the
options, lifecycle events, and extensions built into Monte. Or extend

## Extensions
Extensions extend the behavior of a chart. Extensions are driven by chart lifecycle events and stay
up-to-date as the chart updates primarily with the `updated` and `boundsUpdated` events though all
events can be bound.

# Extension Types
* Arc: Draws an arbitrary Arc. Useful for arc fills on gauges, multilevel donuts, etc...
* Bar Bg: Draws background rectangles on bar charts. Useful for comparing previous values or goals.
* Crosshair: Connects a point to the edges of a chart with reference lines. Helps map points to
specific axes values.
* Grid: Draws a grid that lines up with Axes tick marks.
* Horizontal Lines: Special case of Grid that draws only horizontal lines.
* Label: Creates an arbitrary that can be data bound. Includes features such as "max width" that
will automatically scale font sizes to fit.
* Polar Grid: Creates a series of arcs (in the simplest case circle, but arbitrary angles can be
used) at the specified distances.
* Polar Line: Draws a line based on given inner and outer radii for a particular angle.
* Polar Ticks: Like polar line, but draws a series of lines at a given interval.
* Reference Line: Draws a line given two coordinates and places a corresponding label.
* Vertical Lines: Special case of Grid that draws only vertical lines.

# License
MIT. See LICENSE for details.

# Author
[Yellow Tugboat](http://www.yellowtugboat.com). Copyright © 2016-2017.
