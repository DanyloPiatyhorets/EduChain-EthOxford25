"use client";

import { useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Input, Typography } from "@mui/material";
import { convertJsonToIpfsHash } from "~~/scripts/JsonToIpfsConverter";
import { convertPdfToJson } from "~~/scripts/PdfToJsonConverter";
import { styled } from "@mui/material/styles";


const GradientTypography = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(to right, #1976d2, #3f51b5)', // MUI primary and secondary colors
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  textAlign: 'center'
}));

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
        height: "40vh",
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
        <GradientTypography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
            marginBottom: 3
          }}
        >
          Upload Certificate
        </GradientTypography>

        <label htmlFor="file-input">
          <Input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            inputProps={{ accept: "application/pdf" }}
            sx={{
              display: "none",
            }}
          />
          <Button
            component="span"
            sx={{
              backgroundColor: "#1976d2", // MUI primary color
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              marginBottom: 2,
              width: "100%",
              textTransform: "none",
              boxShadow: 2,
              '&:hover': {
                backgroundColor: "#1565c0", // Darker shade
              },
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            {file ? (
              <Typography sx={{ fontSize: 'inherit' }}>{file.name}</Typography>
            ) : (
              <>
                <FileUploadIcon sx={{ marginRight: 1 }} />
                <Typography sx={{ fontSize: 'inherit' }}>Choose a PDF file</Typography>
              </>
            )}
          </Button>
        </label>

        {file && (
          <Button
            onClick={handleConvert}
            sx={{
              backgroundColor: "#2e7d32", // MUI success color
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              width: "100%",
              textTransform: "none",
              '&:hover': {
                backgroundColor: "#1b5e20", // Darker shade
              },
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            <>
              <SendIcon sx={{ marginRight: 1 }} />
              <Typography sx={{ fontSize: 'inherit' }}>Send</Typography>
            </>
          </Button>
        )}
      </Box>
    </Box>
  );
}
