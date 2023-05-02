import React from "react";

type NewsCardPrimaryProps = {
  img: string;
  alt: string;
  title: string;
  desc: string;
};
const NewsCardPrimary: React.FC<NewsCardPrimaryProps> = ({
  img,
  title,
  desc,
  alt,
}) => {
  return (
    <div>
      <img src={img} alt={alt} />
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
};

export default NewsCardPrimary;
