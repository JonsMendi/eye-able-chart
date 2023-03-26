import { useEffect, useRef } from "react";
import { drawXAxis, drawYAxis, drawBars } from './helpers/chart-helpers';
import * as d3 from "d3";

function Chart({ data, yearFilter }) {
  // create a reference to the SVG element
  const svgRef = useRef(null);

  useEffect(() => {
    // select the SVG element using the reference
    const svg = d3.select(svgRef.current);

    // get the width and height of the SVG element
    const width = svg.attr("width");
    const height = svg.attr("height");

    // define the margins for the chart
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // calculate the chart width and height after applying margins
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // extract all the years from the data
    const allYears = data.map((item) => new Date(item.Year).getFullYear());

    // filter the data based on the year filter, if any
    const filteredData = data.filter(
      (item) =>
        yearFilter
          ? new Date(item.Year).getFullYear() >=
            new Date().getFullYear() - yearFilter
          : true
    );
    
    // create a scale for the x-axis
    const x = d3
      .scaleBand()
      .range([0, chartWidth])
      .padding(0.1)
      .domain(allYears);

    // create a scale for the y-axis
    const y = d3
      .scaleLinear()
      .range([chartHeight, 0])
      .domain([0, d3.max(filteredData, (d) => d.Population)]);

    // create x-axis and y-axis using the scales
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    // call helper functions to draw the x-axis, y-axis and bars on the chart
    drawXAxis(svg, chartHeight, xAxis);
    drawYAxis(svg, yAxis);
    drawBars(svg, filteredData, x, y, chartHeight);
  }, [data, yearFilter]);

  return (
    <svg ref={svgRef} width={500} height={300}>
      {/* create empty groups to hold the x-axis and y-axis */}
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default Chart;



