import React, { useEffect, useState } from "react";
import { GetCookie } from "../../../utils/Cookies/Cookies";
import useFetchGet from "../../../hooks/UseFetchGet";
import { News } from "../../../constant/NewsProps";
import { notifyError } from "../../atoms/Toastify/Toastify";
import { useDispatch, useSelector } from "react-redux";
import { newsActions } from "../../../store/NewsSlice";
import { RootState } from "../../../store/IndexStore";
import "./PostTable.scss";
import moment from "moment";
import Button from "../../atoms/Button/Button";
import useFetchPost from "../../../hooks/UseFetchPost";
import { useNavigate } from "react-router-dom";

const Table: React.FC = () => {
  const token = GetCookie("admin-token");
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState<boolean>(false);
  const { out, error } = useFetchGet<{
    data: News[];
  }>(`http://localhost:8000/news`, token, undefined, refresh);

  const { news } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    if (error) {
      const errorMessage = error.response?.data || error.message;
      notifyError(JSON.stringify(errorMessage));
      return;
    }

    if (out != null && out.data != null) {
      console.log(out);
      const News: News[] = out.data.map((item) => {
        const dateTime = moment(item.createdAt).format("HH:mm - DD MMMM YYYY");

        return {
          postId: item.postId,
          title: item.title,
          summaryDesc: item.summaryDesc,
          imgUrl: item.imgUrl,
          author: item.author,
          categoryId: item.categoryId,
          typeId: item.typeId,
          slug: item.slug,
          content: item.content,
          createdAt: dateTime,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        };
      });

      dispatch(newsActions.setNews(News));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, error]);

  const adminToken = GetCookie("admin-token");
  const [submit, setSubmit] = useState<boolean>(false);
  const [postId, setPostId] = useState<number | null>(null);
  const { out: deleteOut, error: deleteError } = useFetchPost(
    "http://localhost:8000/news/delete",
    { postId: postId },
    submit,
    () => setSubmit(false),
    adminToken
  );

  useEffect(() => {
    if (deleteError != null) {
      notifyError(deleteError.response?.data?.message || deleteError.message);
    } else if (deleteOut != null) {
      setRefresh(!refresh);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteError, deleteOut]);

  const deleteClickhandler = (id: number) => {
    setPostId(id);
    setSubmit(true);
  };

  const navigate = useNavigate();
  const editClickHandler = (id: number) => {
    navigate(`/admin/posts/edit/${id}`);
  };

  return (
    <div className="table-container">
      <table className="table table-bordered table-striped">
        <thead className="table__head">
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Created At</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table__body">
          {news.map((item) => (
            <tr key={item.postId}>
              <td>{item.postId}</td>
              <td className="table__body__title">{item.title}</td>
              <td>{item.author}</td>
              <td>{item.createdAt}</td>
              <td className="table__body__button">
                <Button
                  label="Edit"
                  onClickHandler={() => editClickHandler(item.postId)}
                  className="table-button"
                />
                <Button
                  label="Delete"
                  onClickHandler={() => deleteClickhandler(item.postId)}
                  className="table-button"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
