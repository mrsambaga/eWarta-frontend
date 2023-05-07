import React from "react";
import "./AdminPost.scss";
import Table from "../../../components/organisms/PostTable/PostTable";
import Button from "../../../components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";

const AdminPost: React.FC = () => {
  const navigate = useNavigate();
  const createPostHandler = () => {
    navigate("/admin/posts/create");
  };

  return (
    <div className="admin-post">
      <div className="admin-post__title">
        <h1>Manage Post</h1>
      </div>
      <div className="admin-post__content">
        <Button
          label="Create New Post"
          onClickHandler={createPostHandler}
          className="create-post-button"
        />
        <Table />
      </div>
    </div>
  );
};

export default AdminPost;
