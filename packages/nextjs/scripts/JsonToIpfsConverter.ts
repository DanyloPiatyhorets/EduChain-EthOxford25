const PINATA_API_KEY = "057e23946ec6bd5bc35b";
const PINATA_API_SECRET = "a2518d316731f1d7370584ce8add983896a83f102f7f7e88e177df5a04ef0893";
let ipfsHash: string | null = null;

export const convertJsonToIpfsHash = async (jsonData: Record<string, any>): Promise<string | null> => {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(jsonData)], { type: "application/json" });
  formData.append("file", blob);

  const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_API_SECRET,
    },
    body: formData,
  });

  const result = await response.json();
  ipfsHash = result.IpfsHash;
  return ipfsHash;
};


// method to retrieve JSON by its ipfsHash, can be used to retrieve certificate details
const retrieveFromIpfsHash = async () => {
  if (!ipfsHash) {
    console.error("IPFS Hash is not available");
    return null;
  }

  const response = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
  return await response.json();
};
