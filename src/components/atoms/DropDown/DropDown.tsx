import React from "react";
import { DropdownOption } from "../../../constant/DropDown";
import "./DropDown.scss";

export type DropdownProps = {
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  dropdownOptions: DropdownOption[];
  className: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  onChange,
  dropdownOptions,
  className,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
  };

  return (
    <div className={className}>
      <select
        onChange={handleSelectChange}
        className={dropdownOptions[0].value}
        defaultValue={dropdownOptions[0].value}
      >
        <option disabled value="" className="option"></option>
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
