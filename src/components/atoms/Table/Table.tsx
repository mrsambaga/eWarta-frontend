import React from "react";

type TableProps = {
  ths: string[];
};

const Table: React.FC<TableProps> = ({ ths }) => {
  return (
    <table className="table table-bordered table-striped">
      {/* <thead className="table__head">
        <tr>
          {ths.map((th) => (
            <th>{th}</th>
          ))}
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
      </tbody> */}
    </table>
  );
};

export default Table;
