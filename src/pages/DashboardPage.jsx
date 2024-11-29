import builds from '../data/dashboardData';
import { useEffect, useState } from 'react';
import Graph from '../components/Graph.jsx';
import ReportTable from '../components/ReportTable';
import { useNavigate } from 'react-router-dom';
import DonutChart from '../components/DonutChart';
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

  const latestBuild = buildData[0]; // Assuming the first build is the latest one
  console.log(">>> latest build data::", latestBuild);

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

      {/* Donut Charts Section */}
      {homePageData && (
        <div className="mb-8">
          <DonutChart data={homePageData} />
        </div>
      )}

      {/* Graph Section */}
      <Graph data={buildData} />

      {/* Table Section */}
      <div className="mt-6">
        <ReportTable data={buildData} onViewDetails={handleViewDetails} />
      </div>
    </div>
  );
};

export default DashboardPage;
