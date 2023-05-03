import React from "react";
import "./Detail.scss";

const Detail: React.FC = () => {
  //   const { out, loading, error } = useFetchGet<{
  //     data: NewsHighlightResponse[];
  //   }>(`http://localhost:8000/news/highlight`, token, param);

  //   useEffect(() => {
  //     if (error) {
  //       const errorMessage = error.response?.data || error.message;
  //       notifyError(JSON.stringify(errorMessage));
  //       return;
  //     }

  //     if (out != null && out.data != null) {
  //       console.log(out);
  //       const NewsHighlight: NewsHighlight[] = out.data.map((item) => {
  //         return {
  //           title: item.title,
  //           desc: item.summary_desc,
  //           img: item.img_url,
  //           alt: item.title,
  //           author: item.author,
  //         };
  //       });

  //       dispatch(newsHighlightActions.setNewsHighlight(NewsHighlight));
  //     }

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [out, error]);

  return (
    <div className="detail">
      <div className="detail__title">
        <h1>Title</h1>
        <h3>Subtitle</h3>
        <h3>Author</h3>
      </div>
      <div className="detail__main-section">
        <div className="detail__main-section__left">
          <div className="detail__main-section__left__image">
            <img src="" alt="" />
          </div>
          <div className="detail__main-section__left__content">
            <h3>LEFT</h3>
          </div>
        </div>
        <div className="detail__main-section__right">
          <h3>RIGHT</h3>
        </div>
      </div>
    </div>
  );
};

export default Detail;
