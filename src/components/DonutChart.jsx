import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

const DonutChart = ({ value, title }) => {
  const ref = useRef();

  useEffect(() => {
    const max = 100;
    const width = 170; // Adjusted width
    const height = 170; // Adjusted height
    const radius = Math.min(width, height) / 2;

    // Clear previous chart content
    d3.select(ref.current).selectAll('*').remove();

    const arc = d3.arc().innerRadius(radius - 20).outerRadius(radius);
    const pie = d3.pie().value((d) => d)([value, max - value]);

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Add the arcs for the donut slices with animation
    svg.selectAll('path')
      .data(pie)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => (i === 0 ? '#4caf50' : '#e0e0e0'))
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .attr('opacity', 1)
      .attrTween('d', function (d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d); // Start with 0 angle
        return function (t) {
          return arc(i(t)); // Transition from 0 to the slice's angle
        };
      });

    // Add percentage text inside the donut
    svg.append('text')
      .attr('x', 0)
      .attr('y', 10)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .text(`${Math.round((value / max) * 100)}%`);
  }, [value]); // Re-run the effect when 'value' changes

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <svg ref={ref}></svg>
      {/* Title below the donut chart */}
      <div className="mt-4 text-lg font-semibold text-gray-700">{title}</div>
    </div>
  );
};

// Prop validation using PropTypes
DonutChart.propTypes = {
  value: PropTypes.number.isRequired, // 'value' must be a number and is required
  title: PropTypes.string.isRequired, // 'title' must be a string and is required
};

export default DonutChart;
