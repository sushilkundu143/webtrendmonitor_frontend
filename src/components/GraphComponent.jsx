import { useState, useEffect, useRef } from 'react';
import Graph from './Graph';
import PropTypes from 'prop-types'; // Import PropTypes
import { filterPageData, getUniquePages } from '../utils/filterPageData';

const GraphComponent = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState('All'); // State to track the selected tab
  const [selectedPage, setSelectedPage] = useState('home'); // Default to 'home' page
  const [containerWidth, setContainerWidth] = useState(800); // Default width for the graph
  const [pages, setPages] = useState([]); // Pages extracted dynamically from data
  const containerRef = useRef();

  // Fetch unique pages on component mount
  useEffect(() => {
    setPages(getUniquePages(data));
  }, [data]);

  // Handle tab selection
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // Handle page selection
  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  // Filter data for the selected page
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
      {/* Dropdown and Tabs in a single grid */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        {/* Dropdown for selecting page */}
        <div className='col-span-4'>
          <label htmlFor="page-select" className="mr-2 font-bold">
            Select Page:
          </label>
          <select
            id="page-select"
            value={selectedPage}
            onChange={(e) => handlePageChange(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            {pages.map((page) => (
              <option key={page} value={page}>
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs for selecting metric */}
        <div className='col-span-8'>
        <div className="flex space-x-4">
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
        </div>
      </div>

      {/* Pass filtered data, selectedTab, and containerWidth to Graph */}
      <Graph data={filteredData} selectedTab={selectedTab} width={containerWidth} />
    </div>
  );
};

// Prop validation using PropTypes
GraphComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired, // 'data' must be an array of objects and is required
  };

export default GraphComponent;
