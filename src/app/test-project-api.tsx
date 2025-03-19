'use client';

import { useState, useEffect } from 'react';
import { ProjectFrontmatter } from '@/lib/markdown';

export default function TestProjectAPI() {
  const [slug, setSlug] = useState('1');
  const [result, setResult] = useState<ProjectFrontmatter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/project/${slug}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Project API</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="px-3 py-2 border rounded"
          placeholder="Enter project slug"
        />
        <button
          onClick={fetchProject}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Project'}
        </button>
      </div>

      {error && (
        <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">Project Data</h2>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
