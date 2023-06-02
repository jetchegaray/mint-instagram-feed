import React, { useContext, useEffect, useState } from "react";
import useWallet from "../hooks/use-wallet";
import Pin from "../models/pin";
import { WalletResponse } from "../models/wallet-response";
import classes from "./Board.module.css";
import { ErrorContext } from "./errorManager/error-context";
import IsLoading from "./loading/LoadingWrapper";
import Modal from "./Modal";
import PinItem from "./Pin";

const Board: React.FC<{ setLoadingState: (state: boolean) => void }> = (props: {
  setLoadingState: (state: boolean) => void;
}) => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [connectionAddress, setConectionAddress] = useState("");
  const { showError } = useContext(ErrorContext);

  const { connectWallet, isWalletConnected, addressConnected, errorMessage } =
    useWallet(props.setLoadingState);

  const addPinHandler = (pinDetails: Pin) => {
    setPins((prevPins) => {
      return prevPins.concat(pinDetails);
    });
  };

  const removePinHandler = (id: string) => {
    setPins((prevPins) => {
      return prevPins.filter((p) => p.id !== id);
    });
  };

  const connectWalletHandler = async () => {
    const response: WalletResponse = await connectWallet();
    setConectionAddress(response.address);
  };

  useEffect(() => {
    setConectionAddress(addressConnected);
    console.log(pins);
  }, [pins, addressConnected]);

  useEffect(() => {
    showError(errorMessage);
  }, [errorMessage]);

  return (
    <>
      <div>
        <div className={classes["navigation_bar"]}>
          <div
            onClick={() => setShowModal(true)}
            className={`${classes.pint_mock_icon_container}`}
          >
            <img
              src="./images/add.png"
              alt="add_pin"
              className={classes["pint_mock_icon"]}
            />
          </div>
          {isWalletConnected && (
            <div
              className={`${classes.pint_mock_icon_container} ${classes.pint_mock_icon_container_connected}`}
            >
              <p>{String(connectionAddress).substring(0, 6)}</p>
            </div>
          )}
          {!isWalletConnected && (
            <div
              onClick={connectWalletHandler}
              className={`${classes.pint_mock_icon_container} ${classes.pint_mock_icon_container_connected}`}
            >
              <img
                src="./images/wallet.png"
                alt="add_pin"
                className={classes["pint_mock_icon"]}
              />
            </div>
          )}
        </div>

        <div className={classes["pin_container"]}>
          {pins.map((pin) => (
            <PinItem
              pinDetails={pin}
              key={pin.id}
              onRemove={removePinHandler}
            ></PinItem>
          ))}
        </div>
        <div
          onClick={(event) =>
            (event.target as Element).className === "add_pin_modal" &&
            !showModal
          }
          className="add_pin_modal_container"
        >
          {showModal && (
            <Modal onAdd={addPinHandler} onShowModal={setShowModal} />
          )}
        </div>
      </div>
    </>
  );
};

export default IsLoading(Board, "Loading the pins...");
