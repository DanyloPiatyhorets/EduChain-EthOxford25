"use client";

import { useState } from "react";
import { Box, Button, CircularProgress, Input, Typography } from "@mui/material";
import { findCertificate } from "~~/scripts/fetchCertificateInfo";
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) return alert("Please select a PDF file");

    setLoading(true);
    try {
      const json = await findCertificate(file.name);
      setJsonData(json);
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("Failed to convert PDF");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!jsonData) return;

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "certificate.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "50%",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: 3,
          padding: "24px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Upload Certificate
        </Typography>

        <label htmlFor="file-input">
          <Input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            inputProps={{ accept: "application/pdf" }}
            sx={{
              display: "none", // Hide the default input element
            }}
          />
          <Button
            component="span"
            sx={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              marginBottom: 2,
              width: "100%",
              textTransform: "none",
              boxShadow: 2,
            }}
          >
              {file ? (
                  <>
                      {file.name}
                  </>
              ) : (
                  <>
                      <FileUploadIcon sx={{ marginRight: 1 }} /> {/* Icon for upload */}
                      Choose a PDF file
                  </>
              )}
          </Button>
        </label>

        <Button
          onClick={handleConvert}
          sx={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            marginBottom: 2,
            width: "100%",
          }}
          disabled={loading}
        >
            {/*{loading ? (*/}
            {/*    <CircularProgress size={24} sx={{ color: 'white', marginRight: 2 }} />*/}
            {/*) : (*/}
            {/*    <>*/}
            {/*        <FileUploadIcon sx={{ marginRight: 2 }} />*/}
            {/*        Convert to JSON*/}
            {/*    </>*/}
            {/*)}*/}
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Convert to JSON"}
        </Button>

        {jsonData && (
          <Button
            onClick={handleDownload}
            sx={{
              backgroundColor: "green",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              width: "100%",
            }}
          >
            Download JSON
          </Button>
        )}
      </Box>
    </Box>
  );
}
