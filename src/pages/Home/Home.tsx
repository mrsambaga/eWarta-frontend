import React from "react";
import TopStories from "../../components/organisms/TopStories/TopStories";
import "./Home.scss";
import ContentBar from "../../components/organisms/ContentBar/ContentBar";

const Home: React.FC = () => {
  return (
    <div className="home">
      <TopStories />
      <ContentBar />
    </div>
  );
};

export default Home;
