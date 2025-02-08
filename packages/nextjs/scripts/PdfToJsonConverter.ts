import certificateData from "../data/certificates.json";

// Function to extract student name and university from filename
function parseFilename(filename: string) {
  const match = filename.match(/(.*?) - (.*?)\.pdf$/);
  if (match) {
    return {
      studentName: match[1].trim(),
      universityName: match[2].trim(),
    };
  }
  return null;
}

// Function to find the certificate and return it as a JSON object
function convertPdfToJson(filename: string): Record<string, any> | null {
  const parsedData = parseFilename(filename);
  if (!parsedData) {
    console.error("Invalid filename format:", filename);
    return null;
  }

  const certificate = certificateData.certificates.find(
    (c: { studentName: string; universityName: string }) =>
      c.studentName === parsedData.studentName && c.universityName === parsedData.universityName,
  );

  return certificate ? { ...certificate } : null; // Ensures it's a valid JSON object
}

export { convertPdfToJson };
