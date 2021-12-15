import React from "react";
import "./Pagination.css";

const Pagination = ({ gamesPerPage, totalVideogames, paginate }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalVideogames / gamesPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="btnGrid">
      {/* <a className="paginatebtn" href="#">
        ◀ Prev
      </a> */}
      {pages &&
        pages.map((num) => (
          <a
            key={num}
            className="paginatebtn"
            onClick={() => paginate(num)}
            href="#"
          >
            {num}
          </a>
        ))}
      {/* <a className="paginatebtn" href="#">
        Next ▶
      </a> */}
    </div>
  );
};

export default Pagination;
