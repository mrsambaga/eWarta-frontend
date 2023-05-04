import React, { useEffect, useState } from "react";
import "./PostList.scss";
import NewsContainer from "../../molecules/NewsContainer/NewsContainer";
import useFetchGet from "../../../hooks/UseFetchGet";
import { GetCookie } from "../../../utils/Cookies/Cookies";
import { News, NewsHighlight } from "../../../constant/NewsProps";
import { notifyError } from "../../atoms/Toastify/Toastify";
import { useDispatch, useSelector } from "react-redux";
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
import { newsActions } from "../../../store/NewsSlice";

const PostList: React.FC = () => {
  const { news } = useSelector((state: RootState) => state.news);
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
    data: News[];
  }>(`http://localhost:8000/news`, token, param);

  useEffect(() => {
    if (error) {
      const errorMessage = error.response?.data || error.message;
      notifyError(JSON.stringify(errorMessage));
      return;
    }

    if (out != null && out.data != null) {
      console.log(out);
      const News: News[] = out.data.map((item) => {
        return {
          postId: item.postId,
          title: item.title,
          summaryDesc: item.summaryDesc,
          imgUrl: item.imgUrl,
          author: item.author,
          categoryId: item.categoryId,
          typeId: item.typeId,
          slug: item.slug,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        };
      });

      dispatch(newsActions.setNews(News));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out, error]);

  const [newsHighlight, setNewsHighlight] = useState<NewsHighlight[]>([]);
  useEffect(() => {
    const newsHighlightDTO: NewsHighlight[] = news.map((item) => {
      const { postId, title, summaryDesc, imgUrl, author } = item;
      return {
        id: postId,
        title: title,
        desc: summaryDesc,
        img: imgUrl,
        author: author,
      };
    });
    setNewsHighlight(newsHighlightDTO);
  }, [news]);

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
