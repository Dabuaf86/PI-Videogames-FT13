import { Link } from 'react-router-dom';
import './Games.css';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import { useEffect, useState } from 'react';
import { getAllVideogames } from '../../Actions/Actions';

const Games = () => {
	// const dispatch = useDispatch();
	const loadedVideogames = useSelector(state => state.loadedVideogames);
	const currentGames = useSelector(state => state.currentGames);

	let gamesToRender = currentGames.length ? currentGames : loadedVideogames;
	// useEffect(() => {
	//   dispatch(getAllVideogames());
	// }, [gamesToRender]);

	console.log('LOADED', loadedVideogames);
	console.log('CURRENT', currentGames);
	const [currentPage, setCurrentPage] = useState(1);
	// const [didLoad, setDidLoad] = useState(false);

	const gamesPerPage = 15;
	const indexOfLastGame = currentPage * gamesPerPage;
	const indexOfFirstGame = indexOfLastGame - gamesPerPage;
	const shownGames = gamesToRender.slice(indexOfFirstGame, indexOfLastGame);

	const paginate = num => setCurrentPage(num);

	return (
		<div className='gamesGrid'>
			{shownGames.length < 1 ? (
				<Loading />
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
									return <li className='homeLi'>{el.name}</li>;
								})}
						</>
					</div>
				))
			)}
			<div className='pageBtn'>
				<Pagination
					gamesPerPage={gamesPerPage}
					totalVideogames={gamesToRender.length}
					paginate={paginate}
				/>
			</div>
		</div>
	);
};

export default Games;
