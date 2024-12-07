import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function RegisterPage() {
  const [sitemap, setSitemap] = useState('');
  const [buildId, setBuildId] = useState('');

  // Mutation to handle API call
  const mutation = useMutation(async (data) => {
    const response = await axios.post('/api/register', data);
    return response.data;
  });

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure both fields are filled
    if (!sitemap || !buildId) {
      alert('Please fill in both fields');
      return;
    }

    // Trigger the mutation
    mutation.mutate(
      { sitemap, buildId },
      {
        onSuccess: (data) => {
          alert('Registration successful!');
          console.log('Response:', data);
        },
        onError: (error) => {
          alert('An error occurred during registration.');
          console.error('Error:', error);
        },
      }
    );
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
          >
            Submit
          </button>
        </form>
        {mutation.isLoading && (
          <p className="text-center text-sm text-gray-500 mt-4">Submitting...</p>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
