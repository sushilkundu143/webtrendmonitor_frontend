import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import builds from '../data/dashboardData';
import GraphComponent from '../components/GraphComponent';
import ReportTable from '../components/ReportTable';
import DonutChart from '../components/DonutChart';
import CardComponent from '../components/CardComponent';
import { getUniquePages } from '../utils/filterPageData';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [buildData, setBuildData] = useState([]);
  const [homePageData, setHomePageData] = useState(null);
  const [selectedPage, setSelectedPage] = useState('home'); // State to track selected page
  const [pages, setPages] = useState([]); // Pages extracted dynamically from data

  // Simulate fetching data
  useEffect(() => {
    setBuildData(builds);

    // Extract unique pages
    setPages(getUniquePages(builds));

    // Filter the latest build for the default homepage
    const homePageBuild = builds.find((build) => build.page === 'home');
    if (homePageBuild) {
      setHomePageData(homePageBuild);
    }
  }, []);

  const handleViewDetails = (buildId) => {
    navigate(`/details/${buildId}`);
  };

  const handlePageChange = (page) => {
    setSelectedPage(page);
    const selectedPageBuild = builds.find((build) => build.page === page);
    setHomePageData(selectedPageBuild || null); // Update data based on selected page
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* Page Dropdown */}
        <div className='ml-4'>
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
      </div>

      {/* Cards Section */}
      {homePageData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <CardComponent
            title="Largest Contentful Paint (LCP)"
            value={`${homePageData.lcp ?? 0.14} s`}
            description="Your local LCP value is good."
            text="LCP elements"
            element={['img.lh-final-ss-image']}
          />
          <CardComponent
            title="Cumulative Layout Shift (CLS)"
            value={homePageData.cls ?? 0}
            description="Your local CLS value is good."
          />
          <CardComponent
            title="Interaction to Next Paint (INP)"
            value={`${homePageData.inp ?? 0} ms`}
            description="Your local INP value is good."
          />
        </div>
      )}

      {/* Grid Layout for Donut Charts (Left 40%) and Graph (Right 60%) */}
      <div className="grid grid-cols-5 gap-8">
        {/* Left Section - 40% for Donut Charts */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {homePageData && (
            <>
              <DonutChart title="Performance" value={homePageData.performance} />
              <DonutChart title="SEO" value={homePageData.seo} />
              <DonutChart title="Best Practices" value={homePageData.bestPractices} />
              <DonutChart title="Accessibility" value={homePageData.accessibility} />
            </>
          )}
        </div>

        {/* Right Section - 60% for Graph */}
        <div className="col-span-3">
          <GraphComponent data={buildData} selectedPage={selectedPage} />
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-6">
        <ReportTable data={buildData} onViewDetails={handleViewDetails} />
      </div>
    </div>
  );
};

export default DashboardPage;
