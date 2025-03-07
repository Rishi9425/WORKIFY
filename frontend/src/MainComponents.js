// frontend/src/MainComponent.js
import React, { useEffect, useState } from 'react';
import JobTable from './components/JobTable';
import JobForm from './components/JobForm';
import { getJobs, deleteJob, submitJob } from './api'; // Import your API functions

function MainComponent() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        const response = await getJobs();
        setJobs(response.data);
    };

    const handleRetry = async (jobId) => {
        const jobToRetry = jobs.find(job => job.id === jobId);
        const formData = new FormData();
        formData.append('file', jobToRetry.file); // Assuming you have the file reference

        await submitJob(formData); // Call your submitJob function
        fetchJobs(); // Refresh the job list after retry
    };

    const handleDelete = async (jobId) => {
        await deleteJob(jobId);
        fetchJobs(); // Refresh the job list after deletion
    };

    return (
        <div>
            <h1>Job Submission Dashboard</h1>
            <JobForm onJobSubmitted={fetchJobs} />
            <JobTable jobs={jobs} onRetry={handleRetry} onDelete={handleDelete} />
        </div>
    );
}

export default MainComponent;