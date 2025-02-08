import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { Button, Typography, Paper } from '@mui/material';

const PdfUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection via the hidden input
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        alert('Please select a valid PDF file.');
        event.target.value = ''; // Reset the input
      }
    }
  };

  // Trigger the hidden file input on button or container click
  const handleUploadClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  // Prevent default behavior to allow drop
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Handle file drop into the upload area
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please drop a valid PDF file.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Paper elevation={3} className="p-6 w-full max-w-md">
        <Typography variant="h5" className="mb-4">
          Upload PDF File
        </Typography>
        <div
          className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-all"
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <Typography variant="body1" className="text-gray-800">
              {selectedFile.name}
            </Typography>
          ) : (
            <Typography variant="body2" className="text-gray-500">
              Drag & drop a PDF file here, or click to select one.
            </Typography>
          )}
          {/* Hidden file input */}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleUploadClick}
          className="mt-4"
        >
          {selectedFile ? 'Change File' : 'Upload PDF'}
        </Button>
      </Paper>
    </div>
  );
};

export default PdfUploader;
