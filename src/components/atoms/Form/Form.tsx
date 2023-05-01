import React, { useState } from "react";
import "./Form.scss";
import { FormProps } from "../../../constant/FormProps";

const Form: React.FC<FormProps> = ({
  placeholder,
  value,
  inputType,
  onChangeProp,
  isReadOnly = false,
  className,
  name,
}) => {
  const [activity, setActivity] = useState(value);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setActivity(newValue);
    setShowError(false);
    if (onChangeProp) {
      onChangeProp(event);
    }
  };

  const handleBlur = () => {
    if (!activity) {
      setErrorMessage("This field is required");
      setShowError(true);
    }
  };

  return (
    <div className="form">
      <input
        type={inputType}
        placeholder={placeholder}
        value={activity}
        onChange={handleOnChange}
        className={`${className} ${showError ? "show-error" : ""}`}
        readOnly={isReadOnly}
        onBlur={handleBlur}
        name={name}
      />
      {showError && <div className="form__error">{errorMessage}</div>}
    </div>
  );
};

export default Form;
