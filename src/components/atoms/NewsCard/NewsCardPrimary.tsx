import React from "react";
import "./NewsCard.scss";

type NewsCardPrimaryProps = {
  img: string;
  alt: string;
  title: string;
  desc: string;
  author: string;
};
const NewsCardPrimary: React.FC<NewsCardPrimaryProps> = ({
  img,
  title,
  desc,
  alt,
  author,
}) => {
  return (
    <div className="card-primary">
      <img src={img} alt={alt} />
      <h3>{title}</h3>
      <p>{desc}</p>
      <p>
        By : <span className="author-name">{author}</span>
      </p>
    </div>
  );
};

export default NewsCardPrimary;
