import React, { CSSProperties, useEffect, useState } from "react";
import Form from "../../../components/atoms/Form/Form";
import { FormProps } from "../../../constant/FormProps";
import "./ManagePost.scss";
import Button from "../../../components/atoms/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Filter from "../../../components/molecules/Filter/Filter";
import { DropdownProps } from "../../../components/atoms/DropDown/DropDown";
import { CategoryDropdown, PostTypeDropdown } from "../../../constant/DropDown";
import ImageInput from "../../../components/molecules/ImageInput/ImageInput";
import useFetchPost from "../../../hooks/UseFetchPost";
import {
  NotifContainer,
  notifyError,
  notifySuccess,
} from "../../../components/atoms/Toastify/Toastify";
import { GetCookie } from "../../../utils/Cookies/Cookies";
import { ManagePostForms } from "../../../constant/NewsProps";
import { ClipLoader } from "react-spinners";
import { ApiUrl } from "../../../utils/ApiUrl/ApiUrl";

type ManagePostProps = {
  title: string;
  initialValues: ManagePostForms;
  type: string;
};

const ManagePost: React.FC<ManagePostProps> = ({
  title,
  initialValues,
  type,
}) => {
  const token = GetCookie("admin-token");

  /* ----------- Forms --------------  */

  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [newPost, setNewPost] = useState<ManagePostForms>(initialValues);

  const handleNewPostChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string
  ) => {
    if (event.target instanceof HTMLInputElement && event.target.files) {
      const newPostProps = {
        ...newPost,
        [key]: event.target.files[0],
      };
      setNewPost(newPostProps);
      const url = URL.createObjectURL(event.target.files[0]);
      setImgUrl(url);
      console.log(newPost);
      return;
    }

    const newPostProps = {
      ...newPost,
      [key]: event.target.value,
    };
    setNewPost(newPostProps);
  };

  const createPostFormProps: FormProps[] = [
    {
      placeholder: "Title",
      inputType: "text",
      className: "auth-form",
      name: "title",
      onChangeProp: (event: React.ChangeEvent<HTMLInputElement>) =>
        handleNewPostChange(event, "title"),
      value: newPost.title,
      validate: type === "create" ? true : false,
    },
    {
      placeholder: "Summary Description",
      inputType: "text",
      className: "auth-form",
      name: "summary",
      onChangeProp: (event: React.ChangeEvent<HTMLInputElement>) =>
        handleNewPostChange(event, "summaryDesc"),
      value: newPost.summaryDesc,
      validate: type === "create" ? true : false,
    },
    {
      placeholder: "Author",
      inputType: "text",
      className: "auth-form",
      name: "author",
      onChangeProp: (event: React.ChangeEvent<HTMLInputElement>) =>
        handleNewPostChange(event, "author"),
      value: newPost.author,
      validate: type === "create" ? true : false,
    },
    {
      placeholder: "Slug",
      inputType: "text",
      className: "auth-form",
      name: "slug",
      onChangeProp: (event: React.ChangeEvent<HTMLInputElement>) =>
        handleNewPostChange(event, "slug"),
      value: newPost.slug,
      validate: type === "create" ? true : false,
    },
  ];

  /* ----------- Dropdown Props --------------  */

  const categoryDropdownProps: DropdownProps = {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
      handleNewPostChange(event, "category"),
    dropdownOptions: CategoryDropdown,
    className: "new-post-dropdown",
    defaultValue: newPost.category,
  };

  const postTypeDropdownProps: DropdownProps = {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
      handleNewPostChange(event, "type"),
    dropdownOptions: PostTypeDropdown,
    className: "new-post-dropdown",
    defaultValue: newPost.type,
  };

  /* ----------- Quill Text Editor --------------  */

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["clean"],
    ],
  };
  const { quill, quillRef } = useQuill({ modules });

  useEffect(() => {
    if (quill) {
      quill.setContents(quill.clipboard.convert(newPost.content));
      quill.on("text-change", () => {
        const key: string = "content";
        const newPostContent: ManagePostForms = {
          ...newPost,
          [key]: quillRef.current.firstChild.innerHTML,
        };
        // setNewPost(newPostContent);
        setNewPost((prevState) => ({ ...prevState, ...newPostContent }));
        console.log(newPost);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill]);

  /* ----------- Button Handler --------------  */

  const backClickHandler = () => {
    navigate("/admin/posts");
  };

  const submitClickHandler = () => {
    console.log("BODY : ", body);

    if (type === "create") {
      setSubmit(true);
      return;
    } else if (type === "edit") {
      setEditSubmit(true);
      return;
    }
  };

  /* ----------- Fetch Api Create New Post --------------  */
  const [submit, setSubmit] = useState<boolean>(false);
  const body = new FormData();
  body.append("title", newPost.title);
  body.append("summaryDesc", newPost.summaryDesc);
  body.append("image", newPost.image!);
  body.append("author", newPost.author);
  body.append("slug", newPost.slug);
  body.append("content", quillRef.current?.firstChild?.innerHTML);
  body.append("category", newPost.category);
  body.append("type", newPost.type);

  const {
    out: NewPostOut,
    loading: NewPostLoading,
    error: NewPostError,
  } = useFetchPost(
    ApiUrl + "/news",
    body,
    submit,
    () => setSubmit(false),
    token,
    "multipart/form-data"
  );

  useEffect(() => {
    if (NewPostError != null) {
      notifyError(NewPostError.response?.data?.message || NewPostError.message);
    } else if (NewPostOut != null) {
      notifySuccess(NewPostOut.message);
    }
  }, [NewPostOut, NewPostError]);

  /* ----------- Fetch Api Edit Post --------------  */
  const [editSubmit, setEditSubmit] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  const {
    out: EditPostOut,
    loading: EditPostLoading,
    error: EditPostError,
  } = useFetchPost(
    ApiUrl + `/news/${id}`,
    body,
    editSubmit,
    () => setEditSubmit(false),
    token,
    "multipart/form-data",
    "put"
  );

  useEffect(() => {
    if (EditPostError != null) {
      notifyError(
        EditPostError.response?.data?.message || EditPostError.message
      );
    } else if (EditPostOut != null) {
      notifySuccess(EditPostOut.message);
    }
  }, [EditPostOut, EditPostError]);

  const override: CSSProperties = {
    display: "block",
    margin: "auto",
  };

  return (
    <div className="create-post">
      {(NewPostLoading || EditPostLoading) && <div className="overlay" />}
      <div className="create-post__spinner">
        <ClipLoader
          color={"#fff104"}
          loading={NewPostLoading || EditPostLoading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      <div className="create-post__title">
        <h1>{title}</h1>
      </div>
      <div className="create-post__forms">
        {createPostFormProps.map((formProp) => (
          <div key={formProp.name} className="create-post__forms__item">
            <h3>{formProp.placeholder}</h3>
            <Form
              placeholder={formProp.placeholder}
              inputType={formProp.inputType}
              className="auth-form"
              name={formProp.name}
              value={formProp.value}
              onChangeProp={formProp.onChangeProp}
              validate={true}
            />
          </div>
        ))}
        <Filter
          label="Category"
          type="dropdown"
          props={categoryDropdownProps}
        />
        <Filter label="Type" type="dropdown" props={postTypeDropdownProps} />
        <div className="create-post__forms__image">
          <h3>Image</h3>
          <ImageInput
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleNewPostChange(e, "image")
            }
            url={
              newPost.imageUrl && imgUrl
                ? imgUrl
                : newPost.imageUrl
                ? newPost.imageUrl
                : imgUrl
            }
          />
        </div>
        <div className="create-post__forms__quill">
          <h3>Content</h3>
          <div ref={quillRef} />
        </div>
      </div>
      <div className="create-post__button">
        <Button
          label="Back"
          onClickHandler={backClickHandler}
          className="create-post-button"
        />
        <Button
          label="Submit"
          onClickHandler={submitClickHandler}
          className="create-post-button"
        />
      </div>
      <NotifContainer />
    </div>
  );
};

export default ManagePost;
