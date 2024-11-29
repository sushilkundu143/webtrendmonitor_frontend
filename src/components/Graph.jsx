import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Graph = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 500;
    const height = 300;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    // Your graph rendering logic with D3 for line charts
    // Example: plot each of the metrics (LCP, CLS, INP) with time on x-axis
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default Graph;
