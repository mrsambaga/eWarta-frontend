import React from "react";
import "./NewsCard.scss";

type NewsCardSecondaryProps = {
  img: string;
  alt: string;
  title: string;
  desc: string;
};
const NewsCardSecondary: React.FC<NewsCardSecondaryProps> = ({
  img,
  title,
  desc,
  alt,
}) => {
  return (
    <div className="card-secondary">
      <div className="card-secondary__img">
        <img src={img} alt={alt} />
      </div>
      <div className="card-secondary__text">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default NewsCardSecondary;
