import { Link } from 'react-router-dom';
import './Games.css';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import { useEffect, useState } from 'react';
import { getAllVideogames } from '../../actions/actions';

const Games = () => {
	// const dispatch = useDispatch();
	const currentGames = useSelector(state => state.currentGames);
	const isLoaded = useSelector(state => state.isLoaded);

	// let gamesToRender = currentGames.length ? currentGames : null;
	// useEffect(() => {
	//   dispatch(getAllVideogames());
	// }, [gamesToRender]);

	// console.log('LOADED', loadedVideogames);
	// console.log('CURRENT', currentGames);
	const [currentPage, setCurrentPage] = useState(1);
	// const [didLoad, setDidLoad] = useState(false);

	const gamesPerPage = 15;
	const indexOfLastGame = currentPage * gamesPerPage;
	const indexOfFirstGame = indexOfLastGame - gamesPerPage;
	const shownGames = currentGames.slice(indexOfFirstGame, indexOfLastGame);

	const paginate = num => setCurrentPage(num);
	return (
		<div className='gamesGrid'>
			{!isLoaded ? (
				<Loading />
			) : shownGames.length < 1 ? (
				<span>No games</span>
			) : (
				shownGames &&
				shownGames.map(game => (
					<div className='games' key={game.id}>
						<Link to={`/videogame/${game.id}`}>
							<h3 className='gamesH3'>{game.name}</h3>
							<img
								className='homeIMG'
								src={
									game.image
										? game.image
										: 'https://live.mrf.io/statics/i/ps/www.muylinux.com/wp-content/uploads/2014/01/mljuegos0.png?width=1200&enable=upscale'
								}
								alt='game poster'
							/>
						</Link>
						<>
							{game.genres &&
								game.genres.map(el => {
									return (
										<li className='homeLi' key={el.id}>
											{el.name}
										</li>
									);
								})}
						</>
					</div>
				))
			)}
			<div className='pageBtn'>
				<Pagination
					gamesPerPage={gamesPerPage}
					totalVideogames={currentGames.length}
					paginate={paginate}
				/>
			</div>
		</div>
	);
};

export default Games;
// fixed
