import { exec } from 'child_process';
import { io } from '../server.js';

const jobs = {};

const processJob = (jobId) => {
  jobs[jobId].status = 'processing';
  io.emit('jobUpdate', jobs[jobId]);

  const outputFile = `${jobs[jobId].file}.zip`;
  exec(`zip ${outputFile} ${jobs[jobId].file}`, (err) => {
    jobs[jobId].status = err ? 'error' : 'done';
    io.emit('jobUpdate', jobs[jobId]);
  });
};

export { processJob, jobs };
