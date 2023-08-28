import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideogameDetails } from '../../actions/actions';
import './gameDetails.css';

const GameDetails = () => {
	const dispatch = useDispatch();
	const game = useSelector(state => state.videogameDetails);
	const { id } = useParams();

	useEffect(() => {
		dispatch(getVideogameDetails(id));
	}, [dispatch, id]);

	console.log('EL JUEGO TRAE: ', game);

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
				<b>Description: </b>
				{game.description}
			</p>
			<p>
				<b>Released on: </b>
				{game.released}
			</p>
			<p>
				<b>Rating: </b>
				{game.rating}⭐
			</p>
			<p>
				<b>Available for:</b>
				{(game.platforms &&
					game.platforms.map(plat => (
						<li className='liPlat' key={plat.platform.id}>
							{plat.platform.name}
						</li>
					))) ||
					(game.Platforms &&
						game.Platforms.map((plat, i) => (
							<li className='liPlat' key={plat[i]}>
								{plat.name}
							</li>
						)))}
			</p>
			<p>
				<b>Genres: </b>
				{(game.genres &&
					game.genres.map(gen => (
						<li className='liGen' key={gen.id}>
							{gen.name}
						</li>
					))) ||
					(game.Genres &&
						game.Genres.map((gen, i) => (
							<li className='liGen' key={gen[i]}>
								{gen.name}
							</li>
						)))}
			</p>
		</div>
	);
};

export default GameDetails;
