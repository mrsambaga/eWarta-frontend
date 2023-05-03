import React, { useEffect, useState } from "react";
import "./PostList.scss";
import NewsContainer from "../../molecules/NewsContainer/NewsContainer";
import useFetchGet from "../../../hooks/UseFetchGet";
import { GetCookie } from "../../../utils/Cookies/Cookies";
import {
  NewsHighlight,
  NewsHighlightResponse,
} from "../../../constant/NewsProps";
import { notifyError } from "../../atoms/Toastify/Toastify";
import { useDispatch, useSelector } from "react-redux";
import { newsHighlightActions } from "../../../store/NewsHighlightSlice";
import { RootState } from "../../../store/Index";
import Filter from "../../molecules/Filter/Filter";
import { FormProps } from "../../../constant/FormProps";
import { DropdownProps } from "../../atoms/DropDown/DropDown";
import {
  CategoryDropdown,
  SortDateDropdown,
  TypeDropdown,
} from "../../../constant/DropDown";

const PostList: React.FC = () => {
  const { newsHighlight } = useSelector(
    (state: RootState) => state.newsHighlight
  );
  const dispatch = useDispatch();
  const token = GetCookie("token");

  const { out, loading, error } = useFetchGet<{
    data: NewsHighlightResponse[];
  }>(`http://localhost:8000/news/highlight`, token!);

  useEffect(() => {
    if (error) {
      const errorMessage = error.response?.data || error.message;
      notifyError(JSON.stringify(errorMessage));
      return;
    }

    if (out != null && out.data != null) {
      console.log(out);
      const NewsHighlight: NewsHighlight[] = out.data.map((item) => {
        return {
          title: item.title,
          desc: item.summary_desc,
          img: item.img_url,
          alt: item.title,
          author: item.author,
        };
      });

      dispatch(newsHighlightActions.setNewsHighlight(NewsHighlight));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, error]);

  const [titleFilter, setTitleFilter] = useState("");

  const handleFilterFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitleFilter(event.target.value);
  };

  const filterProps: FormProps = {
    placeholder: "Search by title",
    inputType: "text",
    className: "filter-form",
    onChangeProp: handleFilterFormChange,
    value: titleFilter,
    name: "titleFilter",
    validate: false,
  };

  const [, setCategory] = useState("");
  const changeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const [, setType] = useState("");
  const changeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const [, setSortDate] = useState("");
  const changeSortDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortDate(event.target.value);
  };

  const dropdownProps1: DropdownProps = {
    onChange: changeCategory,
    dropdownOptions: CategoryDropdown,
    className: "filter",
  };

  const dropdownProps2: DropdownProps = {
    onChange: changeType,
    dropdownOptions: TypeDropdown,
    className: "filter",
  };

  const dropdownProps3: DropdownProps = {
    onChange: changeSortDate,
    dropdownOptions: SortDateDropdown,
    className: "filter",
  };

  return (
    <div className="post-list">
      <div className="post-list__title">
        <h3>MORE NEWS</h3>
        <div className="top-stories__title__line"></div>
      </div>
      <div className="post-list__container">
        <div className="post-list__container__left">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <NewsContainer
                news={newsHighlight}
                className="main"
                type="secondary"
              />
            </>
          )}
        </div>
        <div className="post-list__container__right">
          <div className="filter-container">
            <Filter label="Search" type="form" props={filterProps} />
            <Filter label="Category" type="dropdown" props={dropdownProps1} />
            <Filter label="Type" type="dropdown" props={dropdownProps2} />
            <Filter
              label="Release Date"
              type="dropdown"
              props={dropdownProps3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
