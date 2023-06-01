import React, { useEffect, useState } from "react";
import useWallet from "../hooks/use-wallet";
import Pin from "../models/pin";
import { WalletResponse } from "../models/wallet-response";

import classes from "./Board.module.css";
import Modal from "./Modal";
import PinItem from "./Pin";

const Board: React.FC = (props) => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [connectionStatus, setConectionStatus] = useState("");
  const [connectionAddress, setConectionAddress] = useState("");

  const {
    connectWallet,
    isWalletConnected,
    addressConnected,
    isLoading,
    errorMessage,
  } = useWallet();

  const addPinHandler = (pinDetails: Pin) => {
    setPins((prevPins) => {
      return prevPins.concat(pinDetails);
    });
    setShowModal(false);
  };

  const connectWalletHandler = async () => {
    const response: WalletResponse = await connectWallet();
    setConectionStatus(response.status);
    setConectionAddress(response.address);
  };

  //debugger
  useEffect(() => {
    setConectionAddress(addressConnected);
    console.log(pins);
  }, [pins]);

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
            <PinItem pinDetails={pin} key={pin.id}></PinItem>
          ))}
        </div>
        <div
          onClick={(event) =>
            (event.target as Element).className === "add_pin_modal" &&
            setShowModal(false)
          }
          className="add_pin_modal_container"
        >
          {showModal && <Modal onAdd={addPinHandler} />}
        </div>
      </div>
    </>
  );
};

export default Board;
