import React from 'react';

function JobTable({ jobs, onRetry, onDelete }) {
    return (
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
            <thead>
                <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-left">Job ID</th>
                    <th className="px-4 py-3 text-left">Filename</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map(job => (
                    <tr key={job.id} className="border-b border-gray-700 odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700 transition">
                        <td className="px-4 py-3 text-white font-medium">{job.id}</td>
                        <td className="px-4 py-3 text-gray-300">{job.filename}</td>
                        <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-sm font-semibold rounded 
                                ${job.status === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                                {job.status}
                            </span>
                        </td>
                        <td className="px-4 py-3 flex space-x-2">
                            <button className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition" 
                                onClick={() => onDelete(job.id)}>Delete</button>
                            {job.status === 'error' && (
                                <button className="px-3 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600 transition" 
                                    onClick={() => onRetry(job.id)}>Retry</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default JobTable;
