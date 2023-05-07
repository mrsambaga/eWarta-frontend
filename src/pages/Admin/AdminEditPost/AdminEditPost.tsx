import React from "react";
import { useParams } from "react-router-dom";

const AdminEditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return <div>AdminEditPost {id}</div>;
};

export default AdminEditPost;
