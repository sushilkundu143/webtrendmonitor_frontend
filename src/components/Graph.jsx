import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Graph = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState('All'); // State to track the selected tab
  const ref = useRef();

  const colors = {
    SEO: 'steelblue',
    'Best Practices': 'orange',
    Performance: 'green',
    Accessibility: 'red',
  };

  // Handle tab selection
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const width = 800;
    const height = 400;

    // Set up margins and dimensions for the graph
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const svgWidth = width - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    // Select the parent div to append the SVG graph
    const svgContainer = d3.select(ref.current);
    svgContainer.selectAll('*').remove(); // Clear any existing elements

    // Create the SVG element
    const svg = svgContainer
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create scale for the x-axis (using build_id for categorical x-axis)
    const x = d3.scaleBand()
      .domain(data.map(d => d.build_id)) // Use build_id for categorical x-axis
      .range([0, svgWidth])
      .padding(0.1);

    // Create scale for the y-axis with a domain of 0 to 100
    const y = d3.scaleLinear()
      .domain([0, 100])  // Setting Y-axis range from 0 to 100
      .range([svgHeight, 0]);

    // Add X and Y axes to the graph
    svg.append('g')
      .attr('transform', `translate(0,${svgHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font-size', '5px'); // Set font size for build_id labels

    svg.append('g')
      .call(d3.axisLeft(y)); // Draw the Y-axis

    // Define line generators for each metric
    const lineGenerators = {
      SEO: d3.line()
        .x((d) => x(d.build_id) + x.bandwidth() / 2)
        .y((d) => y(d.seo || 0)),
      'Best Practices': d3.line()
        .x((d) => x(d.build_id) + x.bandwidth() / 2)
        .y((d) => y(d.best_practices || 0)),
      Performance: d3.line()
        .x((d) => x(d.build_id) + x.bandwidth() / 2)
        .y((d) => y(d.performance || 0)),
      Accessibility: d3.line()
        .x((d) => x(d.build_id) + x.bandwidth() / 2)
        .y((d) => y(d.accessibility || 0)),
    };

    // Clear any existing lines and redraw the lines for the selected metrics
    svg.selectAll('.line').remove();

    // Plot lines based on the selected tab
    const selectedMetrics = selectedTab === 'All'
      ? ['SEO', 'Best Practices', 'Performance', 'Accessibility']
      : [selectedTab];

    selectedMetrics.forEach((metric) => {
      svg.append('path')
        .attr('class', 'line')
        .attr('d', lineGenerators[metric](data))
        .style('fill', 'none')
        .style('stroke', colors[metric]) // Use the specific color for each metric
        .style('stroke-width', 2);
    });

  }, [data, selectedTab]); // Re-render when data or selectedTab changes

  return (
    <div>
      {/* Tabs for selecting metric */}
      <div className="flex space-x-4 mb-4">
        {['All', 'SEO', 'Best Practices', 'Performance', 'Accessibility'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-2 rounded-md ${selectedTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div ref={ref}></div>
    </div>
  );
};

export default Graph;
