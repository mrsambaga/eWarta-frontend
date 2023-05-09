import React, { useEffect } from "react";
import "./Detail.scss";
import { NewsDetail, NewsDetailResponse } from "../../constant/NewsProps";
import useFetchGet from "../../hooks/UseFetchGet";
import { GetCookie } from "../../utils/Cookies/Cookies";
import { notifyError } from "../../components/atoms/Toastify/Toastify";
import { useDispatch, useSelector } from "react-redux";
import { newsDetailActions } from "../../store/NewsDetailSlice";
import { RootState } from "../../store/IndexStore";
import { useNavigate, useParams } from "react-router-dom";
import { ApiUrl } from "../../utils/ApiUrl/ApiUrl";

const Detail: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = GetCookie("token");
  const { id } = useParams<{ id: string }>();

  const { title, summaryDesc, imgUrl, author, content } = useSelector(
    (state: RootState) => state.newsDetail.newsDetail
  );

  const { out, loading, error } = useFetchGet<{
    code: string;
    data: NewsDetailResponse;
    message: string;
  }>(`${ApiUrl}/news/${id}`, token);

  useEffect(() => {
    console.log(out);

    if (error) {
      const errorMessage = error.response?.data || error.message;
      notifyError(JSON.stringify(errorMessage));
      return;
    } else if (out != null && out.code === "SUCCESS_ACCESSED") {
      navigate("/not-found");
    } else if (out != null && out.data != null) {
      console.log(out);
      const newsDetail: NewsDetail = {
        title: out.data.title,
        summaryDesc: out.data.summary_desc,
        imgUrl: out.data.img_url,
        author: out.data.author,
        content: out.data.content,
      };

      dispatch(newsDetailActions.setNewsDetail(newsDetail));
      console.log(title, summaryDesc, imgUrl, author, content);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, error]);

  return (
    <div className="detail">
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <div className="detail__title">
            <h1>{title}</h1>
            <h3>{summaryDesc}</h3>
            <h3 className="author">
              By <span className="author__name">{author}</span>
            </h3>
          </div>
          <div className="detail__main-section">
            <div className="detail__main-section__left">
              <div className="detail__main-section__left__image">
                <img src={imgUrl} alt={title} />
              </div>
              <div
                className="detail__main-section__left__content"
                dangerouslySetInnerHTML={{ __html: `<div>${content}</div>` }}
              />
            </div>
            <div className="detail__main-section__right"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
