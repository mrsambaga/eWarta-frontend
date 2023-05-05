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
import { CategoryDropdown, TypeDropdown } from "../../../constant/DropDown";
import axios from "axios";
import ImageInput from "../../../components/molecules/ImageInput/ImageInput";

const AdminCreatePost: React.FC = () => {
  /* ----------- Forms --------------  */

  const navigate = useNavigate();
  const [newPost, setNewPost] = useState<CreateNewPost>({
    title: "",
    summaryDesc: "",
    imgUrl: "",
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
      placeholder: "Image",
      inputType: "text",
      className: "auth-form",
      name: "image",
      onChangeProp: (event: React.ChangeEvent<HTMLInputElement>) =>
        handleNewPostChange(event, "imgUrl"),
      value: newPost.imgUrl,
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

  const typeDropdownProps: DropdownProps = {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
      handleNewPostChange(event, "type"),
    dropdownOptions: TypeDropdown.slice(1),
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
    uploadImage();
  };

  /* ----------- Fetch Api Create New Post --------------  */

  /* ----------- Upload Image --------------  */

  const [img, setImg] = useState<File>();
  const [imgUrl, setImgUrl] = useState("");

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImg(event.target.files[0]);
      setImgUrl(URL.createObjectURL(event.target.files[0]));
      console.log(img);
    }
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", img!);
    formData.append("upload_preset", "zndy4eop");

    axios
      .post("https://api.cloudinary.com/v1_1/dixze5mfe/image/upload", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <Filter label="Type" type="dropdown" props={typeDropdownProps} />
        <div className="create-post__forms__image">
          <h3>Image</h3>
          <ImageInput
            type="file"
            onChange={inputChangeHandler}
            imageUrl={imgUrl}
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
    </div>
  );
};

export default AdminCreatePost;
