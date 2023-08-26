import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideogameDetails } from '../../actions';
import './gameDetails.css';

const GameDetails = () => {
	const dispatch = useDispatch();
	const game = useSelector(state => state.videgameDetails);
	const { id } = useParams();

	useEffect(() => {
		dispatch(getVideogameDetails(id));
	}, [dispatch, id]);

	return (
		<div className='details'>
			<img
				className='detailIMG'
				src={
					game.image
						? game.image
						: 'https://live.mrf.io/statics/i/ps/www.muylinux.com/wp-content/uploads/2014/01/mljuegos0.png?width=1200&enable=upscale'
				}
				alt='game poster'
			/>
			<h2 className='detailH2'>{game.name}</h2>
			<p className='detailDescr'>
				<b>Description</b>
				<br />
				{game.description}
			</p>
			<p>
				<b>Released</b>
				<br />
				{game.released}
			</p>
			<p>
				<b>Rating</b>
				<br />
				{game.rating}⭐
			</p>
			<p>
				<b>Available for</b>
				<br />
				{(game.platforms &&
					game.platforms.map((plat, i) => {
						return (
							<li key={i} className='liPlat'>
								{plat.platform.name}
							</li>
						);
					})) ||
					(game.Platforms &&
						game.Platforms.map(platDB => {
							return (
								<li key={platDB.id} className='liGen'>
									{platDB.name}
								</li>
							);
						}))}
			</p>
			<p>
				<b>Genres</b>
				<br />
				{(game.genres &&
					game.genres.map((genre, i) => {
						return (
							<li key={i} className='liGen'>
								{genre.name}
							</li>
						);
					})) ||
					(game.Genres &&
						game.Genres.map(genreDB => {
							return (
								<li key={genreDB.id} className='liGen'>
									{genreDB.name}
								</li>
							);
						}))}
			</p>
		</div>
	);
};

export default GameDetails;
