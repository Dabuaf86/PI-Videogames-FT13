import React from "react";
import "./Pagination.css";

const Pagination = ({ gamesPerPage, totalVideogames, paginate }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalVideogames / gamesPerPage); i++) {
    pages.push(i);
  }

  // const handleClickPrev = (event) => {
  //   if (limit >= 0) {
  //     if (limit === 0) SetLimit(0);
  //     else SetLimit(limit - 15);
  //     page--;
  //   }
  // };
  // const handleClickNext = (event) => {
  //   if (Math.floor(total / (page + 1)) >= 15) {
  //     SetLimit(limit + 15);
  //     page++;
  //   }
  // };

  return (
    <footer>
      <ul>
        <li className="pagbtn"></li>
        <a href="">previous</a>
        {pages &&
          pages.map((num) => (
            <li className="pagbtn" key={num}>
              <a onClick={() => paginate(num)} href="#">
                {num}
              </a>
            </li>
          ))}
        <li className="pagbtn"></li>
        <a href="">next</a>
      </ul>
    </footer>
  );
};

export default Pagination;
