import React, { useEffect, useState } from "react";
import Pin from "../models/pin";

import classes from "./Board.module.css";
//import Pin from "./Pin.js";
import Modal from "./Modal";
import PinItem from "./Pin";

const Board: React.FC = (props) => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [showModal, setShowModal] = useState(false);

  const addPinHandler = (pinDetails: Pin) => {
    setPins((prevPins) => {
      return prevPins.concat(pinDetails);
    });
    setShowModal(false);
  };

  useEffect(() => {
    console.log(pins);
  }, [pins]);

  return (
    <>
      <div>
        <div className={classes["navigation_bar"]}>
          <div
            onClick={() => setShowModal(true)}
            className={`${classes.pint_mock_icon_container} ${classes.add_pin}`}
          >
            <img
              src="./images/add.png"
              alt="add_pin"
              className={classes["pint_mock_icon"]}
            />
          </div>
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
