import React, { useState } from 'react';
import axios from 'axios';

const AccessibilityChecker = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckAccessibility = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await axios.get(`http://localhost:4200/api/test-accessibility`, {
        params: { url },
      });
      setResults(response.data.issues);
    } catch (err) {
      setError('Failed to fetch accessibility results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Accessibility Checker</h1>

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Enter URL:</span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="mt-2 block w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        <button
          onClick={handleCheckAccessibility}
          disabled={loading || !url}
          className={`w-full px-4 py-2 text-white rounded-md font-semibold transition
          ${loading || !url ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Checking...' : 'Check Accessibility'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {results && (
        <div className="mt-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Accessibility Issues</h2>
          {results.length > 0 ? (
            <ul className="space-y-6">
              {results.map((issue, index) => (
                <li key={index} className="p-4 border rounded-md bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-800">{issue.description}</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Rule:</span> {issue.rule}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Impact:</span> {issue.impact}
                  </p>
                  <p className="text-sm text-blue-600 mt-2">
                    <a href={issue.helpUrl} target="_blank" rel="noopener noreferrer">Learn more</a>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {issue.nodes.map((node, nodeIndex) => (
                      <li key={nodeIndex} className="text-sm bg-gray-100 p-2 rounded-md">
                        <p className="text-gray-800">
                          <span className="font-medium">Target:</span> {node.target.join(', ')}
                        </p>
                        <p className="text-gray-800">
                          <span className="font-medium">HTML:</span> {node.html}
                        </p>
                        <p className="text-gray-800">
                          <span className="font-medium">Failure Summary:</span> {node.failureSummary}
                        </p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-green-600 font-medium">No accessibility issues found!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AccessibilityChecker;
