import React from "react";
import "./AdminPost.scss";

const AdminPost: React.FC = () => {
  return (
    <div className="admin-post">
      <div className="admin-post__title">
        <h1>Manage Post</h1>
      </div>
      <div className="admin-post__content"></div>
    </div>
  );
};

export default AdminPost;
