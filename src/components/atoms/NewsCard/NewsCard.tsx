import React from "react";

type NewsCardProps = {
  img: string;
  alt: string;
  title: string;
  desc: string;
};
const NewsCard: React.FC<NewsCardProps> = ({ img, title, desc, alt }) => {
  return (
    <div>
      <img src={img} alt={alt} />
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
};

export default NewsCard;
