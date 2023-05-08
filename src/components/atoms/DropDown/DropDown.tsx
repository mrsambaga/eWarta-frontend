import React, { useState } from "react";
import { DropdownOption } from "../../../constant/DropDown";
import "./DropDown.scss";

export type DropdownProps = {
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  dropdownOptions: DropdownOption[];
  className: string;
  defaultValue?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  onChange,
  dropdownOptions,
  className,
  defaultValue,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event);
  };

  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  return (
    <div className={className}>
      <select
        onChange={handleSelectChange}
        className={dropdownOptions[0].value}
        value={selectedValue}
      >
        {dropdownOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.content}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
