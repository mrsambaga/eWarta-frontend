import React from "react";
import NewsCard from "../../atoms/NewsCard/NewsCard";
import "./NewsContainer.scss";

type NewsContainerProps = {
  news: {
    img: string;
    alt: string;
    title: string;
    desc: string;
  }[];
  type: string;
};

const NewsContainer: React.FC<NewsContainerProps> = ({ news, type }) => {
  return (
    <div className={type}>
      {news.map((newsItem) => (
        <NewsCard
          img={newsItem.img}
          alt={newsItem.alt}
          title={newsItem.title}
          desc={newsItem.desc}
        />
      ))}
    </div>
  );
};

export default NewsContainer;
