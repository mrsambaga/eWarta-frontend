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
import { RootState } from "../../../store/IndexStore";
import Filter from "../../molecules/Filter/Filter";
import { FormProps } from "../../../constant/FormProps";
import { DropdownProps } from "../../atoms/DropDown/DropDown";
import { QueryParams } from "../../../constant/QueryParam";
import {
  CategoryDropdown,
  SortDateDropdown,
  TypeDropdown,
} from "../../../constant/DropDown";
import { debounce } from "../../../utils/Debounce/Debounce";

const PostList: React.FC = () => {
  const { newsHighlight } = useSelector(
    (state: RootState) => state.newsHighlight
  );
  const dispatch = useDispatch();
  const token = GetCookie("token");

  const [titleFilter, setTitleFilter] = useState("");

  const handleFilterFormChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitleFilter(event.target.value);
    }
  );

  const filterProps: FormProps = {
    placeholder: "Search by title",
    inputType: "text",
    className: "filter-form",
    onChangeProp: handleFilterFormChange,
    value: titleFilter,
    name: "titleFilter",
    validate: false,
  };

  const [category, setCategory] = useState("");
  const changeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const [type, setType] = useState("");
  const changeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const [date, setSortDate] = useState("");
  const changeSortDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortDate(event.target.value);
  };

  const param: QueryParams = {
    title: titleFilter,
    category: category,
    type: type,
    date: date,
  };

  const categoryDropdownProps: DropdownProps = {
    onChange: changeCategory,
    dropdownOptions: CategoryDropdown,
    className: "filter",
  };

  const typeDropdownProps: DropdownProps = {
    onChange: changeType,
    dropdownOptions: TypeDropdown,
    className: "filter",
  };

  const dateDropdownProps: DropdownProps = {
    onChange: changeSortDate,
    dropdownOptions: SortDateDropdown,
    className: "filter",
  };

  const { out, loading, error } = useFetchGet<{
    data: NewsHighlightResponse[];
  }>(`http://localhost:8000/news/highlight`, token, param);

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
          id: item.post_id,
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
            <Filter
              label="Category"
              type="dropdown"
              props={categoryDropdownProps}
            />
            <Filter label="Type" type="dropdown" props={typeDropdownProps} />
            <Filter
              label="Release Date"
              type="dropdown"
              props={dateDropdownProps}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
