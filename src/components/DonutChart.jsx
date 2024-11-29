import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DonutChart = ({ data, title }) => {
  const ref = useRef();

  useEffect(() => {
    const { value, max } = data;
    const width = 100;
    const height = 100;
    const radius = Math.min(width, height) / 2;

    const arc = d3.arc().innerRadius(radius - 10).outerRadius(radius);
    const pie = d3.pie().value((d) => d)([value, max - value]);

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const path = svg.selectAll('path')
      .data(pie)
      .enter().append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => (i === 0 ? '#4caf50' : '#e0e0e0'));

    svg.append('text')
      .attr('x', 0)
      .attr('y', 10)
      .attr('text-anchor', 'middle')
      .text(`${Math.round((value / max) * 100)}%`);

    svg.append('text')
      .attr('x', 0)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .text(title);
  }, [data, title]);

  return <svg ref={ref}></svg>;
};

export default DonutChart;
