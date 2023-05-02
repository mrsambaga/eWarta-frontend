import React from "react";
import TopStories from "../../components/organisms/TopStories/TopStories";
import "./Home.scss";
import ContentBar from "../../components/organisms/ContentBar/ContentBar";
import PostList from "../../components/organisms/PostList/PostList";

const Home: React.FC = () => {
  return (
    <div className="home">
      <TopStories />
      <ContentBar />
      <PostList />
    </div>
  );
};

export default Home;
