import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import JobForm from './components/JobForm';
import JobTable from './components/JobTable';
import HeroSection from './components/HeroSection';
import { getJobs, deleteJob, retryJob } from './api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    socketRef.current = io("http://51.21.162.16:5000");

    socketRef.current.on("connect", () => {
      console.log("Socket connected");
    });

    socketRef.current.on("notification", (data) => {
      toast.info(data.message);
      fetchJobs()//This makes sure it is updated every time
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
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Job Submission Dashboard</h1>
        </div>
      </header>

      {/* <HeroSection /> */}

      <main className="container mx-auto px-4 py-8 space-y-8 min-h-screen">
        <section className="bg-gray-800 rounded-lg shadow p-6">
          <JobForm onJobSubmitted={handleJobSubmitted} />
        </section>
        <section className="bg-gray-800 rounded-lg shadow p-6">
          <JobTable jobs={jobs} onDelete={handleDeleteJob} onRetry={handleRetryJob} />
        </section>
      </main>

      <footer className="bg-gray-800 py-4 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Workify. All rights reserved.
        </p>
      </footer>
      <ToastContainer position="top-right" autoClose={5000} /> 
    </div>
  );
};

export default App;
