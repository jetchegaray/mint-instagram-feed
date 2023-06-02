import axios, { AxiosError, AxiosResponse } from "axios";
import { PinataResponse } from "../models/pinata-response";

const uploadFileToIPFS = async (
  buffer: File,
  name: string
): Promise<PinataResponse> => {
  const formData: FormData = new FormData();
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
    const res: AxiosResponse = await axios.post(
      process.env.REACT_APP_PINATA_API + "pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "multipart/form-data", //boundary=${formData.boundary}
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
        },
      }
    );
    console.log(res.data);
    return new PinataResponse("success", res.data.IpfsHash, "");
  } catch (error) {
    console.log(error);
    return new PinataResponse("error", "", (error as AxiosError).message);
  }
};

const uploadJsonToIPFS = async (json: string): Promise<PinataResponse> => {
  try {
    const res: AxiosResponse = await axios.post(
      process.env.REACT_APP_PINATA_API + "pinJSONToIPFS",
      json,
      {
        headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
        },
      }
    );
    console.log(res.data);
    return new PinataResponse("success", res.data.IpfsHash, "");
  } catch (error) {
    console.log(error);
    return new PinataResponse("error", "", (error as AxiosError).message);
  }
};

export { uploadFileToIPFS, uploadJsonToIPFS };
