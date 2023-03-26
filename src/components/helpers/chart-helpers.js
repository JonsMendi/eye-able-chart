/* This file contains functions that help building the chart with D3.js*/

/**
Function to draw the X axis on the chart.
@param {Object} svg - The SVG element to append the X axis to.
@param {number} chartHeight - The height of the chart.
@param {Object} xAxis - The X axis to draw.
*/
export function drawXAxis(svg, chartHeight, xAxis) {
  svg.select(".x-axis")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);
}

/**
Function to draw the Y axis on the chart.
@param {Object} svg - The SVG element to append the Y axis to.
@param {Object} yAxis - The Y axis to draw.
*/
export function drawYAxis(svg, yAxis) {
  svg.select(".y-axis")
    .call(yAxis);
}

/**

Function to draw the bars on the chart.
@param {Object} svg - The SVG element to append the bars to.
@param {Array} data - The data to use to draw the bars.
@param {Object} x - The X scale used for the chart.
@param {Object} y - The Y scale used for the chart.
@param {number} chartHeight - The height of the chart.
*/
export function drawBars(svg, data, x, y, chartHeight) {
  const bars = svg.selectAll(".bar")
    .data(data, (d) => d.Year);

  bars.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(new Date(d.Year).getFullYear()))
    .attr("y", chartHeight)
    .attr("width", x.bandwidth())
    .attr("height", 0)
    .style("opacity", 0)
    .merge(bars)
    .transition()
    .duration(900)
    .attr("x", (d) => x(new Date(d.Year).getFullYear()))
    .attr("y", (d) => y(d.Population))
    .attr("width", x.bandwidth())
    .attr("height", (d) => chartHeight - y(d.Population))
    .style("opacity", 1);

  bars.exit()
    .transition()
    .duration(900)
    .attr("y", chartHeight)
    .attr("height", 0)
    .style("opacity", 0)
    .remove();
}