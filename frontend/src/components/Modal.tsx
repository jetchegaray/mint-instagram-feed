import classes from "./Modal.module.css";
import React, { useRef, useState } from "react";
import Pin from "../models/pin";

const Modal: React.FC<{ onAdd: (pin: Pin) => void }> = (props) => {
  const [showLabel, setShowLabel] = useState(true);
  const [showModalPin, setShowModalPin] = useState(false);
  const [blobImage, setBlobImage] = useState<string>();
  const [sizeImage, setSizeImage] = useState<string>("medium");
  const [fileImage, setFileImage] = useState<File>();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const upload_img = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      if (/image\/*/.test(event.target.files[0].type)) {
        const reader = new FileReader();

        reader.onload = function () {
          setBlobImage(reader.result as string);
          setShowLabel(false);
          setShowModalPin(true);
        };

        reader.readAsDataURL(event.target.files[0]);
        setFileImage(event.target.files![0]);
      }
    }
  };

  function check_size(event: React.SyntheticEvent<HTMLImageElement, Event>) {
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
  }

  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSizeImage(event.target.value);
  };

  function confirmHander() {
    const titleRefEntered = titleRef.current!.value;
    const descriptionRefEntered = descriptionRef.current!.value;
    const priceEntered = priceRef.current!.value;

    const pinData: Pin = {
      id: new Date().toString(),
      title: titleRefEntered,
      description: descriptionRefEntered,
      price: +priceEntered,
      sizeImage: sizeImage as string,
      blobImage: blobImage as string,
      fileImage: fileImage as File,
    };

    props.onAdd(pinData);
  }

  return (
    <div className={classes["add_pin_modal"]}>
      <div className={classes["add_pin_container"]}>
        <div className={classes["side"]} id={classes.left_side}>
          <div className={classes["section1"]}>
            <div className={classes["pint_mock_icon_container"]}>
              <img
                src="./images/ellipse.png"
                alt="edit"
                className={classes["pint_mock_icon"]}
              />
            </div>
          </div>

          <div className={classes.section2}>
            <label
              htmlFor={classes.upload_img}
              id={classes.upload_img_label}
              style={{
                display: showLabel ? "block" : "none",
              }}
            >
              <div className={classes.upload_img_container}>
                <div id={classes.dotted_border}>
                  <div className={classes.pint_mock_icon_container}>
                    <img
                      src="./images/up-arrow.png"
                      alt="upload_img"
                      className={classes.pint_mock_icon}
                    />
                  </div>
                  <div>Click to upload</div>
                  <div>
                    Recommendation: Use high-quality .jpg less than 20MB
                  </div>
                </div>
              </div>

              <input
                onChange={(event) => upload_img(event)}
                type="file"
                name="upload_img"
                id={classes.upload_img}
                value=""
              />
            </label>

            <div
              className={classes.modals_pin}
              style={{
                display: showModalPin ? "block" : "none",
              }}
            >
              <div className={classes.pin_image}>
                <img onLoad={check_size} src={blobImage} alt="pin_image" />
              </div>
            </div>
          </div>
        </div>

        <div className={classes["side"]} id={classes.right_side}>
          <div className={classes["section1"]}>
            <div className={classes["select_size"]}>
              <select
                defaultValue="medium"
                name="pin_size"
                id="pin_size"
                onChange={selectChangeHandler}
                className={classes["select_element"]}
              >
                <option value="">Select</option>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
              </select>
              <button onClick={confirmHander} className={classes["save_pin"]}>
                Save
              </button>
            </div>
          </div>

          <div className={`${classes.section2}`}>
            <input
              placeholder="Add your title"
              type="text"
              className={classes.new_pin_input}
              id="pin_title"
              ref={titleRef}
            />
            <input
              placeholder="Tell everyone what your Pin is about"
              type="text"
              className={classes["new_pin_input"]}
              id="pin_description"
              ref={descriptionRef}
            />
            <input
              placeholder="Price in ETH (min 0.001)"
              type="number"
              className={classes["new_pin_input"]}
              id="pin_price"
              ref={priceRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
