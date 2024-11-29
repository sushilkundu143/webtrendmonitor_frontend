import { useEffect, useRef } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

const Graph = ({ data, width }) => {
  const ref = useRef();

  const colors = {
    SEO: "steelblue",
    "Best Practices": "orange",
    Performance: "green",
    Accessibility: "red",
  };

  useEffect(() => {
    const height = 500;

    // Set up margins and dimensions for the graph
    const margin = { top: 30, right: 30, bottom: 40, left: 40 };
    const svgWidth = width - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    const svgContainer = d3.select(ref.current);
    svgContainer.selectAll("*").remove(); // Clear any existing elements

    const svg = svgContainer
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const graphContent = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.build_id))
      .range([0, svgWidth])
      .padding(0.1);

    const y = d3.scaleLinear().domain([0, 100]).range([svgHeight, 0]);

    graphContent
      .append("g")
      .attr("transform", `translate(0,${svgHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "5px");

    graphContent.append("g").call(d3.axisLeft(y).ticks(11));

    // Tooltip setup
    const tooltip = d3
      .select(ref.current)
      .append("div")
      .style("position", "absolute")
      .style("background", "white")
      .style("border", "1px solid gray")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    const lineGenerators = {
      SEO: d3
        .line()
        .x((d) => x(d.build_id) + x.bandwidth() / 2)
        .y((d) => y(d.seo || 0)),
      "Best Practices": d3
        .line()
        .x((d) => x(d.build_id) + x.bandwidth() / 2)
        .y((d) => y(d.bestPractices || 0)),
      Performance: d3
        .line()
        .x((d) => x(d.build_id) + x.bandwidth() / 2)
        .y((d) => y(d.performance || 0)),
      Accessibility: d3
        .line()
        .x((d) => x(d.build_id) + x.bandwidth() / 2)
        .y((d) => y(d.accessibility || 0)),
    };

    // Plot lines for each metric
    Object.keys(colors).forEach((metric) => {
      graphContent
        .append("path")
        .datum(data)
        .attr("d", lineGenerators[metric])
        .style("fill", "none")
        .style("stroke", colors[metric])
        .style("stroke-width", 2);

      // Add points for each metric
      graphContent
        .selectAll(`.dot-${metric}`)
        .data(data)
        .enter()
        .append("circle")
        .attr("class", `dot-${metric}`)
        .attr("cx", (d) => x(d.build_id) + x.bandwidth() / 2)
        .attr("cy", (d) => y(d[metric.toLowerCase()] || 0))
        .attr("r", 4)
        .attr("fill", colors[metric])
        .style("cursor", "pointer")
        .on("mouseover", function (event, d) {
          d3.select(this).attr("r", 6); // Highlight the point
          const [xPos, yPos] = d3.pointer(event); // Get the relative coordinates
          tooltip
            .style("opacity", 1)
            .html(
              `<strong>${metric}</strong>: ${d[metric.toLowerCase()] || "N/A"}`
            )
            .style("left", `${xPos + 10}px`) // Adjust tooltip position relative to the point
            .style("top", `${yPos - 20}px`);
        })
        .on("mousemove", function (event) {
          const [xPos, yPos] = d3.pointer(event); // Update relative coordinates
          tooltip
            .style("left", `${xPos + 10}px`)
            .style("top", `${yPos - 20}px`);
        })
        .on("mouseout", function () {
          d3.select(this).attr("r", 4); // Reset point size
          tooltip.style("opacity", 0); // Hide tooltip
        });
    });
  }, [data, width]);

  return <div ref={ref} className="pt-2 relative"></div>;
};

// Prop validation
Graph.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        build_id: PropTypes.number.isRequired,
        seo: PropTypes.number,
        bestPractices: PropTypes.number,
        performance: PropTypes.number,
        accessibility: PropTypes.number,
      })
    ).isRequired,
    width: PropTypes.number.isRequired,
  };

export default Graph;
