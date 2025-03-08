// frontend/src/components/JobList.js
import React from 'react';
import JobItem from './JobItem';

const JobList = ({ jobs, onDelete, onRetry }) => {
    return (
        <div>
            {jobs.map((job) => (
                <JobItem key={job.id} job={job} onDelete={onDelete} onRetry={onRetry} /> 
            ))}
        </div>
    );
};

export default JobList