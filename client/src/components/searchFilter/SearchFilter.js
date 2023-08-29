import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterGames, getGenres } from '../../actions';
import './searchFilter.css';

const Filters = () => {
	const dispatch = useDispatch();

	const [filter, setFilter] = useState({
		genre: 'Select',
		source: 'Select',
		order: 'Select',
	});

	const loadedVideogames = useSelector(state => state.loadedVideogames);
	const selectGenres = useSelector(state => state.allGenres);

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);

	let gamesToFilter = [...loadedVideogames];

	const handleChange = e => {
		if (e.target.name === 'genre')
			setFilter({ ...filter, genre: e.target.value });
		else if (e.target.name === 'source')
			setFilter({
				...filter,
				source:
					e.target.value === 'Select'
						? 'Select'
						: e.target.value === 'true'
						? true
						: false,
			});
		else if (e.target.name === 'order')
			setFilter({ ...filter, order: e.target.value });
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
		if (
			filter.genre === 'Select' &&
			filter.source === 'Select' &&
			filter.order === 'Select'
		) {
			dispatch(filterGames(gamesToFilter));
		} else {
			if (filter.source !== 'Select') {
				filtered = filtered.filter(game => game.created === filter.source);
			}
			if (filter.genre !== 'Select') {
				filtered = filtered.filter(game =>
					game.genres.some(gen => gen.name === filter.genre)
				);
			}
			if (filter.order !== 'Select') {
				sortCB(filtered, filter.order);
			}
			if (!filtered.length) {
				alert("We're sorry. Your search didn't return any results.");
				dispatch(filterGames(filtered));
				setFilter({
					genre: 'Select',
					source: 'Select',
					order: 'Select',
				});
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
						value={filter.source}
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
						value={filter.genre}
						onChange={event => handleChange(event)}
					>
						<option value='Select' default>
							Select
						</option>
						{selectGenres.map(genre => (
							<option value={genre.name} key={genre.id}>
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
						value={filter.order}
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
