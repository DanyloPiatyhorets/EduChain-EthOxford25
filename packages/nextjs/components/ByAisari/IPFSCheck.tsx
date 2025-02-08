import React, { useState } from "react";

interface IPFSCheckProps {
    jsonData: { message: string };
  }

  const IPFSCheck: React.FC<IPFSCheckProps> = ({ jsonData }) => {
    const [ipfsHash, setIpfsHash] = useState('');
    const [retrievedData, setRetrievedData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Replace these with your Pinata credentials
    const PINATA_API_KEY = '057e23946ec6bd5bc35b';
    const PINATA_API_SECRET = 'a2518d316731f1d7370584ce8add983896a83f102f7f7e88e177df5a04ef0893';

    const uploadToIPFS = async (jsonData: Record<string, any>) => {
        try {
            setLoading(true);
            const formData = new FormData();
            const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
            formData.append('file', blob);

            const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
                method: 'POST',
                headers: {
                    'pinata_api_key': PINATA_API_KEY,
                    'pinata_secret_api_key': PINATA_API_SECRET,
                },
                body: formData
            });

            const result = await response.json();
            setIpfsHash(result.IpfsHash);
            alert(`Uploaded! Hash: ${result.IpfsHash}`);
        } catch (error) {
            alert('Upload failed');
        } finally {
            setLoading(false);
        }
    };

    const retrieveFromIPFS = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
            const data = await response.json();
            setRetrievedData(data);
        } catch (error) {
            alert('Retrieval failed');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                try {
                    const result = e.target?.result;
                    if (typeof result === 'string') {
                        const jsonData = JSON.parse(result);
                        uploadToIPFS(jsonData);
                    }
                } catch (error) {
                    alert('Invalid JSON file');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                disabled={loading}
            />

            {ipfsHash && (
                <div>
                    <p>IPFS Hash: {ipfsHash}</p>
                    <button onClick={retrieveFromIPFS} disabled={loading}>
                        Retrieve Data
                    </button>
                </div>
            )}

            {retrievedData && (
                <div>
                    <h3>Retrieved Data:</h3>
                    <pre>{JSON.stringify(retrievedData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default IPFSCheck;
