import { useState } from 'react';

const ReportTable = ({ data, onViewDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Build ID</th>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Date</th>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Website</th>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Page URL</th>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Page</th>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Performance</th>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">SEO</th>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Best Practices</th>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Accessibility</th>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">View Details</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((build) => (
            <tr key={build.build_id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-sm text-gray-700">{build.build_id}</td>
              <td className="py-3 px-6 text-sm text-gray-700">{new Date(build.datetimestamp).toLocaleString()}</td>
              <td className="py-3 px-6 text-sm text-gray-700">{build.website}</td>
              <td className="py-3 px-6 text-sm text-gray-700">{build.page_url}</td>
              <td className="py-3 px-6 text-sm text-gray-700">{build.page}</td>
              <td className="py-3 px-6 text-sm text-gray-700">{build.performance}</td>
              <td className="py-3 px-6 text-sm text-gray-700">{build.seo}</td>
              <td className="py-3 px-6 text-sm text-gray-700">{build.bestPractices}</td>
              <td className="py-3 px-6 text-sm text-gray-700">{build.accessibility}</td>
              <td className="py-3 px-6 text-sm text-gray-700">
                <a href={build.pageurl} target="_blank" className="text-blue-500 hover:underline">
                  {build.pageurl}
                </a>
              </td>
              <td className="py-3 px-6 text-sm">
                <button
                  onClick={() => onViewDetails(build.build_id)}
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(Math.ceil(data.length / recordsPerPage))].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 text-sm font-semibold rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-300`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(data.length / recordsPerPage)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div>
          <select
            value={recordsPerPage}
            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={30}>30 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;
