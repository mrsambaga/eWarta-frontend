import React, { useState } from "react";
import "./Form.scss";

type FormProps = {
  placeholder: string;
  inputType: string;
  value?: string | number;
  isReadOnly?: boolean;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
};

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
