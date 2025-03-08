import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { submitJob } from '../api';

const JobForm = ({ onJobSubmitted }) => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      console.log('File dropped:', acceptedFiles[0]);
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting file:', file);
    if (file) {
      await submitJob(file);
      onJobSubmitted();
      setFile(null);
    } else {
      console.error('No file selected');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="dropzone-file" className="block text-sm font-medium text-gray-300 mb-2">
          Upload File
        </label>
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition
            ${isDragActive ? 'border-blue-400 bg-gray-700' : 'border-gray-500 bg-gray-800 hover:bg-gray-700'}`}
        >
          <input {...getInputProps()} className="hidden" id="dropzone-file" />
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FiUploadCloud className="w-12 h-12 text-gray-400" />
            {file ? (
              <p className="mt-2 text-sm text-green-400">Selected: {file.name}</p>
            ) : (
              <>
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">Accepted file formats only</p>
              </>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition"
      >
        Submit Job
      </button>
    </form>
  );
};

export default JobForm;
