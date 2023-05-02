import React, { useEffect } from "react";
import "./PostList.scss";
import NewsContainer from "../../molecules/NewsContainer/NewsContainer";
import useFetchGet from "../../../hooks/UseFetchGet";
import { GetCookie } from "../../../utils/Cookies/Cookies";
import {
  NewsHighlight,
  NewsHighlightResponse,
} from "../../../constant/NewsProps";
import { notifyError } from "../../atoms/Toastify/Toastify";
import { useDispatch, useSelector } from "react-redux";
import { newsHighlightActions } from "../../../store/NewsHighlightSlice";
import { RootState } from "../../../store/Index";

const PostList: React.FC = () => {
  const { newsHighlight } = useSelector(
    (state: RootState) => state.newsHighlight
  );
  const dispatch = useDispatch();
  const token = GetCookie("token");

  const { out, loading, error } = useFetchGet<{
    data: NewsHighlightResponse[];
  }>(`http://localhost:8000/news/highlight`, token!);

  useEffect(() => {
    if (error) {
      const errorMessage = error.response?.data || error.message;
      notifyError(JSON.stringify(errorMessage));
      return;
    }

    if (out != null && out.data != null) {
      console.log(out);
      const NewsHighlight: NewsHighlight[] = out.data.map((item) => {
        return {
          title: item.title,
          desc: item.summary_desc,
          img: item.img_url,
          alt: item.title,
        };
      });

      dispatch(newsHighlightActions.setNewsHighlight(NewsHighlight));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, error]);

  return (
    <div className="post-list">
      <div className="post-list__title">
        <h3>More News</h3>
        <div className="top-stories__title__line"></div>
      </div>
      <div className="post-list__container">
        <div className="post-list__container__left">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <NewsContainer
                news={newsHighlight}
                className="main"
                type="secondary"
              />
            </>
          )}
        </div>
        <div className="post-list__container__right"></div>
      </div>
    </div>
  );
};

export default PostList;
