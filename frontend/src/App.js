import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import JobForm from './components/JobForm';
import JobTable from './components/JobTable';
import { getJobs, deleteJob, submitJob, retryJob } from './api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [jobs, setJobs] = useState([]);
    const socketRef = useRef(null);

    const fetchJobs = async () => {
        const response = await getJobs();
        setJobs(response.data);
    };

    useEffect(() => {
        fetchJobs();

        // Initialize socket connection
        socketRef.current = io("http://localhost:5000");

        socketRef.current.on("connect", () => {
            console.log("Socket connected");
        });

        socketRef.current.on("notification", (data) => {
            toast.info(data.message);
        });

        return () => {
            socketRef.current.off("notification");
            socketRef.current.disconnect();
        };
    }, []);

    const handleJobSubmitted = () => {
        fetchJobs();
    };

    const handleDeleteJob = async (id) => {
        await deleteJob(id);
        fetchJobs();
    };

    const handleRetryJob = async (jobId) => {
        await retryJob(jobId);
        fetchJobs();
    };

    return (
        <div className="container">
            <h1>Job Submission Dashboard</h1>
            <JobForm onJobSubmitted={handleJobSubmitted} />
            <JobTable jobs={jobs} onDelete={handleDeleteJob} onRetry={handleRetryJob} />
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export default App;
