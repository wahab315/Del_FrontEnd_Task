import React from "react";
import { ErrorMessage, useField } from "formik";
import { useState } from "react";
const InputField = ({ label, place, className, ...props }) => {
  const [field, meta] = useField(props);
  const [value, setValue] = useState("");
  return (
    <>
      <div className="forminput-container">
        <label
          htmlFor={field.name}
          className={`form-label ${value !== "" && "form-label-input-value"}`}
        >
          {label}
        </label>
        <input
          placeholder={place}
          type="text"
          style={{
            border:
              meta.touched &&
              meta.error &&
              "0.37px solid rgba(255, 0, 0, 0.65)",
          }}
          {...field}
          {...props}
          autoComplete="off"
          onChangeCapture={(e) => setValue(e.target.value)}
        />
        <div className="form-error">
          <ErrorMessage component="div" name={field.name} />
        </div>
      </div>
    </>
  );
};

export default InputField;
