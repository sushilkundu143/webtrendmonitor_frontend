import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getLocalStorage } from '../utils/localStorageUtils';

function RegisterPage() {
  const [sitemap, setSitemap] = useState('');
  const [buildId, setBuildId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check the value of `isRegister` in localStorage
    const isRegister = getLocalStorage('isRegister');

    if (isRegister == true) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure both fields are filled
    if (!sitemap || !buildId) {
      alert('Please fill in both fields');
      return;
    }

    setIsLoading(true);
    try {
      // http://localhost:4200/api/lighthouse/run-lighthouse?sitemapUrl=https://hackathon-website-nu.vercel.app/sitemap.xml&buildId=89shk293
      const apiBase = import.meta.env.VITE_API_BASE_URL;
      // Perform API call
      const response = await axios.get(`${apiBase}/lighthouse/run-lighthouse`, {
        params: { sitemapUrl: sitemap, buildId }, // Pass parameters as query string
      });

      alert('Registration successful!');
      console.log('Response:', response.data);
    } catch (error) {
      alert('An error occurred during registration.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Register Your Website
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sitemap Input */}
          <div>
            <label
              htmlFor="sitemap"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter your sitemap
            </label>
            <input
              id="sitemap"
              type="text"
              placeholder="https://example.com/sitemap.xml"
              value={sitemap}
              onChange={(e) => setSitemap(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Build ID Input */}
          <div>
            <label
              htmlFor="buildId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter the latest build ID
            </label>
            <input
              id="buildId"
              type="text"
              placeholder="Build ID"
              value={buildId}
              onChange={(e) => setBuildId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
