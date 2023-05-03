import React from "react";
import Form from "../../atoms/Form/Form";
import { FormProps } from "../../../constant/FormProps";
import "./Filter.scss";
import Dropdown, { DropdownProps } from "../../atoms/DropDown/DropDown";

type FilterProps = {
  label: string;
  type: string;
  props: FormProps | DropdownProps;
};

const Filter: React.FC<FilterProps> = ({ label, type, props }) => {
  return (
    <div className="filter-section">
      <h3>{label}</h3>
      {type === "form" ? (
        <Form {...(props as FormProps)} />
      ) : type === "dropdown" ? (
        <Dropdown {...(props as DropdownProps)} />
      ) : (
        <p>Invalid type: {type}</p>
      )}
    </div>
  );
};

export default Filter;
