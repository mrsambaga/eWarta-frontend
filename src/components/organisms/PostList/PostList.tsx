import React from "react";
import "./PostList.scss";
import NewsContainer from "../../molecules/NewsContainer/NewsContainer";
import spacexImg from "../../../img/spacex.png";

const PostList: React.FC = () => {
  return (
    <div className="post-list">
      <div className="post-list__title">
        <h3>More News</h3>
        <div className="top-stories__title__line"></div>
      </div>
      <div className="post-list__container">
        <div className="post-list__container__left">
          <h3>LEFT</h3>
          <NewsContainer
            news={[
              {
                img: spacexImg,
                alt: "strike",
                title: "What happens if there’s a Hollywood writers strike?",
                desc: "It’s been 15 years since the last WGA strike, and the stakes are far greater.",
              },
            ]}
            className="main"
            type="secondary"
          />
        </div>
        <div className="post-list__container__right">
          <h3>RIGHT</h3>
        </div>
      </div>
    </div>
  );
};

export default PostList;
