import React from 'react';

function JobTable({ jobs, onRetry, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-200">Job ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-200">Filename</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-200">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {jobs.map(job => (
            <tr key={job.id} className="hover:bg-gray-700 transition">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{job.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{job.filename}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${job.status === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                  {job.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onDelete(job.id)} 
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-medium text-white transition"
                  >
                    Delete
                  </button>
                  {job.status === 'error' && (
                    <button 
                      onClick={() => onRetry(job.id)} 
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded text-sm font-medium text-white transition"
                    >
                      Retry
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobTable;
