// import { useState } from 'react';
import './pagination.css';

const Pagination = ({ gamesPerPage, totalVideogames, paginate }) => {
	// const [currPage, setCurrPage] = useState(1);

	const pages = [];
	for (let i = 1; i <= Math.ceil(totalVideogames / gamesPerPage); i++) {
		pages.push(i);
	}

	// CONVERTIR EN UN SÓLO MANEJADOR
	// const handlePaginate = num => {
	// 	setCurrPage(num);
	// 	paginate(num);
	// };
	// const handlePageFwd = currPage => {
	// 	setCurrPage(currPage + 1);
	// 	paginate(currPage + 1);
	// };
	// const handlePageBack = currPage => {
	// 	setCurrPage(currPage - 1);
	// 	paginate(currPage - 1);
	// };

	return (
		<div className='btnGrid'>
			{/* <a
				className='paginatebtn'
				href='#'
				onClick={() => handlePageBack(currPage)}
			>
				◀ Prev
			</a> */}
			{pages &&
				pages.map(num => (
					// eslint-disable-next-line
					<a
						key={num}
						className='paginatebtn'
						// className={currPage === num ? 'activePaginatebtn' : 'paginatebtn'}
						onClick={() => paginate(num)}
						href='#'
					>
						{num}
					</a>
				))}
			{/* <a
				className='paginatebtn'
				href='#'
				onClick={() => handlePageFwd(currPage)}
			>
				Next ▶
			</a> */}
		</div>
	);
};

export default Pagination;
