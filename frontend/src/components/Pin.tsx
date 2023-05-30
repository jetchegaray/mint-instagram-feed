import React, { useState } from "react";
import Pin from "../models/pin";
import classes from "./Pin.module.css";
import { uploadFromBuffer } from "../external/pinata-api";

const PinItem: React.FC<{ pinDetails: Pin }> = (props: { pinDetails: Pin }) => {
  const [readyToMint, setReadyToMint] = useState(true);
  const [minted, setMinted] = useState(false);

  const mintHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const hash: string | undefined = await uploadFromBuffer(
      props.pinDetails.fileImage,
      props.pinDetails.title
    );

    if (hash) {
      props.pinDetails = {
        ...props.pinDetails,
        url: `${process.env.REACT_APP_PINATA_BASE_URL}${hash}`,
      };
      setMinted(true);
      setReadyToMint(false);
    }
  };

  const check_size = (event: React.SyntheticEvent<HTMLElement, Event>) => {
    const image = event.currentTarget;

    image.classList.add(classes.pin_max_width);

    if (
      image.getBoundingClientRect().width <
        image.parentElement!.getBoundingClientRect().width ||
      image.getBoundingClientRect().height <
        image.parentElement!.getBoundingClientRect().height
    ) {
      image.classList.remove(classes.pin_max_width);
      image.classList.add(classes.pin_max_height);
    }

    image.style.opacity = Number(1).toString();
  };

  return (
    <>
      <div
        className={`${classes.card} ${
          classes[`card_${props.pinDetails.sizeImage}`]
        }`}
      >
        <div className={classes.pin_title}>{props.pinDetails.title}</div>

        <div className={classes.pin_modal}>
          <div className={classes.modal_head}>
            {readyToMint && (
              <button className={classes.save_card} onClick={mintHandler}>
                Mint
              </button>
            )}
            {minted && <div className={classes.minted_card}>Minted</div>}
          </div>

          <div className={classes.modal_foot}>
            <div className={classes.destination}>
              <div className={classes.pint_mock_icon_container}>
                <img
                  src="./images/upper-right-arrow.png"
                  alt="destination"
                  className={classes.pint_mock_icon}
                />
              </div>
              <span>{props.pinDetails.url}</span>
            </div>

            {/* <div className={classes.pint_mock_icon_container}>
            <img
              src="./images/send.png"
              alt="send"
              className={classes.pint_mock_icon}
            />
          </div> */}

            <div className={classes.pint_mock_icon_container}>
              <img
                src="./images/trash-bin.png"
                alt="delete"
                className={classes.pint_mock_icon}
              />
            </div>
          </div>
        </div>

        <div className={classes.pin_image}>
          <img
            onLoad={check_size}
            src={props.pinDetails.blobImage}
            alt="pin_image"
          />
        </div>
      </div>
    </>
  );
};

export default PinItem;
