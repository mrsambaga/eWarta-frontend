import React from "react";
import { useParams } from "react-router-dom";
import { ManagePostForms } from "../../../constant/NewsProps";
import ManagePost from "../../../components/template/ManagePost/ManagePost";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/IndexStore";

const AdminEditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { news } = useSelector((state: RootState) => state.news);
  const editedNews = news.find((item) => item.postId === parseInt(id!));

  const initialValues: ManagePostForms = {
    title: editedNews?.title || "",
    summaryDesc: editedNews?.summaryDesc || "",
    author: editedNews?.author || "",
    slug: editedNews?.slug || "",
    content: editedNews?.content || "",
    category: editedNews?.category || "",
    type: editedNews?.type || "",
    imageUrl: editedNews?.imgUrl,
    typeId: editedNews?.typeId || "",
    categoryId: editedNews?.categoryId || "",
  };

  const title: string = "Edit Post";

  return (
    <div className="create-post">
      <ManagePost title={title} initialValues={initialValues} type="edit" />
    </div>
  );
};

export default AdminEditPost;
