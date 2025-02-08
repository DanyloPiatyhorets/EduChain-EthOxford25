"use client";

import { useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Input, Typography } from "@mui/material";
import { convertJsonToIpfsHash } from "~~/scripts/JsonToIpfsConverter";
import { convertPdfToJson } from "~~/scripts/PdfToJsonConverter";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    try {
      // Convert PDF to JSON
      const json = await convertPdfToJson(file.name);
      if (!json) throw new Error("Failed to extract certificate data");

      // Convert JSON to IPFS hash
      const ipfsHash = await convertJsonToIpfsHash(json);

      if (!ipfsHash) throw new Error("Failed to upload JSON to IPFS");
      alert(`Uploaded! Hash: ${ipfsHash}`);

    } catch (error) {
      console.error("Error:", error);
      // @ts-ignore
      alert(error.message || "Conversion failed");
    }
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
              <>{file.name}</>
            ) : (
              <>
                <FileUploadIcon sx={{ marginRight: 1 }} />
                Choose a PDF file
              </>
            )}
          </Button>
        </label>

        {file && (
          <Button
            onClick={handleConvert}
            sx={{
              backgroundColor: "green",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              width: "100%",
            }}
          >
            <>
              <SendIcon sx={{ marginRight: 1 }} />
              Send
            </>
          </Button>
        )}
      </Box>
    </Box>
  );
}
