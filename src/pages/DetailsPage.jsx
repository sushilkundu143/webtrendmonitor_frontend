import { useEffect, useState } from 'react';
import { fetchLighthouseReport } from '../utils/api';

const DetailsPage = ({ pageUrl }) => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const data = await fetchLighthouseReport(pageUrl);
        setReport(data);
      } catch (error) {
        console.error('Failed to fetch report details:', error);
      }
    };
    loadReport();
  }, [pageUrl]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Detailed Lighthouse Report</h1>
      {report ? (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(report, null, 2)}
        </pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailsPage;
