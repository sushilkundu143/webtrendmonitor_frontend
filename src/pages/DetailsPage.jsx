import { useEffect, useState } from 'react';
import { fetchLighthouseReport } from '../utils/api';
import { useParams } from 'react-router-dom';
import LighthouseReportComponent from '../components/LighthouseReportComponent/LighthouseReportComponent';

const DetailsPage = () => {
  const { buildId, pageName } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const data = await fetchLighthouseReport(buildId, pageName);
        setReport(data);
      } catch (error) {
        console.error('Failed to fetch report details:', error);
      }
    };
    loadReport();
  }, [buildId, pageName]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Detailed Lighthouse Report</h1>

      {report ? (
        <LighthouseReportComponent />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailsPage;
