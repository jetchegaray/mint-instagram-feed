import { useCallback, useState } from "react";
import PinterestContract from "../resources/NFTPinterest.json";
import useWallet from "./use-wallet";
import { ethers } from "ethers";
import usePinata from "./use-ipfs";
import Pin from "../models/pin";

const useMint = (
  pinDetails: Pin,
  setLoadingState: (state: boolean) => void
) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [fileIpfsHash, setFileIpfsHash] = useState("");

  const { getEthereumProvider } = useWallet(setLoadingState);
  const { uploadDataIpfs } = usePinata({ pinDetails });

  const mint = useCallback(
    async (file: File, name: string) => {
      setLoadingState(true);
      try {
        const ipfsHash: string = await uploadDataIpfs();
        setFileIpfsHash(ipfsHash);
        const ethereum = getEthereumProvider();

        if (!ethereum) {
          setErrorMessage(
            "You must install Metamask, a virtual Ethereum wallet, in your browser."
          );
          throw new Error("You must install Metamask");
        }

        const provider = new ethers.providers.Web3Provider(
          ethereum as unknown as ethers.providers.ExternalProvider
        );
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(
          PinterestContract.address,
          PinterestContract.abi,
          signer
        );

        //actually create the NFT
        const formattedPrice = ethers.utils.parseUnits(
          pinDetails.price.toString(),
          "ether"
        );
        let transaction = await contract.createToken(ipfsHash, formattedPrice);
        await transaction.wait();

        alert(`Successfully listed your NFT! ${transaction.address}`);
        setLoadingState(false);
      } catch (error) {
        setLoadingState(false);
        setErrorMessage((error as Error).message);
      }
    },
    [getEthereumProvider, uploadDataIpfs, pinDetails, setLoadingState]
  );

  return {
    mint,
    fileIpfsHash,
    errorMessage,
  };
};

export default useMint;
