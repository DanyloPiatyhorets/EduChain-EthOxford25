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

// Function to find the certificate in the JSON data
function findCertificate(filename: string) {
  const parsedData = parseFilename(filename);
  if (!parsedData) {
    console.error("Invalid filename format:", filename);
    return null;
  }

  // Search for a matching certificate in the JSON data
  return (
    certificateData.certificates.find(
      (c: { studentName: string; universityName: string }) =>
        c.studentName === parsedData.studentName && c.universityName === parsedData.universityName,
    ) || null
  );
}

export { findCertificate };
