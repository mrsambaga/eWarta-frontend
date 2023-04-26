import React from "react";
import "./TitleBox.scss";

type TitleBoxProps = {
  label: string;
  className: string;
};

const TitleBox: React.FC<TitleBoxProps> = ({ label, className }) => {
  return (
    <div className={className}>
      <h3>{label}</h3>
    </div>
  );
};

export default TitleBox;
