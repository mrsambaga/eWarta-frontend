import React from "react";
import "./NewsCard.scss";
import { Link } from "react-router-dom";

type NewsCardSecondaryProps = {
  id: number;
  img: string;
  alt: string;
  title: string;
  desc: string;
  author: string;
};
const NewsCardSecondary: React.FC<NewsCardSecondaryProps> = ({
  id,
  img,
  title,
  desc,
  alt,
  author,
}) => {
  return (
    <div className="card-secondary">
      <div className="card-secondary__img">
        <Link to={`/news/${id}`} className="link">
          <img src={img} alt={alt} />
        </Link>
      </div>
      <div className="card-secondary__text">
        <Link to={`/news/${id}`} className="link">
          <h3>{title}</h3>
        </Link>
        <p>{desc}</p>
        <p>
          By : <span className="author-name">{author}</span>
        </p>
      </div>
    </div>
  );
};

export default NewsCardSecondary;
