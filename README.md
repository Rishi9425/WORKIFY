# Job Submission Dashboard

## Overview
This project is a Job Submission Dashboard built using React.js for the frontend and Node.js for the backend. It leverages Socket.io for real-time status updates.

## Features
- Upload a file and submit a job
- View a paginated list of submitted jobs
- Resubmit a failed job
- Delete a job
- Real-time job status updates using Socket.io

## Job Workflow
1. **Initialized** - The job is created upon submission.
2. **Processing** - The backend compresses the file and delays the process for a random duration (1s to 1min).
3. **Done** - The job successfully completes.
4. **Error** - The job fails during processing.

## Tech Stack
- **Frontend**: React
- **Backend**: Node.js
- **Real-Time Updates**: Socket.io

## Installation and Setup
Follow these steps to run the project locally:

### Prerequisites
- Node.js installed
- npm or yarn installed

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/Rishi9425/WORKIFY
   cd workify
   ```

2. **Install Dependencies**
   **For Frontend**
   ```bash
   cd frontend
   npm install
   ```
   
   **For Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Run the Application**
   **Start the Backend**
   ```bash
   cd backend
   npm start
   ```
   
   **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the Dashboard**
   Visit (<http://localhost:5173>) in your browser.

## Deployment
Project is deployed at: <https://bit.ly/Workify>

## Video Walkthrough
Watch the complete walkthrough on YouTube: (<https://youtu.be/hYvGr3U4Iio.>)

