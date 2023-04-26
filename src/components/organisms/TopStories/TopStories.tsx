import React from "react";
import "./TopStories.scss";

const TopStories: React.FC = () => {
  return (
    <div className="top-stories">
      <div className="top-stories__title">
        <div className="top-stories__title__line"></div>
        <h3>Top Stories</h3>
        <div className="top-stories__title__line"></div>
      </div>
    </div>
  );
};

export default TopStories;
