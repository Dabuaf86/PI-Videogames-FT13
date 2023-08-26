import React, { useState } from 'react';
import './pagination.css';

const Pagination = ({ gamesPerPage, totalVideogames, paginate }) => {
	const [currPage, setCurrPage] = useState(1);

	const pages = [];
	for (let i = 1; i <= Math.ceil(totalVideogames / gamesPerPage); i++) {
		pages.push(i);
	}

	const handlePaginate = num => {
		setCurrPage(num);
		paginate(num);
	};

	const handlePageFwd = currPage => {
		setCurrPage(currPage + 1);
		paginate(currPage + 1);
	};
	const handlePageBack = currPage => {
		setCurrPage(currPage - 1);
		paginate(currPage - 1);
	};

	return (
		<div className='btnGrid'>
			<button
				className='paginatebtn'
				onClick={() => handlePageBack(currPage)}
				disabled={currPage === 1}
			>
				◀ Prev
			</button>
			{pages &&
				pages.map(num => (
					<button
						key={num}
						className={currPage === num ? 'activePaginatebtn' : 'paginatebtn'}
						onClick={() => handlePaginate(num)}
					>
						{num}
					</button>
				))}
			<button
				className='paginatebtn'
				onClick={() => handlePageFwd(currPage)}
				disabled={currPage === pages.length}
			>
				Next ▶
			</button>
		</div>
	);
};

export default Pagination;
