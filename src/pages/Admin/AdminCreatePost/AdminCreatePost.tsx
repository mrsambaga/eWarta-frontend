import React, { useEffect, useState } from "react";
import Form from "../../../components/atoms/Form/Form";
import { CreateNewPost } from "../../../constant/NewsProps";
import { FormProps } from "../../../constant/FormProps";
import "./AdminCreatePost.scss";
import Button from "../../../components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
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

const AdminCreatePost: React.FC = () => {
  const token = GetCookie("admin-token");

  /* ----------- Forms --------------  */

  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [newPost, setNewPost] = useState<CreateNewPost>({
    title: "",
    summaryDesc: "",
    image: null,
    author: "",
    slug: "",
    content: "",
    category: "",
    type: "",
  });

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
    console.log(newPostProps);
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
      validate: true,
    },
    {
      placeholder: "Summary Description",
      inputType: "text",
      className: "auth-form",
      name: "summary",
      onChangeProp: (event: React.ChangeEvent<HTMLInputElement>) =>
        handleNewPostChange(event, "summaryDesc"),
      value: newPost.summaryDesc,
      validate: true,
    },
    {
      placeholder: "Author",
      inputType: "text",
      className: "auth-form",
      name: "author",
      onChangeProp: (event: React.ChangeEvent<HTMLInputElement>) =>
        handleNewPostChange(event, "author"),
      value: newPost.author,
      validate: true,
    },
    {
      placeholder: "Slug",
      inputType: "text",
      className: "auth-form",
      name: "slug",
      onChangeProp: (event: React.ChangeEvent<HTMLInputElement>) =>
        handleNewPostChange(event, "slug"),
      value: newPost.slug,
      validate: true,
    },
  ];

  /* ----------- Dropdown Props --------------  */

  const categoryDropdownProps: DropdownProps = {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
      handleNewPostChange(event, "category"),
    dropdownOptions: CategoryDropdown.slice(1),
    className: "new-post-dropdown",
  };

  const postTypeDropdownProps: DropdownProps = {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
      handleNewPostChange(event, "type"),
    dropdownOptions: PostTypeDropdown.slice(1),
    className: "new-post-dropdown",
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
      quill.on("text-change", () => {
        const key: string = "content";
        const newPostContent: CreateNewPost = {
          ...newPost,
          [key]: quillRef.current.firstChild.innerHTML,
        };
        setNewPost(newPostContent);
        console.log(newPost);
      });
    }
  }, [quill, quillRef, newPost]);

  /* ----------- Button Handler --------------  */

  const backClickHandler = () => {
    navigate("/admin/posts");
  };

  const submitClickHandler = () => {
    setSubmit(true);
  };

  /* ----------- Fetch Api Create New Post --------------  */
  const [submit, setSubmit] = useState<boolean>(false);

  const body = new FormData();
  body.append("title", newPost.title);
  body.append("summaryDesc", newPost.summaryDesc);
  body.append("image", newPost.image!);
  body.append("author", newPost.author);
  body.append("slug", newPost.slug);
  body.append("content", newPost.content);
  body.append("category", newPost.category);
  body.append("type", newPost.type);

  const { out, error } = useFetchPost(
    "http://localhost:8000/news",
    body,
    submit,
    () => setSubmit(false),
    token,
    "multipart/form-data"
  );

  useEffect(() => {
    console.log("OUT :", out);
    console.log("ERROR :", error);
    if (error != null) {
      notifyError(error.response?.data?.message || error.message);
    } else if (out != null) {
      notifySuccess(out.message);
    }
  }, [out, error]);

  return (
    <div className="create-post">
      <div className="create-post__title">
        <h1>Create New Post</h1>
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
            url={imgUrl}
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

export default AdminCreatePost;
