import React from "react";
import TopStories from "../../components/organisms/TopStories/TopStories";
import "./Home.scss";

const Home: React.FC = () => {
  return (
    <div className="home">
      <TopStories />
    </div>
  );
};

export default Home;
