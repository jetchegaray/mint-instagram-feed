import { PinataResponse } from "../models/pinata-response";
import { uploadFileToIPFS, uploadJsonToIPFS } from "../external/pinata-api";
import Pin from "../models/pin";

const usePinata = (props: { pinDetails: Pin }) => {
  const uploadDataIpfs = async (): Promise<string> => {
    const response: PinataResponse = await uploadFileToIPFS(
      props.pinDetails.fileImage,
      props.pinDetails.title
    );

    if (response.status === "error") {
      throw new Error("Error");
    }

    const url: string = `${process.env.REACT_APP_PINATA_BASE_URL}${response.ipfsHash}`;
    props.pinDetails = {
      ...props.pinDetails,
      url: url,
    };

    const nftJSON = {
      name: props.pinDetails.title,
      description: props.pinDetails.description,
      //    price: props.pinDetails.price,
      image: url,
    };

    const responseMetadata: PinataResponse = await uploadJsonToIPFS(
      JSON.stringify(nftJSON)
    );
    if (responseMetadata.status === "error") {
      throw new Error("Error");
    }

    return responseMetadata.ipfsHash!;
  };

  return {
    uploadDataIpfs,
  };
};

export default usePinata;
