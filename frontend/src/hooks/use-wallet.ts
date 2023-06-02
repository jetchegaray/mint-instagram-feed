import type { MetaMaskInpageProvider } from "@metamask/providers";
import { Maybe } from "@metamask/providers/dist/utils";
import { useCallback, useEffect, useState } from "react";
import { WalletResponse } from "../models/wallet-response";

const useWallet = (setLoadingState: (state: boolean) => void) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [addressConnected, setAddressConnected] = useState("");

  const getEthereumProvider = (): MetaMaskInpageProvider | undefined => {
    const ethereum = global?.window?.ethereum;

    if (ethereum && ethereum.isMetaMask)
      return ethereum as unknown as MetaMaskInpageProvider;
    return;
  };

  // const walletConnected = async (): Promise<WalletResponse> => {
  //   const ethereum = getEthereumProvider();

  //   if (!ethereum)
  //     throw new Error(
  //       "You must install Metamask, a virtual Ethereum wallet, in your browser."
  //     );

  //   try {
  //     // I use ethereum provider's built-in method
  //     const addressArray: Maybe<string[]> = await ethereum?.request({
  //       method: "eth_accounts",
  //     });

  //     if (addressArray && addressArray.length > 0) {
  //       setIsConnected(true);
  //       return new WalletResponse(addressArray[0]!, "success");
  //     } else {
  //       return new WalletResponse("", "Connect to metamask!");
  //     }
  //   } catch (error) {
  //     return new WalletResponse(
  //       "",
  //       `Connect to metamask error : ${(error as Error).message}`
  //     );
  //   }
  // };

  const connectWallet = useCallback(async (): Promise<WalletResponse> => {
    setLoadingState(true);
    const ethereum = getEthereumProvider();

    if (!ethereum) {
      setErrorMessage(
        "You must install Metamask, a virtual Ethereum wallet, in your browser."
      );
      throw new Error("You must install Metamask");
    }

    const chainId = await ethereum?.request({
      method: "eth_chainId",
    });

    if (chainId !== "0xaa36a7") {
      //alert('Incorrect network! Switch your metamask network to sepolia');
      await ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });
    }

    try {
      // I use ethereum provider's built-in method
      const addressArray: Maybe<string[]> = await ethereum?.request({
        method: "eth_requestAccounts",
      });
      setLoadingState(false);
      if (addressArray && addressArray.length > 0) {
        setIsConnected(true);
        return new WalletResponse(addressArray[0]!, "success");
      } else {
        setErrorMessage("Connect to metamask!");
        return new WalletResponse("", "error");
      }
    } catch (error) {
      setErrorMessage(
        `Connect to metamask error : ${(error as Error).message}`
      );
      setLoadingState(false);
      return new WalletResponse("", "error");
    }
  }, [setLoadingState]);

  useEffect(() => {
    const ethereum = getEthereumProvider();

    if (ethereum && ethereum.selectedAddress) {
      setIsConnected(true);
      setAddressConnected(ethereum.selectedAddress);
    }
  }, []);

  return {
    connectWallet,
    getEthereumProvider,
    isWalletConnected: isConnected,
    addressConnected: addressConnected,
    errorMessage,
  };
};

export default useWallet;
