import React, { useEffect, useState } from "react";
import "./TopStories.scss";
import NewsContainer from "../../molecules/NewsContainer/NewsContainer";
import { useDispatch, useSelector } from "react-redux";
import { GetCookie } from "../../../utils/Cookies/Cookies";
import useFetchGet from "../../../hooks/UseFetchGet";
import { News, NewsHighlight } from "../../../constant/NewsProps";
import { ApiUrl } from "../../../utils/ApiUrl/ApiUrl";
import { notifyError } from "../../atoms/Toastify/Toastify";
import { newsActions } from "../../../store/NewsSlice";
import { RootState } from "../../../store/IndexStore";

const TopStories: React.FC = () => {
  const dispatch = useDispatch();
  const token = GetCookie("token");
  const { news } = useSelector((state: RootState) => state.news);
  const { out, loading, error } = useFetchGet<{
    data: News[];
  }>(`${ApiUrl}/news`, token);

  useEffect(() => {
    console.log(out, error);
    if (error != null) {
      const errorMessage = error.response?.data || error.message;
      notifyError(JSON.stringify(errorMessage));
      return;
    }

    if (out != null && out.data != null) {
      console.log(out);
      const News: News[] = out.data.map((item) => {
        return {
          postId: item.postId,
          title: item.title,
          summaryDesc: item.summaryDesc,
          imgUrl: item.imgUrl,
          author: item.author,
          categoryId: item.categoryId,
          typeId: item.typeId,
          category: item.category,
          type: item.type,
          slug: item.slug,
          content: item.content,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        };
      });

      dispatch(newsActions.setNews(News));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, error]);

  const [newsHighlight, setNewsHighlight] = useState<NewsHighlight[]>([]);
  useEffect(() => {
    console.log(news);
    const newsHighlightDTO: NewsHighlight[] = news.map((item) => {
      const { postId, title, summaryDesc, imgUrl, author } = item;
      return {
        id: postId,
        title: title,
        desc: summaryDesc,
        img: imgUrl,
        author: author,
      };
    });
    setNewsHighlight(newsHighlightDTO);
  }, [news]);

  return (
    <div className="top-stories">
      <div className="top-stories__title">
        <div className="top-stories__title__line"></div>
        <h3>TOP STORIES</h3>
        <div className="top-stories__title__line"></div>
      </div>
      <div className="top-stories__content">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <NewsContainer
              news={newsHighlight}
              className="double"
              type="primary"
              from={0}
              to={2}
            />
            <NewsContainer
              news={newsHighlight}
              className="single"
              type="primary"
              from={2}
              to={3}
            />
            <NewsContainer
              news={newsHighlight}
              className="double"
              type="primary"
              from={3}
              to={5}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TopStories;
