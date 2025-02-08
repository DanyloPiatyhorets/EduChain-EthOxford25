const fs = require("fs");
const path = require("path");

// Load JSON certificate data
const certificateData = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/certificates.json"), "utf8"));

// Function to extract student name and university from filename
function parseFilename(filename) {
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
function findCertificate(filename) {
    const parsedData = parseFilename(filename);
    if (!parsedData) {
        console.error("Invalid filename format:", filename);
        return null;
    }

    // Search for a matching certificate
    return certificateData.certificates.find(
        (c) => c.studentName === parsedData.studentName && c.universityName === parsedData.universityName
    ) || null;
}

// Example usage: Read files from the certificate directory
// const directoryPath = path.join(__dirname, "../data/certificates/");
// fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//         console.error("Error reading certificate directory:", err);
//         return;
//     }
//
//     // Outputting found jsons
//     files.forEach((file) => {
//         if (file.endsWith(".pdf")) {
//             const certificateInfo = findCertificate(file);
//             if (certificateInfo) {
//                 console.log("Certificate Found:", certificateInfo);
//             } else {
//                 console.log("No match found for", file);
//             }
//         }
//     });
// });
