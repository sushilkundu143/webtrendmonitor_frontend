import { useState, useEffect, useRef } from 'react';
import Graph from './Graph';
import PropTypes from 'prop-types';
import { filterPageData } from '../utils/filterPageData';

const GraphComponent = ({ data, selectedPage }) => {
  const [selectedTab, setSelectedTab] = useState('All'); // Track the selected tab
  const [containerWidth, setContainerWidth] = useState(800); // Default width for the graph
  const containerRef = useRef();

  // Handle tab selection
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // Filter data for the selected page and tab
  const getFilteredData = () => {
    const pageData = filterPageData(data, selectedPage);

    if (selectedTab === 'All') {
      return pageData;
    }

    return pageData.map((d) => ({
      ...d,
      seo: selectedTab === 'SEO' ? d.seo : null,
      bestPractices: selectedTab === 'Best Practices' ? d.bestPractices : null,
      performance: selectedTab === 'Performance' ? d.performance : null,
      accessibility: selectedTab === 'Accessibility' ? d.accessibility : null,
    }));
  };

  // Use ResizeObserver to track container width
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  const filteredData = getFilteredData();

  return (
    <div className="w-full" ref={containerRef}>
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

      {/* Pass filtered data, selectedTab, and containerWidth to Graph */}
      <Graph data={filteredData} selectedTab={selectedTab} width={containerWidth} />
    </div>
  );
};

GraphComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedPage: PropTypes.string.isRequired, // Accept selectedPage as a prop
};

export default GraphComponent;
