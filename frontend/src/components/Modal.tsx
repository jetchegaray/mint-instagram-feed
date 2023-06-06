import classes from "./Modal.module.css";
import React, { useContext, useRef, useState } from "react";
import Pin from "../models/pin";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  validateYupSchema,
  FormikErrors,
} from "formik";
import * as Yup from "yup";
import { ErrorContext } from "./errorManager/error-context";

type ModalParams = {
  onAdd: (pin: Pin) => void;
  onShowModal: (show: boolean) => void;
};

interface PinFormValues {
  title: string;
  description: string;
  price: number;
  sizeImage: "small" | "medium" | "large";
  fileImage: File | null;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .min(0.001, "0.001 minimun value")
    .required("Price is required"),
  sizeImage: Yup.string().required("Image size is required"),
  fileImage: Yup.mixed()
    .required("Image is required")
    .test(
      "FILE_SIZE",
      "File exceeds 20MB",
      (value: any) => !value || (value && value.size <= 1024 * 1024 * 2)
    )
    .test(
      "FILE_FORMAT",
      "Uploaded file has unsopported format",
      (value: any) => !value || (value && /image\/*/.test(value?.type))
    ),
});

// Commponent

const Modal: React.FC<ModalParams> = (props: ModalParams) => {
  const [showLabel, setShowLabel] = useState(true);
  const [showModalPin, setShowModalPin] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const { showError } = useContext(ErrorContext);

  const upload_img = (file: File): void => {
    const reader = new FileReader();

    reader.onload = function () {
      setPreviewImage(reader.result as string);
      setShowLabel(false);
      setShowModalPin(true);
    };

    reader.readAsDataURL(file);
  };

  function checkSize(event: React.SyntheticEvent<HTMLImageElement, Event>) {
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

  const submitHandler = async (values: PinFormValues) => {
    try {
      const pinData: Pin = {
        id: new Date().getTime().toString(),
        title: values.title,
        description: values.description,
        price: values.price,
        sizeImage: values.sizeImage,
        fileImage: values.fileImage as File,
        blobImage: previewImage as string,
      };

      props.onAdd(pinData);
      props.onShowModal(false);
    } catch (err) {
      showError((err as Error).message);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: 0,
          sizeImage: "medium",
          fileImage: null,
        }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
        validateOnChange={true}
        validateOnBlur={false}
      >
        {({
          isSubmitting,
          isValid,
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form className={classes.add_pin_modal} onSubmit={handleSubmit}>
            <div className={classes.add_pin_container}>
              <div className={classes.side} id={classes.left_side}>
                <div className={classes.section1}>
                  <div className={classes.pint_mock_icon_container}>
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
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        if (event.currentTarget.files) {
                          setFieldValue(
                            "fileImage",
                            event.currentTarget.files[0]
                          );
                          upload_img(event.currentTarget.files[0]);
                        }
                      }}
                      type="file"
                      name="fileImage"
                      id={classes.upload_img}
                    />

                    <ErrorMessage
                      name="fileImage"
                      component="div"
                      className={classes.error_message}
                    />
                  </label>

                  <div
                    className={classes.modals_pin}
                    style={{
                      display: showModalPin ? "block" : "none",
                    }}
                  >
                    <div className={classes.pin_image}>
                      <img
                        onLoad={checkSize}
                        src={previewImage}
                        alt="pin_image"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.side} id={classes.right_side}>
                <div className={classes.section1}>
                  <ErrorMessage
                    name="sizeImage"
                    component="div"
                    className={classes.error_message}
                  />
                  <div className={classes.select_size}>
                    <Field
                      component="select"
                      name="sizeImage"
                      id="pin_size"
                      onChange={handleChange}
                      value={values.sizeImage}
                      className={classes.select_element}
                    >
                      <option value="">Select</option>
                      <option value="small">small</option>
                      <option value="medium">medium</option>
                      <option value="large">large</option>
                    </Field>
                    <button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className={classes.save_pin}
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div className={`${classes.section2}`}>
                  <Field
                    name="title"
                    placeholder="Add your title"
                    type="text"
                    className={`${errors.title ? classes.error : ""} ${
                      classes.new_pin_input
                    }`}
                    id="pin_title"
                    value={values.title}
                    onChange={handleChange}
                  />
                  <Field
                    name="description"
                    placeholder="Tell everyone what your Pin is about"
                    type="text"
                    className={`${errors.description ? classes.error : ""} ${
                      classes.new_pin_input
                    }`}
                    id="pin_description"
                    value={values.description}
                    onChange={handleChange}
                  />

                  <Field
                    name="price"
                    placeholder="Price in ETH (min 0.001)"
                    type="number"
                    className={`${errors.price ? classes.error : ""} ${
                      classes.new_pin_input
                    }`}
                    id="pin_price"
                    value={values.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Modal;
