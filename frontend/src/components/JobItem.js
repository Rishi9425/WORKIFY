import React from 'react';

function JobTable({ jobs, onRetry, onDelete }) {
    return (
        <table className="table table-hover table-dark">
            <thead>
                <tr>
                    <th scope="col">Job ID</th>
                    <th scope="col">Filename</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map(job => (
                    <tr key={job.id}>
                        <th scope="row">{job.id}</th>
                        <td>{job.filename}</td>
                        <td>{job.status}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => onDelete(job.id)}>Delete</button>
                            {job.status === 'error' && (
                                <button className="btn btn-warning ml-2" onClick={() => onRetry(job.id)}>Retry</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default JobTable;
