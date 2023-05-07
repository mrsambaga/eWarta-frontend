import React from "react";
import { ManagePostForms } from "../../../constant/NewsProps";
import "./AdminCreatePost.scss";
import ManagePost from "../../../components/template/ManagePost/ManagePost";

const AdminCreatePost: React.FC = () => {
  const initialValues: ManagePostForms = {
    title: "",
    summaryDesc: "",
    image: null,
    author: "",
    slug: "",
    content: "",
    category: "",
    type: "",
  };

  const title: string = "Create New Post";

  return (
    <div className="create-post">
      <ManagePost title={title} initialValues={initialValues} />
    </div>
  );
};

export default AdminCreatePost;
