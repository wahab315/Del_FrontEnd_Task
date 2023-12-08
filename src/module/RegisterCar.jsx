import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import FormData from "form-data";
import {
  Heading,
  InputField,
  Button,
  Navbar,
  ImagePreview,
} from "../components";
import { carRegistrationForm } from "../data/validation";
import RegisterCarControler from "../controllers/registerCarController";
import ToastController from "../controllers/ToastController";

const RegisterCar = () => {
  // Image Upload
  const [processing, setProcessing] = useState(false);
  const imageRef = useRef();

 

  const handleRegisterCar = (data) => {
    console.log(data, "@Data...");
    const formData = new FormData();

    // Append form data to the FormData object
    formData.append("model", data.model);
    formData.append("price", data.price);
    formData.append("phone", data.phone);

    // Append each image file to the FormData object

    const fileInput = document.getElementById("file-input");

    if (fileInput.files.length > 0) {
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append("images", fileInput.files[i]);
      }
    }
    setProcessing(true);

    RegisterCarControler.registerCar(formData)
      .then((res) => {
        ToastController.success("Car Registered Successfully!");
        console.log(res, "@car register res");
      })
      .catch((err) => {
        console.log("@car register err...", err);
        ToastController.error(err?.message || "Network Error");
      })
      .finally(() => setProcessing(false));
  };

  return (
    <>
      <Navbar />
      <Heading>Sale a car</Heading>

      <div className="informationform">
        <div className="informationform-container">
          <Formik
            initialValues={{
              model: "",
              price: "",
              phone: "",
              images: [],
            }}
            validateOnMount
            validationSchema={carRegistrationForm}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              handleRegisterCar(values);
              resetForm();
            }}
          >
            {(formik) => (
              <Form>
                <InputField
                  name="model"
                  label="Car modal"
                  place="Enter car modal"
                  type="text"
                />
                <InputField
                  name="price"
                  label="Car price"
                  place="Enter car price"
                  type="number"
                />
                <InputField
                  name="phone"
                  label="Phone number"
                  place="Enter phone number"
                  type="text"
                />
                {/* Images Upload  */}
                <center>
                  <div
                    className="upload-button"
                    onClick={() => imageRef.current.click()}
                  >
                    Upload images
                  </div>
                  <p className="notice">Maximum 10 images allowed</p>
                </center>
                <div style={{ display: "none" }}>
                  <input
                    type="file"
                    name="images[]"
                    id="file-input"
                    ref={imageRef}
                    onChange={(event) => {
                      const newImages = Array.from(event.target.files).map(
                        (file) => URL.createObjectURL(file)
                      );
                      formik.setFieldValue("images", [
                        ...formik.values.images,
                        ...newImages,
                      ]);
                    }}
                    multiple
                  />
                </div>

                {/* Image Preview Section  */}
                {formik.values.images.length > 0 && (
                  <ImagePreview images={formik.values.images} />
                )}

                <Button disabled={processing}>
                  {processing ? "Loading..." : "Submit"}{" "}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default RegisterCar;
