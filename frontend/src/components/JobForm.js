import React, { useState } from 'react';
import { submitJob } from '../api';

const JobForm = ({ onJobSubmitted }) => {
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            await submitJob(file);
            onJobSubmitted();
            setFile(null);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group">
                    <label htmlFor="fileInput" className="text-white">Upload File</label>
                    <input
                        type="file"
                        id="fileInput"
                        className="form-control"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Submit Job</button>
            </form>
        </div>
    );
};

export default JobForm;
