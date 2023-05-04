import React from "react";
import Form from "../../atoms/Form/Form";
import Button from "../../atoms/Button/Button";
import { ButtonProps } from "../../../constant/ButtonProps";
import { FormProps } from "../../../constant/FormProps";
import "./Card.scss";

type CardProps = {
  title: string;
  subTitle: string;
  detail: string;
  forms: FormProps[];
  button: ButtonProps;
  className: string;
};

const Card: React.FC<CardProps> = ({
  title,
  subTitle,
  detail,
  forms,
  button,
  className,
}) => {
  return (
    <div className={className}>
      <h3 className={`${className}__title`}>{title}</h3>
      <div className={`${className}__sub-title`}>
        <h3>{subTitle}</h3>
        <p>{detail}</p>
      </div>
      <div className={`${className}__forms`}>
        {forms.map((form, index) => (
          <Form key={index} {...form} />
        ))}
      </div>
      <Button
        label={button.label}
        onClickHandler={button.onClickHandler}
        className={button.className}
      />
    </div>
  );
};

export default Card;
