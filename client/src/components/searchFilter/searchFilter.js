import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterGames, getGenres } from '../../actions/actions';
import './searchFilter.css';

const Filters = () => {
	const dispatch = useDispatch();
	const loadedVideogames = useSelector(state => state.loadedVideogames);
	const selectGenres = useSelector(state => state.allGenres);
	const [genre, setGenre] = useState('Select');
	const [source, setSource] = useState('Select');
	const [order, setOrder] = useState('Select');

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);

	let gamesToFilter = [...loadedVideogames];

	const handleChange = e => {
		if (e.target.name === 'genre') setGenre(e.target.value);
		else if (e.target.name === 'source')
			setSource(
				e.target.value === 'Select' ? 'Select' : e.target.value === 'true'
			);
		else if (e.target.name === 'order') setOrder(e.target.value);
	};

	const sortCB = (arr, order) => {
		if (order === 'alphAsc') {
			arr.sort((a, b) => {
				if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
				if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
				return 0;
			});
		}
		if (order === 'alphDesc') {
			arr.sort((a, b) => {
				if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
				if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
				return 0;
			});
		}
		if (order === 'ratingAsc') {
			arr.sort((a, b) => a.rating - b.rating);
		}
		if (order === 'ratingDesc') {
			arr.sort((a, b) => b.rating - a.rating);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		let filtered = [...gamesToFilter];
		if (genre === 'Select' && source === 'Select' && order === 'Select') {
			dispatch(filterGames(gamesToFilter));
		} else {
			if (source !== 'Select') {
				filtered = filtered.filter(game => game.created === source);
			}
			if (genre !== 'Select') {
				filtered = filtered.filter(game =>
					game.genres.some(gen => gen.name === genre)
				);
			}
			if (order !== 'Select') {
				sortCB(filtered, order);
			}
			dispatch(filterGames(filtered));
		}
	};

	return (
		<div>
			<form className='filterForm' onSubmit={event => handleSubmit(event)}>
				<div className='filterDiv'>
					<label className='filterLbl'>Filter by Source</label>
					<select
						className='filterSelect'
						name='source'
						value={source}
						onChange={event => handleChange(event)}
					>
						<option value='Select' default>
							Select
						</option>
						<option value={true}>Your Games</option>
						<option value={false}>Our Games</option>
					</select>
				</div>
				<div className='filterDiv'>
					<label className='filterLbl'>Filter by Genre</label>
					<select
						className='filterSelect'
						name='genre'
						value={genre}
						onChange={event => handleChange(event)}
					>
						<option value='Select' default>
							Select
						</option>
						{selectGenres.map(genre => (
							<option key={genre.id} value={genre.name}>
								{genre.name}
							</option>
						))}
					</select>
				</div>
				<div className='filterDiv'>
					<label className='filterLbl'>Sort</label>
					<select
						className='filterSelect'
						name='order'
						value={order}
						onChange={event => handleChange(event)}
					>
						<option value='Select' default>
							Select
						</option>
						<option value='alphAsc'>A - Z</option>
						<option value='alphDesc'>Z - A</option>
						<option value='ratingAsc'>Rating ⬆️</option>
						<option value='ratingDesc'>Rating ⬇️</option>
					</select>
				</div>
				<button id='btnSort' type='submit'>
					Apply
				</button>
			</form>
		</div>
	);
};

export default Filters;
