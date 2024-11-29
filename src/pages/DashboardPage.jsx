import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import builds from '../data/dashboardData';
import Graph from '../components/Graph.jsx';
import ReportTable from '../components/ReportTable';
import DonutChart from '../components/DonutChart.jsx';
import CardComponent from '../components/CardComponent';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [buildData, setBuildData] = useState([]);
  const [homePageData, setHomePageData] = useState(null);

  // Simulate fetching data
  useEffect(() => {
    setBuildData(builds);

    // Filter the latest build for the homepage (Assuming 'home' as page identifier)
    const homePageBuild = builds.find(build => build.page === 'home');
    if (homePageBuild) {
      setHomePageData(homePageBuild);
    }
  }, []);

  const handleViewDetails = (buildId) => {
    navigate(`/details/${buildId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Cards Section */}
      {homePageData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <CardComponent 
            title="Largest Contentful Paint (LCP)" 
            value={`${homePageData.lcp ?? 0.14 } s`} 
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
        {/* Left Section - 40% for 4 Donut Charts */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {homePageData && (
            <>
              <div className="flex flex-col items-center">
                <DonutChart 
                  title="Performance"
                  value={homePageData.performance} 
                />
              </div>
              <div className="flex flex-col items-center">
                <DonutChart 
                  title="SEO"
                  value={homePageData.seo} 
                />
              </div>
              <div className="flex flex-col items-center">
                <DonutChart 
                  title="Best Practices"
                  value={homePageData.bestPractices} 
                />
              </div>
              <div className="flex flex-col items-center">
                <DonutChart 
                  title="Accessibility"
                  value={homePageData.accessibility} 
                />
              </div>
            </>
          )}
        </div>

        {/* Right Section - 60% for Graph */}
        <div className="col-span-3">
          <Graph data={buildData} />
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
