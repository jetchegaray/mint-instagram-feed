import axios, { AxiosResponse } from "axios";
const URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";

const uploadFromBuffer = async (
  buffer: File,
  name: string
): Promise<string | undefined> => {
  const formData: FormData = new FormData();
  console.log(buffer);
  formData.append("file", buffer);

  const metadata = JSON.stringify({
    name: name,
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res: AxiosResponse = await axios.post(URL, formData, {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "multipart/form-data", //boundary=${formData.boundary}
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
      },
    });
    console.log(res.data);
    return res.data.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};

export { uploadFromBuffer };
