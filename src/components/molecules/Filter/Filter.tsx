import React from "react";
import Form from "../../atoms/Form/Form";
import { FormProps } from "../../../constant/FormProps";
import "./Filter.scss";

type FilterProps = {
  label: string;
  type: string;
  props: FormProps;
};

const Filter: React.FC<FilterProps> = ({ label, type, props }) => {
  return (
    <div className="filter-section">
      <h3>{label}</h3>
      {type === "filter" ? (
        <Form {...props} />
      ) : type === "sort" ? (
        // <Dropdown {...props} />
        <h3>Test</h3>
      ) : (
        <p>Invalid type: {type}</p>
      )}
    </div>
  );
};

export default Filter;
