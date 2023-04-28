import React, { useState } from "react";
import "./Form.scss";
import { FormProps } from "../../../constant/FormProps";

const Form: React.FC<FormProps> = ({
  placeholder,
  value,
  inputType,
  onChangeHandler,
  isReadOnly = false,
  className,
}) => {
  const [, setActivity] = useState(value);
  const [, setShowError] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setActivity(newValue);
    setShowError(false);
    if (onChangeHandler) {
      onChangeHandler(event);
    }
  };

  return (
    <div className="form">
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
        className={className}
        readOnly={isReadOnly}
      />
    </div>
  );
};

export default Form;
