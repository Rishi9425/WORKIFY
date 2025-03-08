import express from 'express';
import multer from 'multer';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const PORT = 5000;

app.use(
    cors({
      origin: (origin, callback) => {
        // if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        // } else {
        //   callback(new Error("Not allowed by CORS"));
        // }
      },
      credentials: true,
    })
  );
app.use(express.json());
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/dist')));

// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage: multer.diskStorage({}) });

let jobs = [];
let jobIdCounter = 1;
const MAX_RETRIES = 3;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",  // Allow all origins
        methods: ["GET", "POST"]
    }
});


app.post('/api/jobs', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const job = {
        id: jobIdCounter++,
        filename: req.file.originalname,
        status: 'initialized',
        retries: 0,
    };
    jobs.push(job);
    res.status(201).json(job);
    processJob(job);
});

const processJob = (job) => {
    job.status = 'processing';
    io.emit('notification', { message: `Job ${job.id} is processing.` });

    setTimeout(() => {
        if (Math.random() > 0.4) {
            job.status = 'done';
            io.emit('notification', { message: `Job ${job.id} completed successfully.` , jobId : job.id , status : job.status});
        } else {
            job.status = 'error';
            job.retries++;

            if (job.retries <= MAX_RETRIES) {
                io.emit('notification', { message: `Job ${job.id} failed. Retrying... (${job.retries}/${MAX_RETRIES})`, jobId : job.id , status : job.status });
                setTimeout(() => processJob(job), 2000);
            } else {
                io.emit('notification', { message: `Job ${job.id} failed after ${MAX_RETRIES} attempts.` , jobId : job.id , status : job.status });
            }
        }
    }, 3000);
};

app.get('/api/jobs', (req, res) => {
    res.json(jobs);
});

app.delete('/api/jobs/:id', (req, res) => {
    jobs = jobs.filter(job => job.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.post('/api/jobs/:id/retry', (req, res) => {
    const job = jobs.find(job => job.id === parseInt(req.params.id));
    if (job && job.status === 'error') {
        job.retries = 0;
        processJob(job);
        res.json({ message: `Retrying job ${job.id}` });
    } else {
        res.status(400).json({ message: 'Invalid retry request' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
