import React from "react";
import "./NewsContainer.scss";
import NewsCardPrimary from "../../atoms/NewsCard/NewsCardPrimary";
import NewsCardSecondary from "../../atoms/NewsCard/NewsCardSecondary";
import { NewsHighlight } from "../../../constant/NewsProps";

type NewsContainerProps = {
  news: NewsHighlight[];
  className: string;
  type: string;
};

const NewsContainer: React.FC<NewsContainerProps> = ({
  news,
  className,
  type,
}) => {
  const getCardComponent = (type: string) => {
    switch (type) {
      case "primary":
        return NewsCardPrimary;
      case "secondary":
        return NewsCardSecondary;
      default:
        return NewsCardPrimary;
    }
  };

  const CardComponent = getCardComponent(type);

  return (
    <div className={className}>
      {news.map((newsItem) => (
        <CardComponent
          key={newsItem.id}
          id={newsItem.id}
          img={newsItem.img}
          alt={newsItem.alt!}
          title={newsItem.title}
          desc={newsItem.desc}
          author={newsItem.author}
        />
      ))}
    </div>
  );
};

export default NewsContainer;
